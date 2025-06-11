import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Coins, 
  ArrowRight,
  Star,
  Clock,
  Target,
  CheckCircle,
  Calendar,
  Award,
  Zap,
  Globe,
  Shield,
  Rocket,
  Gamepad2,
  Trophy,
  Play,
  Sparkles,
  Monitor,
  Smartphone,
  Code,
  Palette,
  Video,
  Headphones
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import MissionCard from '../components/MissionCard';
import { mockMissions, mockDashboardStats } from '../data/mockData';
import { getMissionImage } from '../utils/missionImages';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [featuredMissions] = useState(mockMissions.slice(0, 6));
  const [stats] = useState(mockDashboardStats);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  const getWelcomeMessage = () => {
    if (!user) return 'Bienvenue sur WeNeedU';
    
    switch (user.role) {
      case 'admin':
        return `${getGreeting()}, ${user.name}. Prêt à gérer vos missions ?`;
      case 'manager':
        return `${getGreeting()}, ${user.name}. Des missions à valider vous attendent.`;
      case 'user':
        return `${getGreeting()}, ${user.name}. Découvrez les nouvelles missions !`;
      default:
        return `${getGreeting()}, ${user.name} !`;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 min-h-screen flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10" />
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23667eea' fill-opacity='0.1'%3E%3Cpath d='M50 15L60 35L80 35L65 50L70 70L50 60L30 70L35 50L20 35L40 35Z'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '100px 100px'
              }}
            />
            {/* Gaming elements */}
            <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse delay-1000" />
            <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-r from-yellow-400/20 to-red-400/20 rounded-full blur-xl animate-pulse delay-2000" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg border border-gray-200">
                  <img 
                    src="/logo-ut.png" 
                    alt="Ultra Logo" 
                    className="w-8 h-8 object-contain"
                  />
                  <span className="text-gray-700 font-semibold">Plateforme Web3 Ultra Gaming</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                
                <h1 className="text-6xl md:text-8xl font-bold mb-8">
                  <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-800 bg-clip-text text-transparent">
                    WeNeedU
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  La plateforme révolutionnaire de gestion de missions Web3. 
                  Accomplissez des missions gaming, développez vos compétences et gagnez des récompenses en{' '}
                  <span className="font-bold text-primary-600 inline-flex items-center">
                    <Coins className="w-5 h-5 mr-1" />
                    $UOS
                  </span>
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-16">
                  <Button
                    onClick={() => navigate('/login')}
                    size="lg"
                    className="bg-gradient-to-r from-primary-500 to-secondary-600 hover:from-primary-600 hover:to-secondary-700 text-white border-0 shadow-xl hover:shadow-2xl px-8 py-4 text-lg font-bold transform hover:scale-105 transition-all duration-200"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Commencer l'aventure
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    onClick={() => navigate('/missions')}
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary-300 text-primary-700 hover:bg-primary-50 backdrop-blur-sm px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl"
                  >
                    <Globe className="w-5 h-5 mr-2" />
                    Explorer les missions
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200">
                    <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-1">
                      {stats.totalMissions}+
                    </div>
                    <div className="text-gray-600 font-medium text-sm">Missions actives</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200">
                    <div className="text-2xl md:text-3xl font-bold text-secondary-600 mb-1">
                      {stats.totalUsers}+
                    </div>
                    <div className="text-gray-600 font-medium text-sm">Gamers</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200">
                    <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">
                      {stats.totalUosDistributed.toLocaleString()}
                    </div>
                    <div className="text-gray-600 font-medium text-sm">$UOS distribués</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200">
                    <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">
                      {stats.completionRate}%
                    </div>
                    <div className="text-gray-600 font-medium text-sm">Taux de réussite</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Visual Elements */}
              <div className="relative">
                <div className="relative z-10 animate-fade-in-up">
                  {/* Gaming Dashboard Mockup */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center animate-pulse">
                          <Gamepad2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Gaming Dashboard</h3>
                          <p className="text-sm text-gray-500">Missions en temps réel</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full animate-bounce-slow">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium">Live</span>
                      </div>
                    </div>
                    
                    {/* Mock mission cards with images */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <Monitor className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Développement Web3</h4>
                            <p className="text-sm text-gray-600">React + Blockchain</p>
                            <div className="flex items-center space-x-1 mt-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-gray-500">4.9 • Expert</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-blue-600 text-lg">500 UOS</div>
                          <div className="text-xs text-gray-500">2-3 jours</div>
                          <div className="text-xs text-green-600 font-medium">+15% bonus</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                            <Palette className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Design UI Gaming</h4>
                            <p className="text-sm text-gray-600">Interface moderne</p>
                            <div className="flex items-center space-x-1 mt-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-gray-500">4.7 • Intermédiaire</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600 text-lg">350 UOS</div>
                          <div className="text-xs text-gray-500">1-2 jours</div>
                          <div className="text-xs text-blue-600 font-medium">Urgent</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                            <Video className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Contenu Vidéo</h4>
                            <p className="text-sm text-gray-600">Tutoriel gaming</p>
                            <div className="flex items-center space-x-1 mt-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-gray-500">4.8 • Débutant</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-purple-600 text-lg">200 UOS</div>
                          <div className="text-xs text-gray-500">3-5 jours</div>
                          <div className="text-xs text-orange-600 font-medium">Populaire</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements with enhanced animations */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-float">
                  <Trophy className="w-10 h-10 text-white animate-spin-slow" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-1/2 -left-8 w-12 h-12 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
                  <Coins className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Pourquoi choisir{' '}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  WeNeedU
                </span>{' '}
                ?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une plateforme complète pour gérer vos missions Web3 avec transparence et efficacité dans l'univers gaming.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 group animate-fade-in-up">
                <CardBody className="text-center p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-200/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform relative z-10">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Missions Gaming Ciblées
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Des missions spécialement conçues pour l'univers gaming avec des objectifs clairs, des compétences recherchées et des récompenses attractives.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Développement Web3</span>
                      <span className="font-semibold text-primary-600">300-800 UOS</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Design UI/UX</span>
                      <span className="font-semibold text-primary-600">200-500 UOS</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Game Testing</span>
                      <span className="font-semibold text-primary-600">50-200 UOS</span>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center space-x-2">
                    <Monitor className="w-5 h-5 text-primary-600 animate-pulse" />
                    <Smartphone className="w-5 h-5 text-primary-600 animate-pulse" style={{animationDelay: '0.5s'}} />
                    <Code className="w-5 h-5 text-primary-600 animate-pulse" style={{animationDelay: '1s'}} />
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-50 to-orange-100 border-yellow-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 group animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <CardBody className="text-center p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform relative z-10">
                    <Coins className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Récompenses $UOS Avantageuses
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Gagnez des tokens $UOS avec des bonus pour les paiements différés, les performances exceptionnelles et la fidélité à la plateforme.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between bg-white/50 rounded-lg p-2">
                      <span className="text-sm text-gray-600">Paiement immédiat</span>
                      <span className="font-semibold text-orange-600">100%</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/50 rounded-lg p-2">
                      <span className="text-sm text-gray-600">Paiement différé</span>
                      <span className="font-semibold text-orange-600">+15%</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/50 rounded-lg p-2">
                      <span className="text-sm text-gray-600">Performance top</span>
                      <span className="font-semibold text-orange-600">+25%</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-3">
                    <div className="text-2xl font-bold text-orange-600">2.5M+</div>
                    <div className="text-sm text-orange-700">UOS distribués</div>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 group animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <CardBody className="text-center p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform relative z-10">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Blockchain Ultra Sécurisée
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Transparence totale avec suivi en temps réel via la blockchain Ultra, smart contracts sécurisés et paiements automatisés.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">Transactions vérifiables</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">Smart contracts audités</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">Paiements automatisés</span>
                    </div>
                  </div>
                  <div className="flex justify-center items-center space-x-2 bg-green-100 rounded-lg p-2">
                    <img src="/logo-ut.png" alt="Ultra" className="w-6 h-6" />
                    <span className="text-green-700 font-semibold text-sm">Ultra Blockchain</span>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>

        {/* Mission Categories */}
        <div className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Catégories de{' '}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  missions
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Découvrez les différents types de missions disponibles sur notre plateforme gaming
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Développement Web3</h3>
                <p className="text-gray-600 mb-4">Applications décentralisées, smart contracts, intégrations blockchain</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">15 missions actives</span>
                  <span className="text-lg font-bold text-blue-600">300-800 UOS</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 group">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Design UI/UX Gaming</h3>
                <p className="text-gray-600 mb-4">Interfaces gaming, expérience utilisateur, design systems</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">8 missions actives</span>
                  <span className="text-lg font-bold text-green-600">200-500 UOS</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Contenu Multimédia</h3>
                <p className="text-gray-600 mb-4">Vidéos, tutoriels, streaming, podcasts gaming</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">12 missions actives</span>
                  <span className="text-lg font-bold text-purple-600">150-400 UOS</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 group">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Headphones className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Audio & Sound Design</h3>
                <p className="text-gray-600 mb-4">Musiques, effets sonores, doublage, mixage</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">6 missions actives</span>
                  <span className="text-lg font-bold text-orange-600">100-350 UOS</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 group">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Gamepad2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Game Testing</h3>
                <p className="text-gray-600 mb-4">Tests de jeux, QA, feedback, rapports de bugs</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">20 missions actives</span>
                  <span className="text-lg font-bold text-teal-600">50-200 UOS</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 group">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Community Management</h3>
                <p className="text-gray-600 mb-4">Gestion communauté, modération, événements</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">10 missions actives</span>
                  <span className="text-lg font-bold text-indigo-600">100-300 UOS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Missions Preview */}
        <div className="py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
                <Trophy className="w-4 h-4" />
                <span className="text-sm font-semibold">Missions Tendances</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Missions{' '}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  populaires
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                Découvrez quelques-unes de nos missions les plus demandées par la communauté gaming. 
                Des opportunités uniques pour développer vos compétences et gagner des $UOS.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredMissions.map((mission, index) => (
                <div 
                  key={mission.id} 
                  className="animate-fade-in-up card-hover"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                                    <MissionCard mission={mission} />
                </div>
              ))}
            </div>

            <div className="text-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <Button
                onClick={() => navigate('/missions')}
                size="lg"
                className="bg-gradient-to-r from-primary-500 to-secondary-600 hover:from-primary-600 hover:to-secondary-700 text-white border-0 shadow-xl hover:shadow-2xl px-8 py-4 transform hover:scale-105 transition-all duration-200"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Voir toutes les missions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated user homepage
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="mb-8 lg:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="text-white/90 font-medium text-sm">Niveau Gamer Pro</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {getWelcomeMessage()}
              </h1>
              <p className="text-white/90 text-lg max-w-2xl">
                {user.role === 'admin' && 'Gérez vos missions et suivez les performances de votre équipe gaming.'}
                {user.role === 'manager' && 'Validez les missions et assurez-vous de leur qualité.'}
                {user.role === 'user' && 'Découvrez de nouvelles opportunités gaming et développez vos compétences.'}
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-white">{stats.activeUsers}</div>
                <div className="text-white/80 text-sm">Gamers actifs</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-white">{stats.activeMissions}</div>
                <div className="text-white/80 text-sm">Missions live</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-white">12,450</div>
                <div className="text-white/80 text-sm">Vos UOS</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200" onClick={() => navigate('/missions')}>
            <CardBody className="flex items-center p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Nouvelles missions</h3>
                <p className="text-sm text-primary-600 font-medium">8 disponibles</p>
              </div>
            </CardBody>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200" onClick={() => navigate('/my-missions')}>
            <CardBody className="flex items-center p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">En cours</h3>
                <p className="text-sm text-blue-600 font-medium">3 missions actives</p>
              </div>
            </CardBody>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 bg-gradient-to-br from-green-50 to-green-100 border-green-200" onClick={() => navigate('/payments')}>
            <CardBody className="flex items-center p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Récompenses</h3>
                <p className="text-sm text-green-600 font-medium">200 UOS en attente</p>
              </div>
            </CardBody>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200" onClick={() => navigate('/profile')}>
            <CardBody className="flex items-center p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Profil Gamer</h3>
                <p className="text-sm text-purple-600 font-medium">92% de réussite</p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Featured Missions */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Missions recommandées</h2>
              <p className="text-gray-600">Basées sur vos compétences et préférences gaming</p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/missions')}
              className="border-primary-300 text-primary-700 hover:bg-primary-50"
            >
              Voir toutes
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMissions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-xl border-gray-200">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Activité récente</h2>
            </div>
          </CardHeader>
          <CardBody className="p-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Mission "Développement d'une app mobile" terminée</p>
                  <p className="text-sm text-gray-500">Il y a 2 heures • +500 UOS • Bonus performance +50 UOS</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Terminée
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Nouvelle mission "Design UI/UX Gaming" disponible</p>
                  <p className="text-sm text-gray-500">Il y a 4 heures • 350 UOS • Difficulté: Moyenne</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Nouvelle
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Votre niveau gamer a progressé à "Pro"</p>
                  <p className="text-sm text-gray-500">Hier • Taux de réussite: 92% • Nouveau badge débloqué</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    Level Up!
                  </span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;