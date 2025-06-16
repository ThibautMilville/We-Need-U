import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Filter,
  Eye,
  Users,
  Briefcase,
  DollarSign,
  Target,
  Clock,
  Award,
  Activity,
  PieChart,
  LineChart,
  Building2,
  FileText,
  Mail,
  RefreshCcw
} from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';

interface ReportData {
  period: string;
  entities: {
    name: string;
    revenue: number;
    missions: number;
    members: number;
    growth: number;
  }[];
  performance: {
    totalRevenue: number;
    completedMissions: number;
    averageRating: number;
    teamEfficiency: number;
    trends: {
      revenue: 'up' | 'down' | 'stable';
      missions: 'up' | 'down' | 'stable';
      efficiency: 'up' | 'down' | 'stable';
    };
  };
  topPerformers: {
    name: string;
    score: number;
    missions: number;
    entity: string;
  }[];
  monthlyData: {
    month: string;
    revenue: number;
    missions: number;
    efficiency: number;
  }[];
}

const ManagerReportsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('last_month');
  const [selectedEntity, setSelectedEntity] = useState('all');
  const [reportData] = useState<ReportData>({
    period: 'Janvier 2024',
    entities: [
      {
        name: 'Ashes of Mankind',
        revenue: 42000,
        missions: 8,
        members: 15,
        growth: 15.2
      },
      {
        name: 'Metahoof',
        revenue: 28000,
        missions: 6,
        members: 12,
        growth: 23.7
      },
      {
        name: 'Ultra Studios',
        revenue: 18000,
        missions: 4,
        members: 8,
        growth: 8.3
      }
    ],
    performance: {
      totalRevenue: 88000,
      completedMissions: 18,
      averageRating: 4.7,
      teamEfficiency: 87.5,
      trends: {
        revenue: 'up',
        missions: 'up',
        efficiency: 'stable'
      }
    },
    topPerformers: [
      { name: 'Sophie Bernard', score: 95, missions: 6, entity: 'Ashes of Mankind' },
      { name: 'Marie Dubois', score: 93, missions: 5, entity: 'Ashes of Mankind' },
      { name: 'Thomas Petit', score: 88, missions: 4, entity: 'Metahoof' },
      { name: 'Lucas Durand', score: 85, missions: 3, entity: 'Metahoof' },
      { name: 'Pierre Martin', score: 78, missions: 2, entity: 'Ultra Studios' }
    ],
    monthlyData: [
      { month: 'Sep', revenue: 65000, missions: 12, efficiency: 82 },
      { month: 'Oct', revenue: 72000, missions: 15, efficiency: 85 },
      { month: 'Nov', revenue: 78000, missions: 16, efficiency: 86 },
      { month: 'Déc', revenue: 85000, missions: 17, efficiency: 87 },
      { month: 'Jan', revenue: 88000, missions: 18, efficiency: 88 }
    ]
  });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const exportReport = (format: 'pdf' | 'excel') => {
    console.log(`Exporting report as ${format}`);
    // Logique d'export à implémenter
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
                Rapports et Analytics
              </h1>
              <p className="text-gray-600">
                Analysez les performances de vos entités et équipes - {reportData.period}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={() => exportReport('pdf')}>
                <Download className="w-4 h-4 mr-2" />
                Exporter PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => exportReport('excel')}>
                <Download className="w-4 h-4 mr-2" />
                Exporter Excel
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCcw className="w-4 h-4 mr-2" />
                Actualiser
              </Button>
            </div>
          </div>

          {/* Filtres */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="last_week">Dernière semaine</option>
                  <option value="last_month">Dernier mois</option>
                  <option value="last_quarter">Dernier trimestre</option>
                  <option value="last_year">Dernière année</option>
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <Building2 className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedEntity}
                  onChange={(e) => setSelectedEntity(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Toutes les entités</option>
                  <option value="1">Ashes of Mankind</option>
                  <option value="2">Metahoof</option>
                  <option value="3">Ultra Studios</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* KPIs principaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Revenus totaux</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {reportData.performance.totalRevenue.toLocaleString()} €
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(reportData.performance.trends.revenue)}
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className={getTrendColor(reportData.performance.trends.revenue)}>
                  +12.5% vs mois dernier
                </span>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Missions complétées</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {reportData.performance.completedMissions}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(reportData.performance.trends.missions)}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className={getTrendColor(reportData.performance.trends.missions)}>
                  +6 missions vs mois dernier
                </span>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Note moyenne</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {reportData.performance.averageRating}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon('up')}
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600">
                  +0.2 vs mois dernier
                </span>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Efficacité équipe</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {reportData.performance.teamEfficiency}%
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(reportData.performance.trends.efficiency)}
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-600">
                  Stable vs mois dernier
                </span>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance par entité */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                  Performance par entité
                </h2>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Détails
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {reportData.entities.map((entity, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{entity.name}</h3>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600">
                          +{entity.growth}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-gray-900">
                          {entity.revenue.toLocaleString()}€
                        </p>
                        <p className="text-xs text-gray-600">Revenus</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">{entity.missions}</p>
                        <p className="text-xs text-gray-600">Missions</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">{entity.members}</p>
                        <p className="text-xs text-gray-600">Membres</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Top performers */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-600" />
                  Top performers
                </h2>
                <Button variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Voir tous
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                {reportData.topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{performer.name}</p>
                        <p className="text-sm text-gray-600">{performer.entity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{performer.score}%</p>
                      <p className="text-sm text-gray-600">{performer.missions} missions</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Graphique d'évolution */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <LineChart className="w-5 h-5 mr-2 text-purple-600" />
                Évolution mensuelle
              </h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <PieChart className="w-4 h-4 mr-2" />
                  Vue graphique
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Rapport détaillé
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Mois</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Revenus</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Missions</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Efficacité</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Évolution</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.monthlyData.map((data, index) => {
                    const previousData = reportData.monthlyData[index - 1];
                    const growth = previousData ? 
                      ((data.revenue - previousData.revenue) / previousData.revenue * 100).toFixed(1) : 
                      '0';
                    
                    return (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{data.month}</td>
                        <td className="text-right py-3 px-4 text-gray-900">
                          {data.revenue.toLocaleString()}€
                        </td>
                        <td className="text-right py-3 px-4 text-gray-900">{data.missions}</td>
                        <td className="text-right py-3 px-4 text-gray-900">{data.efficiency}%</td>
                        <td className="text-right py-3 px-4">
                          <div className="flex items-center justify-end space-x-1">
                            {parseFloat(growth) > 0 ? (
                              <TrendingUp className="w-4 h-4 text-green-500" />
                            ) : parseFloat(growth) < 0 ? (
                              <TrendingDown className="w-4 h-4 text-red-500" />
                            ) : (
                              <Activity className="w-4 h-4 text-gray-500" />
                            )}
                            <span className={
                              parseFloat(growth) > 0 ? 'text-green-600' :
                              parseFloat(growth) < 0 ? 'text-red-600' : 'text-gray-600'
                            }>
                              {growth}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>

        {/* Actions rapides */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Actions rapides</h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start p-4 h-auto">
                <div className="flex items-center space-x-3">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Envoyer rapport</p>
                    <p className="text-sm text-gray-600">Partager avec l'équipe</p>
                  </div>
                </div>
              </Button>
              
              <Button variant="outline" className="justify-start p-4 h-auto">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6 text-purple-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Planifier réunion</p>
                    <p className="text-sm text-gray-600">Review performance</p>
                  </div>
                </div>
              </Button>
              
              <Button variant="outline" className="justify-start p-4 h-auto">
                <div className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-green-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Définir objectifs</p>
                    <p className="text-sm text-gray-600">Mois prochain</p>
                  </div>
                </div>
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ManagerReportsPage; 