import React from 'react';
import { 
  Target, 
  Users, 
  Shield, 
  Zap, 
  Award, 
  Globe,
  Gamepad2,
  Trophy,
  Coins,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card, { CardBody } from '../components/ui/Card';

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: "Jean-Charles",
      role: "Lead",
      image: "/avatar_jc.jpeg",
      description: "Visionnaire, leader de l'équipe et expert Ultra."
    },
    {
      name: "Vito Cornelius",
      role: "Responsable des missions",
      image: "/vito.jpg",
      description: "Organisation, gestion et suivi des missions."
    },
    {
      name: "Garstud",
      role: "Responsable de projets",
      image: "/garstud.jpg",
      description: "Coordination des projets et innovation."
    },
    {
      name: "Allego",
      role: "Spécialiste Smart Contract & Blockchain",
      image: "/allego.jpg",
      description: "Développement blockchain et sécurité."
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "Lancement de WeNeedU",
      description: "Première plateforme de missions Web3 sur Ultra blockchain"
    },
    {
      year: "2024",
      title: "1000+ Missions Complétées",
      description: "Franchissement du cap des 1000 missions avec succès"
    },
    {
      year: "2024",
      title: "Partenariat Ultra",
      description: "Partenariat officiel avec Ultra pour l'écosystème gaming"
    },
    {
      year: "2024",
      title: "Expansion Internationale",
      description: "Ouverture à la communauté gaming mondiale"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .parallax-bg {
          transform: translateZ(0);
          will-change: transform;
        }
      `}</style>
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden min-h-screen flex items-center">
        {/* Animated background with Unsplash image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=1080&fit=crop&crop=center')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/80 to-blue-900/70" />
          
          {/* Animated particles */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400/30 rounded-full animate-ping" />
            <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400/40 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
            <div className="absolute bottom-40 left-20 w-3 h-3 bg-pink-400/50 rounded-full animate-bounce" style={{animationDelay: '2s'}} />
            <div className="absolute top-60 left-1/3 w-5 h-5 bg-cyan-400/30 rounded-full animate-ping" style={{animationDelay: '0.5s'}} />
            <div className="absolute bottom-20 right-1/4 w-4 h-4 bg-yellow-400/40 rounded-full animate-pulse" style={{animationDelay: '1.5s'}} />
          </div>
          
          {/* Floating geometric shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-20 h-20 border-2 border-white/20 rounded-full animate-spin-slow" />
            <div className="absolute top-3/4 right-1/4 w-16 h-16 border-2 border-purple-400/30 rotate-45 animate-pulse" />
            <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg animate-float" />
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-md rounded-full px-8 py-4 mb-12 shadow-2xl border border-white/30 animate-fade-in-up">
              <img 
                src="/logo-ut.png" 
                alt="Ultra Logo" 
                className="w-10 h-10 object-contain animate-pulse"
              />
              <span className="text-white font-bold text-lg">À propos de WeNeedU</span>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-ping" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-12 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
                Notre Mission
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-16 max-w-5xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              Révolutionner l'industrie gaming en connectant les talents avec les opportunités Web3, 
              tout en créant un écosystème transparent et équitable pour tous dans l'univers Ultra.
            </p>
            
            {/* Scroll indicator */}
            <div className="animate-bounce mt-16">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Notre{' '}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Vision
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nous imaginons un futur où chaque gamer peut monétiser ses compétences et sa passion 
                grâce à la technologie blockchain. WeNeedU est la passerelle entre le talent gaming 
                et les opportunités Web3.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">Démocratiser l'accès aux missions gaming</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">Créer un écosystème équitable et transparent</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">Connecter les talents avec les opportunités</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">Révolutionner l'économie gaming</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl p-8 shadow-2xl border border-primary-200">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">5000+</div>
                    <div className="text-gray-600 font-medium">Gamers actifs</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">1200+</div>
                    <div className="text-gray-600 font-medium">Missions complétées</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Coins className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">2.5M</div>
                    <div className="text-gray-600 font-medium">UOS distribués</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
                    <div className="text-gray-600 font-medium">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nos{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Valeurs
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les principes qui guident notre approche et notre engagement envers la communauté gaming
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-gray-200 group">
              <CardBody className="text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Transparence</h3>
                <p className="text-gray-600 leading-relaxed">
                  Toutes nos transactions sont vérifiables sur la blockchain Ultra pour une confiance totale.
                </p>
              </CardBody>
            </Card>

            <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-gray-200 group">
              <CardBody className="text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Communauté</h3>
                <p className="text-gray-600 leading-relaxed">
                  Nous plaçons la communauté gaming au cœur de toutes nos décisions et innovations.
                </p>
              </CardBody>
            </Card>

            <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-gray-200 group">
              <CardBody className="text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Nous repoussons constamment les limites de ce qui est possible dans l'écosystème Web3.
                </p>
              </CardBody>
            </Card>

            <Card className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-gray-200 group">
              <CardBody className="text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Excellence</h3>
                <p className="text-gray-600 leading-relaxed">
                  Nous nous efforçons d'offrir la meilleure expérience possible à tous nos utilisateurs.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Notre{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Équipe
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des experts passionnés qui travaillent chaque jour pour révolutionner l'industrie gaming
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-gray-200 group">
                <CardBody className="text-center p-8">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-6 group-hover:scale-110 transition-transform"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-primary-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Notre{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Histoire
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les étapes clés de notre parcours vers la révolution de l'économie gaming
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 to-secondary-600 rounded-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-gray-200">
                      <CardBody className="p-6">
                        <div className="text-2xl font-bold text-primary-600 mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardBody>
                    </Card>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-full flex items-center justify-center shadow-lg">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Rejoignez l'Aventure
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
            Faites partie de la révolution gaming Web3 et découvrez un monde d'opportunités infinies
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/login">
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-100 border-0 shadow-xl hover:shadow-2xl px-8 py-4 text-lg font-bold transform hover:scale-105 transition-all duration-200"
              >
                <Gamepad2 className="w-5 h-5 mr-2" />
                Commencer maintenant
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/missions">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-bold"
              >
                <Globe className="w-5 h-5 mr-2" />
                Explorer les missions
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 