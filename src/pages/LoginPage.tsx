import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardBody } from '../components/ui/Card';

const LoginPage: React.FC = () => {
  const { user, login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<'admin' | 'manager' | 'user'>('user');

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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-bold text-2xl">W</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Connexion à WeNeedU
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Plateforme de missions Web3 Ultra Times
          </p>
        </div>

        {/* Quick login buttons */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Connexion rapide (démo)</h3>
          <div className="grid grid-cols-1 gap-3">
            <Button
              variant="outline"
              onClick={() => handleQuickLogin('admin')}
              className="justify-start"
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
              className="justify-start"
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
              className="justify-start"
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
        </Card>

        {/* Login form */}
        <Card>
          <CardBody>
            <form className="space-y-6" onSubmit={handleSubmit}>
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

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Ou connectez votre wallet</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => alert('Connexion wallet simulée - Feature à venir')}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connecter un wallet Ultra
                </Button>
              </div>
            </div>

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
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;