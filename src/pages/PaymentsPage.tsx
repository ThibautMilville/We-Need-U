import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Filter,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  Briefcase,
  CreditCard,
  PieChart,
  BarChart3,
  Activity,
  RefreshCw
} from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

interface WalletData {
  totalBalance: number;
  availableBalance: number;
  pendingPayments: number;
  lockedFunds: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  growthRate: number;
}

interface PaymentTransaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  user: {
    name: string;
    email: string;
  };
  mission?: {
    id: string;
    title: string;
  };
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
  category: string;
}

interface ChartData {
  labels: string[];
  income: number[];
  expenses: number[];
}

const PaymentsPage: React.FC = () => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  useEffect(() => {
    const loadPaymentData = async () => {
      setLoading(true);
      
      // Simulation de chargement des données
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Données simulées du wallet
      setWalletData({
        totalBalance: 125680,
        availableBalance: 98450,
        pendingPayments: 15230,
        lockedFunds: 12000,
        monthlyIncome: 45680,
        monthlyExpenses: 32150,
        growthRate: 18.5
      });

      // Données simulées des transactions
      setTransactions([
    {
      id: '1',
          type: 'expense',
          amount: 1500,
          description: 'Paiement mission développement app mobile',
          user: { name: 'Sophie Bernard', email: 'sophie.bernard@example.com' },
          mission: { id: '1', title: 'Développement App Mobile Ultra' },
          status: 'completed',
          createdAt: '2024-01-25T14:30:00Z',
          category: 'Mission Payment'
    },
    {
      id: '2',
          type: 'expense',
          amount: 800,
          description: 'Paiement mission design UI/UX',
          user: { name: 'Pierre Martin', email: 'pierre.martin@example.com' },
          mission: { id: '2', title: 'Design Interface Web3' },
          status: 'pending',
          createdAt: '2024-01-25T11:15:00Z',
          category: 'Mission Payment'
    },
    {
      id: '3',
          type: 'income',
          amount: 5000,
          description: 'Financement mensuel Ultra Times',
          user: { name: 'Ultra Times Treasury', email: 'treasury@ultratimes.io' },
          status: 'completed',
          createdAt: '2024-01-25T09:00:00Z',
          category: 'Funding'
        },
        {
          id: '4',
          type: 'expense',
          amount: 2000,
          description: 'Paiement mission audit smart contracts',
          user: { name: 'Lucas Durand', email: 'lucas.durand@example.com' },
          mission: { id: '3', title: 'Audit Smart Contracts' },
          status: 'completed',
          createdAt: '2024-01-24T16:45:00Z',
          category: 'Mission Payment'
        },
        {
          id: '5',
          type: 'expense',
          amount: 600,
          description: 'Paiement mission marketing',
          user: { name: 'Julie Moreau', email: 'julie.moreau@example.com' },
          mission: { id: '4', title: 'Campagne Marketing' },
          status: 'failed',
          createdAt: '2024-01-24T13:20:00Z',
          category: 'Mission Payment'
        }
      ]);

      // Données simulées pour les graphiques
      setChartData({
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
        income: [35000, 42000, 38000, 45000, 48000, 52000],
        expenses: [28000, 32000, 35000, 38000, 41000, 44000]
      });

      setLoading(false);
    };

    loadPaymentData();
  }, [selectedPeriod]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Terminé',
          color: 'bg-green-100 text-green-700',
          icon: CheckCircle,
          iconColor: 'text-green-500'
        };
      case 'pending':
        return {
          label: 'En attente',
          color: 'bg-yellow-100 text-yellow-700',
          icon: Clock,
          iconColor: 'text-yellow-500'
        };
      case 'failed':
        return {
          label: 'Échoué',
          color: 'bg-red-100 text-red-700',
          icon: AlertTriangle,
          iconColor: 'text-red-500'
        };
      default:
        return {
          label: 'Inconnu',
          color: 'bg-gray-100 text-gray-700',
          icon: Activity,
          iconColor: 'text-gray-500'
        };
    }
  };

  const DonutChart: React.FC<{ data: WalletData }> = ({ data }) => {
    const total = data.totalBalance;
    const available = data.availableBalance;
    const pending = data.pendingPayments;
    const locked = data.lockedFunds;

    const availablePercentage = (available / total) * 100;
    const pendingPercentage = (pending / total) * 100;
    const lockedPercentage = (locked / total) * 100;

    // Calcul des angles pour le SVG
    const availableAngle = (availablePercentage / 100) * 360;
    const pendingAngle = (pendingPercentage / 100) * 360;
    const lockedAngle = (lockedPercentage / 100) * 360;

    return (
      <div className="relative w-48 h-48 mx-auto">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Cercle de fond */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="8"
          />
          
          {/* Segment disponible */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#10b981"
            strokeWidth="8"
            strokeDasharray={`${(availableAngle / 360) * 251.2} 251.2`}
            strokeDashoffset="0"
            className="transition-all duration-1000 ease-in-out"
          />
          
          {/* Segment en attente */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="8"
            strokeDasharray={`${(pendingAngle / 360) * 251.2} 251.2`}
            strokeDashoffset={`-${(availableAngle / 360) * 251.2}`}
            className="transition-all duration-1000 ease-in-out"
          />
          
          {/* Segment verrouillé */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#ef4444"
            strokeWidth="8"
            strokeDasharray={`${(lockedAngle / 360) * 251.2} 251.2`}
            strokeDashoffset={`-${((availableAngle + pendingAngle) / 360) * 251.2}`}
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>
        
        {/* Centre du donut */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {(total / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-gray-600">UOS Total</div>
          </div>
        </div>
      </div>
    );
  };

  const LineChart: React.FC<{ data: ChartData }> = ({ data }) => {
    const maxValue = Math.max(...data.income, ...data.expenses);
    const chartHeight = 200;
    
    const getYPosition = (value: number) => {
      return chartHeight - (value / maxValue) * (chartHeight - 40);
    };

    const incomePoints = data.income.map((value, index) => {
      const x = (index / (data.income.length - 1)) * 300;
      const y = getYPosition(value);
      return `${x},${y}`;
    }).join(' ');

    const expensePoints = data.expenses.map((value, index) => {
      const x = (index / (data.expenses.length - 1)) * 300;
      const y = getYPosition(value);
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="w-full h-64">
        <svg className="w-full h-full" viewBox="0 0 300 200">
          {/* Grille de fond */}
          <defs>
            <pattern id="grid" width="50" height="40" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="300" height="200" fill="url(#grid)" />
          
          {/* Ligne des revenus */}
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            points={incomePoints}
            className="drop-shadow-sm"
          />
          
          {/* Ligne des dépenses */}
          <polyline
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
            points={expensePoints}
            className="drop-shadow-sm"
          />
          
          {/* Points des revenus */}
          {data.income.map((value, index) => {
            const x = (index / (data.income.length - 1)) * 300;
            const y = getYPosition(value);
            return (
              <circle
                key={`income-${index}`}
                cx={x}
                cy={y}
                r="4"
                fill="#10b981"
                className="drop-shadow-sm"
              />
            );
          })}
          
          {/* Points des dépenses */}
          {data.expenses.map((value, index) => {
            const x = (index / (data.expenses.length - 1)) * 300;
            const y = getYPosition(value);
            return (
              <circle
                key={`expense-${index}`}
                cx={x}
                cy={y}
                r="4"
                fill="#ef4444"
                className="drop-shadow-sm"
              />
            );
          })}
        </svg>
        
        {/* Légende */}
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Revenus</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Dépenses</span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des données de paiement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Gestion des paiements
          </h1>
          <p className="text-gray-600">
                Suivi des transactions et gestion du wallet Ultra Times
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="text-gray-600">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
              <Button className="bg-primary-600 hover:bg-primary-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualiser
              </Button>
            </div>
          </div>
        </div>

        {/* Statistiques du wallet */}
        {walletData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="card-hover">
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Solde total</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {walletData.totalBalance.toLocaleString()} UOS
                    </p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">+{walletData.growthRate}%</span>
                      <span className="text-sm text-gray-500 ml-1">ce mois</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="card-hover">
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Disponible</p>
                    <p className="text-3xl font-bold text-green-600">
                      {walletData.availableBalance.toLocaleString()}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-600">
                        {((walletData.availableBalance / walletData.totalBalance) * 100).toFixed(1)}% du total
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
            </CardBody>
          </Card>

            <Card className="card-hover">
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">En attente</p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {walletData.pendingPayments.toLocaleString()}
                    </p>
                    <div className="flex items-center mt-2">
                      <Clock className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-yellow-600 font-medium">À traiter</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
            </CardBody>
          </Card>

            <Card className="card-hover">
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Verrouillé</p>
                    <p className="text-3xl font-bold text-red-600">
                      {walletData.lockedFunds.toLocaleString()}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-600">Fonds de garantie</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
            </CardBody>
          </Card>
        </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Graphique d'évolution */}
          <div className="lg:col-span-2">
            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
                    Évolution des flux financiers
                  </h2>
                  <div className="flex items-center space-x-2">
                    {(['7d', '30d', '90d', '1y'] as const).map((period) => (
                      <Button
                        key={period}
                        variant={selectedPeriod === period ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setSelectedPeriod(period)}
                        className="px-3 py-1 text-xs"
                      >
                        {period}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardBody className="p-6">
                {chartData && <LineChart data={chartData} />}
              </CardBody>
            </Card>
          </div>

          {/* Répartition du wallet (Donut) */}
          <div>
            <Card className="card-hover">
          <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-purple-500" />
                  Répartition du wallet
                </h2>
          </CardHeader>
              <CardBody className="p-6">
                {walletData && (
                  <>
                    <DonutChart data={walletData} />
                    
                    {/* Légende */}
                    <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">Disponible</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {walletData.availableBalance.toLocaleString()} UOS
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">En attente</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {walletData.pendingPayments.toLocaleString()} UOS
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">Verrouillé</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {walletData.lockedFunds.toLocaleString()} UOS
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </CardBody>
            </Card>
                  </div>
                </div>

        {/* Transactions récentes */}
        <div className="mt-8">
          <Card className="card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-green-500" />
                  Transactions récentes
                </h2>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrer
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Voir tout
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="space-y-4">
                {transactions.map((transaction) => {
                  const statusConfig = getStatusConfig(transaction.status);
                  
                  return (
                    <div
                      key={transaction.id}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'income' ? (
                          <ArrowDownRight className="w-5 h-5 text-green-600" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {transaction.description}
                          </h3>
                          <div className="flex items-center space-x-3">
                            <span className={`text-lg font-bold ${
                              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString()} UOS
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                              {statusConfig.label}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center space-x-4">
                            <span>{transaction.user.name}</span>
                            {transaction.mission && (
                              <Link 
                                to={`/missions/${transaction.mission.id}`}
                                className="text-primary-600 hover:text-primary-700 font-medium"
                              >
                                {transaction.mission.title}
                              </Link>
                            )}
                            <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs">
                              {transaction.category}
                            </span>
                          </div>
                          <span>{new Date(transaction.createdAt).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardBody>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage; 