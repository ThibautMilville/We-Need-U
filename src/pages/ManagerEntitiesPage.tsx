import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  Users,
  Briefcase,
  DollarSign,
  Settings,
  Eye,
  PlusCircle,
  Edit,
  Trash2,
  Calendar,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Target,
  Gamepad2,
  Globe,
  Package,
  Star,
  Filter,
  Search,
  MoreHorizontal,
  CheckCircle,
  AlertTriangle,
  Zap
} from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
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



const ManagerEntitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [entities, setEntities] = useState<Entity[]>([
            {
          id: '1',
          name: 'Ashes of Mankind',
          type: 'game',
          logo: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
          banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=300&fit=crop&crop=center',
          status: 'active',
          description: 'Un jeu de stratégie post-apocalyptique passionnant avec des mécaniques de survival et de construction immersives.',
          activeMissions: 8,
          monthlyBudget: 12000,
          totalRevenue: 85000,
          completedMissions: 42,
          averageRating: 4.8,
          createdAt: '2023-09-15',
          lastActivity: '2024-01-25T14:30:00Z',
          tags: ['Strategy', 'Post-Apocalyptic', 'Survival'],
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
        },
        {
          id: '2',
          name: 'Metahoof',
          type: 'game',
          logo: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center',
          banner: 'https://images.unsplash.com/photo-1574914629385-46448b767aec?w=800&h=300&fit=crop&crop=center',
          status: 'development',
          description: 'Plateforme de courses de chevaux virtuels avec NFTs et mécaniques play-to-earn révolutionnaires.',
          activeMissions: 6,
          monthlyBudget: 8500,
          totalRevenue: 45000,
          completedMissions: 28,
          averageRating: 4.5,
          createdAt: '2023-11-20',
          lastActivity: '2024-01-25T12:15:00Z',
          tags: ['Racing', 'NFT', 'Play-to-Earn'],
          socialLinks: {
            website: 'https://metahoof.io',
            twitter: '@metahoof',
            discord: 'metahoof-racing'
          },
          stats: {
            growth: 23.7,
            engagement: 76.3,
            retention: 89.4
          }
        },
        {
          id: '3',
          name: 'Ultra Studios',
          type: 'company',
          logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center',
          banner: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=300&fit=crop&crop=center',
          status: 'active',
          description: 'Studio de développement interne spécialisé dans les solutions blockchain et Web3 innovantes.',
          activeMissions: 4,
          monthlyBudget: 6000,
          totalRevenue: 32000,
          completedMissions: 18,
          averageRating: 4.9,
          createdAt: '2023-06-10',
          lastActivity: '2024-01-25T09:45:00Z',
          tags: ['Blockchain', 'Web3', 'Development'],
          socialLinks: {
            website: 'https://ultrastudios.dev'
          },
          stats: {
            growth: 8.3,
            engagement: 94.2,
            retention: 96.8
          }
        },
        {
          id: '4',
          name: 'Crypto Realms',
          type: 'game',
          logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=400&fit=crop&crop=center',
          banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=300&fit=crop&crop=center',
          status: 'development',
          description: 'MMORPG basé sur la blockchain avec des mécaniques de crafting et de trading uniques.',
          activeMissions: 12,
          monthlyBudget: 15000,
          totalRevenue: 125000,
          completedMissions: 67,
          averageRating: 4.6,
          createdAt: '2023-08-20',
          lastActivity: '2024-01-25T16:45:00Z',
          tags: ['MMORPG', 'Blockchain', 'Crafting'],
          socialLinks: {
            website: 'https://cryptorealms.io',
            twitter: '@cryptorealms',
            discord: 'cryptorealms-guild'
          },
          stats: {
            growth: 28.4,
            engagement: 91.2,
            retention: 88.7
          }
        },
        {
          id: '5',
          name: 'DeFi Paradise',
          type: 'project',
          logo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop&crop=center',
          banner: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&h=300&fit=crop&crop=center',
          status: 'active',
          description: 'Plateforme DeFi complète avec farming, staking et échange décentralisé.',
          activeMissions: 7,
          monthlyBudget: 9500,
          totalRevenue: 78000,
          completedMissions: 34,
          averageRating: 4.7,
          createdAt: '2023-10-05',
          lastActivity: '2024-01-25T11:20:00Z',
          tags: ['DeFi', 'Staking', 'DEX'],
          socialLinks: {
            website: 'https://defiparadise.finance',
            twitter: '@defiparadise'
          },
          stats: {
            growth: 19.8,
            engagement: 85.6,
            retention: 90.3
          }
        }
  ]);

  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState<'all' | 'game' | 'company' | 'project'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'development' | 'maintenance' | 'archived'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

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
        return { color: 'bg-gray-100 text-gray-700', dot: 'bg-gray-500', label: 'Inconnu', icon: AlertTriangle };
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

  const filteredEntities = entities.filter(entity => {
    const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || entity.type === filterType;
    const matchesStatus = filterStatus === 'all' || entity.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const openViewModal = (entity: Entity) => {
    setSelectedEntity(entity);
    setIsViewModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Building2 className="w-8 h-8 mr-3 text-blue-600" />
                Gestion des entités
              </h1>
              <p className="text-gray-600">
                Gérez vos entités et projets ({filteredEntities.length} entité{filteredEntities.length > 1 ? 's' : ''})
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={() => setIsCreateModalOpen(true)}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Nouvelle entité
              </Button>
            </div>
          </div>

          {/* Filtres et recherche */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Rechercher une entité..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Tous les types</option>
                  <option value="game">Jeux</option>
                  <option value="company">Entreprises</option>
                  <option value="project">Projets</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="active">Actif</option>
                  <option value="development">Développement</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="archived">Archivé</option>
                </select>

                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                  >
                    <BarChart3 className="w-4 h-4" />
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

        {/* Liste des entités */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEntities.map((entity) => {
              const statusConfig = getStatusConfig(entity.status);
              const typeConfig = getTypeConfig(entity.type);
              const StatusIcon = statusConfig.icon;
              const TypeIcon = typeConfig.icon;

              return (
                <Card key={entity.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    {entity.banner && (
                      <img
                        src={entity.banner}
                        alt={entity.name}
                        className="w-full h-32 object-cover"
                      />
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>
                  
                  <CardBody className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={entity.logo}
                          alt={entity.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{entity.name}</h3>
                          <div className="flex items-center text-sm text-gray-600">
                            <TypeIcon className={`w-4 h-4 mr-1 ${typeConfig.color}`} />
                            {typeConfig.label}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{entity.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-gray-900">{entity.activeMissions}</p>
                        <p className="text-xs text-gray-600">Missions actives</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">{entity.completedMissions}</p>
                        <p className="text-xs text-gray-600">Missions complétées</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-900">{entity.averageRating}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                        +{entity.stats.growth}%
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => openViewModal(entity)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Voir
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => navigate(`/manager-entities/${entity.id}`)}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Gérer
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEntities.map((entity) => {
              const statusConfig = getStatusConfig(entity.status);
              const typeConfig = getTypeConfig(entity.type);
              const StatusIcon = statusConfig.icon;
              const TypeIcon = typeConfig.icon;

              return (
                <Card key={entity.id} className="hover:shadow-md transition-shadow">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={entity.logo}
                          alt={entity.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="text-xl font-semibold text-gray-900">{entity.name}</h3>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusConfig.label}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <TypeIcon className={`w-4 h-4 mr-1 ${typeConfig.color}`} />
                            {typeConfig.label}
                          </div>
                          <p className="text-gray-600 max-w-2xl">{entity.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-8">
                        <div className="text-center">
                          <p className="text-xl font-bold text-gray-900">{entity.activeMissions}</p>
                          <p className="text-xs text-gray-600">Missions</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-bold text-gray-900">{entity.completedMissions}</p>
                          <p className="text-xs text-gray-600">Complétées</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-bold text-gray-900">{entity.monthlyBudget.toLocaleString()}</p>
                          <p className="text-xs text-gray-600">Budget/mois</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openViewModal(entity)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Voir
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/manager-entities/${entity.id}`)}
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            Gérer
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

        {filteredEntities.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune entité trouvée</h3>
            <p className="text-gray-600 mb-4">Essayez de modifier vos filtres ou créez une nouvelle entité.</p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Créer une entité
            </Button>
          </div>
        )}

        {/* Modal de création */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Créer une nouvelle entité"
        >
          <div className="space-y-4">
            <p className="text-gray-600">Fonctionnalité de création en cours de développement...</p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Annuler
              </Button>
              <Button onClick={() => setIsCreateModalOpen(false)}>
                Créer
              </Button>
            </div>
          </div>
        </Modal>

        {/* Modal de vue détaillée */}
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title={selectedEntity?.name || ''}
          size="lg"
        >
          {selectedEntity && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedEntity.logo}
                  alt={selectedEntity.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedEntity.name}</h3>
                  <p className="text-gray-600">{selectedEntity.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Briefcase className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-gray-900">{selectedEntity.activeMissions}</p>
                  <p className="text-sm text-gray-600">Missions actives</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-gray-900">{selectedEntity.completedMissions}</p>
                  <p className="text-sm text-gray-600">Missions complétées</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-gray-900">{selectedEntity.monthlyBudget.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Budget mensuel</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-gray-900">{selectedEntity.averageRating}</p>
                  <p className="text-sm text-gray-600">Note moyenne</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                  Fermer
                </Button>
                <Button onClick={() => navigate(`/manager-entities/${selectedEntity?.id}`)}>
                  <Settings className="w-4 h-4 mr-2" />
                  Gérer l'entité
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ManagerEntitiesPage; 