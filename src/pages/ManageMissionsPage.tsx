import React from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';

const ManageMissionsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gérer les missions
            </h1>
            <p className="text-gray-600">
              Créez et gérez vos missions
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle mission
          </Button>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Mes missions</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {/* Exemple de mission */}
              <div className="border rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Développement d'une application mobile</h3>
                  <p className="text-sm text-gray-500">Créée le 15 janvier 2024</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                      Ouverte
                    </span>
                    <span className="text-sm text-gray-500">3/5 candidats</span>
                    <span className="text-sm font-medium text-primary-600">500 UOS</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="text-center py-8 text-gray-500">
                <p>Aucune autre mission pour le moment.</p>
                <Button variant="outline" className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Créer votre première mission
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ManageMissionsPage; 