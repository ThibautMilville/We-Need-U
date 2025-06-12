import React from 'react';
import { User, Mail, Phone, MapPin, Edit, Wallet } from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { useUltraWallet } from '../utils/ultraWallet';
import { useState } from 'react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<'infos' | 'wallet' | 'preferences' | 'stats'>('infos');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const ultraWallet = useUltraWallet();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center animate-fade-in-up">
          <h2 className="text-3xl font-bold text-primary-600 mb-4">Accès réservé</h2>
          <p className="text-gray-600 mb-6">Connecte-toi pour accéder à ton profil et gérer tes réglages !</p>
          <Button className="bg-gradient-to-r from-primary-500 to-secondary-600 text-white font-bold py-3 rounded-2xl w-full" onClick={() => window.location.href = '/login'}>
            Se connecter
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 pb-24 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 hidden md:flex flex-col bg-white/80 border-r border-gray-200 shadow-lg rounded-tr-3xl rounded-br-3xl py-10 px-6 mr-8">
        <nav className="space-y-4">
          <button onClick={() => setActiveSection('infos')} className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${activeSection === 'infos' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}`}>Infos personnelles</button>
          <button onClick={() => setActiveSection('wallet')} className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${activeSection === 'wallet' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}`}>Wallet Ultra</button>
          <button onClick={() => setActiveSection('preferences')} className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${activeSection === 'preferences' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}`}>Préférences</button>
          <button onClick={() => setActiveSection('stats')} className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${activeSection === 'stats' ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}`}>Statistiques</button>
        </nav>
      </aside>
      {/* Contenu principal */}
      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        {/* Header visuel et avatar */}
        <div className="text-center mb-8 relative">
          <div className="h-48 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-b-3xl absolute top-0 left-0 w-full z-0" />
          <div className="relative z-10 flex flex-col items-center justify-center">
            <img src={user.avatar || `/logo-ut.png`} alt={user.name} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl -mt-24 mb-2" />
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 flex items-center justify-center gap-2">
              {user.name}
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold ml-2 uppercase tracking-wide shadow-sm">{user.role}</span>
            </h1>
            <p className="text-gray-500 text-lg">{user.email}</p>
          </div>
        </div>
        {/* Sections dynamiques */}
        {activeSection === 'infos' && (
          <Card className="glass shadow-2xl mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-xl font-semibold">Informations personnelles</h2>
              <Button variant="outline" size="sm" onClick={() => setShowEditModal(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Modifier
              </Button>
            </CardHeader>
            <CardBody className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
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
        )}
        {activeSection === 'wallet' && (
          <Card className="glass shadow-2xl mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-xl font-semibold">Wallet Ultra</h2>
              <Button variant="outline" size="sm" onClick={() => setShowWalletModal(true)}>
                <Wallet className="w-4 h-4 mr-2" />
                Gérer
              </Button>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex items-center space-x-3">
                <Wallet className="w-6 h-6 text-primary-600" />
                <span className="font-mono text-gray-700">{ultraWallet.blockchainId || 'Non connecté'}</span>
              </div>
              {ultraWallet.isConnected ? (
                <Button variant="outline" className="w-full" onClick={ultraWallet.disconnect} loading={ultraWallet.isLoading}>Déconnecter le wallet</Button>
              ) : (
                <Button variant="outline" className="w-full" onClick={ultraWallet.connect} loading={ultraWallet.isLoading}>Connecter le wallet Ultra</Button>
              )}
              {ultraWallet.error && <div className="text-red-600 text-sm mt-2">{ultraWallet.error}</div>}
            </CardBody>
          </Card>
        )}
        {activeSection === 'preferences' && (
          <Card className="glass shadow-2xl mb-8">
            <CardHeader>
              <h2 className="text-xl font-semibold">Préférences</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Notifications email</span>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-primary-600" checked readOnly />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Newsletter</span>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-primary-600" />
              </div>
            </CardBody>
          </Card>
        )}
        {activeSection === 'stats' && (
          <Card className="glass shadow-2xl mb-8">
            <CardHeader>
              <h2 className="text-xl font-semibold">Statistiques</h2>
            </CardHeader>
            <CardBody className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Missions terminées</span>
                <span className="font-bold text-green-600 text-lg animate-fade-in-up">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">UOS gagnés</span>
                <span className="font-bold text-primary-600 text-lg animate-fade-in-up">2,450</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Taux de réussite</span>
                <span className="font-bold text-yellow-600 text-lg animate-fade-in-up">92%</span>
              </div>
            </CardBody>
          </Card>
        )}
        {/* Modals popups */}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowEditModal(false)}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in-up" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setShowEditModal(false)}>
                <span className="text-2xl">&times;</span>
              </button>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Modifier mes informations</h2>
              {/* Formulaire de modification (à compléter selon besoins) */}
              <input className="w-full border border-gray-300 rounded-xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Nom" defaultValue={user.name} />
              <input className="w-full border border-gray-300 rounded-xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Email" defaultValue={user.email} />
              <Button className="w-full bg-gradient-to-r from-primary-500 to-secondary-600 text-white font-bold py-3 rounded-2xl mt-2">Enregistrer</Button>
            </div>
          </div>
        )}
        {showWalletModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowWalletModal(false)}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in-up" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setShowWalletModal(false)}>
                <span className="text-2xl">&times;</span>
              </button>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Gérer mon wallet Ultra</h2>
              {ultraWallet.isConnected ? (
                <>
                  <div className="mb-4 text-center">
                    <Wallet className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                    <div className="font-mono text-lg text-gray-700">{ultraWallet.blockchainId}</div>
                    <div className="text-xs text-gray-500 mt-1">Connecté</div>
                  </div>
                  <Button className="w-full" variant="outline" onClick={ultraWallet.disconnect} loading={ultraWallet.isLoading}>Déconnecter</Button>
                </>
              ) : (
                <Button className="w-full" variant="outline" onClick={ultraWallet.connect} loading={ultraWallet.isLoading}>Connecter le wallet Ultra</Button>
              )}
              {ultraWallet.error && <div className="text-red-600 text-sm mt-2">{ultraWallet.error}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage; 