import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  MessageSquare,
  Calendar,
  Award,
  Target,
  TrendingUp,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Settings,
  Building2,
  Briefcase,
  Shield,
  Crown,
  User,
  Activity
} from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  position: 'lead' | 'senior' | 'mid' | 'junior';
  avatar: string;
  status: 'active' | 'busy' | 'offline' | 'vacation';
  joinedAt: string;
  lastActivity: string;
  completedTasks: number;
  currentMissions: string[];
  skills: string[];
  rating: number;
  entityId: string;
  entityName: string;
  salary?: number;
  performance: {
    thisMonth: number;
    lastMonth: number;
    trend: 'up' | 'down' | 'stable';
  };
  workload: number; // pourcentage
}

interface Entity {
  id: string;
  name: string;
  logo: string;
  memberCount: number;
}

const ManagerTeamPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Sophie Bernard',
      email: 'sophie.bernard@ultra.io',
      role: 'Lead Developer',
      position: 'lead',
      avatar: '/avatar_jc.jpeg',
      status: 'active',
      joinedAt: '2023-08-15',
      lastActivity: '2024-01-25T14:30:00Z',
      completedTasks: 34,
      currentMissions: ['Développement App Mobile', 'Audit Smart Contract'],
      skills: ['React', 'TypeScript', 'Blockchain', 'Smart Contracts'],
      rating: 4.9,
      entityId: '1',
      entityName: 'Ashes of Mankind',
      salary: 75000,
      performance: {
        thisMonth: 95,
        lastMonth: 87,
        trend: 'up'
      },
      workload: 85
    },
    {
      id: '2',
      name: 'Thomas Petit',
      email: 'thomas.petit@ultra.io',
      role: 'UI/UX Designer',
      position: 'senior',
      avatar: '/bals.jpg',
      status: 'busy',
      joinedAt: '2023-09-20',
      lastActivity: '2024-01-25T12:15:00Z',
      completedTasks: 28,
      currentMissions: ['Design Interface Web3'],
      skills: ['Figma', 'Adobe XD', 'UI/UX', 'Prototyping'],
      rating: 4.7,
      entityId: '2',
      entityName: 'Metahoof',
      salary: 65000,
      performance: {
        thisMonth: 88,
        lastMonth: 92,
        trend: 'down'
      },
      workload: 70
    },
    {
      id: '3',
      name: 'Marie Dubois',
      email: 'marie.dubois@ultra.io',
      role: 'Game Designer',
      position: 'senior',
      avatar: '/garstud.jpg',
      status: 'active',
      joinedAt: '2023-07-10',
      lastActivity: '2024-01-25T11:45:00Z',
      completedTasks: 41,
      currentMissions: ['Balancing Gameplay', 'Level Design'],
      skills: ['Game Design', 'Unity', 'Balancing', 'Analytics'],
      rating: 4.8,
      entityId: '1',
      entityName: 'Ashes of Mankind',
      salary: 70000,
      performance: {
        thisMonth: 93,
        lastMonth: 89,
        trend: 'up'
      },
      workload: 75
    },
    {
      id: '4',
      name: 'Pierre Martin',
      email: 'pierre.martin@ultra.io',
      role: 'Backend Developer',
      position: 'mid',
      avatar: '/valentin.jpg',
      status: 'vacation',
      joinedAt: '2023-10-05',
      lastActivity: '2024-01-22T16:20:00Z',
      completedTasks: 19,
      currentMissions: [],
      skills: ['Node.js', 'PostgreSQL', 'API', 'Microservices'],
      rating: 4.4,
      entityId: '3',
      entityName: 'Ultra Studios',
      salary: 55000,
      performance: {
        thisMonth: 78,
        lastMonth: 82,
        trend: 'down'
      },
      workload: 0
    },
    {
      id: '5',
      name: 'Lucas Durand',
      email: 'lucas.durand@ultra.io',
      role: 'Frontend Developer',
      position: 'junior',
      avatar: '/vito.jpg',
      status: 'active',
      joinedAt: '2023-12-01',
      lastActivity: '2024-01-25T13:20:00Z',
      completedTasks: 12,
      currentMissions: ['Interface Mobile'],
      skills: ['Vue.js', 'CSS', 'JavaScript', 'Mobile'],
      rating: 4.2,
      entityId: '2',
      entityName: 'Metahoof',
      salary: 45000,
      performance: {
        thisMonth: 85,
        lastMonth: 79,
        trend: 'up'
      },
      workload: 60
    }
  ]);

  const [entities] = useState<Entity[]>([
    { id: '1', name: 'Ashes of Mankind', logo: '/avatar_jc.jpeg', memberCount: 2 },
    { id: '2', name: 'Metahoof', logo: '/bals.jpg', memberCount: 2 },
    { id: '3', name: 'Ultra Studios', logo: '/logo_UT_icon-2.png', memberCount: 1 }
  ]);

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterEntity, setFilterEntity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPosition, setFilterPosition] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'bg-green-500', label: 'En ligne', textColor: 'text-green-700' };
      case 'busy':
        return { color: 'bg-red-500', label: 'Occupé', textColor: 'text-red-700' };
      case 'offline':
        return { color: 'bg-gray-400', label: 'Hors ligne', textColor: 'text-gray-700' };
      case 'vacation':
        return { color: 'bg-blue-500', label: 'En congé', textColor: 'text-blue-700' };
      default:
        return { color: 'bg-gray-400', label: 'Inconnu', textColor: 'text-gray-700' };
    }
  };

  const getPositionConfig = (position: string) => {
    switch (position) {
      case 'lead':
        return { icon: Crown, label: 'Lead', color: 'text-purple-600', bgColor: 'bg-purple-100' };
      case 'senior':
        return { icon: Star, label: 'Senior', color: 'text-blue-600', bgColor: 'bg-blue-100' };
      case 'mid':
        return { icon: User, label: 'Mid', color: 'text-green-600', bgColor: 'bg-green-100' };
      case 'junior':
        return { icon: Shield, label: 'Junior', color: 'text-orange-600', bgColor: 'bg-orange-100' };
      default:
        return { icon: User, label: 'Inconnu', color: 'text-gray-600', bgColor: 'bg-gray-100' };
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getWorkloadColor = (workload: number) => {
    if (workload === 0) return 'bg-gray-200';
    if (workload < 50) return 'bg-green-500';
    if (workload < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEntity = filterEntity === 'all' || member.entityId === filterEntity;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    const matchesPosition = filterPosition === 'all' || member.position === filterPosition;
    
    return matchesSearch && matchesEntity && matchesStatus && matchesPosition;
  });

  const openViewModal = (member: TeamMember) => {
    setSelectedMember(member);
    setIsViewModalOpen(true);
  };

  const teamStats = {
    totalMembers: teamMembers.length,
    activeMembers: teamMembers.filter(m => m.status === 'active').length,
    avgPerformance: Math.round(teamMembers.reduce((acc, m) => acc + m.performance.thisMonth, 0) / teamMembers.length),
    avgWorkload: Math.round(teamMembers.reduce((acc, m) => acc + m.workload, 0) / teamMembers.length)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Users className="w-8 h-8 mr-3 text-blue-600" />
                Gestion d'équipe
              </h1>
              <p className="text-gray-600">
                Gérez votre équipe et optimisez les performances ({filteredMembers.length} membre{filteredMembers.length > 1 ? 's' : ''})
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4 mr-2" />
                Message groupe
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsInviteModalOpen(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Inviter membre
              </Button>
            </div>
          </div>

          {/* Stats d'équipe */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{teamStats.totalMembers}</p>
                <p className="text-sm text-gray-600">Membres totaux</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{teamStats.activeMembers}</p>
                <p className="text-sm text-gray-600">Membres actifs</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{teamStats.avgPerformance}%</p>
                <p className="text-sm text-gray-600">Performance moy.</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{teamStats.avgWorkload}%</p>
                <p className="text-sm text-gray-600">Charge de travail</p>
              </div>
            </div>
          </div>

          {/* Filtres et recherche */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Rechercher un membre..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <select
                  value={filterEntity}
                  onChange={(e) => setFilterEntity(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Toutes les entités</option>
                  {entities.map(entity => (
                    <option key={entity.id} value={entity.id}>{entity.name}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="active">En ligne</option>
                  <option value="busy">Occupé</option>
                  <option value="offline">Hors ligne</option>
                  <option value="vacation">En congé</option>
                </select>

                <select
                  value={filterPosition}
                  onChange={(e) => setFilterPosition(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Tous les niveaux</option>
                  <option value="lead">Lead</option>
                  <option value="senior">Senior</option>
                  <option value="mid">Mid</option>
                  <option value="junior">Junior</option>
                </select>

                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                  >
                    <Users className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des membres */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMembers.map((member) => {
              const statusConfig = getStatusConfig(member.status);
              const positionConfig = getPositionConfig(member.position);
              const PositionIcon = positionConfig.icon;

              return (
                <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardBody className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${statusConfig.color}`}></div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{member.name}</h3>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${positionConfig.bgColor}`}>
                        <PositionIcon className={`w-3 h-3 ${positionConfig.color}`} />
                        <span className={`text-xs font-medium ${positionConfig.color}`}>
                          {positionConfig.label}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Entité:</span>
                        <span className="font-medium text-gray-900">{member.entityName}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Performance:</span>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium text-gray-900">{member.performance.thisMonth}%</span>
                          {getTrendIcon(member.performance.trend)}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Charge de travail:</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div 
                              className={`h-full rounded-full ${getWorkloadColor(member.workload)}`}
                              style={{ width: `${member.workload}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-900">{member.workload}%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Note:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium text-gray-900">{member.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => openViewModal(member)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Voir
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMembers.map((member) => {
              const statusConfig = getStatusConfig(member.status);
              const positionConfig = getPositionConfig(member.position);
              const PositionIcon = positionConfig.icon;

              return (
                <Card key={member.id} className="hover:shadow-md transition-shadow">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${statusConfig.color}`}></div>
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                            <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${positionConfig.bgColor}`}>
                              <PositionIcon className={`w-3 h-3 ${positionConfig.color}`} />
                              <span className={`text-xs font-medium ${positionConfig.color}`}>
                                {positionConfig.label}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-1">{member.role}</p>
                          <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-8">
                        <div className="text-center">
                          <p className="text-lg font-bold text-gray-900">{member.completedTasks}</p>
                          <p className="text-xs text-gray-600">Tâches complétées</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-gray-900">{member.performance.thisMonth}%</p>
                          <p className="text-xs text-gray-600">Performance</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center space-x-1 mb-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-bold text-gray-900">{member.rating}</span>
                          </div>
                          <p className="text-xs text-gray-600">Note</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openViewModal(member)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Voir
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        )}

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun membre trouvé</h3>
            <p className="text-gray-600 mb-4">Essayez de modifier vos filtres ou invitez de nouveaux membres.</p>
            <Button onClick={() => setIsInviteModalOpen(true)}>
              <UserPlus className="w-4 h-4 mr-2" />
              Inviter un membre
            </Button>
          </div>
        )}

        {/* Modal de vue détaillée */}
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title={selectedMember?.name || ''}
          size="lg"
        >
          {selectedMember && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedMember.name}</h3>
                  <p className="text-gray-600">{selectedMember.role}</p>
                  <p className="text-sm text-gray-500">{selectedMember.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Briefcase className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-gray-900">{selectedMember.completedTasks}</p>
                  <p className="text-sm text-gray-600">Tâches complétées</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-gray-900">{selectedMember.performance.thisMonth}%</p>
                  <p className="text-sm text-gray-600">Performance</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-gray-900">{selectedMember.rating}</p>
                  <p className="text-sm text-gray-600">Note moyenne</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Activity className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-gray-900">{selectedMember.workload}%</p>
                  <p className="text-sm text-gray-600">Charge travail</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Compétences</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Missions actuelles</h4>
                <div className="space-y-2">
                  {selectedMember.currentMissions.map((mission, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">{mission}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                  Fermer
                </Button>
                <Button>
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Modal d'invitation */}
        <Modal
          isOpen={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
          title="Inviter un nouveau membre"
        >
          <div className="space-y-4">
            <p className="text-gray-600">Fonctionnalité d'invitation en cours de développement...</p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsInviteModalOpen(false)}>
                Annuler
              </Button>
              <Button onClick={() => setIsInviteModalOpen(false)}>
                Envoyer invitation
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ManagerTeamPage; 