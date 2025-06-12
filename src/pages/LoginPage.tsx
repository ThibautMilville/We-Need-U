import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardBody } from '../components/ui/Card';
import { useUltraWallet } from '../utils/ultraWallet';

const LoginPage: React.FC = () => {
  const { user, login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<'admin' | 'manager' | 'user'>('user');
  const ultraWallet = useUltraWallet();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoginLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleQuickLogin = (userType: 'admin' | 'manager' | 'user') => {
    const credentials = {
      admin: { email: 'admin@ultra.io', password: 'password' },
      manager: { email: 'manager@ultra.io', password: 'password' },
      user: { email: 'user@ultra.io', password: 'password' }
    };

    setEmail(credentials[userType].email);
    setPassword(credentials[userType].password);
    setSelectedUserType(userType);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Image de fond stylisée */}
      <img src="/login-bg.jpg" alt="background" className="absolute inset-0 w-full h-full object-cover object-center opacity-60 z-0" />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white/80 to-secondary-100 z-10" />
      <div className="max-w-md w-full space-y-8 relative z-20">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <img src="/logo-ut.png" alt="Ultra Times Logo" className="w-16 h-16 object-contain mb-4" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 drop-shadow-lg">
            Connexion à WeNeedU
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Plateforme de missions Web3 Ultra Times
          </p>
        </div>
        {/* Carte de connexion */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-8 animate-fade-in-up">
          {/* Connexion Ultra Wallet */}
          <Button
            variant="outline"
            className="w-full flex items-center justify-center mb-4"
            onClick={ultraWallet.connect}
            loading={ultraWallet.isLoading}
            disabled={!ultraWallet.isInstalled}
          >
            <Wallet className="w-4 h-4 mr-2" />
            {ultraWallet.isConnected ? 'Wallet connecté' : 'Se connecter avec Ultra Wallet'}
          </Button>
          {ultraWallet.error && <div className="text-red-600 text-sm mb-2">{ultraWallet.error}</div>}
          {/* Quick login buttons */}
          <div className="space-y-2">
            <Button
              variant="outline"
              onClick={() => handleQuickLogin('admin')}
              className="justify-start w-full"
            >
              <div className="flex items-center">
                <div className="w-3 h-3 bg-error-500 rounded-full mr-3"></div>
                <div>
                  <div className="font-medium">Administrateur</div>
                  <div className="text-xs text-gray-500">Gestion complète</div>
                </div>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleQuickLogin('manager')}
              className="justify-start w-full"
            >
              <div className="flex items-center">
                <div className="w-3 h-3 bg-warning-500 rounded-full mr-3"></div>
                <div>
                  <div className="font-medium">Gestionnaire</div>
                  <div className="text-xs text-gray-500">Validation missions</div>
                </div>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleQuickLogin('user')}
              className="justify-start w-full"
            >
              <div className="flex items-center">
                <div className="w-3 h-3 bg-success-500 rounded-full mr-3"></div>
                <div>
                  <div className="font-medium">Utilisateur</div>
                  <div className="text-xs text-gray-500">Missions uniquement</div>
                </div>
              </div>
            </Button>
          </div>
          {/* Login form */}
          <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="votre@email.com"
            />
            <Input
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
            <Button
              type="submit"
              className="w-full"
              loading={loginLoading}
              disabled={!email || !password}
            >
              Se connecter
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600">
              En vous connectant, vous acceptez nos{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Conditions d'utilisation
              </a>{' '}
              et notre{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Politique de confidentialité
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;