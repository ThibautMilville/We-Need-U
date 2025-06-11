import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, MessageCircle, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo-ut.png" 
                alt="Ultra Times Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold text-gray-900">WeNeedU</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              La plateforme Web3 de gestion de missions pour Ultra Gaming. 
              Accomplissez des missions et gagnez des récompenses en $UOS.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/ultra_io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/ultra-alliance"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://discord.gg/ultra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="mailto:support@ultra.io"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Liens rapides
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/missions" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Parcourir les missions
                </Link>
              </li>
              <li>
                <Link to="/my-missions" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Mes missions
                </Link>
              </li>
              <li>
                <Link to="/payments" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Mes paiements
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Mon profil
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Politique de confidentialité
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} WeNeedU by{' '}
            <a 
              href="https://ultratimes.io/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            >
              Ultra Times
            </a>
            . Tous droits réservés.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-sm text-gray-600">
              Propulsé par Ultra Blockchain
            </span>
            <img 
              src="/logo-ut.png" 
              alt="Ultra Logo" 
              className="w-6 h-6 object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;