import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  MapPin, 
  Mail, 
  Trophy, 
  Star, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Award,
  Target,
  Zap,
  Crown,
  Medal,
  ArrowLeft,
  ExternalLink,
  X,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Shield,
  Flame,
  Gem,
  Sparkles,
  TrendingUp,
  Users,
  Eye,
  ChevronRight,
  ChevronLeft,
  Lock,
  Gift,
  Coins
} from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

interface Mission {
  id: string;
  title: string;
  description: string;
  reward: number;
  status: 'completed' | 'in_progress' | 'cancelled';
  completedAt?: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'legendary';
  earnedAt?: string;
  category: string;
  level: number;
  maxLevel: number;
  progress: number;
  requirements: string;
  xpReward: number;
  uosReward?: number;
  uniqReward?: string;
  isUnlocked: boolean;
}

interface Review {
  id: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
  missionId?: string;
  missionTitle?: string;
  helpful: number;
  verified: boolean;
}

interface UserLevel {
  level: number;
  title: string;
  currentXP: number;
  nextLevelXP: number;
  totalXP: number;
  color: string;
  icon: string;
}

interface PublicProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  joinedAt: string;
  location?: string;
  bio?: string;
  totalMissions: number;
  completedMissions: number;
  totalEarnings: number;
  averageRating: number;
  achievements: Achievement[];
  recentMissions: Mission[];
  reviews: Review[];
  userLevel: UserLevel;
  totalReviews: number;
  responseRate: number;
  averageCompletionTime: number;
}

const PublicProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [currentMissionPage, setCurrentMissionPage] = useState(1);
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  
  const missionsPerPage = 4;
  const reviewsPerPage = 3;

  useEffect(() => {
    // Simulation de chargement des données
    const loadProfile = async () => {
      setLoading(true);
      
      // Données simulées avec profils différents selon l'ID
      const getProfileData = (id: string): PublicProfile => {
        const profiles = {
          '1': {
            firstName: 'Sophie',
            lastName: 'Bernard',
            bio: 'Développeuse passionnée par les technologies Web3 et l\'écosystème Ultra. Spécialisée en React et smart contracts.',
            totalMissions: 28,
            completedMissions: 25,
            totalEarnings: 8450,
            averageRating: 4.9,
            totalReviews: 18,
            responseRate: 98,
            averageCompletionTime: 2.3,
            userLevel: {
              level: 15,
              title: 'Maître Développeur',
              currentXP: 2800,
              nextLevelXP: 3200,
              totalXP: 15800,
              color: 'from-purple-500 to-pink-500',
              icon: '👑'
            }
          },
          '2': {
            firstName: 'Lucas',
            lastName: 'Durand',
            bio: 'Expert en audit de smart contracts et sécurité blockchain. Passionné par l\'innovation Web3.',
            totalMissions: 45,
            completedMissions: 42,
            totalEarnings: 15200,
            averageRating: 4.8,
            totalReviews: 32,
            responseRate: 95,
            averageCompletionTime: 3.1,
            userLevel: {
              level: 22,
              title: 'Expert Légendaire',
              currentXP: 1200,
              nextLevelXP: 2000,
              totalXP: 28200,
              color: 'from-yellow-400 to-orange-500',
              icon: '⚡'
            }
          }
        };

        const defaultProfile = profiles['1'];
        const selectedProfile = profiles[id as keyof typeof profiles] || defaultProfile;

        return {
          id: id || '1',
          email: `${selectedProfile.firstName.toLowerCase()}.${selectedProfile.lastName.toLowerCase()}@example.com`,
          role: 'user',
          joinedAt: '2024-01-15',
          location: 'Paris, France',
          ...selectedProfile,
          achievements: getAchievements(selectedProfile.completedMissions),
          reviews: getReviews(id || '1'),
          recentMissions: getRecentMissions()
        };
      };

      const getAllAchievements = (completedMissions: number): Achievement[] => {
        const allPossibleAchievements = [
          // Succès de débutant
          {
            id: '1',
            name: 'Premier Pas',
            description: 'Terminer sa première mission avec succès',
            icon: '🎯',
            rarity: 'bronze' as const,
            earnedAt: completedMissions >= 1 ? '2024-01-16T10:30:00Z' : undefined,
            category: 'Débutant',
            level: 1,
            maxLevel: 1,
            progress: Math.min(completedMissions, 1) * 100,
            requirements: 'Terminer 1 mission',
            xpReward: 100,
            uosReward: 50,
            isUnlocked: completedMissions >= 1
          },
          {
            id: '2',
            name: 'Explorateur',
            description: 'Terminer 3 missions différentes',
            icon: '🗺️',
            rarity: 'bronze' as const,
            earnedAt: completedMissions >= 3 ? '2024-01-18T12:00:00Z' : undefined,
            category: 'Débutant',
            level: 1,
            maxLevel: 1,
            progress: Math.min(completedMissions, 3) * 33.33,
            requirements: 'Terminer 3 missions',
            xpReward: 150,
            uosReward: 75,
            isUnlocked: completedMissions >= 3
          },
          // Succès de développement
          {
            id: '3',
            name: 'Développeur Novice',
            description: 'Terminer 5 missions de développement',
            icon: '💻',
            rarity: 'bronze' as const,
            earnedAt: completedMissions >= 5 ? '2024-01-20T14:15:00Z' : undefined,
            category: 'Développement',
            level: 1,
            maxLevel: 5,
            progress: Math.min(completedMissions, 5) * 20,
            requirements: 'Terminer 5 missions de développement',
            xpReward: 250,
            uosReward: 100,
            isUnlocked: completedMissions >= 5
          },
          {
            id: '4',
            name: 'Développeur Confirmé',
            description: 'Terminer 10 missions de développement',
            icon: '⚙️',
            rarity: 'silver' as const,
            earnedAt: completedMissions >= 10 ? '2024-01-25T09:45:00Z' : undefined,
            category: 'Développement',
            level: 2,
            maxLevel: 5,
            progress: Math.min(completedMissions, 10) * 10,
            requirements: 'Terminer 10 missions de développement',
            xpReward: 500,
            uosReward: 250,
            isUnlocked: completedMissions >= 10
          },
          {
            id: '5',
            name: 'Développeur Expert',
            description: 'Terminer 20 missions de développement',
            icon: '🚀',
            rarity: 'gold' as const,
            earnedAt: completedMissions >= 20 ? '2024-02-01T11:30:00Z' : undefined,
            category: 'Développement',
            level: 3,
            maxLevel: 5,
            progress: Math.min(completedMissions, 20) * 5,
            requirements: 'Terminer 20 missions de développement',
            xpReward: 1000,
            uosReward: 500,
            uniqReward: 'Dev Master Badge',
            isUnlocked: completedMissions >= 20
          },
          {
            id: '6',
            name: 'Développeur Maître',
            description: 'Terminer 35 missions de développement',
            icon: '👑',
            rarity: 'platinum' as const,
            earnedAt: completedMissions >= 35 ? '2024-02-10T16:45:00Z' : undefined,
            category: 'Développement',
            level: 4,
            maxLevel: 5,
            progress: Math.min(completedMissions, 35) * 2.86,
            requirements: 'Terminer 35 missions de développement',
            xpReward: 2000,
            uosReward: 1000,
            uniqReward: 'Master Developer Crown',
            isUnlocked: completedMissions >= 35
          },
          {
            id: '7',
            name: 'Développeur Légendaire',
            description: 'Terminer 50 missions de développement',
            icon: '⚡',
            rarity: 'legendary' as const,
            earnedAt: completedMissions >= 50 ? '2024-02-20T20:00:00Z' : undefined,
            category: 'Développement',
            level: 5,
            maxLevel: 5,
            progress: Math.min(completedMissions, 50) * 2,
            requirements: 'Terminer 50 missions de développement',
            xpReward: 5000,
            uosReward: 2500,
            uniqReward: 'Legendary Dev Aura',
            isUnlocked: completedMissions >= 50
          },
          // Succès de communauté
          {
            id: '8',
            name: 'Collaborateur Fidèle',
            description: 'Membre actif depuis 30 jours',
            icon: '🤝',
            rarity: 'gold' as const,
            earnedAt: '2024-02-15T16:20:00Z',
            category: 'Communauté',
            level: 1,
            maxLevel: 3,
            progress: 100,
            requirements: 'Être membre actif pendant 30 jours',
            xpReward: 750,
            uosReward: 300,
            isUnlocked: true
          },
          {
            id: '9',
            name: 'Vétéran',
            description: 'Membre actif depuis 90 jours',
            icon: '🏆',
            rarity: 'platinum' as const,
            earnedAt: completedMissions >= 15 ? '2024-03-15T10:00:00Z' : undefined,
            category: 'Communauté',
            level: 2,
            maxLevel: 3,
            progress: completedMissions >= 15 ? 100 : 60,
            requirements: 'Être membre actif pendant 90 jours',
            xpReward: 1500,
            uosReward: 750,
            uniqReward: 'Veteran Badge',
            isUnlocked: completedMissions >= 15
          },
          {
            id: '10',
            name: 'Légende Vivante',
            description: 'Membre actif depuis 1 an',
            icon: '💎',
            rarity: 'legendary' as const,
            earnedAt: undefined,
            category: 'Communauté',
            level: 3,
            maxLevel: 3,
            progress: 25,
            requirements: 'Être membre actif pendant 1 an',
            xpReward: 10000,
            uosReward: 5000,
            uniqReward: 'Living Legend Aura',
            isUnlocked: false
          },
          // Succès de performance
          {
            id: '11',
            name: 'Perfectionniste',
            description: 'Obtenir une note parfaite de 5/5',
            icon: '⭐',
            rarity: 'silver' as const,
            earnedAt: completedMissions >= 5 ? '2024-01-22T14:30:00Z' : undefined,
            category: 'Performance',
            level: 1,
            maxLevel: 1,
            progress: completedMissions >= 5 ? 100 : 0,
            requirements: 'Obtenir une note de 5/5 sur une mission',
            xpReward: 400,
            uosReward: 200,
            isUnlocked: completedMissions >= 5
          },
          {
            id: '12',
            name: 'Rapide comme l\'éclair',
            description: 'Terminer une mission en moins de 24h',
            icon: '⚡',
            rarity: 'gold' as const,
            earnedAt: completedMissions >= 8 ? '2024-01-28T08:15:00Z' : undefined,
            category: 'Performance',
            level: 1,
            maxLevel: 1,
            progress: completedMissions >= 8 ? 100 : 0,
            requirements: 'Terminer une mission en moins de 24h',
            xpReward: 600,
            uosReward: 400,
            isUnlocked: completedMissions >= 8
          },
          // Succès de gains
          {
            id: '13',
            name: 'Premier Gain',
            description: 'Gagner ses premiers 100 UOS',
            icon: '💰',
            rarity: 'bronze' as const,
            earnedAt: completedMissions >= 2 ? '2024-01-17T15:45:00Z' : undefined,
            category: 'Gains',
            level: 1,
            maxLevel: 5,
            progress: completedMissions >= 2 ? 100 : Math.min(completedMissions * 50, 100),
            requirements: 'Gagner 100 UOS',
            xpReward: 200,
            uosReward: 50,
            isUnlocked: completedMissions >= 2
          },
          {
            id: '14',
            name: 'Millionnaire',
            description: 'Gagner 1000 UOS au total',
            icon: '💎',
            rarity: 'gold' as const,
            earnedAt: completedMissions >= 12 ? '2024-02-05T12:20:00Z' : undefined,
            category: 'Gains',
            level: 2,
            maxLevel: 5,
            progress: Math.min(completedMissions * 8.33, 100),
            requirements: 'Gagner 1000 UOS au total',
            xpReward: 800,
            uosReward: 500,
            isUnlocked: completedMissions >= 12
          },
          {
            id: '15',
            name: 'Magnat',
            description: 'Gagner 10000 UOS au total',
            icon: '👑',
            rarity: 'legendary' as const,
            earnedAt: completedMissions >= 30 ? '2024-03-01T18:00:00Z' : undefined,
            category: 'Gains',
            level: 3,
            maxLevel: 5,
            progress: Math.min(completedMissions * 3.33, 100),
            requirements: 'Gagner 10000 UOS au total',
            xpReward: 3000,
            uosReward: 2000,
            uniqReward: 'Golden Crown of Wealth',
            isUnlocked: completedMissions >= 30
          }
        ];

        return allPossibleAchievements;
      };

      const getAchievements = (completedMissions: number): Achievement[] => {
        return getAllAchievements(completedMissions).filter(achievement => achievement.isUnlocked);
      };

      const getUnlockedAchievements = (completedMissions: number): Achievement[] => {
        const baseAchievements = [
          {
            id: '1',
            name: 'Premier Pas',
            description: 'Terminer sa première mission avec succès',
            icon: '🎯',
            rarity: 'bronze' as const,
            earnedAt: '2024-01-16T10:30:00Z',
            category: 'Débutant',
            level: 1,
            maxLevel: 1,
            progress: 100,
            requirements: 'Terminer 1 mission',
            xpReward: 100,
            uosReward: 50,
            isUnlocked: true
          },
          {
            id: '2',
            name: 'Développeur Novice',
            description: 'Terminer 5 missions de développement',
            icon: '💻',
            rarity: 'bronze' as const,
            earnedAt: '2024-01-20T14:15:00Z',
            category: 'Développement',
            level: 1,
            maxLevel: 5,
            progress: 100,
            requirements: 'Terminer 5 missions de développement',
            xpReward: 250
          },
          {
            id: '3',
            name: 'Développeur Confirmé',
            description: 'Terminer 10 missions de développement',
            icon: '⚙️',
            rarity: 'silver' as const,
            earnedAt: '2024-01-25T09:45:00Z',
            category: 'Développement',
            level: 2,
            maxLevel: 5,
            progress: 100,
            requirements: 'Terminer 10 missions de développement',
            xpReward: 500
          },
          {
            id: '4',
            name: 'Collaborateur Fidèle',
            description: 'Membre actif depuis 30 jours',
            icon: '🤝',
            rarity: 'gold' as const,
            earnedAt: '2024-02-15T16:20:00Z',
            category: 'Communauté',
            level: 1,
            maxLevel: 3,
            progress: 100,
            requirements: 'Être membre actif pendant 30 jours',
            xpReward: 750
          },
          {
            id: '5',
            name: 'Perfectionniste',
            description: 'Maintenir une note moyenne de 4.5+ sur 10 missions',
            icon: '⭐',
            rarity: 'gold' as const,
            earnedAt: '2024-02-10T11:30:00Z',
            category: 'Excellence',
            level: 1,
            maxLevel: 3,
            progress: 100,
            requirements: 'Note moyenne 4.5+ sur 10 missions',
            xpReward: 1000
          }
        ];

        // Ajouter des succès avancés selon le nombre de missions
        if (completedMissions >= 15) {
          baseAchievements.push({
            id: '6',
            name: 'Développeur Expert',
            description: 'Terminer 15 missions de développement',
            icon: '🚀',
            rarity: 'platinum' as const,
            earnedAt: '2024-02-18T13:45:00Z',
            category: 'Développement',
            level: 3,
            maxLevel: 5,
            progress: 100,
            requirements: 'Terminer 15 missions de développement',
            xpReward: 1500
          });
        }

        if (completedMissions >= 20) {
          baseAchievements.push({
            id: '7',
            name: 'Vétéran Ultra',
            description: 'Terminer 20 missions dans l\'écosystème Ultra',
            icon: '🏆',
            rarity: 'diamond' as const,
            earnedAt: '2024-02-22T15:20:00Z',
            category: 'Ultra',
            level: 1,
            maxLevel: 2,
            progress: 100,
            requirements: 'Terminer 20 missions',
            xpReward: 2000
          });
        }

        if (completedMissions >= 25) {
          baseAchievements.push(
            {
              id: '8',
              name: 'Maître Développeur',
              description: 'Atteindre le niveau de maîtrise ultime',
              icon: '👑',
              rarity: 'legendary' as const,
              earnedAt: '2024-02-25T18:30:00Z',
              category: 'Développement',
              level: 4,
              maxLevel: 5,
              progress: 100,
              requirements: 'Terminer 25 missions de développement',
              xpReward: 3000
            },
            {
              id: '9',
              name: 'Mentor Communautaire',
              description: 'Aider et guider les nouveaux membres',
              icon: '🎓',
              rarity: 'platinum' as const,
              earnedAt: '2024-02-20T12:15:00Z',
              category: 'Communauté',
              level: 2,
              maxLevel: 3,
              progress: 100,
              requirements: 'Aider 10 nouveaux membres',
              xpReward: 1800
            },
            {
              id: '10',
              name: 'Innovateur',
              description: 'Proposer des solutions créatives',
              icon: '💡',
              rarity: 'diamond' as const,
              earnedAt: '2024-02-23T14:45:00Z',
              category: 'Innovation',
              level: 1,
              maxLevel: 2,
              progress: 100,
              requirements: 'Proposer 5 solutions innovantes',
              xpReward: 2500
            },
            {
              id: '11',
              name: 'Spécialiste Blockchain',
              description: 'Expert en technologies blockchain',
              icon: '⛓️',
              rarity: 'platinum' as const,
              earnedAt: '2024-02-19T16:30:00Z',
              category: 'Blockchain',
              level: 1,
              maxLevel: 3,
              progress: 100,
              requirements: 'Terminer 8 missions blockchain',
              xpReward: 1600
            },
            {
              id: '12',
              name: 'Ambassadeur Ultra',
              description: 'Représentant exemplaire de la communauté',
              icon: '🌟',
              rarity: 'legendary' as const,
              earnedAt: '2024-02-26T10:00:00Z',
              category: 'Ultra',
              level: 2,
              maxLevel: 2,
              progress: 100,
              requirements: 'Excellence continue et engagement',
              xpReward: 5000
            }
          );
        }

        return baseAchievements;
      };

      const getReviews = (userId: string): Review[] => {
        // Base de données mockée des utilisateurs pour cohérence
        const mockUsers = {
          'client1': {
            id: 'client1',
            name: 'Marie Dubois',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
          },
          'client2': {
            id: 'client2', 
            name: 'Pierre Martin',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
          },
          'client3': {
            id: 'client3',
            name: 'Thomas Petit', 
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
          },
          'client4': {
            id: 'client4',
            name: 'Julie Moreau',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
          },
          'client5': {
            id: 'client5',
            name: 'Antoine Roux',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
          },
          'client6': {
            id: 'client6',
            name: 'Camille Leroy',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
          },
          'client7': {
            id: 'client7',
            name: 'Nicolas Blanc',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
          },
          'client8': {
            id: 'client8',
            name: 'Emma Rousseau',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
          }
        };

        return [
          {
            id: '1',
            reviewerId: 'client1',
            reviewerName: mockUsers.client1.name,
            reviewerAvatar: mockUsers.client1.avatar,
            rating: 5,
            comment: 'Travail exceptionnel ! Sophie a livré une application mobile parfaitement fonctionnelle avec une interface utilisateur magnifique. Communication excellente tout au long du projet.',
            createdAt: '2024-01-25T16:30:00Z',
            missionId: '1',
            missionTitle: 'Développement d\'application mobile',
            helpful: 8,
            verified: true
          },
          {
            id: '2',
            reviewerId: 'client2',
            reviewerName: mockUsers.client2.name,
            reviewerAvatar: mockUsers.client2.avatar,
            rating: 5,
            comment: 'Développeuse très professionnelle. Le code est propre, bien documenté et les délais ont été respectés. Je recommande vivement !',
            createdAt: '2024-01-22T14:15:00Z',
            missionId: '2',
            missionTitle: 'Design UI/UX pour plateforme Web3',
            helpful: 12,
            verified: true
          },
          {
            id: '3',
            reviewerId: 'client3',
            reviewerName: mockUsers.client3.name,
            reviewerAvatar: mockUsers.client3.avatar,
            rating: 4,
            comment: 'Bon travail dans l\'ensemble. Quelques ajustements ont été nécessaires mais Sophie a été réactive pour les corrections.',
            createdAt: '2024-01-18T11:45:00Z',
            missionId: '3',
            missionTitle: 'Intégration API blockchain',
            helpful: 5,
            verified: true
          },
          {
            id: '4',
            reviewerId: 'client4',
            reviewerName: mockUsers.client4.name,
            reviewerAvatar: mockUsers.client4.avatar,
            rating: 5,
            comment: 'Expertise technique impressionnante ! Sophie a résolu des problèmes complexes avec élégance. Collaboration parfaite.',
            createdAt: '2024-01-15T09:20:00Z',
            missionId: '4',
            missionTitle: 'Audit smart contract',
            helpful: 15,
            verified: true
          },
          {
            id: '5',
            reviewerId: 'client5',
            reviewerName: mockUsers.client5.name,
            reviewerAvatar: mockUsers.client5.avatar,
            rating: 5,
            comment: 'Travail de qualité supérieure. Sophie comprend rapidement les besoins et propose des solutions innovantes.',
            createdAt: '2024-01-12T13:30:00Z',
            helpful: 7,
            verified: false
          },
          {
            id: '6',
            reviewerId: 'client6',
            reviewerName: mockUsers.client6.name,
            reviewerAvatar: mockUsers.client6.avatar,
            rating: 4,
            comment: 'Très satisfaite du travail réalisé. Sophie est à l\'écoute et propose des solutions créatives. Délais respectés.',
            createdAt: '2024-01-10T10:15:00Z',
            missionId: '5',
            missionTitle: 'Développement DApp gaming',
            helpful: 9,
            verified: true
          },
          {
            id: '7',
            reviewerId: 'client7',
            reviewerName: mockUsers.client7.name,
            reviewerAvatar: mockUsers.client7.avatar,
            rating: 5,
            comment: 'Collaboration exceptionnelle ! Sophie maîtrise parfaitement les technologies Web3. Je la recommande sans hésitation.',
            createdAt: '2024-01-08T14:45:00Z',
            missionId: '6',
            missionTitle: 'Intégration wallet Ultra',
            helpful: 11,
            verified: true
          },
          {
            id: '8',
            reviewerId: 'client8',
            reviewerName: mockUsers.client8.name,
            reviewerAvatar: mockUsers.client8.avatar,
            rating: 5,
            comment: 'Travail remarquable sur notre marketplace NFT. Code de qualité, documentation parfaite et livraison en avance !',
            createdAt: '2024-01-05T16:20:00Z',
            missionId: '7',
            missionTitle: 'Marketplace NFT Ultra',
            helpful: 13,
            verified: true
          }
        ];
      };

      const getRecentMissions = (): Mission[] => {
        return [
          {
            id: '1',
            title: 'Développement d\'une application mobile Ultra',
            description: 'Création d\'une app mobile native pour l\'écosystème Ultra avec intégration wallet',
            reward: 1200,
            status: 'completed',
            completedAt: '2024-01-25T16:00:00Z',
            category: 'Développement Mobile',
            difficulty: 'hard'
          },
          {
            id: '2',
            title: 'Interface Web3 moderne',
            description: 'Design et développement d\'une interface utilisateur pour DApp',
            reward: 800,
            status: 'completed',
            completedAt: '2024-01-22T14:30:00Z',
            category: 'UI/UX',
            difficulty: 'medium'
          },
          {
            id: '3',
            title: 'Audit de smart contracts',
            description: 'Analyse de sécurité et optimisation de contrats intelligents',
            reward: 1500,
            status: 'completed',
            completedAt: '2024-01-20T11:15:00Z',
            category: 'Blockchain',
            difficulty: 'hard'
          },
          {
            id: '4',
            title: 'Intégration API Ultra',
            description: 'Développement de connecteurs pour l\'écosystème Ultra',
            reward: 600,
            status: 'in_progress',
            category: 'Backend',
            difficulty: 'medium'
          },
          {
            id: '5',
            title: 'Développement DApp gaming',
            description: 'Création d\'une application décentralisée pour jeux Ultra',
            reward: 950,
            status: 'completed',
            completedAt: '2024-01-18T09:45:00Z',
            category: 'Gaming',
            difficulty: 'hard'
          },
          {
            id: '6',
            title: 'Intégration wallet Ultra',
            description: 'Implémentation du système de portefeuille Ultra dans une DApp',
            reward: 750,
            status: 'completed',
            completedAt: '2024-01-15T13:20:00Z',
            category: 'Blockchain',
            difficulty: 'medium'
          },
          {
            id: '7',
            title: 'Marketplace NFT Ultra',
            description: 'Développement d\'une marketplace pour NFTs sur Ultra',
            reward: 1800,
            status: 'completed',
            completedAt: '2024-01-12T17:30:00Z',
            category: 'NFT',
            difficulty: 'hard'
          },
          {
            id: '8',
            title: 'Optimisation performance DApp',
            description: 'Amélioration des performances et de l\'UX d\'une application décentralisée',
            reward: 650,
            status: 'completed',
            completedAt: '2024-01-10T14:15:00Z',
            category: 'Optimisation',
            difficulty: 'medium'
          },
          {
            id: '9',
            title: 'Dashboard analytics Web3',
            description: 'Création d\'un tableau de bord pour analyser les données blockchain',
            reward: 1100,
            status: 'completed',
            completedAt: '2024-01-08T11:45:00Z',
            category: 'Analytics',
            difficulty: 'hard'
          },
          {
            id: '10',
            title: 'Bot trading automatisé',
            description: 'Développement d\'un bot de trading pour l\'écosystème Ultra',
            reward: 2000,
            status: 'completed',
            completedAt: '2024-01-05T16:00:00Z',
            category: 'Trading',
            difficulty: 'hard'
          }
        ];
      };

      const mockProfile = getProfileData(userId || '1');


      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfile(mockProfile);
      setAllAchievements(getAllAchievements(mockProfile.completedMissions));
      setLoading(false);
    };

    loadProfile();
  }, [userId]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'bronze':
        return 'bg-orange-50 text-orange-700 border-orange-300';
      case 'silver':
        return 'bg-gray-50 text-gray-700 border-gray-400';
      case 'gold':
        return 'bg-yellow-50 text-yellow-700 border-yellow-400';
      case 'platinum':
        return 'bg-blue-50 text-blue-700 border-blue-400';
      case 'diamond':
        return 'bg-purple-50 text-purple-700 border-purple-400';
      case 'legendary':
        return 'bg-gradient-to-br from-yellow-50 to-orange-50 text-yellow-800 border-yellow-400';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'bronze':
        return 'shadow-orange-200';
      case 'silver':
        return 'shadow-gray-300';
      case 'gold':
        return 'shadow-yellow-300';
      case 'platinum':
        return 'shadow-blue-300';
      case 'diamond':
        return 'shadow-purple-300';
      case 'legendary':
        return 'shadow-yellow-400';
      default:
        return 'shadow-gray-200';
    }
  };

  const openAchievementModal = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setShowAchievementModal(true);
  };

  const closeAchievementModal = () => {
    setShowAchievementModal(false);
    setSelectedAchievement(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminée';
      case 'in_progress':
        return 'En cours';
      case 'cancelled':
        return 'Annulée';
      default:
        return 'Inconnue';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Profil introuvable</h1>
          <p className="text-gray-600 mb-4">L'utilisateur demandé n'existe pas.</p>
          <Link to="/manage-users">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la gestion
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header avec bouton retour (seulement pour les admins) */}
        {user?.role === 'admin' && (
          <div className="mb-6">
            <Link to="/manage-users">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à la gestion
              </Button>
            </Link>
          </div>
        )}

        {/* Profil principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne de gauche - Informations personnelles */}
          <div className="lg:col-span-1">
            <Card className="card-hover">
              <CardBody className="p-6">
                {/* Avatar et nom */}
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-white">
                      {profile.firstName[0]}{profile.lastName[0]}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    {profile.firstName} {profile.lastName}
                  </h1>
                  <div className="flex items-center justify-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-lg font-semibold text-gray-700">
                      {profile.averageRating}/5
                    </span>
                  </div>
                </div>

                {/* Informations de base */}
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-3" />
                    <span className="text-sm">{profile.email}</span>
                  </div>
                  {profile.location && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-3" />
                      <span className="text-sm">{profile.location}</span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-3" />
                    <span className="text-sm">
                      Membre depuis {new Date(profile.joinedAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </span>
                  </div>
                </div>

                {/* Bio */}
                {profile.bio && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">À propos</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{profile.bio}</p>
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Niveau utilisateur */}
            <Card className="card-hover mt-6">
              <CardBody className="p-6">
                <div className="text-center mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${profile.userLevel.color} rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                    <span className="text-2xl">{profile.userLevel.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Niveau {profile.userLevel.level}</h3>
                  <p className="text-sm text-gray-600 font-medium">{profile.userLevel.title}</p>
                </div>
                
                {/* Barre de progression XP */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{profile.userLevel.currentXP} XP</span>
                    <span>{profile.userLevel.nextLevelXP} XP</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${profile.userLevel.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${(profile.userLevel.currentXP / profile.userLevel.nextLevelXP) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    {profile.userLevel.nextLevelXP - profile.userLevel.currentXP} XP pour le niveau suivant
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">XP Total: <span className="font-semibold text-gray-900">{profile.userLevel.totalXP.toLocaleString()}</span></p>
                </div>
              </CardBody>
            </Card>

            {/* Explication du système de niveaux */}
            <Card className="card-hover mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardBody className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">
                      Pourquoi monter de niveau ?
                    </h3>
                    <div className="space-y-3 text-sm text-blue-800">
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p>
                          <span className="font-semibold">Priorité sur les missions :</span> Plus votre niveau est élevé, plus vous avez de chances d'être sélectionné en priorité pour les missions les plus intéressantes et les mieux rémunérées.
                        </p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p>
                          <span className="font-semibold">Avantages écosystème Ultra Times :</span> Débloquez des réductions exclusives sur la marketplace Ultra Times, des frais réduits sur le launchpad, et un accès anticipé aux nouveaux projets.
                        </p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p>
                          <span className="font-semibold">Statut premium :</span> Affichez votre expertise avec un badge de niveau visible sur votre profil et bénéficiez d'une meilleure visibilité auprès des clients.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                      <p className="text-xs text-blue-700 font-medium">
                        💡 <span className="font-semibold">Astuce :</span> Complétez des missions, obtenez des succès et maintenez un taux de satisfaction élevé pour gagner de l'XP plus rapidement !
                      </p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Statistiques */}
            <Card className="card-hover mt-6">
              <CardHeader>
                <h2 className="text-lg font-semibold flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                  Statistiques
                </h2>
              </CardHeader>
              <CardBody className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Missions terminées</span>
                    <span className="text-lg font-bold text-primary-600">{profile.completedMissions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">UOS gagnés</span>
                    <span className="text-lg font-bold text-green-600">{profile.totalEarnings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Succès obtenus</span>
                    <span className="text-lg font-bold text-purple-600">{profile.achievements.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Taux de réussite</span>
                    <span className="text-lg font-bold text-blue-600">
                      {Math.round((profile.completedMissions / profile.totalMissions) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Taux de réponse</span>
                    <span className="text-lg font-bold text-indigo-600">{profile.responseRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Temps moyen</span>
                    <span className="text-lg font-bold text-orange-600">{profile.averageCompletionTime}j</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Colonne de droite - Missions et badges */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mes badges - Style Igraal */}
            <Card className="card-hover">
              <CardHeader className="border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-semibold flex items-center mb-2">
                    <Award className="w-5 h-5 mr-2 text-purple-500" />
                    Mes badges
                  </h2>
                  <p className="text-sm text-gray-600">
                    Ces badges reflètent votre activité sur WeNeedU. Le but du jeu est d'en accumuler un maximum pour monter de niveau et bénéficier d'avantages exclusifs sur l'écosystème Ultra Times !
                  </p>
                </div>
              </CardHeader>
              <CardBody className="p-6">
                {/* Sections par catégorie */}
                <div className="space-y-8">
                  {/* Profil */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-blue-500" />
                      Profil
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                      {allAchievements.filter(a => a.category === 'Débutant').map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`flex flex-col items-center group cursor-pointer p-3 rounded-lg transition-all duration-300 ${
                            achievement.isUnlocked 
                              ? 'hover:bg-gray-50 hover:shadow-md' 
                              : 'opacity-50 grayscale hover:opacity-75'
                          }`}
                          onClick={() => openAchievementModal(achievement)}
                        >
                          <div className={`relative w-16 h-16 rounded-full border-3 ${
                            achievement.isUnlocked 
                              ? getRarityColor(achievement.rarity) 
                              : 'bg-gray-100 text-gray-400 border-gray-300'
                          } flex items-center justify-center mb-2 group-hover:scale-110 transition-all duration-300 shadow-lg ${
                            achievement.isUnlocked ? getRarityGlow(achievement.rarity) : ''
                          }`}>
                            <div className="text-xl relative z-10">
                              {achievement.isUnlocked ? achievement.icon : '🔒'}
                            </div>
                            
                            {achievement.maxLevel > 1 && achievement.isUnlocked && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center">
                                <span className="text-xs font-bold text-gray-700">{achievement.level}</span>
                              </div>
                            )}
                            
                            {achievement.rarity === 'legendary' && achievement.isUnlocked && (
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 opacity-20 animate-pulse"></div>
                            )}
                          </div>
                          
                          <div className="text-center">
                            <h4 className={`font-medium text-xs mb-1 ${
                              achievement.isUnlocked ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {achievement.name}
                            </h4>
                            {achievement.isUnlocked && (
                              <div className="text-xs text-green-600 font-medium">
                                +{achievement.xpReward} XP
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Développement */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-green-500" />
                      Développement
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                      {allAchievements.filter(a => a.category === 'Développement').map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`flex flex-col items-center group cursor-pointer p-3 rounded-lg transition-all duration-300 ${
                            achievement.isUnlocked 
                              ? 'hover:bg-gray-50 hover:shadow-md' 
                              : 'opacity-50 grayscale hover:opacity-75'
                          }`}
                          onClick={() => openAchievementModal(achievement)}
                        >
                          <div className={`relative w-16 h-16 rounded-full border-3 ${
                            achievement.isUnlocked 
                              ? getRarityColor(achievement.rarity) 
                              : 'bg-gray-100 text-gray-400 border-gray-300'
                          } flex items-center justify-center mb-2 group-hover:scale-110 transition-all duration-300 shadow-lg ${
                            achievement.isUnlocked ? getRarityGlow(achievement.rarity) : ''
                          }`}>
                            <div className="text-xl relative z-10">
                              {achievement.isUnlocked ? achievement.icon : '🔒'}
                            </div>
                            
                            {achievement.maxLevel > 1 && achievement.isUnlocked && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center">
                                <span className="text-xs font-bold text-gray-700">{achievement.level}</span>
                              </div>
                            )}
                            
                            {achievement.rarity === 'legendary' && achievement.isUnlocked && (
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 opacity-20 animate-pulse"></div>
                            )}
                          </div>
                          
                          <div className="text-center">
                            <h4 className={`font-medium text-xs mb-1 ${
                              achievement.isUnlocked ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {achievement.name}
                            </h4>
                            {achievement.isUnlocked && (
                              <div className="text-xs text-green-600 font-medium">
                                +{achievement.xpReward} XP
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Communauté */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-purple-500" />
                      Communauté
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                      {allAchievements.filter(a => a.category === 'Communauté').map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`flex flex-col items-center group cursor-pointer p-3 rounded-lg transition-all duration-300 ${
                            achievement.isUnlocked 
                              ? 'hover:bg-gray-50 hover:shadow-md' 
                              : 'opacity-50 grayscale hover:opacity-75'
                          }`}
                          onClick={() => openAchievementModal(achievement)}
                        >
                          <div className={`relative w-16 h-16 rounded-full border-3 ${
                            achievement.isUnlocked 
                              ? getRarityColor(achievement.rarity) 
                              : 'bg-gray-100 text-gray-400 border-gray-300'
                          } flex items-center justify-center mb-2 group-hover:scale-110 transition-all duration-300 shadow-lg ${
                            achievement.isUnlocked ? getRarityGlow(achievement.rarity) : ''
                          }`}>
                            <div className="text-xl relative z-10">
                              {achievement.isUnlocked ? achievement.icon : '🔒'}
                            </div>
                            
                            {achievement.maxLevel > 1 && achievement.isUnlocked && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center">
                                <span className="text-xs font-bold text-gray-700">{achievement.level}</span>
                              </div>
                            )}
                            
                            {achievement.rarity === 'legendary' && achievement.isUnlocked && (
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 opacity-20 animate-pulse"></div>
                            )}
                          </div>
                          
                          <div className="text-center">
                            <h4 className={`font-medium text-xs mb-1 ${
                              achievement.isUnlocked ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {achievement.name}
                            </h4>
                            {achievement.isUnlocked && (
                              <div className="text-xs text-green-600 font-medium">
                                +{achievement.xpReward} XP
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Performance */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                      Performance
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                      {allAchievements.filter(a => a.category === 'Performance').map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`flex flex-col items-center group cursor-pointer p-3 rounded-lg transition-all duration-300 ${
                            achievement.isUnlocked 
                              ? 'hover:bg-gray-50 hover:shadow-md' 
                              : 'opacity-50 grayscale hover:opacity-75'
                          }`}
                          onClick={() => openAchievementModal(achievement)}
                        >
                          <div className={`relative w-16 h-16 rounded-full border-3 ${
                            achievement.isUnlocked 
                              ? getRarityColor(achievement.rarity) 
                              : 'bg-gray-100 text-gray-400 border-gray-300'
                          } flex items-center justify-center mb-2 group-hover:scale-110 transition-all duration-300 shadow-lg ${
                            achievement.isUnlocked ? getRarityGlow(achievement.rarity) : ''
                          }`}>
                            <div className="text-xl relative z-10">
                              {achievement.isUnlocked ? achievement.icon : '🔒'}
                            </div>
                            
                            {achievement.maxLevel > 1 && achievement.isUnlocked && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center">
                                <span className="text-xs font-bold text-gray-700">{achievement.level}</span>
                              </div>
                            )}
                            
                            {achievement.rarity === 'legendary' && achievement.isUnlocked && (
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 opacity-20 animate-pulse"></div>
                            )}
                          </div>
                          
                          <div className="text-center">
                            <h4 className={`font-medium text-xs mb-1 ${
                              achievement.isUnlocked ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {achievement.name}
                            </h4>
                            {achievement.isUnlocked && (
                              <div className="text-xs text-green-600 font-medium">
                                +{achievement.xpReward} XP
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gains */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Coins className="w-5 h-5 mr-2 text-yellow-600" />
                      Gains
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                      {allAchievements.filter(a => a.category === 'Gains').map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`flex flex-col items-center group cursor-pointer p-3 rounded-lg transition-all duration-300 ${
                            achievement.isUnlocked 
                              ? 'hover:bg-gray-50 hover:shadow-md' 
                              : 'opacity-50 grayscale hover:opacity-75'
                          }`}
                          onClick={() => openAchievementModal(achievement)}
                        >
                          <div className={`relative w-16 h-16 rounded-full border-3 ${
                            achievement.isUnlocked 
                              ? getRarityColor(achievement.rarity) 
                              : 'bg-gray-100 text-gray-400 border-gray-300'
                          } flex items-center justify-center mb-2 group-hover:scale-110 transition-all duration-300 shadow-lg ${
                            achievement.isUnlocked ? getRarityGlow(achievement.rarity) : ''
                          }`}>
                            <div className="text-xl relative z-10">
                              {achievement.isUnlocked ? achievement.icon : '🔒'}
                            </div>
                            
                            {achievement.maxLevel > 1 && achievement.isUnlocked && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center">
                                <span className="text-xs font-bold text-gray-700">{achievement.level}</span>
                              </div>
                            )}
                            
                            {achievement.rarity === 'legendary' && achievement.isUnlocked && (
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 opacity-20 animate-pulse"></div>
                            )}
                          </div>
                          
                          <div className="text-center">
                            <h4 className={`font-medium text-xs mb-1 ${
                              achievement.isUnlocked ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {achievement.name}
                            </h4>
                            {achievement.isUnlocked && (
                              <div className="text-xs text-green-600 font-medium">
                                +{achievement.xpReward} XP
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Statistiques des badges */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center text-sm text-gray-600">
                    Vous avez cumulé <span className="font-bold text-green-600">{allAchievements.reduce((sum, a) => sum + (a.isUnlocked ? a.xpReward : 0), 0)} XP</span> sur votre compte WeNeedU, depuis votre inscription
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Section des avis */}
            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-blue-500" />
                    Avis clients ({profile.totalReviews})
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-lg font-bold text-gray-900">{profile.averageRating}/5</span>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="p-6">
                <div className="space-y-6">
                  {profile.reviews.slice((currentReviewPage - 1) * reviewsPerPage, currentReviewPage * reviewsPerPage).map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-start space-x-4">
                        {/* Avatar du reviewer - cliquable */}
                        <button 
                          onClick={() => navigate(`/profile/${review.reviewerId}`)}
                          className="w-12 h-12 rounded-full flex-shrink-0 hover:opacity-80 transition-opacity"
                        >
                          {review.reviewerAvatar ? (
                            <img 
                              src={review.reviewerAvatar} 
                              alt={review.reviewerName}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {review.reviewerName.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          )}
                        </button>
                        
                        <div className="flex-1">
                          {/* Header de l'avis */}
                          <div className="flex items-center justify-between mb-2">
                            <button 
                              onClick={() => navigate(`/profile/${review.reviewerId}`)}
                              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                            >
                              <h4 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">{review.reviewerName}</h4>
                              {review.verified && (
                                <div className="flex items-center space-x-1 text-green-600">
                                  <CheckCircle className="w-4 h-4" />
                                  <span className="text-xs font-medium">Vérifié</span>
                                </div>
                              )}
                            </button>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                          </div>
                          
                          {/* Mission liée */}
                          {review.missionTitle && (
                            <div className="mb-3">
                              <Link 
                                to={`/missions/${review.missionId}`}
                                className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
                              >
                                <Target className="w-4 h-4 mr-1" />
                                {review.missionTitle}
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </Link>
                            </div>
                          )}
                          
                          {/* Commentaire */}
                          <p className="text-gray-700 mb-3 leading-relaxed">{review.comment}</p>
                          

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination des reviews */}
                {profile.reviews.length > reviewsPerPage && (
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Affichage de {((currentReviewPage - 1) * reviewsPerPage) + 1} à {Math.min(currentReviewPage * reviewsPerPage, profile.reviews.length)} sur {profile.reviews.length} avis
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentReviewPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentReviewPage === 1}
                        className="flex items-center space-x-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Précédent</span>
                      </Button>
                      <span className="text-sm text-gray-600">
                        Page {currentReviewPage} sur {Math.ceil(profile.reviews.length / reviewsPerPage)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentReviewPage(prev => Math.min(prev + 1, Math.ceil(profile.reviews.length / reviewsPerPage)))}
                        disabled={currentReviewPage === Math.ceil(profile.reviews.length / reviewsPerPage)}
                        className="flex items-center space-x-1"
                      >
                        <span>Suivant</span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {profile.reviews.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">Aucun avis pour le moment</p>
                    <p>Cet utilisateur n'a pas encore reçu d'avis de la part de ses clients.</p>
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Missions récentes */}
            <Card className="card-hover">
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-500" />
                  Missions récentes
                </h2>
              </CardHeader>
              <CardBody className="p-6">
                <div className="space-y-4">
                  {profile.recentMissions.slice((currentMissionPage - 1) * missionsPerPage, currentMissionPage * missionsPerPage).map((mission) => (
                    <Link
                      key={mission.id}
                      to={`/missions/${mission.id}`}
                      className="block border rounded-lg p-4 hover:shadow-md hover:border-primary-300 transition-all duration-200 group cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                              {mission.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(mission.status)}`}>
                              {getStatusText(mission.status)}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(mission.difficulty)}`}>
                              {mission.difficulty}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3 group-hover:text-gray-700 transition-colors">
                            {mission.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              <span className="font-medium text-primary-600 group-hover:text-primary-700 transition-colors">
                                {mission.reward} UOS
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs group-hover:bg-primary-50 group-hover:text-primary-700 transition-colors">
                                {mission.category}
                              </span>
                            </div>
                            {mission.completedAt && (
                              <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                                <span>
                                  Terminée le {new Date(mission.completedAt).toLocaleDateString('fr-FR')}
                                </span>
                              </div>
                            )}
                            {mission.status === 'in_progress' && (
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1 text-blue-500" />
                                <span>En cours</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Indicateur de lien cliquable */}
                        <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <ExternalLink className="w-4 h-4 text-primary-500" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination des missions */}
                {profile.recentMissions.length > missionsPerPage && (
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Affichage de {((currentMissionPage - 1) * missionsPerPage) + 1} à {Math.min(currentMissionPage * missionsPerPage, profile.recentMissions.length)} sur {profile.recentMissions.length} missions
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentMissionPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentMissionPage === 1}
                        className="flex items-center space-x-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Précédent</span>
                      </Button>
                      <span className="text-sm text-gray-600">
                        Page {currentMissionPage} sur {Math.ceil(profile.recentMissions.length / missionsPerPage)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentMissionPage(prev => Math.min(prev + 1, Math.ceil(profile.recentMissions.length / missionsPerPage)))}
                        disabled={currentMissionPage === Math.ceil(profile.recentMissions.length / missionsPerPage)}
                        className="flex items-center space-x-1"
                      >
                        <span>Suivant</span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {profile.recentMissions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Target className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">Aucune mission récente</p>
                    <p>Cet utilisateur n'a pas encore participé à des missions.</p>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Modal des détails du succès - Plus large pour PC */}
        {showAchievementModal && selectedAchievement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header du modal */}
              <div className="relative p-6 border-b border-gray-200">
                <button
                  onClick={closeAchievementModal}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
                
                <div className="text-center">
                  {/* Badge principal */}
                  <div className={`w-24 h-24 mx-auto mb-4 rounded-full border-4 ${getRarityColor(selectedAchievement.rarity)} flex items-center justify-center shadow-lg ${getRarityGlow(selectedAchievement.rarity)}`}>
                    <span className="text-4xl">{selectedAchievement.icon}</span>
                    
                    {/* Indicateur de niveau */}
                    {selectedAchievement.maxLevel > 1 && (
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-700">{selectedAchievement.level}</span>
                      </div>
                    )}
                    
                    {/* Effet de brillance pour legendary */}
                    {selectedAchievement.rarity === 'legendary' && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 opacity-20 animate-pulse"></div>
                    )}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedAchievement.name}</h2>
                  <p className="text-gray-600 mb-4">{selectedAchievement.description}</p>
                  
                  {/* Rareté */}
                  <span className={`inline-block px-4 py-2 rounded-full font-medium text-sm ${getRarityColor(selectedAchievement.rarity)}`}>
                    {selectedAchievement.rarity.charAt(0).toUpperCase() + selectedAchievement.rarity.slice(1)}
                  </span>
                </div>
              </div>
              
              {/* Corps du modal */}
              <div className="p-6 space-y-6">
                {/* Progression du niveau */}
                {selectedAchievement.maxLevel > 1 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                      Progression
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Niveau {selectedAchievement.level} / {selectedAchievement.maxLevel}
                        </span>
                        <span className="text-sm text-gray-600">{selectedAchievement.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${selectedAchievement.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Récompenses */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Gift className="w-5 h-5 mr-2 text-green-500" />
                    Récompenses
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Sparkles className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-medium text-green-800">Expérience</span>
                      </div>
                      <p className="text-green-700 font-bold text-lg">+{selectedAchievement.xpReward} XP</p>
                    </div>
                    
                    {selectedAchievement.uosReward && (
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Coins className="w-5 h-5 text-yellow-600 mr-2" />
                          <span className="font-medium text-yellow-800">UOS</span>
                        </div>
                        <p className="text-yellow-700 font-bold text-lg">+{selectedAchievement.uosReward} UOS</p>
                      </div>
                    )}
                    
                    {selectedAchievement.uniqReward && (
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Crown className="w-5 h-5 text-purple-600 mr-2" />
                          <span className="font-medium text-purple-800">UNIQ Spécial</span>
                        </div>
                        <p className="text-purple-700 font-bold text-sm">{selectedAchievement.uniqReward}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Détails */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Award className="w-5 h-5 text-purple-500 mr-2" />
                      <span className="font-medium text-gray-900">Catégorie</span>
                    </div>
                    <p className="text-gray-700">{selectedAchievement.category}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Medal className="w-5 h-5 text-orange-500 mr-2" />
                      <span className="font-medium text-gray-900">Rareté</span>
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full font-medium text-sm ${getRarityColor(selectedAchievement.rarity)}`}>
                      {selectedAchievement.rarity.charAt(0).toUpperCase() + selectedAchievement.rarity.slice(1)}
                    </span>
                  </div>
                </div>
                
                {/* Prérequis */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-green-500" />
                    Prérequis
                  </h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800">{selectedAchievement.requirements}</p>
                  </div>
                </div>
                
                {/* Date d'obtention ou statut */}
                {selectedAchievement.isUnlocked ? (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                      Date d'obtention
                    </h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800">
                        {selectedAchievement.earnedAt && new Date(selectedAchievement.earnedAt).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Lock className="w-5 h-5 mr-2 text-gray-500" />
                      Statut
                    </h3>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-600">
                        🔒 Succès non débloqué - Continuez vos efforts pour l'obtenir !
                      </p>
                      {selectedAchievement.progress > 0 && (
                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600">Progression</span>
                            <span className="text-sm text-gray-600">{Math.round(selectedAchievement.progress)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-gray-400 to-gray-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${selectedAchievement.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Prochains niveaux */}
                {selectedAchievement.level < selectedAchievement.maxLevel && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <ChevronRight className="w-5 h-5 mr-2 text-orange-500" />
                      Prochains niveaux
                    </h3>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <p className="text-orange-800 text-sm">
                        Continuez vos efforts pour débloquer les niveaux suivants de ce succès et gagner encore plus d'XP !
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Footer du modal */}
              <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                <button
                  onClick={closeAchievementModal}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicProfilePage; 