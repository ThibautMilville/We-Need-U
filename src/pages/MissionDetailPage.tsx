import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Coins, 
  Clock, 
  MapPin,
  Star,
  Heart,
  Share2,
  Zap,
  CheckCircle,
  AlertCircle,
  User,
  Award,
  Target,
  Briefcase,
  MessageSquare,
  Send,
  Download,
  ExternalLink
} from 'lucide-react';
import { Mission } from '../types';
import { mockMissions } from '../data/mockData';
import Button from '../components/ui/Button';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import { getMissionImage } from '../utils/missionImages';
import { useAuth } from '../contexts/AuthContext';

const MissionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mission, setMission] = useState<Mission | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'deliverables'>('overview');
  const { user } = useAuth();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [motivation, setMotivation] = useState('');
  const [applyLoading, setApplyLoading] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  useEffect(() => {
    if (id) {
      const foundMission = mockMissions.find(m => m.id === id);
      setMission(foundMission || null);
    }
  }, [id]);

  if (!mission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Mission introuvable</h2>
          <p className="text-gray-600 mb-6">Cette mission n'existe pas ou a été supprimée.</p>
          <Button onClick={() => navigate('/missions')} variant="primary">
            Retour aux missions
          </Button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: Mission['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'from-green-400 to-emerald-500';
      case 'intermediate':
        return 'from-yellow-400 to-orange-500';
      case 'expert':
        return 'from-red-400 to-pink-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getDifficultyText = (difficulty: Mission['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'Débutant';
      case 'intermediate':
        return 'Intermédiaire';
      case 'expert':
        return 'Expert';
      default:
        return difficulty;
    }
  };

  const getStatusColor = (status: Mission['status']) => {
    switch (status) {
      case 'open':
        return 'from-green-400 to-emerald-500';
      case 'in_progress':
        return 'from-blue-400 to-indigo-500';
      case 'completed':
        return 'from-gray-400 to-gray-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getStatusText = (status: Mission['status']) => {
    switch (status) {
      case 'open':
        return 'Ouverte';
      case 'in_progress':
        return 'En cours';
      case 'completed':
        return 'Terminée';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={getMissionImage(mission.category, mission.title)}
          alt={mission.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-secondary-500/30" />
        
        {/* Navigation */}
        <div className="absolute top-6 left-6">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>

        {/* Actions */}
        <div className="absolute top-6 right-6 flex space-x-3">
          <Button
            onClick={() => setIsBookmarked(!isBookmarked)}
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 p-3"
          >
            <Heart className={`w-5 h-5 ${isBookmarked ? 'fill-current text-red-400' : ''}`} />
          </Button>
          <Button
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 p-3"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`px-4 py-2 bg-gradient-to-r ${getStatusColor(mission.status)} rounded-full shadow-lg`}>
              <span className="text-white text-sm font-bold">{getStatusText(mission.status)}</span>
            </div>
            <div className={`px-4 py-2 bg-gradient-to-r ${getDifficultyColor(mission.difficulty)} rounded-full shadow-lg`}>
              <span className="text-white text-sm font-bold">{getDifficultyText(mission.difficulty)}</span>
            </div>
            <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <span className="text-white text-sm font-bold">{mission.category}</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {mission.title}
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
            {mission.shortDescription}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-2xl">
              {[
                { id: 'overview', label: 'Vue d\'ensemble', icon: Target },
                { id: 'requirements', label: 'Prérequis', icon: CheckCircle },
                { id: 'deliverables', label: 'Livrables', icon: Briefcase }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all ${
                    activeTab === id
                      ? 'bg-white text-primary-600 shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <Card className="shadow-xl border-0 rounded-3xl overflow-hidden">
              <CardBody className="p-8">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Description détaillée</h3>
                      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        <p>{mission.description}</p>
                        <p className="mt-4">
                          Cette mission fait partie de notre écosystème Web3 gaming et vous permettra de développer 
                          vos compétences tout en contribuant à des projets innovants dans l'univers Ultra.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                        <div className="flex items-center space-x-3 mb-3">
                          <Clock className="w-6 h-6 text-blue-600" />
                          <h4 className="text-lg font-bold text-gray-900">Durée estimée</h4>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{mission.estimatedTime}</p>
                        <p className="text-sm text-gray-600 mt-1">Temps de travail estimé</p>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                        <div className="flex items-center space-x-3 mb-3">
                          <Users className="w-6 h-6 text-green-600" />
                          <h4 className="text-lg font-bold text-gray-900">Candidats</h4>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{mission.currentCandidates}/{mission.maxCandidates}</p>
                        <p className="text-sm text-gray-600 mt-1">Places disponibles</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'requirements' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Prérequis et compétences</h3>
                    <div className="space-y-4">
                      {mission.requirements.map((req, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{req}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Compétences recommandées</h4>
                      <div className="flex flex-wrap gap-3">
                        {mission.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 rounded-full border border-primary-200 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'deliverables' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Livrables attendus</h3>
                    {mission.deliverables && mission.deliverables.length > 0 ? (
                      <div className="space-y-4">
                        {mission.deliverables.map((deliverable, index) => (
                          <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                            <Briefcase className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{deliverable}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-500 italic">Aucun livrable précisé pour cette mission.</div>
                    )}
                    <div className="mt-8 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-6 h-6 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-2">Important</h4>
                          <p className="text-gray-700">
                            Tous les livrables doivent être soumis avant la deadline. 
                            Les fichiers doivent être au format spécifié et respecter les standards de qualité Ultra.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Reward Card */}
            <Card className="shadow-xl border-0 rounded-3xl overflow-hidden">
              <CardBody className="p-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Coins className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Récompense</h3>
                  <div className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">
                    {mission.reward.toLocaleString()} UOS
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    +{mission.bonusPercentage}% si paiement différé
                  </p>
                  
                  <div className="space-y-3">
                    {user ? (
                      <Button
                        className="w-full bg-gradient-to-r from-primary-500 to-secondary-600 hover:from-primary-600 hover:to-secondary-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 rounded-2xl py-3 font-bold"
                        onClick={() => setShowApplyModal(true)}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Candidater maintenant
                      </Button>
                    ) : (
                      <Button
                        className="w-full bg-gradient-to-r from-primary-500 to-secondary-600 hover:from-primary-600 hover:to-secondary-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 rounded-2xl py-3 font-bold"
                        onClick={() => navigate('/login')}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Se connecter ou s'inscrire pour postuler
                      </Button>
                    )}
                    <Button variant="outline" className="w-full rounded-2xl py-3">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Poser une question
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Mission Info */}
            <Card className="shadow-xl border-0 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Informations</h3>
              </CardHeader>
              <CardBody className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Deadline</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    {new Date(mission.deadline).toLocaleDateString('fr-FR')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Localisation</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">Remote</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Client</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">Ultra Gaming</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Note client</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-bold text-gray-900">4.9</span>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Similar Missions */}
            <Card className="shadow-xl border-0 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Missions similaires</h3>
              </CardHeader>
              <CardBody className="p-6 space-y-4">
                {mockMissions.filter(m => m.id !== mission.id && m.category === mission.category).slice(0, 3).map((similarMission) => (
                  <div key={similarMission.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <img
                      src={getMissionImage(similarMission.category, similarMission.title)}
                      alt={similarMission.title}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 truncate">{similarMission.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Coins className="w-3 h-3 text-yellow-500" />
                        <span className="text-xs font-bold text-gray-700">{similarMission.reward} UOS</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowApplyModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in-up" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setShowApplyModal(false)}>
              <span className="text-2xl">&times;</span>
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Candidater à cette mission</h2>
            <label className="block text-sm font-medium text-gray-700 mb-2">Explique tes motivations :</label>
            <textarea
              className="w-full border border-gray-300 rounded-xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={5}
              value={motivation}
              onChange={e => setMotivation(e.target.value)}
              placeholder="Décris pourquoi tu es le candidat idéal pour cette mission..."
            />
            <Button
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-600 text-white font-bold py-3 rounded-2xl mt-2"
              loading={applyLoading}
              disabled={!motivation.trim()}
              onClick={async () => {
                setApplyLoading(true);
                setTimeout(() => {
                  setApplyLoading(false);
                  setApplySuccess(true);
                  setShowApplyModal(false);
                  setMotivation('');
                }, 1200);
              }}
            >
              Envoyer ma candidature
            </Button>
            {applySuccess && (
              <div className="mt-4 text-green-600 font-semibold">Candidature envoyée avec succès !</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionDetailPage; 