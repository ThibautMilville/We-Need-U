import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);
  return null;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();
  
  const isLoginPage = location.pathname === '/login';
  const showFooter = !isLoginPage;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isLoginPage && <Header />}
      <ScrollToTop />
      <main className="flex-1">
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;