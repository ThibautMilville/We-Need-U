import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Wallet, 
  Settings,
  BarChart3,
  Shield,
  Bell,
  Eye,
  EyeOff,
  Save,
  X,
  Camera,
  Lock,
  Globe,
  Smartphone,
  Calendar,
  Award,
  Target,
  TrendingUp,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { useUltraWallet } from '../utils/ultraWallet';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  avatar?: string;
  joinedAt: string;
  lastLogin: string;
}

interface UserStats {
  missionsCompleted: number;
  totalEarnings: number;
  successRate: number;
  averageRating: number;
  badges: number;
  currentStreak: number;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  missionUpdates: boolean;
  paymentAlerts: boolean;
  newsletter: boolean;
  weeklyReport: boolean;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const ultraWallet = useUltraWallet();
  
  const [activeTab, setActiveTab] = useState<'profile' | 'wallet' | 'security' | 'notifications' | 'stats'>('profile');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // États pour les formulaires
  const [profileData, setProfileData] = useState<UserProfile>({
    firstName: 'Sophie',
    lastName: 'Bernard',
    email: 'sophie.bernard@example.com',
    phone: '+33 6 12 34 56 78',
    location: 'Paris, France',
    bio: 'Développeuse passionnée par les technologies Web3 et l\'écosystème Ultra. J\'aime relever des défis techniques et contribuer à des projets innovants.',
    avatar: '/logo-ut.png',
    joinedAt: '2024-01-15',
    lastLogin: '2024-01-25T14:30:00Z'
  });

  const [userStats] = useState<UserStats>({
    missionsCompleted: 12,
    totalEarnings: 2450,
    successRate: 92,
    averageRating: 4.8,
    badges: 8,
    currentStreak: 5
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    missionUpdates: true,
    paymentAlerts: true,
    newsletter: false,
    weeklyReport: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Accès réservé</h2>
          <p className="text-gray-600 mb-6">Connectez-vous pour accéder à votre profil</p>
          <Button 
            className="w-full" 
            onClick={() => window.location.href = '/login'}
          >
            Se connecter
          </Button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'stats', label: 'Statistiques', icon: BarChart3 }
  ] as const;

  const handleProfileUpdate = () => {
    // Logique de mise à jour du profil
    setIsEditModalOpen(false);
  };

