import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Calendar, Users, DollarSign, MapPin, Clock, AlertTriangle, Filter, Search, BarChart3, TrendingUp, Target, Zap, Briefcase } from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { Textarea } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';

interface Mission {
  id: string;
  title: string;
  description: string;
  reward: number;
  location: string;
  duration: string;
  maxCandidates: number;
  currentCandidates: number;
  status: 'open' | 'closed' | 'completed';
  createdAt: string;
  category: string;
}

const ManageMissionsPage: React.FC = () => {
  const { user } = useAuth();
  
  // Protection d'accès : seuls les administrateurs et gestionnaires peuvent accéder à cette page
  if (!user || (user.role !== 'admin' && user.role !== 'manager')) {
    return <Navigate to="/" replace />;
  }

  const [missions, setMissions] = useState<Mission[]>([
    {
      id: '1',
      title: 'Développement d\'une application mobile',
      description: 'Nous recherchons un développeur expérimenté pour créer une application mobile innovante.',
      reward: 500,
      location: 'Remote',
      duration: '2 semaines',
      maxCandidates: 5,
      currentCandidates: 3,
      status: 'open',
      createdAt: '2024-01-15',
      category: 'Développement'
    },
    {
      id: '2',
      title: 'Design UI/UX pour plateforme Web3',
      description: 'Création d\'une interface utilisateur moderne et intuitive pour notre plateforme.',
      reward: 750,
      location: 'Paris',
      duration: '3 semaines',
      maxCandidates: 3,
      currentCandidates: 1,
      status: 'open',
      createdAt: '2024-01-20',
      category: 'Design'
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reward: '',
    location: '',
    duration: '',
    maxCandidates: '',
    category: ''
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      reward: '',
      location: '',
      duration: '',
      maxCandidates: '',
      category: ''
    });
  };

  const handleCreateMission = () => {
    const newMission: Mission = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      reward: parseInt(formData.reward),
      location: formData.location,
      duration: formData.duration,
      maxCandidates: parseInt(formData.maxCandidates),
      currentCandidates: 0,
      status: 'open',
      createdAt: new Date().toISOString().split('T')[0],
      category: formData.category
    };

    setMissions([...missions, newMission]);
    setIsCreateModalOpen(false);
    resetForm();
  };

  const handleEditMission = () => {
    if (!selectedMission) return;

    const updatedMissions = missions.map(mission =>
      mission.id === selectedMission.id
        ? {
            ...mission,
            title: formData.title,
            description: formData.description,
            reward: parseInt(formData.reward),
            location: formData.location,
            duration: formData.duration,
            maxCandidates: parseInt(formData.maxCandidates),
            category: formData.category
          }
        : mission
    );

    setMissions(updatedMissions);
    setIsEditModalOpen(false);
    setSelectedMission(null);
    resetForm();
  };

  const handleDeleteMission = () => {
    if (!selectedMission) return;

    const updatedMissions = missions.filter(mission => mission.id !== selectedMission.id);
    setMissions(updatedMissions);
    setIsDeleteModalOpen(false);
    setSelectedMission(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsCreateModalOpen(true);
  };

  const openEditModal = (mission: Mission) => {
    setSelectedMission(mission);
    setFormData({
      title: mission.title,
      description: mission.description,
      reward: mission.reward.toString(),
      location: mission.location,
      duration: mission.duration,
      maxCandidates: mission.maxCandidates.toString(),
      category: mission.category
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (mission: Mission) => {
    setSelectedMission(mission);
    setIsDeleteModalOpen(true);
  };

  const openViewModal = (mission: Mission) => {
    setSelectedMission(mission);
    setIsViewModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-600';
      case 'closed':
        return 'bg-red-100 text-red-600';
      case 'completed':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Ouverte';
      case 'closed':
        return 'Fermée';
      case 'completed':
        return 'Terminée';
      default:
        return 'Inconnue';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header moderne */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Gestion des missions
                  </h1>
                  <p className="text-gray-600">
                    Créez et gérez vos missions ({missions.length} mission{missions.length > 1 ? 's' : ''})
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Statistiques
                </Button>
                <Button onClick={openCreateModal} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle mission
                </Button>
              </div>
            </div>

            {/* Recherche et filtres dans le header */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une mission..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div className="flex items-center space-x-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="all">Tous les statuts</option>
                  <option value="open">Ouverte</option>
                  <option value="closed">Fermée</option>
                  <option value="completed">Terminée</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="all">Toutes catégories</option>
                  <option value="dev">Développement</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                </select>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Total missions</p>
                  <p className="text-2xl font-bold text-gray-900">{missions.length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Missions ouvertes</p>
                  <p className="text-2xl font-bold text-green-600">
                    {missions.filter(m => m.status === 'open').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Candidats totaux</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {missions.reduce((sum, m) => sum + m.currentCandidates, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Récompenses totales</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {missions.reduce((sum, m) => sum + m.reward, 0)} UOS
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des missions avec design moderne */}
        <Card className="card-hover">
          <CardHeader className="border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Mes missions</h2>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-gray-200">
              {missions.map((mission) => (
                <div key={mission.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg">{mission.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(mission.status)}`}>
                          {getStatusText(mission.status)}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{mission.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(mission.createdAt).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          {mission.currentCandidates}/{mission.maxCandidates} candidats
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-2" />
                          <span className="font-medium text-primary-600">{mission.reward} UOS</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {mission.location}
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-3 space-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {mission.duration}
                        </div>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {mission.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => openViewModal(mission)}
                        className="hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => openEditModal(mission)}
                        className="hover:bg-yellow-50 hover:text-yellow-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => openDeleteModal(mission)}
                        className="hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {missions.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-lg font-medium mb-2">Aucune mission créée</p>
                  <p className="mb-4">Commencez par créer votre première mission.</p>
                  <Button onClick={openCreateModal} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Créer votre première mission
                  </Button>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Modal de création */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Créer une nouvelle mission"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Titre de la mission"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Développement d'une application"
              required
            />
            <Input
              label="Catégorie"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Ex: Développement, Design, Marketing"
              required
            />
          </div>

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Décrivez en détail la mission..."
            rows={4}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Récompense (UOS)"
              type="number"
              value={formData.reward}
              onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
              placeholder="500"
              required
            />
            <Input
              label="Lieu"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Paris, Remote..."
              required
            />
            <Input
              label="Durée"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="2 semaines"
              required
            />
          </div>

          <Input
            label="Nombre maximum de candidats"
            type="number"
            value={formData.maxCandidates}
            onChange={(e) => setFormData({ ...formData, maxCandidates: e.target.value })}
            placeholder="5"
            required
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsCreateModalOpen(false)}
            >
              Annuler
            </Button>
            <Button 
              onClick={handleCreateMission}
              disabled={!formData.title || !formData.description || !formData.reward}
            >
              Créer la mission
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal d'édition */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Modifier la mission"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Titre de la mission"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Développement d'une application"
              required
            />
            <Input
              label="Catégorie"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Ex: Développement, Design, Marketing"
              required
            />
          </div>

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Décrivez en détail la mission..."
            rows={4}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Récompense (UOS)"
              type="number"
              value={formData.reward}
              onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
              placeholder="500"
              required
            />
            <Input
              label="Lieu"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Paris, Remote..."
              required
            />
            <Input
              label="Durée"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="2 semaines"
              required
            />
          </div>

          <Input
            label="Nombre maximum de candidats"
            type="number"
            value={formData.maxCandidates}
            onChange={(e) => setFormData({ ...formData, maxCandidates: e.target.value })}
            placeholder="5"
            required
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsEditModalOpen(false)}
            >
              Annuler
            </Button>
            <Button 
              onClick={handleEditMission}
              disabled={!formData.title || !formData.description || !formData.reward}
            >
              Sauvegarder
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal de suppression */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Supprimer la mission"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-red-800">Attention !</p>
              <p className="text-sm text-red-600">Cette action est irréversible.</p>
            </div>
          </div>
          
          {selectedMission && (
            <div>
              <p className="text-gray-700 mb-2">
                Êtes-vous sûr de vouloir supprimer la mission :
              </p>
              <p className="font-semibold text-gray-900">"{selectedMission.title}"</p>
              <p className="text-sm text-gray-500 mt-2">
                {selectedMission.currentCandidates} candidat{selectedMission.currentCandidates > 1 ? 's' : ''} 
                {selectedMission.currentCandidates > 0 ? ' sera' + (selectedMission.currentCandidates > 1 ? 'nt' : '') + ' affecté' + (selectedMission.currentCandidates > 1 ? 's' : '') : ''}
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Annuler
            </Button>
            <Button 
              onClick={handleDeleteMission}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Supprimer définitivement
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal de visualisation */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Détails de la mission"
        size="lg"
      >
        {selectedMission && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedMission.title}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedMission.status)}`}>
                  {getStatusText(selectedMission.status)}
                </span>
              </div>
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {selectedMission.category}
              </span>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{selectedMission.description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Récompense</h4>
                <div className="flex items-center text-primary-600 font-semibold">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {selectedMission.reward} UOS
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Lieu</h4>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {selectedMission.location}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Durée</h4>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {selectedMission.duration}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Candidats</h4>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  {selectedMission.currentCandidates}/{selectedMission.maxCandidates}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-1">Date de création</h4>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(selectedMission.createdAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsViewModalOpen(false)}
              >
                Fermer
              </Button>
              <Button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  openEditModal(selectedMission);
                }}
              >
                <Edit className="w-4 h-4 mr-2" />
                Modifier
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManageMissionsPage; 