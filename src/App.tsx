import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TranslationProvider } from './contexts/TranslationContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MissionsPage from './pages/MissionsPage';
import MissionDetailPage from './pages/MissionDetailPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import ManageMissionsPage from './pages/ManageMissionsPage';
import ManageUsersPage from './pages/ManageUsersPage';
import PublicProfilePage from './pages/PublicProfilePage';
import MyMissionsPage from './pages/MyMissionsPage';
import PaymentsPage from './pages/PaymentsPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <TranslationProvider>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/missions" element={<MissionsPage />} />
            <Route path="/missions/:id" element={<MissionDetailPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/manage-missions" element={<ManageMissionsPage />} />
            <Route path="/manage-users" element={<ManageUsersPage />} />
            <Route path="/profile/:userId" element={<PublicProfilePage />} />
            <Route path="/my-missions" element={<MyMissionsPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </TranslationProvider>
  );
}

export default App;