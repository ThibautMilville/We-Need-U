import React, { useState } from 'react';
import { CreditCard, Download, Filter, Calendar } from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const PaymentsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const { user } = useAuth();

  const payments = [
    {
      id: '1',
      missionTitle: 'Développement d\'une application mobile',
      amount: 500,
      status: 'completed' as const,
      date: '2024-01-20',
      type: 'immediate' as const
    },
    {
      id: '2',
      missionTitle: 'Rédaction d\'articles de blog',
      amount: 200,
      status: 'pending' as const,
      date: '2024-01-18',
      type: 'deferred' as const,
      unlockDate: '2024-02-18'
    },
    {
      id: '3',
      missionTitle: 'Design d\'interface utilisateur',
      amount: 350,
      status: 'completed' as const,
      date: '2024-01-15',
      type: 'immediate' as const
    }
  ];

  const filteredPayments = payments.filter(payment => {
    if (filter === 'all') return true;
    return payment.status === filter;
  });

  const totalEarned = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center animate-fade-in-up">
          <h2 className="text-3xl font-bold text-primary-600 mb-4">Accès réservé</h2>
          <p className="text-gray-600 mb-6">Connecte-toi pour consulter l'historique de tes paiements et tes gains !</p>
          <Button className="bg-gradient-to-r from-primary-500 to-secondary-600 text-white font-bold py-3 rounded-2xl w-full" onClick={() => window.location.href = '/login'}>
            Se connecter
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Paiements
          </h1>
          <p className="text-gray-600">
            Gérez vos gains et transactions UOS
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-fade-in-up">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 shadow-xl">
            <CardBody className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{totalEarned}</div>
              <div className="text-sm text-gray-500">UOS gagnés</div>
            </CardBody>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-100 border-yellow-200 shadow-xl">
            <CardBody className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{pendingAmount}</div>
              <div className="text-sm text-gray-500">UOS en attente</div>
            </CardBody>
          </Card>
          <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200 shadow-xl">
            <CardBody className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">{totalEarned + pendingAmount}</div>
              <div className="text-sm text-gray-500">Total UOS</div>
            </CardBody>
          </Card>
        </div>

        {/* Filtres et actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Tous les paiements</option>
              <option value="completed">Paiements reçus</option>
              <option value="pending">En attente</option>
            </select>
          </div>

          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>

        {/* Liste des paiements */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Historique des transactions</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {filteredPayments.map((payment) => (
                <div key={payment.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">
                        {payment.missionTitle}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(payment.date).toLocaleDateString('fr-FR')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          payment.status === 'completed' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {payment.status === 'completed' ? 'Reçu' : 'En attente'}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          payment.type === 'immediate' 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-purple-100 text-purple-600'
                        }`}>
                          {payment.type === 'immediate' ? 'Immédiat' : 'Différé'}
                        </span>
                      </div>
                      {payment.unlockDate && (
                        <div className="text-sm text-gray-500 mt-1">
                          Disponible le {new Date(payment.unlockDate).toLocaleDateString('fr-FR')}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">
                        {payment.amount} UOS
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredPayments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <CreditCard className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Aucun paiement trouvé pour ce filtre.</p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default PaymentsPage; 