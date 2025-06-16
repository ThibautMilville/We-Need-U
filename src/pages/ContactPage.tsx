import React, { useState } from 'react';
import { 
  Mail, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Send, 
  Clock,
  Globe,
  Twitter,
  Github,
  Gamepad2,
  Zap,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardBody, CardHeader } from '../components/ui/Card';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
      });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Contactez-nous par email",
      value: "contact@weneedu.io",
      action: "mailto:contact@weneedu.io",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: MessageCircle,
      title: "Discord",
      description: "Rejoignez notre communauté",
      value: "WeNeedU Community",
      action: "https://discord.gg/weneedu",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Twitter,
      title: "Twitter",
      description: "Suivez nos actualités",
      value: "@WeNeedU_Gaming",
      action: "https://twitter.com/weneedu_gaming",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      icon: Github,
      title: "GitHub",
      description: "Code open source",
      value: "WeNeedU-Platform",
      action: "https://github.com/weneedu-platform",
      color: "from-gray-500 to-gray-600"
    }
  ];

  const faqItems = [
    {
      question: "Comment commencer sur WeNeedU ?",
      answer: "Créez simplement un compte, complétez votre profil gaming et explorez les missions disponibles. Vous pouvez commencer par des missions simples pour vous familiariser avec la plateforme."
    },
    {
      question: "Comment sont calculées les récompenses en UOS ?",
      answer: "Les récompenses dépendent de la complexité de la mission, du temps estimé et de votre niveau de compétence. Des bonus peuvent être accordés pour les performances exceptionnelles."
    },
    {
      question: "Quand recevrai-je mes paiements ?",
      answer: "Les paiements sont traités automatiquement via la blockchain Ultra une fois la mission validée. Vous pouvez choisir un paiement immédiat ou différé avec bonus."
    },
    {
      question: "Puis-je annuler une mission en cours ?",
      answer: "Oui, vous pouvez annuler une mission, mais cela peut affecter votre score de fiabilité. Nous recommandons de bien évaluer vos disponibilités avant de postuler."
    }
  ];

  const officeHours = [
    { day: "Lundi - Vendredi", hours: "9h00 - 18h00 CET" },
    { day: "Samedi", hours: "10h00 - 16h00 CET" },
    { day: "Dimanche", hours: "Fermé" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
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
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      {/* Hero Section with Dynamic Background */}
      <div className="relative overflow-hidden min-h-screen flex items-center">
        {/* Modern animated background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&h=1080&fit=crop&crop=center')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-blue-900/80 to-purple-900/70" />
          
          {/* Interactive particles */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-400/40 rounded-full animate-ping" />
            <div className="absolute top-3/4 right-1/4 w-4 h-4 bg-purple-400/50 rounded-full animate-bounce" style={{animationDelay: '1s'}} />
            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-pink-400/60 rounded-full animate-pulse" style={{animationDelay: '2s'}} />
            <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-blue-400/30 rounded-full animate-ping" style={{animationDelay: '0.5s'}} />
            <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-green-400/40 rounded-full animate-bounce" style={{animationDelay: '1.5s'}} />
          </div>
          
          {/* Communication symbols floating */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 opacity-20">
              <Mail className="w-12 h-12 text-blue-300 animate-float" />
            </div>
            <div className="absolute top-40 right-20 opacity-20">
              <MessageCircle className="w-16 h-16 text-purple-300 animate-float" style={{animationDelay: '1s'}} />
            </div>
            <div className="absolute bottom-40 left-20 opacity-20">
              <Phone className="w-10 h-10 text-cyan-300 animate-float" style={{animationDelay: '2s'}} />
            </div>
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
              <span className="text-white font-bold text-lg">Contactez WeNeedU</span>
              <MessageCircle className="w-6 h-6 text-cyan-300 animate-bounce" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-12 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
                Parlons Gaming
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-16 max-w-5xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              Une question ? Une suggestion ? Notre équipe est là pour vous accompagner 
              dans votre aventure Web3 gaming avec Ultra.
            </p>
            
            {/* Quick contact buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <a
                href="mailto:contact@weneedu.io"
                className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-md rounded-xl text-white font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-xl hover:scale-105"
              >
                <Mail className="w-5 h-5 mr-3" />
                Email direct
              </a>
              <a
                href="#contact-form"
                className="inline-flex items-center px-8 py-4 bg-cyan-500/20 backdrop-blur-md rounded-xl text-white font-semibold hover:bg-cyan-500/30 transition-all duration-300 border border-cyan-400/30 shadow-xl hover:scale-105"
              >
                <Send className="w-5 h-5 mr-3" />
                Formulaire
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Plusieurs façons de{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                nous contacter
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choisissez le canal qui vous convient le mieux pour échanger avec notre équipe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card key={index} className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-gray-200 group cursor-pointer">
                  <CardBody className="text-center p-8" onClick={() => window.open(method.action, '_blank')}>
                    <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                    <p className="text-primary-600 font-semibold">{method.value}</p>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact Form & Info */}
      <div id="contact-form" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <Card className="bg-white shadow-xl border-gray-200">
                <CardHeader className="bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-lg flex items-center justify-center">
                      <Send className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Envoyez-nous un message</h2>
                  </div>
                </CardHeader>
                <CardBody className="p-8">
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-700 font-medium">Message envoyé avec succès ! Nous vous répondrons bientôt.</span>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-700 font-medium">Erreur lors de l'envoi. Veuillez réessayer.</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Nom complet
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                          placeholder="Votre nom"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                        Type de demande
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      >
                        <option value="general">Question générale</option>
                        <option value="support">Support technique</option>
                        <option value="partnership">Partenariat</option>
                        <option value="mission">Question sur une mission</option>
                        <option value="payment">Problème de paiement</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                        Sujet
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                        placeholder="Sujet de votre message"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none"
                        placeholder="Décrivez votre demande en détail..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary-500 to-secondary-600 hover:from-primary-600 hover:to-secondary-700 text-white border-0 shadow-lg hover:shadow-xl py-4 text-lg font-bold transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Envoyer le message
                        </>
                      )}
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </div>

            {/* Contact Info & FAQ */}
            <div className="space-y-8">
              {/* Office Hours */}
              <Card className="bg-white shadow-lg border-gray-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Horaires de support</h3>
                  </div>
                </CardHeader>
                <CardBody className="p-6">
                  <div className="space-y-3">
                    {officeHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <span className="font-medium text-gray-700">{schedule.day}</span>
                        <span className="text-gray-600">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-700 font-medium">Support en ligne actuellement</span>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* FAQ */}
              <Card className="bg-white shadow-lg border-gray-200">
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Questions fréquentes</h3>
                  </div>
                </CardHeader>
                <CardBody className="p-6">
                  <div className="space-y-6">
                    {faqItems.map((item, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                        <h4 className="font-semibold text-gray-900 mb-2">{item.question}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* Location */}
              <Card className="bg-white shadow-lg border-gray-200">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Notre localisation</h3>
                  </div>
                </CardHeader>
                <CardBody className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Siège social</h4>
                      <p className="text-gray-600">
                        123 Gaming Street<br />
                        75001 Paris, France
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Bureau technique</h4>
                      <p className="text-gray-600">
                        456 Blockchain Avenue<br />
                        69000 Lyon, France
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à commencer ?
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
            Rejoignez des milliers de gamers qui font déjà confiance à WeNeedU pour leurs missions Web3
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary-600 hover:bg-gray-100 border-0 shadow-xl hover:shadow-2xl px-8 py-4 text-lg font-bold transform hover:scale-105 transition-all duration-200"
              onClick={() => window.location.href = '/login'}
            >
              <Gamepad2 className="w-5 h-5 mr-2" />
              Créer un compte
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-bold"
              onClick={() => window.location.href = '/missions'}
            >
              <Globe className="w-5 h-5 mr-2" />
              Voir les missions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 