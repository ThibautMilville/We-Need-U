import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Building2,
  Users,
  Briefcase,
  FileText,
  DollarSign,
  Settings,
  Home,
  Shield,
  ChevronRight
} from 'lucide-react';

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const ManagerSidebar: React.FC = () => {
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { name: 'Dashboard Manager', href: '/manager-dashboard', icon: BarChart3 },
    { name: 'Mes Entités', href: '/manager-entities', icon: Building2 },
    { name: 'Gestion Missions', href: '/manage-missions', icon: Shield },
    { name: 'Rapports', href: '/manager-reports', icon: FileText },
    { name: 'Paiements', href: '/payments', icon: DollarSign }
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 shadow-sm overflow-y-auto">
      <div className="p-4">
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900">Espace Gestionnaire</span>
          </div>
          <p className="text-sm text-gray-600">Navigation dédiée aux managers</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.href);
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100">
          <div className="flex items-center space-x-2 mb-2">
            <Settings className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Configuration</span>
          </div>
          <p className="text-xs text-gray-600 mb-3">
            Personnalisez votre espace de gestion
          </p>
          <Link 
            to="/settings" 
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Accéder aux paramètres →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManagerSidebar; 