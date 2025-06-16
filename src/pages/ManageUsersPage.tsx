import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Shield, Users, User, Check, X, Eye, Mail, Calendar, AlertTriangle, Search, Filter, ExternalLink } from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';

interface UserAccount {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
  lastLogin?: string;
  missionsCompleted?: number;
  managedEntities?: string[];
}

const ManageUsersPage: React.FC = () => {
  const { user } = useAuth();
  
  // Protection d'accès : seuls les administrateurs peuvent accéder à cette page
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const [users, setUsers] = useState<UserAccount[]>([
    {
      id: '1',
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@example.com',
      role: 'user',
      status: 'active',
      createdAt: '2024-01-10',
      lastLogin: '2024-01-25',
      missionsCompleted: 5
    },
    {
      id: '2',
      firstName: 'Marie',
      lastName: 'Martin',
      email: 'marie.martin@example.com',
      role: 'manager',
      status: 'pending',
      createdAt: '2024-01-20',
      missionsCompleted: 0,
      managedEntities: ['Ashes of Mankind', 'Metahoof']
    },
    {
      id: '3',
      firstName: 'Pierre',
      lastName: 'Durand',
      email: 'pierre.durand@example.com',
      role: 'admin',
      status: 'pending',
      createdAt: '2024-01-22',
      missionsCompleted: 0
    },
    {
      id: '4',
      firstName: 'Sophie',
      lastName: 'Bernard',
      email: 'sophie.bernard@example.com',
      role: 'user',
      status: 'active',
      createdAt: '2024-01-15',
      lastLogin: '2024-01-24',
      missionsCompleted: 12
    },
    {
      id: '5',
      firstName: 'Thomas',
      lastName: 'Petit',
      email: 'thomas.petit@example.com',
      role: 'manager',
      status: 'active',
      createdAt: '2024-01-05',
      lastLogin: '2024-01-25',
      missionsCompleted: 8,
      managedEntities: ['Cloak', 'Ultra Arena', 'Neon District']
    }
  ]);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isReactivateModalOpen, setIsReactivateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'manager' | 'user'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'suspended'>('all');

  const handleApproveUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: 'active' as const }
        : user
    ));
    setIsApprovalModalOpen(false);
    setSelectedUser(null);
  };

  const handleRejectUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    setIsRejectModalOpen(false);
    setSelectedUser(null);
  };

  const handleSuspendUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: 'suspended' as const }
        : user
    ));
    setIsSuspendModalOpen(false);
    setSelectedUser(null);
  };

  const handleReactivateUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: 'active' as const }
        : user
    ));
    setIsReactivateModalOpen(false);
    setSelectedUser(null);
  };

  const openViewModal = (user: UserAccount) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const openApprovalModal = (user: UserAccount) => {
    setSelectedUser(user);
    setIsApprovalModalOpen(true);
  };

  const openRejectModal = (user: UserAccount) => {
    setSelectedUser(user);
    setIsRejectModalOpen(true);
  };

  const openSuspendModal = (user: UserAccount) => {
    setSelectedUser(user);
    setIsSuspendModalOpen(true);
  };

  const openReactivateModal = (user: UserAccount) => {
    setSelectedUser(user);
    setIsReactivateModalOpen(true);
  };

  const getRoleConfig = (role: string) => {
    switch (role) {
      case 'admin':
        return {
          icon: Shield,
          label: 'Administrateur',
          color: 'bg-red-100 text-red-700',
          iconColor: 'text-red-600'
        };
      case 'manager':
        return {
          icon: Users,
          label: 'Gestionnaire',
          color: 'bg-amber-100 text-amber-700',
          iconColor: 'text-amber-600'
        };
      case 'user':
        return {
          icon: User,
          label: 'Contributeur',
          color: 'bg-emerald-100 text-emerald-700',
          iconColor: 'text-emerald-600'
        };
      default:
        return {
          icon: User,
          label: 'Inconnu',
          color: 'bg-gray-100 text-gray-700',
          iconColor: 'text-gray-600'
        };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          label: 'Actif',
          color: 'bg-green-100 text-green-700',
          dot: 'bg-green-500'
        };
      case 'pending':
        return {
          label: 'En attente',
          color: 'bg-yellow-100 text-yellow-700',
          dot: 'bg-yellow-500'
        };
      case 'suspended':
        return {
          label: 'Suspendu',
          color: 'bg-red-100 text-red-700',
          dot: 'bg-red-500'
        };
      default:
        return {
          label: 'Inconnu',
          color: 'bg-gray-100 text-gray-700',
          dot: 'bg-gray-500'
        };
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const pendingUsers = users.filter(user => user.status === 'pending');
  const activeUsers = users.filter(user => user.status === 'active');
  const suspendedUsers = users.filter(user => user.status === 'suspended');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Gestion des contributeurs
          </h1>
          <p className="text-gray-600">
                          Gérez les comptes contributeurs et les demandes d'inscription
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-hover">
            <CardBody className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="card-hover">
            <CardBody className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Actifs</p>
                  <p className="text-2xl font-bold text-gray-900">{activeUsers.length}</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="card-hover">
            <CardBody className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">En attente</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingUsers.length}</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="card-hover">
            <CardBody className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-lg">
                  <X className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Suspendus</p>
                  <p className="text-2xl font-bold text-gray-900">{suspendedUsers.length}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Filtres et recherche */}
        <Card className="mb-6">
          <CardBody className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher par nom ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">Tous les rôles</option>
                  <option value="admin">Administrateurs</option>
                  <option value="manager">Gestionnaires</option>
                  <option value="user">Contributeurs</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="active">Actifs</option>
                  <option value="pending">En attente</option>
                  <option value="suspended">Suspendus</option>
                </select>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Liste des utilisateurs */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">
              Contributeurs ({filteredUsers.length})
            </h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {filteredUsers.map((user) => {
                const roleConfig = getRoleConfig(user.role);
                const statusConfig = getStatusConfig(user.status);
                const RoleIcon = roleConfig.icon;

                return (
                  <div key={user.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-lg font-semibold text-gray-600">
                            {user.firstName[0]}{user.lastName[0]}
                          </span>
                        </div>

                        {/* Informations utilisateur */}
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="font-semibold text-gray-900">
                              {user.firstName} {user.lastName}
                            </h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleConfig.color}`}>
                              <RoleIcon className={`w-3 h-3 mr-1 ${roleConfig.iconColor}`} />
                              {roleConfig.label}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
                              <div className={`w-2 h-2 rounded-full mr-1.5 ${statusConfig.dot}`}></div>
                              {statusConfig.label}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 space-x-4">
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-1" />
                              {user.email}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Inscrit le {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                            </div>
                            {user.missionsCompleted !== undefined && (
                              <div className="text-primary-600 font-medium">
                                {user.missionsCompleted} mission{user.missionsCompleted > 1 ? 's' : ''}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openViewModal(user)}
                          className="hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>

                        {user.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openApprovalModal(user)}
                              className="hover:bg-green-50 hover:text-green-600"
                              title="Approuver"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openRejectModal(user)}
                              className="hover:bg-red-50 hover:text-red-600"
                              title="Refuser"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}

                        {user.status === 'active' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openSuspendModal(user)}
                            className="hover:bg-red-50 hover:text-red-600"
                            title="Suspendre"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}

                        {user.status === 'suspended' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openReactivateModal(user)}
                            className="hover:bg-green-50 hover:text-green-600"
                            title="Réactiver"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredUsers.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-2">Aucun utilisateur trouvé</p>
                  <p>Essayez de modifier vos critères de recherche.</p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Modal de visualisation */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Détails de l'utilisateur"
        size="lg"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl font-semibold text-gray-600">
                  {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedUser.firstName} {selectedUser.lastName}
                </h2>
                <p className="text-gray-600">{selectedUser.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Informations de base */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Rôle & Statut</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      {React.createElement(getRoleConfig(selectedUser.role).icon, {
                        className: `w-5 h-5 ${getRoleConfig(selectedUser.role).iconColor}`
                      })}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleConfig(selectedUser.role).color}`}>
                        {getRoleConfig(selectedUser.role).label}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusConfig(selectedUser.status).dot}`}></div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusConfig(selectedUser.status).color}`}>
                        {getStatusConfig(selectedUser.status).label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Dates importantes</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">Inscription</p>
                      <p className="font-medium">
                        {new Date(selectedUser.createdAt).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    {selectedUser.lastLogin && (
                      <div>
                        <p className="text-sm text-gray-600">Dernière connexion</p>
                        <p className="font-medium">
                          {new Date(selectedUser.lastLogin).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Statistiques et entités */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">Performance</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600">Missions terminées</p>
                      <p className="text-3xl font-bold text-green-700">
                        {selectedUser.missionsCompleted || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                {selectedUser.role === 'manager' && selectedUser.managedEntities && selectedUser.managedEntities.length > 0 && (
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
                    <h3 className="font-semibold text-purple-800 mb-3 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Entités gérées
                    </h3>
                    <div className="space-y-2">
                      {selectedUser.managedEntities.map((entity, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-white/60 rounded-lg px-3 py-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-purple-800 font-medium">{entity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                  <Link 
                    to={`/profile/${selectedUser.id}`}
                    className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span className="font-medium">Voir le profil public</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Button 
                variant="outline" 
                onClick={() => setIsViewModalOpen(false)}
              >
                Fermer
              </Button>
              
              {selectedUser.status === 'pending' && (
                <>
                  <Button 
                    onClick={() => {
                      setIsViewModalOpen(false);
                      openApprovalModal(selectedUser);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Approuver
                  </Button>
                  <Button 
                    onClick={() => {
                      setIsViewModalOpen(false);
                      openRejectModal(selectedUser);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Refuser
                  </Button>
                </>
              )}
              
              {selectedUser.status === 'active' && (
                <Button 
                  onClick={() => {
                    setIsViewModalOpen(false);
                    openSuspendModal(selectedUser);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <X className="w-4 h-4 mr-2" />
                  Suspendre
                </Button>
              )}
              
              {selectedUser.status === 'suspended' && (
                <Button 
                  onClick={() => {
                    setIsViewModalOpen(false);
                    openReactivateModal(selectedUser);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Réactiver
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Modal d'approbation */}
      <Modal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        title="Approuver la demande"
        size="md"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-blue-600">
                  {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                </span>
              </div>
              <div>
                <p className="font-medium text-blue-800">
                  {selectedUser.firstName} {selectedUser.lastName}
                </p>
                <p className="text-sm text-blue-600">{selectedUser.email}</p>
              </div>
            </div>

            <div>
              <p className="text-gray-700 mb-2">
                Cette personne souhaite créer un compte :
              </p>
              <div className="flex items-center space-x-2">
                {React.createElement(getRoleConfig(selectedUser.role).icon, {
                  className: `w-5 h-5 ${getRoleConfig(selectedUser.role).iconColor}`
                })}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleConfig(selectedUser.role).color}`}>
                  {getRoleConfig(selectedUser.role).label}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Demande créée le {new Date(selectedUser.createdAt).toLocaleDateString('fr-FR')}
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => handleRejectUser(selectedUser.id)}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Rejeter
              </Button>
              <Button 
                onClick={() => handleApproveUser(selectedUser.id)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Approuver
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de refus */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        title="Refuser la demande"
        size="md"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-800">Attention !</p>
                <p className="text-sm text-red-600">Cette action supprimera définitivement la demande.</p>
              </div>
            </div>

            <div>
              <p className="text-gray-700 mb-2">
                Êtes-vous sûr de vouloir refuser la demande de :
              </p>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-600">
                    {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{selectedUser.email}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Rôle demandé : {getRoleConfig(selectedUser.role).label}
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsRejectModalOpen(false)}
              >
                Annuler
              </Button>
              <Button 
                onClick={() => handleRejectUser(selectedUser.id)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Refuser définitivement
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de suspension */}
      <Modal
        isOpen={isSuspendModalOpen}
        onClose={() => setIsSuspendModalOpen(false)}
        title="Suspendre l'utilisateur"
        size="md"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-yellow-800">Suspension temporaire</p>
                <p className="text-sm text-yellow-600">L'utilisateur ne pourra plus accéder à la plateforme.</p>
              </div>
            </div>

            <div>
              <p className="text-gray-700 mb-2">
                Êtes-vous sûr de vouloir suspendre :
              </p>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-600">
                    {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{selectedUser.email}</p>
                </div>
              </div>
              {selectedUser.missionsCompleted && selectedUser.missionsCompleted > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  Cet utilisateur a terminé {selectedUser.missionsCompleted} mission{selectedUser.missionsCompleted > 1 ? 's' : ''}.
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsSuspendModalOpen(false)}
              >
                Annuler
              </Button>
              <Button 
                onClick={() => handleSuspendUser(selectedUser.id)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                Suspendre
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de réactivation */}
      <Modal
        isOpen={isReactivateModalOpen}
        onClose={() => setIsReactivateModalOpen(false)}
        title="Réactiver l'utilisateur"
        size="md"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800">Réactivation</p>
                <p className="text-sm text-green-600">L'utilisateur retrouvera l'accès à la plateforme.</p>
              </div>
            </div>

            <div>
              <p className="text-gray-700 mb-2">
                Êtes-vous sûr de vouloir réactiver :
              </p>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-600">
                    {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{selectedUser.email}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsReactivateModalOpen(false)}
              >
                Annuler
              </Button>
              <Button 
                onClick={() => handleReactivateUser(selectedUser.id)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Réactiver
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManageUsersPage; 