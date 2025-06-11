import React from 'react';
import { BarChart3, Users, CheckCircle, Clock } from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tableau de bord
          </h1>
          <p className="text-gray-600">
            Vue d'ensemble de vos activités et statistiques
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardBody className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Missions terminées</p>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Missions en cours</p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart3 className="h-8 w-8 text-purple-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">UOS gagnés</p>
                <p className="text-2xl font-semibold text-gray-900">2,450</p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-orange-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Taux de réussite</p>
                <p className="text-2xl font-semibold text-gray-900">92%</p>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Activité récente</h2>
            </CardHeader>
            <CardBody>
              <p className="text-gray-500">Fonctionnalité en développement...</p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Missions recommandées</h2>
            </CardHeader>
            <CardBody>
              <p className="text-gray-500">Fonctionnalité en développement...</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 