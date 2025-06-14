import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2 text-center md:text-left">
            <Link to="/" className="inline-flex items-center space-x-3 mb-4 hover:opacity-80 transition-opacity">
              <img 
                src="/logo-ut.png" 
                alt="Ultra Times Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold text-gray-900">WeNeedU</span>
            </Link>
            <p className="text-gray-600 mb-4 max-w-md mx-auto md:mx-0">
              La plateforme Web3 de gestion de missions pour Ultra Gaming. 
              Accomplissez des missions et gagnez des récompenses en $UOS.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://x.com/Ultra_TimesEN"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
                title="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/ultratimes/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@ultra-times"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://www.twitch.tv/ultratimes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-500 transition-colors"
                title="Twitch"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                </svg>
              </a>
              <a
                href="https://discord.com/invite/Pgh85akHj8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-500 transition-colors"
                title="Discord"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="col-span-1 text-center md:text-left">
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
          <div className="col-span-1 text-center md:text-left">
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

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-600 text-sm">
            © {currentYear}{' '}
            <Link 
              to="/" 
              className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            >
              WeNeedU
            </Link>
            . Tous droits réservés.
          </p>
          <div className="flex items-center justify-center space-x-1 mt-4 md:mt-0">
            <span className="text-sm text-gray-600">Propulsé par</span>
            <a 
              href="https://ultratimes.io/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            >
              <span>Ultra Times</span>
              <img 
                src="/logo-ut.png" 
                alt="Ultra Times Logo" 
                className="w-6 h-6 object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;