  const handlePasswordUpdate = () => {
    // Logique de mise à jour du mot de passe
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    setIsPasswordModalOpen(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header avec avatar et infos principales */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white text-4xl font-bold">
                {profileData.firstName[0]}{profileData.lastName[0]}
              </div>
              <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Informations principales */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="text-gray-600 mb-4">{profileData.email}</p>
              
              {profileData.bio && (
                <p className="text-gray-700 mb-4 max-w-2xl">{profileData.bio}</p>
              )}

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Membre depuis {new Date(profileData.joinedAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{userStats.averageRating}/5</span>
                </div>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="flex flex-col space-y-3">
              <Button 
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Modifier le profil</span>
              </Button>
              <Button 
                variant="outline"
                onClick={() => setIsWalletModalOpen(true)}
                className="flex items-center space-x-2"
              >
                <Wallet className="w-4 h-4" />
                <span>Gérer le wallet</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className="bg-white rounded-2xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Contenu des onglets */}
          <div className="p-8">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations personnelles</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                      <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{profileData.firstName}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{profileData.email}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
                      <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{profileData.location}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                      <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{profileData.lastName}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                      <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{profileData.phone || 'Non renseigné'}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dernière connexion</label>
                      <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                        {new Date(profileData.lastLogin).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {profileData.bio && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Biographie</label>
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{profileData.bio}</div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wallet' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Wallet Ultra</h2>
                
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Wallet className="w-8 h-8 text-primary-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Wallet Ultra</h3>
                        <p className="text-sm text-gray-600">
                          {ultraWallet.isConnected ? 'Connecté' : 'Non connecté'}
                        </p>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${ultraWallet.isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  </div>

                  {ultraWallet.isConnected && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Adresse du wallet</label>
                      <div className="p-3 bg-white rounded-lg font-mono text-sm text-gray-900 break-all">
                        {ultraWallet.blockchainId}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    {ultraWallet.isConnected ? (
                      <Button 
                        variant="outline" 
                        onClick={ultraWallet.disconnect}
                        loading={ultraWallet.isLoading}
                      >
                        Déconnecter
                      </Button>
                    ) : (
                      <Button 
                        onClick={ultraWallet.connect}
                        loading={ultraWallet.isLoading}
                      >
                        Connecter le wallet
                      </Button>
                    )}
                  </div>

                  {ultraWallet.error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{ultraWallet.error}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Sécurité</h2>
                
                <div className="space-y-4">
                  <Card>
                    <CardBody className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">Mot de passe</h3>
                          <p className="text-sm text-gray-600">Dernière modification il y a 30 jours</p>
                        </div>
                        <Button 
                          variant="outline"
                          onClick={() => setIsPasswordModalOpen(true)}
                        >
                          <Lock className="w-4 h-4 mr-2" />
                          Modifier
                        </Button>
                      </div>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">Authentification à deux facteurs</h3>
                          <p className="text-sm text-gray-600">Sécurisez votre compte avec 2FA</p>
                        </div>
                        <Button variant="outline">
                          <Shield className="w-4 h-4 mr-2" />
                          Configurer
                        </Button>
                      </div>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">Sessions actives</h3>
                          <p className="text-sm text-gray-600">Gérez vos connexions actives</p>
                        </div>
                        <Button variant="outline">
                          <Smartphone className="w-4 h-4 mr-2" />
                          Voir les sessions
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Préférences de notification</h2>
                
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => {
                    const labels = {
                      emailNotifications: 'Notifications par email',
                      pushNotifications: 'Notifications push',
                      missionUpdates: 'Mises à jour des missions',
                      paymentAlerts: 'Alertes de paiement',
                      newsletter: 'Newsletter hebdomadaire',
                      weeklyReport: 'Rapport hebdomadaire'
                    };

                    return (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900">
                          {labels[key as keyof typeof labels]}
                        </span>
                        <button
                          onClick={() => handleNotificationChange(key as keyof NotificationSettings)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? 'bg-primary-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Statistiques</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="card-hover">
                    <CardBody className="p-6 text-center">
                      <Target className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {userStats.missionsCompleted}
                      </div>
                      <div className="text-sm text-gray-600">Missions terminées</div>
                    </CardBody>
                  </Card>

                  <Card className="card-hover">
                    <CardBody className="p-6 text-center">
                      <Wallet className="w-8 h-8 text-green-600 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {userStats.totalEarnings.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">UOS gagnés</div>
                    </CardBody>
                  </Card>

                  <Card className="card-hover">
                    <CardBody className="p-6 text-center">
                      <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {userStats.successRate}%
                      </div>
                      <div className="text-sm text-gray-600">Taux de réussite</div>
                    </CardBody>
                  </Card>

                  <Card className="card-hover">
                    <CardBody className="p-6 text-center">
                      <Star className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {userStats.averageRating}
                      </div>
                      <div className="text-sm text-gray-600">Note moyenne</div>
                    </CardBody>
                  </Card>

                  <Card className="card-hover">
                    <CardBody className="p-6 text-center">
                      <Award className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {userStats.badges}
                      </div>
                      <div className="text-sm text-gray-600">Badges obtenus</div>
                    </CardBody>
                  </Card>

                  <Card className="card-hover">
                    <CardBody className="p-6 text-center">
                      <CheckCircle className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {userStats.currentStreak}
                      </div>
                      <div className="text-sm text-gray-600">Série actuelle</div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal de modification du profil */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Modifier le profil"
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                <Input
                  value={profileData.firstName}
                  onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                <Input
                  value={profileData.lastName}
                  onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <Input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
              <Input
                value={profileData.phone || ''}
                onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
              <Input
                value={profileData.location || ''}
                onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Biographie</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={4}
                value={profileData.bio || ''}
                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Parlez-nous de vous..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleProfileUpdate}>
                <Save className="w-4 h-4 mr-2" />
                Enregistrer
              </Button>
            </div>
          </div>
        </Modal>

        {/* Modal de modification du mot de passe */}
        <Modal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          title="Modifier le mot de passe"
          size="md"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
              <Input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le nouveau mot de passe</label>
              <Input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setIsPasswordModalOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handlePasswordUpdate}>
                <Lock className="w-4 h-4 mr-2" />
                Modifier
              </Button>
            </div>
          </div>
        </Modal>

        {/* Modal de gestion du wallet */}
        <Modal
          isOpen={isWalletModalOpen}
          onClose={() => setIsWalletModalOpen(false)}
          title="Gestion du wallet Ultra"
          size="md"
        >
          <div className="space-y-6">
            <div className="text-center">
              <Wallet className="w-16 h-16 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {ultraWallet.isConnected ? 'Wallet connecté' : 'Wallet non connecté'}
              </h3>
              
              {ultraWallet.isConnected && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-2">Adresse du wallet :</p>
                  <p className="font-mono text-sm text-gray-900 break-all">
                    {ultraWallet.blockchainId}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-center space-x-3">
              {ultraWallet.isConnected ? (
                <Button 
                  variant="outline" 
                  onClick={ultraWallet.disconnect}
                  loading={ultraWallet.isLoading}
                >
                  Déconnecter le wallet
                </Button>
              ) : (
                <Button 
                  onClick={ultraWallet.connect}
                  loading={ultraWallet.isLoading}
                >
                  Connecter le wallet Ultra
                </Button>
              )}
            </div>

            {ultraWallet.error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{ultraWallet.error}</p>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProfilePage; 