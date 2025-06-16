import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Building2, ArrowLeft, Edit3, Settings, Users, Briefcase, 
  TrendingUp, DollarSign, Star, Calendar, Globe, MessageSquare,
  Plus, MoreHorizontal, BarChart3, FileText, Save, X,
  CheckCircle, Clock, AlertCircle, Target, Gamepad2, Package,
  ExternalLink, Twitter, Activity, Zap
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardBody } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';

interface Entity {
  id: string;
  name: string;
  type: 'game' | 'company' | 'project';
  logo: string;
  banner?: string;
  status: 'active' | 'maintenance' | 'development' | 'archived';
  description: string;
  activeMissions: number;
  monthlyBudget: number;
  totalRevenue: number;
  completedMissions: number;
  averageRating: number;
  createdAt: string;
  lastActivity: string;
  tags: string[];
  socialLinks?: {
    website?: string;
    twitter?: string;
    discord?: string;
  };
  stats: {
    growth: number;
    engagement: number;
    retention: number;
  };
}

interface Mission {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'pending';
  reward: number;
  participants: number;
  deadline: string;
  category: string;
}

const EntityManagementPage: React.FC = () => {
  const { entityId } = useParams();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'missions' | 'analytics' | 'settings'>('overview');

  // Mock data - In real app, fetch based on entityId
  const [entity, setEntity] = useState<Entity>({
    id: entityId || '1',
    name: 'Ashes of Mankind',
    type: 'game',
    logo: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop&crop=center',
    status: 'active',
    description: 'Un jeu de stratégie post-apocalyptique passionnant avec des mécaniques de survival et de construction immersives qui transporte les joueurs dans un monde dévasté.',
    activeMissions: 8,
    monthlyBudget: 12000,
    totalRevenue: 85000,
    completedMissions: 42,
    averageRating: 4.8,
    createdAt: '2023-09-15',
    lastActivity: '2024-01-25T14:30:00Z',
    tags: ['Strategy', 'Post-Apocalyptic', 'Survival', 'Multiplayer', 'Open World'],
    socialLinks: {
      website: 'https://ashesofmankind.com',
      twitter: '@ashesofmankind',
      discord: 'ashes-community'
    },
    stats: {
      growth: 15.2,
      engagement: 87.5,
      retention: 92.1
    }
  });

  const [missions] = useState<Mission[]>([
    {
      id: '1',
      title: 'Test de gameplay - Nouveau système de craft',
      status: 'active',
      reward: 150,
      participants: 12,
      deadline: '2024-02-15',
      category: 'Testing'
    },
    {
      id: '2',
      title: 'Feedback sur l\'équilibrage des armes',
      status: 'completed',
      reward: 100,
      participants: 8,
      deadline: '2024-01-20',
      category: 'Feedback'
    },
    {
      id: '3',
      title: 'Rapport de bugs - Version 2.1',
      status: 'pending',
      reward: 75,
      participants: 0,
      deadline: '2024-02-10',
      category: 'Bug Report'
    }
  ]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'bg-green-100 text-green-700', dot: 'bg-green-500', label: 'Actif', icon: CheckCircle };
      case 'development':
        return { color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500', label: 'Développement', icon: Zap };
      case 'maintenance':
        return { color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500', label: 'Maintenance', icon: Settings };
      case 'archived':
        return { color: 'bg-gray-100 text-gray-700', dot: 'bg-gray-500', label: 'Archivé', icon: Package };
      default:
        return { color: 'bg-gray-100 text-gray-700', dot: 'bg-gray-500', label: 'Inconnu', icon: AlertCircle };
    }
  };

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'game':
        return { icon: Gamepad2, label: 'Jeu', color: 'text-purple-600' };
      case 'company':
        return { icon: Building2, label: 'Entreprise', color: 'text-blue-600' };
      case 'project':
        return { icon: Target, label: 'Projet', color: 'text-green-600' };
      default:
        return { icon: Package, label: 'Autre', color: 'text-gray-600' };
    }
  };

  const getMissionStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'bg-green-100 text-green-700', label: 'Active' };
      case 'completed':
        return { color: 'bg-blue-100 text-blue-700', label: 'Terminée' };
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-700', label: 'En attente' };
      default:
        return { color: 'bg-gray-100 text-gray-700', label: 'Inconnue' };
    }
  };

  const statusConfig = getStatusConfig(entity.status);
  const typeConfig = getTypeConfig(entity.type);
  const StatusIcon = statusConfig.icon;
  const TypeIcon = typeConfig.icon;

  const handleSave = () => {
    setIsEditMode(false);
    // In real app, save to backend
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Missions actives</p>
                <p className="text-3xl font-bold text-blue-900">{entity.activeMissions}</p>
              </div>
              <Briefcase className="w-8 h-8 text-blue-500" />
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +2 cette semaine
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Missions complétées</p>
                <p className="text-3xl font-bold text-green-900">{entity.completedMissions}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <Activity className="w-4 h-4 mr-1" />
              Taux: 84%
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Budget mensuel</p>
                <p className="text-3xl font-bold text-purple-900">{(entity.monthlyBudget / 1000).toFixed(1)}k€</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-500" />
            </div>
            <div className="mt-4 flex items-center text-sm text-purple-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +{entity.stats.growth}%
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Note moyenne</p>
                <p className="text-3xl font-bold text-yellow-900">{entity.averageRating}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="mt-4 flex items-center text-sm text-yellow-600">
              <Star className="w-4 h-4 mr-1 fill-current" />
              Excellent
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Croissance</span>
                  <span>{entity.stats.growth}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${Math.min(entity.stats.growth * 2, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Engagement</span>
                  <span>{entity.stats.engagement}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${entity.stats.engagement}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Rétention</span>
                  <span>{entity.stats.retention}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ width: `${entity.stats.retention}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Liens sociaux</h3>
            <div className="space-y-3">
              {entity.socialLinks?.website && (
                <a 
                  href={entity.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-900">Site officiel</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </a>
              )}
              {entity.socialLinks?.twitter && (
                <a 
                  href={`https://twitter.com/${entity.socialLinks.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-900">{entity.socialLinks.twitter}</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </a>
              )}
              {entity.socialLinks?.discord && (
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                  <MessageSquare className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-900">{entity.socialLinks.discord}</span>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );

  const renderMissions = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Missions ({missions.length})</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle mission
        </Button>
      </div>

      <div className="space-y-4">
        {missions.map((mission) => {
          const missionStatus = getMissionStatusConfig(mission.status);
          return (
            <Card key={mission.id} className="hover:shadow-md transition-shadow">
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{mission.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${missionStatus.color}`}>
                        {missionStatus.label}
                      </span>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {mission.reward} UOS
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {mission.participants} participants
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(mission.deadline).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        {mission.category}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/manager-entities')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux entités
          </Button>
        </div>

        {/* Header avec banner */}
        <div className="mb-8">
          <Card className="overflow-hidden">
            <div className="relative">
              {entity.banner && (
                <img
                  src={entity.banner}
                  alt={entity.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 flex items-end space-x-4">
                <img
                  src={entity.logo}
                  alt={entity.name}
                  className="w-20 h-20 rounded-xl border-4 border-white object-cover"
                />
                <div className="text-white">
                  <h1 className="text-3xl font-bold">{entity.name}</h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <TypeIcon className="w-5 h-5" />
                    <span>{typeConfig.label}</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusConfig.label}
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute top-6 right-6">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditMode(!isEditMode)}>
                    <Edit3 className="w-4 h-4 mr-2" />
                    {isEditMode ? 'Annuler' : 'Modifier'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setIsSettingsOpen(true)}>
                    <Settings className="w-4 h-4 mr-2" />
                    Paramètres
                  </Button>
                </div>
              </div>
            </div>
            
            <CardBody className="p-6">
              {isEditMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={entity.description}
                      onChange={(e) => setEntity({ ...entity, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Sauvegarder
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditMode(false)}>
                      <X className="w-4 h-4 mr-2" />
                      Annuler
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">{entity.description}</p>
              )}
              
              <div className="flex flex-wrap gap-2 mt-4">
                {entity.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Navigation des onglets */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Vue d'ensemble
              </button>
              <button
                onClick={() => setActiveTab('missions')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'missions'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Briefcase className="w-4 h-4 inline mr-2" />
                Missions
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'analytics'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <TrendingUp className="w-4 h-4 inline mr-2" />
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'settings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Settings className="w-4 h-4 inline mr-2" />
                Paramètres
              </button>
            </nav>
          </div>
        </div>

        {/* Contenu des onglets */}
        <div>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'missions' && renderMissions()}
          {activeTab === 'analytics' && (
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
              <p className="text-gray-600">Module d'analytics en cours de développement</p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Paramètres</h3>
              <p className="text-gray-600">Paramètres avancés de l'entité</p>
            </div>
          )}
        </div>

        {/* Modal paramètres */}
        <Modal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          title="Paramètres de l'entité"
        >
          <div className="space-y-4">
            <p className="text-gray-600">Configuration avancée de l'entité en cours de développement...</p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                Annuler
              </Button>
              <Button onClick={() => setIsSettingsOpen(false)}>
                Sauvegarder
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default EntityManagementPage; 