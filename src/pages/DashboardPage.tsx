import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Eye,
  UserPlus,
  Target,
  Award,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Zap,
  Star,
  Filter,
  MoreHorizontal,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  pendingUsers: number;
  totalMissions: number;
  activeMissions: number;
  completedMissions: number;
  totalEarnings: number;
  monthlyGrowth: number;
}

interface RecentRequest {
  id: string;
  type: 'user_registration' | 'mission_submission' | 'payment_request';
  user: {
    name: string;
    email: string;
    role?: string;
  };
  title: string;
  description: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
}

interface MissionOverview {
  id: string;
  title: string;
  category: string;
  reward: number;
  applicants: number;
  status: 'active' | 'completed' | 'draft';
  deadline: string;
  progress: number;
}

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentRequests, setRecentRequests] = useState<RecentRequest[]>([]);
  const [missionOverview, setMissionOverview] = useState<MissionOverview[]>([]);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5);

  // Rediriger les gestionnaires vers leur dashboard dédié
  useEffect(() => {
    if (user?.role === 'manager') {
      setRedirecting(true);
      navigate('/manager-dashboard', { replace: true });
      return;
    }
  }, [user, navigate]);

  // Afficher un écran de chargement pendant la redirection
  if (redirecting || user?.role === 'manager') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirection vers votre dashboard...</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      
      // Simulation de chargement des données (réduit pour améliorer les performances)
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Données simulées
      setStats({
        totalUsers: 1247,
        activeUsers: 892,
        pendingUsers: 23,
        totalMissions: 156,
        activeMissions: 34,
        completedMissions: 122,
        totalEarnings: 45680,
        monthlyGrowth: 12.5
      });

      setRecentRequests([
        {
          id: '1',
          type: 'user_registration',
          user: { name: 'Marie Dubois', email: 'marie.dubois@example.com', role: 'manager' },
          title: 'Demande de compte gestionnaire',
          description: 'Nouvelle demande d\'inscription en tant que gestionnaire',
          createdAt: '2024-01-25T10:30:00Z',
          status: 'pending',
          priority: 'high'
        },
        {
          id: '2',
          type: 'mission_submission',
          user: { name: 'Pierre Martin', email: 'pierre.martin@example.com' },
          title: 'Soumission mission "App Mobile Ultra"',
          description: 'Livrable soumis pour validation',
          createdAt: '2024-01-25T09:15:00Z',
          status: 'pending',
          priority: 'medium'
        },
        {
          id: '3',
          type: 'payment_request',
          user: { name: 'Sophie Bernard', email: 'sophie.bernard@example.com' },
          title: 'Demande de paiement - 500 UOS',
          description: 'Paiement pour mission "Design UI/UX"',
          createdAt: '2024-01-25T08:45:00Z',
          status: 'approved',
          priority: 'low'
        },
        {
          id: '4',
          type: 'user_registration',
          user: { name: 'Thomas Petit', email: 'thomas.petit@example.com', role: 'admin' },
          title: 'Demande de compte administrateur',
          description: 'Demande d\'élévation de privilèges',
          createdAt: '2024-01-24T16:20:00Z',
          status: 'pending',
          priority: 'high'
        },
        {
          id: '5',
          type: 'mission_submission',
          user: { name: 'Julie Moreau', email: 'julie.moreau@example.com' },
          title: 'Soumission mission "Design Web3"',
          description: 'Interface utilisateur terminée',
          createdAt: '2024-01-24T14:20:00Z',
          status: 'approved',
          priority: 'medium'
        },
        {
          id: '6',
          type: 'payment_request',
          user: { name: 'Lucas Durand', email: 'lucas.durand@example.com' },
          title: 'Demande de paiement - 800 UOS',
          description: 'Paiement pour mission "Audit Smart Contract"',
          createdAt: '2024-01-24T11:30:00Z',
          status: 'pending',
          priority: 'high'
        },
        {
          id: '7',
          type: 'user_registration',
          user: { name: 'Emma Leroy', email: 'emma.leroy@example.com', role: 'user' },
          title: 'Nouvelle inscription utilisateur',
          description: 'Demande d\'inscription standard',
          createdAt: '2024-01-24T09:45:00Z',
          status: 'approved',
          priority: 'low'
        },
        {
          id: '8',
          type: 'mission_submission',
          user: { name: 'Antoine Roux', email: 'antoine.roux@example.com' },
          title: 'Soumission mission "Marketing Campaign"',
          description: 'Campagne publicitaire finalisée',
          createdAt: '2024-01-23T16:15:00Z',
          status: 'pending',
          priority: 'medium'
        }
      ]);

      setMissionOverview([
        {
          id: '1',
          title: 'Développement App Mobile Ultra',
          category: 'Développement',
          reward: 1500,
          applicants: 12,
          status: 'active',
          deadline: '2024-02-15',
          progress: 65
        },
        {
          id: '2',
          title: 'Design Interface Web3',
          category: 'Design',
          reward: 800,
          applicants: 8,
          status: 'active',
          deadline: '2024-02-10',
          progress: 30
        },
        {
          id: '3',
          title: 'Audit Smart Contracts',
          category: 'Blockchain',
          reward: 2000,
          applicants: 5,
          status: 'active',
          deadline: '2024-02-20',
          progress: 15
        },
        {
          id: '4',
          title: 'Campagne Marketing',
          category: 'Marketing',
          reward: 600,
          applicants: 15,
          status: 'completed',
          deadline: '2024-01-20',
          progress: 100
        }
      ]);

      setLoading(false);
    };

    loadDashboardData();
  }, []);

  const getRequestTypeConfig = (type: string) => {
    switch (type) {
      case 'user_registration':
        return {
          icon: UserPlus,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          label: 'Inscription'
        };
      case 'mission_submission':
        return {
          icon: Target,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          label: 'Mission'
        };
      case 'payment_request':
        return {
          icon: DollarSign,
          color: 'text-purple-600',
          bgColor: 'bg-purple-100',
          label: 'Paiement'
        };
      default:
        return {
          icon: Activity,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          label: 'Autre'
        };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          label: 'En attente',
          color: 'bg-yellow-100 text-yellow-700',
          dot: 'bg-yellow-500'
        };
      case 'approved':
        return {
          label: 'Approuvé',
          color: 'bg-green-100 text-green-700',
          dot: 'bg-green-500'
        };
      case 'rejected':
        return {
          label: 'Rejeté',
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

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return { color: 'text-red-600', label: 'Haute' };
      case 'medium':
        return { color: 'text-yellow-600', label: 'Moyenne' };
      case 'low':
        return { color: 'text-green-600', label: 'Basse' };
      default:
        return { color: 'text-gray-600', label: 'Normale' };
    }
  };

  const getMissionStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          label: 'Active',
          color: 'bg-green-100 text-green-700',
          dot: 'bg-green-500'
        };
      case 'completed':
        return {
          label: 'Terminée',
          color: 'bg-blue-100 text-blue-700',
          dot: 'bg-blue-500'
        };
      case 'draft':
        return {
          label: 'Brouillon',
          color: 'bg-gray-100 text-gray-700',
          dot: 'bg-gray-500'
        };
      default:
        return {
          label: 'Inconnue',
          color: 'bg-gray-100 text-gray-700',
          dot: 'bg-gray-500'
        };
    }
  };

  // Logique de pagination
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = recentRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(recentRequests.length / requestsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getRequestLink = (request: RecentRequest) => {
    switch (request.type) {
      case 'user_registration':
        return '/manage-users';
      case 'mission_submission':
        return `/missions/${request.id}`;
      case 'payment_request':
        return '/payments';
      default:
        return '#';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Tableau de bord administrateur
              </h1>
              <p className="text-gray-600">
                                 Bienvenue, voici un aperçu de votre plateforme
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="text-gray-600">
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
              <Button className="bg-primary-600 hover:bg-primary-700">
                <Activity className="w-4 h-4 mr-2" />
                Rapport détaillé
              </Button>
            </div>
          </div>
        </div>

        {/* Statistiques principales */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="card-hover">
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Contributeurs totaux</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">+{stats.monthlyGrowth}%</span>
                      <span className="text-sm text-gray-500 ml-1">ce mois</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="card-hover">
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Missions actives</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeMissions}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-600">{stats.completedMissions} terminées</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="card-hover">
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Revenus totaux</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalEarnings.toLocaleString()} UOS</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">Croissance stable</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="card-hover">
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Demandes en attente</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.pendingUsers}</p>
                    <div className="flex items-center mt-2">
                      <Clock className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-yellow-600 font-medium">Nécessite attention</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Demandes récentes */}
          <div className="lg:col-span-2">
            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-500" />
                    Demandes récentes
                  </h2>
                  <Link to="/manage-users">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Voir tout
                    </Button>
                  </Link>
                </div>
              </CardHeader>
                             <CardBody className="p-6">
                 <div className="space-y-4">
                   {currentRequests.map((request) => {
                     const typeConfig = getRequestTypeConfig(request.type);
                     const statusConfig = getStatusConfig(request.status);
                     const priorityConfig = getPriorityConfig(request.priority);
                     
                     return (
                       <Link
                         key={request.id}
                         to={getRequestLink(request)}
                         className="block"
                       >
                         <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                           <div className={`w-10 h-10 ${typeConfig.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                             {React.createElement(typeConfig.icon, {
                               className: `w-5 h-5 ${typeConfig.color}`
                             })}
                           </div>
                           
                           <div className="flex-1 min-w-0">
                             <div className="flex items-center justify-between mb-1">
                               <h3 className="font-semibold text-gray-900 truncate group-hover:text-primary-600 transition-colors">
                                 {request.title}
                               </h3>
                               <div className="flex items-center space-x-2">
                                 <span className={`text-xs font-medium ${priorityConfig.color}`}>
                                   {priorityConfig.label}
                                 </span>
                                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                                   {statusConfig.label}
                                 </span>
                                 <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                               </div>
                             </div>
                             
                             <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                             
                             <div className="flex items-center justify-between text-xs text-gray-500">
                               <span>{request.user.name} • {request.user.email}</span>
                               <span>{new Date(request.createdAt).toLocaleDateString('fr-FR')}</span>
                             </div>
                           </div>
                         </div>
                       </Link>
                     );
                   })}
                 </div>

                 {/* Pagination */}
                 {totalPages > 1 && (
                   <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                     <div className="text-sm text-gray-600">
                       Affichage {indexOfFirstRequest + 1}-{Math.min(indexOfLastRequest, recentRequests.length)} sur {recentRequests.length} demandes
                     </div>
                     <div className="flex items-center space-x-2">
                       <Button
                         variant="outline"
                         size="sm"
                         onClick={() => handlePageChange(currentPage - 1)}
                         disabled={currentPage === 1}
                         className="p-2"
                       >
                         <ChevronLeft className="w-4 h-4" />
                       </Button>
                       
                       {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                         <Button
                           key={page}
                           variant={currentPage === page ? "primary" : "outline"}
                           size="sm"
                           onClick={() => handlePageChange(page)}
                           className="px-3 py-2"
                         >
                           {page}
                         </Button>
                       ))}
                       
                       <Button
                         variant="outline"
                         size="sm"
                         onClick={() => handlePageChange(currentPage + 1)}
                         disabled={currentPage === totalPages}
                         className="p-2"
                       >
                         <ChevronRight className="w-4 h-4" />
                       </Button>
                     </div>
                   </div>
                 )}
               </CardBody>
            </Card>
          </div>

          {/* Aperçu des missions */}
          <div>
            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-green-500" />
                    Missions en cours
                  </h2>
                  <Link to="/manage-missions">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Gérer
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardBody className="p-6">
                <div className="space-y-4">
                  {missionOverview.slice(0, 4).map((mission) => {
                    const statusConfig = getMissionStatusConfig(mission.status);
                    
                    return (
                      <div
                        key={mission.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 text-sm truncate">
                            {mission.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                            {statusConfig.label}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                          <span className="px-2 py-1 bg-gray-100 rounded">
                            {mission.category}
                          </span>
                          <span className="font-medium text-primary-600">
                            {mission.reward} UOS
                          </span>
                        </div>
                        
                        {mission.status === 'active' && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                              <span>Progression</span>
                              <span>{mission.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${mission.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{mission.applicants} candidats</span>
                          <span>Échéance: {new Date(mission.deadline).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="mt-8">
          <Card className="card-hover">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                Actions rapides
              </h2>
            </CardHeader>
            <CardBody className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/manage-missions">
                  <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all cursor-pointer group">
                    <div className="text-center">
                      <Briefcase className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">
                        Créer une mission
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Publier une nouvelle mission
                      </p>
                    </div>
                  </div>
                </Link>

                <Link to="/manage-users">
                  <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all cursor-pointer group">
                    <div className="text-center">
                      <Users className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">
                                                  Gérer les contributeurs
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Approuver les demandes
                      </p>
                    </div>
                  </div>
                </Link>

                <Link to="/payments">
                  <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all cursor-pointer group">
                    <div className="text-center">
                      <DollarSign className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">
                        Gérer les paiements
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Valider les paiements
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 