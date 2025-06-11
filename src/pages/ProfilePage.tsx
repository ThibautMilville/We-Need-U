import React from 'react';
import { User, Mail, Phone, MapPin, Edit } from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mon profil
          </h1>
          <p className="text-gray-600">
            Gérez vos informations personnelles et préférences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <h2 className="text-xl font-semibold">Informations personnelles</h2>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
              </CardHeader>
              <CardBody className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">John Doe</h3>
                    <p className="text-gray-500">Membre depuis janvier 2024</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">john.doe@example.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Téléphone</p>
                      <p className="font-medium">+33 1 23 45 67 89</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Localisation</p>
                      <p className="font-medium">Paris, France</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Statistiques</h2>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Missions terminées</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">UOS gagnés</span>
                  <span className="font-semibold">2,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taux de réussite</span>
                  <span className="font-semibold">92%</span>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 