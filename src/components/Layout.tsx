import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();
  
  const isLoginPage = location.pathname === '/login';
  const showFooter = !isLoginPage && (!user || user.role === 'user');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isLoginPage && <Header />}
      
      <main className="flex-1">
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;