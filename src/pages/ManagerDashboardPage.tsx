import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
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
  ChevronRight,
  BarChart3,
  Gamepad2,
  Trophy,
  Coins,
  PlusCircle,
  Settings,
  ChevronDown,
  MessageSquare,
  Bell,
  FileText,
  Shield
} from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

interface Entity {
  id: string;
  name: string;
  type: 'game' | 'company' | 'project';
  logo: string;
  status: 'active' | 'maintenance' | 'development';
  activeMissions: number;
  totalMembers: number;
  monthlyBudget: number;
  description: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'active' | 'busy' | 'offline';
  completedTasks: number;
  currentMission?: string;
}

interface ManagerStats {
  totalEntities: number;
  activeMissions: number;
  teamMembers: number;
  monthlyBudget: number;
  completedMissions: number;
  averageRating: number;
  pendingApprovals: number;
  totalRevenue: number;
}

interface RecentActivity {
  id: string;
  type: 'mission_completed' | 'member_joined' | 'approval_needed' | 'payment_processed';
  title: string;
  description: string;
  timestamp: string;
  entityName?: string;
  priority: 'low' | 'medium' | 'high';
}

const ManagerDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<ManagerStats | null>(null);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadManagerData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Données simulées pour le gestionnaire
      setStats({
        totalEntities: 3,
        activeMissions: 12,
        teamMembers: 24,
        monthlyBudget: 15000,
        completedMissions: 87,
        averageRating: 4.8,
        pendingApprovals: 5,
        totalRevenue: 145000
      });

      setEntities([
        {
          id: '1',
          name: 'Ashes of Mankind',
          type: 'game',
          logo: '/avatar_jc.jpeg',
          status: 'active',
          activeMissions: 5,
          totalMembers: 12,
          monthlyBudget: 8000,
          description: 'Jeu de stratégie post-apocalyptique'
        },
        {
          id: '2',
          name: 'Metahoof',
          type: 'game',
          logo: '/bals.jpg',
          status: 'development',
          activeMissions: 4,
          totalMembers: 8,
          monthlyBudget: 5000,
          description: 'Plateforme de courses de chevaux virtuels'
        },
        {
          id: '3',
          name: 'Ultra Studios',
          type: 'company',
          logo: '/logo_UT_icon-2.png',
          status: 'active',
          activeMissions: 3,
          totalMembers: 4,
          monthlyBudget: 2000,
          description: 'Studio de développement interne'
        }
      ]);

      setTeamMembers([
        {
          id: '1',
          name: 'Sophie Bernard',
          role: 'Lead Developer',
          avatar: '/avatar_jc.jpeg',
          status: 'active',
          completedTasks: 23,
          currentMission: 'Développement App Mobile'
        },
        {
          id: '2',
          name: 'Thomas Petit',
          role: 'UI/UX Designer',
          avatar: '/bals.jpg',
          status: 'busy',
          completedTasks: 18,
          currentMission: 'Design Interface Web3'
        },
        {
          id: '3',
          name: 'Marie Dubois',
          role: 'Game Designer',
          avatar: '/garstud.jpg',
          status: 'active',
          completedTasks: 31,
          currentMission: 'Balancing Gameplay'
        },
        {
          id: '4',
          name: 'Pierre Martin',
          role: 'Backend Developer',
          avatar: '/valentin.jpg',
          status: 'offline',
          completedTasks: 15
        }
      ]);

      setRecentActivities([
        {
          id: '1',
          type: 'mission_completed',
          title: 'Mission "Audit Smart Contract" terminée',
          description: 'L\'audit de sécurité a été complété avec succès',
          timestamp: '2024-01-25T14:30:00Z',
          entityName: 'Ashes of Mankind',
          priority: 'high'
        },
        {
          id: '2',
          type: 'approval_needed',
          title: 'Validation requise pour paiement',
          description: 'Demande de paiement de 500 UOS en attente',
          timestamp: '2024-01-25T13:15:00Z',
          entityName: 'Metahoof',
          priority: 'medium'
        }
      ]);

      setLoading(false);
    };

    loadManagerData();
  }, []);

  const getEntityStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'bg-green-100 text-green-700', dot: 'bg-green-500', label: 'Actif' };
      case 'maintenance':
        return { color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500', label: 'Maintenance' };
      case 'development':
        return { color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500', label: 'Développement' };
      default:
        return { color: 'bg-gray-100 text-gray-700', dot: 'bg-gray-500', label: 'Inconnu' };
    }
  };

  const getMemberStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'bg-green-500', label: 'En ligne' };
      case 'busy':
        return { color: 'bg-red-500', label: 'Occupé' };
      case 'offline':
        return { color: 'bg-gray-400', label: 'Hors ligne' };
      default:
        return { color: 'bg-gray-400', label: 'Inconnu' };
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'mission_completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'approval_needed':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'member_joined':
        return <UserPlus className="w-5 h-5 text-blue-600" />;
      case 'payment_processed':
        return <DollarSign className="w-5 h-5 text-emerald-600" />;
      default:
        return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-orange-500';
      case 'low':
        return 'border-l-blue-500';
      default:
        return 'border-l-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de votre dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header avec informations du gestionnaire */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Bienvenue, {user?.name} 👋
                  </h1>
                  <p className="text-gray-600">Gestionnaire d'entités Ultra</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Paramètres
                </Button>
              </div>
            </div>

            {/* Stats rapides */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <Building2 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stats?.totalEntities}</p>
                <p className="text-sm text-gray-600">Entités gérées</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
                <Briefcase className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stats?.activeMissions}</p>
                <p className="text-sm text-gray-600">Missions actives</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stats?.teamMembers}</p>
                <p className="text-sm text-gray-600">Membres d'équipe</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stats?.monthlyBudget.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Budget mensuel</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grille principale */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mes entités */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Mes entités</h2>
                  </div>
                  <Button variant="outline" size="sm">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Nouvelle entité
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {entities.map((entity) => {
                    const statusConfig = getEntityStatusConfig(entity.status);
                    return (
                      <div key={entity.id} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <img
                              src={entity.logo}
                              alt={entity.name}
                              className="w-12 h-12 rounded-xl object-cover"
                            />
                            <div>
                              <h3 className="font-semibold text-gray-900">{entity.name}</h3>
                              <p className="text-sm text-gray-600">{entity.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${statusConfig.dot}`}></div>
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${statusConfig.color}`}>
                              {statusConfig.label}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-xl font-bold text-gray-900">{entity.activeMissions}</p>
                            <p className="text-xs text-gray-600">Missions actives</p>
                          </div>
                          <div>
                            <p className="text-xl font-bold text-gray-900">{entity.totalMembers}</p>
                            <p className="text-xs text-gray-600">Membres</p>
                          </div>
                          <div>
                            <p className="text-xl font-bold text-gray-900">{entity.monthlyBudget.toLocaleString()}</p>
                            <p className="text-xs text-gray-600">Budget/mois</p>
                          </div>
                        </div>

                        <div className="mt-4 flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            Voir détails
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Settings className="w-4 h-4 mr-2" />
                            Gérer
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>

            {/* Statistiques avancées */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Statistiques de performance</h2>
                </div>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Trophy className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stats?.completedMissions}</p>
                    <p className="text-sm text-gray-600">Missions complétées</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Star className="w-8 h-8 text-yellow-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stats?.averageRating}</p>
                    <p className="text-sm text-gray-600">Note moyenne</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-8 h-8 text-red-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stats?.pendingApprovals}</p>
                    <p className="text-sm text-gray-600">En attente</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Coins className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stats?.totalRevenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Revenus totaux</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Colonne secondaire - Actions rapides */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Actions rapides</h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  <Link to="/manage-missions">
                    <Button variant="outline" className="w-full justify-start">
                      <Briefcase className="w-4 h-4 mr-3" />
                      Gérer les missions
                    </Button>
                  </Link>

                  <Link to="/payments">
                    <Button variant="outline" className="w-full justify-start">
                      <DollarSign className="w-4 h-4 mr-3" />
                      Paiements
                    </Button>
                  </Link>
                  <Link to="/manager-reports">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-3" />
                      Rapports
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboardPage; 