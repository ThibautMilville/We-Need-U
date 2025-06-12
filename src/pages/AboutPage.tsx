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
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10" />
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23667eea' fill-opacity='0.1'%3E%3Cpath d='M50 15L60 35L80 35L65 50L70 70L50 60L30 70L35 50L20 35L40 35Z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px'
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg border border-gray-200">
              <img 
                src="/logo-ut.png" 
                alt="Ultra Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-gray-700 font-semibold">À propos de WeNeedU</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-800 bg-clip-text text-transparent">
                Notre Mission
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Révolutionner l'industrie gaming en connectant les talents avec les opportunités Web3, 
              tout en créant un écosystème transparent et équitable pour tous.
            </p>
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