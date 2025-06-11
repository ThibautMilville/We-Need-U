import React, { useState } from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';

const MyMissionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'pending'>('active');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mes missions
          </h1>
          <p className="text-gray-600">
            Suivez l'avancement de vos missions
          </p>
        </div>

        {/* Onglets */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('active')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'active'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                En cours (2)
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'completed'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Terminées (12)
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'pending'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                En attente (1)
              </button>
            </nav>
          </div>
        </div>

        {/* Contenu des onglets */}
        <div className="space-y-6">
          {activeTab === 'active' && (
            <div className="space-y-4">
              <Card>
                <CardBody>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Développement d'une application mobile
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Création d'une application mobile pour la gestion des tâches quotidiennes
                      </p>
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          Deadline: 28 février 2024
                        </span>
                        <span className="text-sm font-medium text-primary-600">500 UOS</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                        En cours
                      </span>
                      <Button size="sm">Voir détails</Button>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Rédaction d'articles de blog
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Rédaction de 5 articles sur les nouvelles technologies
                      </p>
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          Deadline: 15 mars 2024
                        </span>
                        <span className="text-sm font-medium text-primary-600">200 UOS</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                        En cours
                      </span>
                      <Button size="sm">Voir détails</Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}

          {activeTab === 'completed' && (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Missions terminées</h3>
              <p className="text-gray-500">Vous avez terminé 12 missions avec succès !</p>
            </div>
          )}

          {activeTab === 'pending' && (
            <div className="text-center py-8">
              <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Candidatures en attente</h3>
              <p className="text-gray-500">1 candidature en cours de validation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyMissionsPage; 