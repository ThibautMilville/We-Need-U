import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Wallet, 
  Menu, 
  X, 
  ChevronRight, 
  ExternalLink,
  User,
  LogOut,
  Bell,
  Search,
  Gamepad2,
  Zap,
  Home,
  Briefcase,
  Info,
  Mail
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../contexts/TranslationContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { currentLang, setCurrentLang, t } = useTranslation();
  
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Gestion des clics extérieurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (profileDropdownRef.current && !profileDropdownRef.current.contains(target)) {
        setIsProfileMenuOpen(false);
      }

      if (langMenuRef.current && !langMenuRef.current.contains(target)) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    navigate('/login');
  };

  const getNavigationItems = () => {
    if (!user) {
      // Menu pour les utilisateurs non connectés
      return [
        { name: t('nav.home'), href: '/', key: 'home', icon: Home },
        { name: t('nav.missions'), href: '/missions', key: 'missions', icon: Briefcase },
        { name: t('nav.about'), href: '/about', key: 'about', icon: Info },
        { name: t('nav.contact'), href: '/contact', key: 'contact', icon: Mail },
      ];
    }

    const commonItems = [
      { name: t('nav.home'), href: '/', key: 'home', icon: Home },
      { name: t('nav.missions'), href: '/missions', key: 'missions', icon: Briefcase },
    ];

    switch (user.role) {
      case 'admin':
        return [
          ...commonItems,
          { name: t('nav.dashboard'), href: '/dashboard', key: 'dashboard', icon: Zap },
          { name: t('nav.manage'), href: '/manage-missions', key: 'manage', icon: Zap },
          { name: t('nav.payments'), href: '/payments', key: 'payments', icon: Wallet },
        ];
      case 'manager':
        return [
          ...commonItems,
          { name: t('nav.dashboard'), href: '/dashboard', key: 'dashboard', icon: Zap },
          { name: t('nav.manage'), href: '/manage-missions', key: 'manage', icon: Zap },
        ];
      case 'user':
        return [
          ...commonItems,
          { name: t('nav.my-missions'), href: '/my-missions', key: 'my-missions', icon: Briefcase },
          { name: t('nav.payments'), href: '/payments', key: 'payments', icon: Wallet },
        ];
      default:
        return commonItems;
    }
  };

  const getCurrentFlag = () => {
    const flags = {
      fr: (
        <svg className='w-5 h-3' viewBox='0 0 36 24'>
          <rect width='36' height='24' fill='#ED2939' />
          <rect width='12' height='24' fill='#002395' />
          <rect x='12' width='12' height='24' fill='#fff' />
        </svg>
      ),
      en: (
        <svg className='w-5 h-3' viewBox='0 0 36 24'>
          <rect width='36' height='24' fill='#012169' />
          <path d='M0,0 L36,24 M36,0 L0,24' stroke='#fff' strokeWidth='2.4' />
          <path d='M18,0 L18,24 M0,12 L36,12' stroke='#fff' strokeWidth='4' />
          <path d='M18,0 L18,24 M0,12 L36,12' stroke='#C8102E' strokeWidth='2.4' />
        </svg>
      ),
      de: (
        <span className="text-lg">🇩🇪</span>
      ),
    };
    return flags[currentLang];
  };

  const getBreadcrumb = () => {
    const breadcrumbClass = "flex items-center space-x-2 text-sm bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-200 shadow-sm";
    const linkClass = "text-gray-600 hover:text-primary-600 transition-colors duration-200 font-medium cursor-pointer";
    const currentClass = "text-primary-600 font-semibold";
    const separatorClass = "text-gray-400";

    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    if (pathSegments.length === 0) return null;

    const breadcrumbItems = [
      { name: 'Accueil', path: '/' }
    ];

    if (pathSegments[0] === 'missions') {
      breadcrumbItems.push({ name: 'Missions', path: '/missions' });
      if (pathSegments[1]) {
        breadcrumbItems.push({ name: 'Détail', path: location.pathname });
      }
    } else if (pathSegments[0] === 'dashboard') {
      breadcrumbItems.push({ name: 'Dashboard', path: '/dashboard' });
    } else if (pathSegments[0] === 'profile') {
      breadcrumbItems.push({ name: 'Profil', path: '/profile' });
    } else if (pathSegments[0] === 'my-missions') {
      breadcrumbItems.push({ name: 'Mes missions', path: '/my-missions' });
    } else if (pathSegments[0] === 'manage-missions') {
      breadcrumbItems.push({ name: 'Gérer les missions', path: '/manage-missions' });
    } else if (pathSegments[0] === 'payments') {
      breadcrumbItems.push({ name: 'Paiements', path: '/payments' });
    } else if (pathSegments[0] === 'about') {
      breadcrumbItems.push({ name: 'À propos', path: '/about' });
    } else if (pathSegments[0] === 'contact') {
      breadcrumbItems.push({ name: 'Contact', path: '/contact' });
    }

    if (breadcrumbItems.length <= 1) return null;

    return (
      <div className={breadcrumbClass}>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.path}>
            {index === breadcrumbItems.length - 1 ? (
              <span className={currentClass}>{item.name}</span>
            ) : (
              <>
                <Link to={item.path} className={linkClass}>
                  {item.name}
                </Link>
                <ChevronRight className={`w-4 h-4 ${separatorClass}`} />
              </>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const navigationItems = getNavigationItems();

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity group"
            >
              <div className="relative">
                <img 
                  src="/logo-ut.png" 
                  alt="Ultra Times Logo" 
                  className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  WeNeedU
                </span>
                <span className="text-xs text-gray-500 font-medium -mt-1">Ultra Times</span>
              </div>
            </Link>
          </div>

          {/* Navigation centrale */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.key}
                  to={item.href}
                  className={`relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center space-x-2 ${
                    isActive 
                      ? 'text-primary-600 bg-primary-50 shadow-sm' 
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {IconComponent && <IconComponent className="w-4 h-4" />}
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Section droite */}
          <div className="flex items-center space-x-3">
            {/* Recherche (desktop) */}
            {user && (
              <div className="hidden xl:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Rechercher une mission..."
                    className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64 transition-all"
                  />
                </div>
              </div>
            )}

            {user ? (
              <>
                {/* Notifications */}
                <button className="relative p-2.5 text-gray-500 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Wallet info */}
                <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 px-4 py-2.5 rounded-xl border border-primary-200 shadow-sm">
                  <Wallet className="w-4 h-4" />
                  <span className="font-semibold text-sm">12,450</span>
                  <span className="text-xs font-medium text-primary-600">UOS</span>
                </div>

                {/* Profile menu */}
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 px-3 py-2.5 rounded-xl transition-all duration-200 border border-gray-200 shadow-sm hover:shadow-md"
                  >
                    <img
                      src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=667eea&color=fff`}
                      alt={user.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="hidden lg:block font-medium text-sm">
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isProfileMenuOpen ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 border border-gray-200 z-[60]">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-md mt-1 inline-block">
                          {user.role}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-4 h-4 mr-3" />
                        Mon profil
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-600 hover:from-primary-600 hover:to-secondary-700 text-white px-6 py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm shadow-lg hover:shadow-xl"
              >
                <User className="w-4 h-4" />
                <span>Se connecter</span>
              </button>
            )}

            {/* Sélecteur de langue */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 px-3 py-2.5 rounded-xl transition-all duration-200 border border-gray-200 shadow-sm hover:shadow-md"
              >
                {getCurrentFlag()}
                <span className="text-sm font-medium">{currentLang.toUpperCase()}</span>
                <ChevronRight className={`w-3 h-3 transition-transform ${isLangMenuOpen ? 'rotate-90' : ''}`} />
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl py-2 border border-gray-200 z-[60]">
                  {['fr', 'en', 'de'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => {
                        setCurrentLang(lang as 'fr' | 'en' | 'de');
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center space-x-3 ${
                        currentLang === lang 
                          ? 'bg-primary-50 text-primary-600 font-medium' 
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {lang === 'fr' ? (
                          <svg className='w-4 h-3' viewBox='0 0 36 24'>
                            <rect width='36' height='24' fill='#ED2939' />
                            <rect width='12' height='24' fill='#002395' />
                            <rect x='12' width='12' height='24' fill='#fff' />
                          </svg>
                        ) : lang === 'en' ? (
                          <svg className='w-4 h-3' viewBox='0 0 36 24'>
                            <rect width='36' height='24' fill='#012169' />
                            <path d='M0,0 L36,24 M36,0 L0,24' stroke='#fff' strokeWidth='2.4' />
                            <path d='M18,0 L18,24 M0,12 L36,12' stroke='#fff' strokeWidth='4' />
                            <path d='M18,0 L18,24 M0,12 L36,12' stroke='#C8102E' strokeWidth='2.4' />
                          </svg>
                        ) : (
                          <span className="text-lg">🇩🇪</span>
                        )}
                      </div>
                      <span className="text-sm">{lang === 'fr' ? 'Français' : lang === 'en' ? 'English' : 'Deutsch'}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Menu mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 text-gray-500 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 bg-white/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.key}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all flex items-center space-x-3 ${
                      isActive 
                        ? 'text-primary-600 bg-primary-50' 
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    {IconComponent && <IconComponent className="w-4 h-4" />}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {!user && (
                <button 
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-600 text-white px-4 py-3 rounded-lg transition-all duration-200 font-semibold text-sm shadow-lg mx-4 mt-4"
                >
                  <User className="w-4 h-4" />
                  <span>Se connecter</span>
                </button>
              )}
            </nav>
          </div>
        )}
        
        {/* Breadcrumb */}
        {location.pathname !== '/' && (
          <div className="py-3 border-t border-gray-100 relative z-40">
            {getBreadcrumb()}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;