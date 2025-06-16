import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Wallet, Shield, Users, User, ChevronRight, Eye, EyeOff, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardBody } from '../components/ui/Card';
import { useUltraWallet } from '../utils/ultraWallet';

const LoginPage: React.FC = () => {
  const { user, login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<'admin' | 'manager' | 'user'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [isRoleSelectionMode, setIsRoleSelectionMode] = useState(true);
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' as 'admin' | 'manager' | 'user'
  });
  const ultraWallet = useUltraWallet();

  // Tous les useEffect doivent être en haut, avant tout return conditionnel
  
  // Redirection automatique après login réussi
  React.useEffect(() => {
    if (user && !isLoading) {
      console.log('Redirecting user with role:', user.role);
      const timer = setTimeout(() => {
        if (user.role === 'admin') {
          navigate('/dashboard', { replace: true });
        } else if (user.role === 'manager') {
          navigate('/manager-dashboard', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [user, isLoading, navigate]);

  // Redirection automatique si le wallet est déjà connecté
  React.useEffect(() => {
    if (ultraWallet.isConnected && !user) {
      navigate('/dashboard');
    }
  }, [ultraWallet.isConnected, user, navigate]);

  // Afficher écran de transition si utilisateur connecté
  if (user && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirection en cours...</p>
          <p className="text-sm text-gray-500 mt-2">Connecté en tant que {user.role}</p>
        </div>
      </div>
    );
  }

  // Fonction pour gérer la connexion wallet avec redirection
  const handleWalletConnect = async () => {
    try {
      const success = await ultraWallet.connect();
      if (success) {
        // Redirection vers la page admin après connexion wallet réussie
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Erreur de connexion wallet:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoginLoading(true);

    try {
      await login(email, password);
      
      // Laisser React traiter le state update, puis rediriger
      // La redirection se fera via le conditional rendering avec Navigate
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleQuickLogin = (userType: 'admin' | 'manager' | 'user') => {
    const credentials = {
      admin: { email: 'admin@ultra.io', password: 'password' },
      manager: { email: 'manager@ultra.io', password: 'password' },
      user: { email: 'user@ultra.io', password: 'password' }
    };

    setEmail(credentials[userType].email);
    setPassword(credentials[userType].password);
    setSelectedUserType(userType);
    setIsRoleSelectionMode(false);
    setIsSignupMode(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoginLoading(true);

    // Validation
    if (signupData.password !== signupData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoginLoading(false);
      return;
    }

    if (signupData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoginLoading(false);
      return;
    }

    try {
      // Simulation d'inscription
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (signupData.role === 'user') {
        // Utilisateurs acceptés directement
        setError('');
        alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        setIsSignupMode(false);
        setEmail(signupData.email);
        setPassword(signupData.password);
      } else {
        // Gestionnaires et administrateurs nécessitent une validation
        setError('');
        alert(`Inscription en attente ! Votre demande de compte ${signupData.role === 'admin' ? 'administrateur' : 'gestionnaire'} doit être validée par un administrateur.`);
        setIsSignupMode(false);
        setIsRoleSelectionMode(true);
      }
      
      // Reset signup form
      setSignupData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user'
      });
    } catch (err) {
      setError('Erreur lors de l\'inscription');
    } finally {
      setLoginLoading(false);
    }
  };

  const openSignupModal = (role: 'admin' | 'manager' | 'user') => {
    setSignupData({ ...signupData, role });
    setSelectedUserType(role);
    setIsSignupMode(true);
    setIsRoleSelectionMode(false);
  };

  const roleConfig = {
    admin: {
      title: 'Administrateur',
      description: 'Gestion complète de la plateforme',
      icon: Shield,
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-gradient-to-br from-red-50 to-pink-50',
      borderColor: 'border-red-200 hover:border-red-300',
      textColor: 'text-red-700',
      iconBg: 'bg-red-100',
              features: ['Gestion des contributeurs', 'Configuration système', 'Rapports avancés']
    },
    manager: {
      title: 'Gestionnaire',
      description: 'Validation et suivi des missions',
      icon: Users,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
      borderColor: 'border-amber-200 hover:border-amber-300',
      textColor: 'text-amber-700',
      iconBg: 'bg-amber-100',
      features: ['Validation des missions', 'Gestion des équipes', 'Suivi des performances']
    },
    user: {
              title: 'Contributeur',
      description: 'Participation aux missions',
      icon: User,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50',
      borderColor: 'border-emerald-200 hover:border-emerald-300',
      textColor: 'text-emerald-700',
      iconBg: 'bg-emerald-100',
      features: ['Accès aux missions', 'Suivi des gains', 'Profil personnel']
    }
  };

  if (isLoading || loginLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Particules animées en arrière-plan */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-purple-300 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/3 right-1/2 w-2 h-2 bg-pink-300 rounded-full animate-pulse"></div>
        </div>

        <div className="relative flex flex-col items-center z-10">
          {/* Container principal avec effet glassmorphism */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
            {/* Logo Ultra Times avec effet de glow */}
            <div className="relative mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse-slow"></div>
                <img 
                  src="/logo-ut.png" 
                  alt="Ultra Times Logo" 
                  className="relative w-20 h-20 object-contain animate-float z-10" 
                />
              </div>
            </div>
            
            {/* Titre avec gradient */}
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent text-center mb-6">
              WeNeedU
            </h2>
            
            {/* Spinner moderne avec multiple cercles */}
            <div className="relative flex justify-center mb-8">
              <div className="relative w-24 h-24">
                {/* Cercle extérieur */}
                <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full animate-spin"></div>
                {/* Cercle du milieu */}
                <div className="absolute inset-2 border-4 border-transparent border-b-blue-400 border-l-purple-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                {/* Cercle intérieur */}
                <div className="absolute inset-4 border-4 border-transparent border-t-pink-400 border-r-purple-400 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
                {/* Logo au centre */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/logo-ut.png" 
                    alt="Ultra Times Logo" 
                    className="w-8 h-8 object-contain animate-pulse" 
                  />
                </div>
              </div>
            </div>
            
            {/* Texte de chargement avec animation */}
            <div className="text-center">
              <p className="text-white/90 text-lg font-medium mb-2">
                Connexion en cours
              </p>
              <div className="flex justify-center items-center space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>

          {/* Message d'encouragement */}
          <p className="text-white/60 mt-6 text-center max-w-md">
            Préparation de votre espace de missions Ultra Times...
          </p>
        </div>

        {/* Effet de vague en bas */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 text-white/5" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background animé */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Formes géométriques animées */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full">
        {/* Header */}
          <div className="text-center mb-12">
            {/* Bouton retour à l'accueil */}
            <div className="absolute top-8 left-8">
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-300 hover:text-white transition-colors duration-200 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20 hover:border-white/40"
              >
                <Home className="w-4 h-4 mr-2" />
                Accueil
              </button>
            </div>

            <div className="flex justify-center mb-6">
              <div className="relative">
                <img 
                  src="/logo-ut.png" 
                  alt="Ultra Times Logo" 
                  className="w-20 h-20 object-contain animate-bounce-slow" 
                />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
              WeNeedU
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Plateforme de missions Web3 Ultra Times - Connectez-vous selon votre rôle
            </p>
          </div>

          {isRoleSelectionMode ? (
            /* Sélection du rôle */
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-semibold text-white text-center mb-8">
                Choisissez votre rôle
          </h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {Object.entries(roleConfig).map(([key, config]) => {
                  const IconComponent = config.icon;
                  return (
                    <div
                      key={key}
                      onClick={() => handleQuickLogin(key as 'admin' | 'manager' | 'user')}
                      className={`
                        relative group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2
                        bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-white/40
                        hover:bg-white/20 hover:shadow-2xl hover:shadow-purple-500/25
                        h-[420px] flex flex-col
                      `}
                    >
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                      
                      <div className="relative z-10 flex flex-col h-full">
                        {/* Icon */}
                        <div className={`w-16 h-16 ${config.iconBg} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className={`w-8 h-8 ${config.textColor}`} />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-white mb-3 text-center">
                          {config.title}
                        </h3>

                        {/* Description - hauteur fixe pour alignement */}
                        <div className="h-12 flex items-center justify-center mb-6">
                          <p className="text-gray-300 text-center">
                            {config.description}
                          </p>
                        </div>

                        {/* Features - flex-grow pour occuper l'espace disponible */}
                        <div className="flex-grow">
                          <ul className="space-y-2 mb-6">
                            {config.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-sm text-gray-400">
                                <div className={`w-2 h-2 rounded-full ${config.color.includes('red') ? 'bg-red-400' : config.color.includes('amber') ? 'bg-amber-400' : 'bg-emerald-400'} mr-3 flex-shrink-0`}></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* CTA - toujours en bas */}
                        <div className="space-y-3 mt-auto">
                          <div className="flex items-center justify-center text-white group-hover:text-purple-200 transition-colors duration-300">
                            <span className="font-medium">Se connecter</span>
                            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openSignupModal(key as 'admin' | 'manager' | 'user');
                            }}
                            className="w-full text-sm text-gray-300 hover:text-white transition-colors duration-200 underline"
                          >
                            S'inscrire comme {config.title.toLowerCase()}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
        </div>

              {/* Wallet Connection */}
              <div className="mt-12 max-w-md mx-auto">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <Button
            variant="outline"
                    className="w-full flex items-center justify-center bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50"
                    onClick={handleWalletConnect}
            loading={ultraWallet.isLoading}
            disabled={!ultraWallet.isInstalled}
          >
                    <Wallet className="w-5 h-5 mr-3" />
                    {ultraWallet.isConnected ? 'Wallet connecté - Accéder au dashboard' : 'Se connecter avec Ultra Wallet'}
          </Button>
                  {ultraWallet.error && (
                    <div className="text-red-400 text-sm mt-3 text-center">{ultraWallet.error}</div>
                  )}
                </div>
              </div>
            </div>
          ) : isSignupMode ? (
            /* Formulaire d'inscription */
            <div className="max-w-md mx-auto animate-fade-in-up">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
                {/* Retour à la sélection */}
                <button
                  onClick={() => setIsRoleSelectionMode(true)}
                  className="flex items-center text-gray-300 hover:text-white mb-6 transition-colors duration-200"
                >
                  <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                  Changer de rôle
                </button>

                {/* Rôle sélectionné */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 ${roleConfig[selectedUserType].iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    {React.createElement(roleConfig[selectedUserType].icon, {
                      className: `w-8 h-8 ${roleConfig[selectedUserType].textColor}`
                    })}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Inscription {roleConfig[selectedUserType].title}
                  </h2>
                  <p className="text-gray-300">
                    {signupData.role === 'user' 
                      ? 'Votre compte sera activé immédiatement'
                      : 'Votre demande sera examinée par un administrateur'
                    }
                  </p>
                </div>

                {/* Formulaire d'inscription */}
                <form className="space-y-6" onSubmit={handleSignup}>
                  {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl backdrop-blur-sm">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Prénom"
                      value={signupData.firstName}
                      onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                      required
                      placeholder="John"
                      variant="dark"
                      className="bg-white/10 border-white/30 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/50"
                    />
                    <Input
                      label="Nom"
                      value={signupData.lastName}
                      onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                      required
                      placeholder="Doe"
                      variant="dark"
                      className="bg-white/10 border-white/30 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/50"
                    />
                  </div>

                  <Input
                    label="Email"
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                    placeholder="votre@email.com"
                    variant="dark"
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/50"
                  />

                  <div className="relative">
                    <Input
                      label="Mot de passe"
                      type={showPassword ? "text" : "password"}
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                      placeholder="••••••••"
                      variant="dark"
                      className="bg-white/10 border-white/30 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/50 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <Input
                    label="Confirmer le mot de passe"
                    type="password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    required
                    placeholder="••••••••"
                    variant="dark"
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/50"
                  />

                  {signupData.role !== 'user' && (
                    <div className="bg-yellow-500/20 border border-yellow-500/50 text-yellow-200 px-4 py-3 rounded-xl backdrop-blur-sm">
                      <p className="text-sm">
                        ⚠️ Les comptes {signupData.role === 'admin' ? 'administrateur' : 'gestionnaire'} nécessitent une validation manuelle.
                      </p>
              </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                    loading={loginLoading}
                    disabled={!signupData.firstName || !signupData.lastName || !signupData.email || !signupData.password || !signupData.confirmPassword}
                  >
                    S'inscrire
            </Button>
                </form>

                {/* Lien vers connexion */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setIsSignupMode(false)}
                    className="text-purple-400 hover:text-purple-300 transition-colors duration-200 text-sm"
                  >
                    Déjà un compte ? Se connecter
                  </button>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                  <p className="text-xs text-gray-400">
                    En vous inscrivant, vous acceptez nos{' '}
                    <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                      Conditions d'utilisation
                    </a>{' '}
                    et notre{' '}
                    <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                      Politique de confidentialité
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Formulaire de connexion */
            <div className="max-w-md mx-auto animate-fade-in-up">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
                {/* Retour à la sélection */}
                <button
                  onClick={() => setIsRoleSelectionMode(true)}
                  className="flex items-center text-gray-300 hover:text-white mb-6 transition-colors duration-200"
                >
                  <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                  Changer de rôle
                </button>

                {/* Rôle sélectionné */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 ${roleConfig[selectedUserType].iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    {React.createElement(roleConfig[selectedUserType].icon, {
                      className: `w-8 h-8 ${roleConfig[selectedUserType].textColor}`
                    })}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Connexion {roleConfig[selectedUserType].title}
                  </h2>
                  <p className="text-gray-300">
                    {roleConfig[selectedUserType].description}
                  </p>
          </div>

                {/* Formulaire */}
                <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl backdrop-blur-sm">
                {error}
              </div>
            )}

                                     <div>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="votre@email.com"
                       variant="dark"
                       className="bg-white/10 border-white/30 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/50"
            />
                   </div>

                   <div className="relative">
            <Input
              label="Mot de passe"
                       type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
                       variant="dark"
                       className="bg-white/10 border-white/30 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/50 pr-12"
                     />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

            <Button
              type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              loading={loginLoading}
              disabled={!email || !password}
            >
              Se connecter
            </Button>
          </form>

                                 {/* Lien vers inscription */}
          <div className="mt-6 text-center">
                   <button
                     onClick={() => setIsSignupMode(true)}
                     className="text-purple-400 hover:text-purple-300 transition-colors duration-200 text-sm"
                   >
                     Pas encore de compte ? S'inscrire
                   </button>
                 </div>

                 {/* Footer */}
                 <div className="mt-8 text-center">
                   <p className="text-xs text-gray-400">
              En vous connectant, vous acceptez nos{' '}
                     <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                Conditions d'utilisation
              </a>{' '}
              et notre{' '}
                     <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                Politique de confidentialité
              </a>
            </p>
          </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;