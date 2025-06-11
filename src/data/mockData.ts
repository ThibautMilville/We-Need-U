import { Mission, Payment, DashboardStats, UserStats } from '../types';

export const mockMissions: Mission[] = [
  {
    id: '1',
    title: 'Création de contenu vidéo pour Ultra Gaming',
    description: 'Nous recherchons un créateur de contenu expérimenté pour produire une série de vidéos promotionnelles pour nos derniers jeux Ultra. Le projet comprend la création de 5 vidéos de 2-3 minutes chacune, avec des scripts engageants et un montage professionnel.',
    shortDescription: 'Créer 5 vidéos promotionnelles pour les jeux Ultra avec scripts et montage professionnel.',
    category: 'Contenu',
    tags: ['Vidéo', 'Gaming', 'Marketing'],
    reward: 2500,
    bonusPercentage: 20,
    deadline: '2024-02-15T18:00:00Z',
    status: 'open',
    type: 'short',
    image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=600',
    difficulty: 'medium',
    estimatedTime: '1-2 semaines',
    requirements: ['Expérience en montage vidéo', 'Portfolio gaming', 'Logiciels Adobe'],
    maxCandidates: 3,
    currentCandidates: 1,
    createdBy: 'admin',
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    title: 'Développement d\'une extension de wallet Ultra',
    description: 'Mission longue pour développer une extension de navigateur permettant aux utilisateurs de gérer leurs assets Ultra directement depuis leur navigateur. Cette mission comporte plusieurs phases de développement et de tests.',
    shortDescription: 'Développer une extension navigateur pour wallet Ultra avec gestion des assets.',
    category: 'Développement',
    tags: ['JavaScript', 'Web3', 'Extension'],
    reward: 8000,
    bonusPercentage: 20,
    deadline: '2024-04-30T23:59:00Z',
    status: 'open',
    type: 'long',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600',
    difficulty: 'hard',
    estimatedTime: '2-3 mois',
    requirements: ['JavaScript avancé', 'Expérience Web3', 'APIs blockchain'],
    maxCandidates: 2,
    currentCandidates: 0,
    createdBy: 'admin',
    createdAt: '2024-01-18T14:30:00Z',
    steps: [
      {
        id: 's1',
        title: 'Architecture et wireframes',
        description: 'Définir l\'architecture technique et créer les wireframes de l\'extension',
        reward: 1500,
        status: 'open',
        deadline: '2024-02-28T23:59:00Z'
      },
      {
        id: 's2',
        title: 'Développement core wallet',
        description: 'Développer les fonctionnalités de base du wallet',
        reward: 3000,
        status: 'locked',
        deadline: '2024-03-31T23:59:00Z'
      },
      {
        id: 's3',
        title: 'Intégration APIs Ultra',
        description: 'Intégrer les APIs Ultra pour la gestion des assets',
        reward: 2000,
        status: 'locked',
        deadline: '2024-04-15T23:59:00Z'
      },
      {
        id: 's4',
        title: 'Tests et déploiement',
        description: 'Tests complets et déploiement sur les stores',
        reward: 1500,
        status: 'locked',
        deadline: '2024-04-30T23:59:00Z'
      }
    ]
  },
  {
    id: '3',
    title: 'Design d\'interface pour marketplace NFT',
    description: 'Concevoir une interface utilisateur moderne et intuitive pour une marketplace NFT Ultra. Le design doit être responsive et inclure tous les écrans nécessaires.',
    shortDescription: 'Créer l\'UI/UX complète d\'une marketplace NFT Ultra responsive.',
    category: 'Design',
    tags: ['UI/UX', 'NFT', 'Figma'],
    reward: 1800,
    bonusPercentage: 20,
    deadline: '2024-02-28T20:00:00Z',
    status: 'in_progress',
    type: 'short',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
    difficulty: 'medium',
    estimatedTime: '2-3 semaines',
    requirements: ['Figma', 'Expérience NFT', 'Design responsive'],
    maxCandidates: 2,
    currentCandidates: 2,
    createdBy: 'admin',
    createdAt: '2024-01-15T09:00:00Z'
  },
  {
    id: '4',
    title: 'Rédaction de documentation technique',
    description: 'Rédiger une documentation complète pour les développeurs utilisant les APIs Ultra. La documentation doit être claire, avec des exemples de code.',
    shortDescription: 'Rédaction de docs techniques pour APIs Ultra avec exemples de code.',
    category: 'Documentation',
    tags: ['Rédaction', 'Technique', 'API'],
    reward: 1200,
    bonusPercentage: 20,
    deadline: '2024-02-20T17:00:00Z',
    status: 'open',
    type: 'short',
    image: 'https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg?auto=compress&cs=tinysrgb&w=600',
    difficulty: 'easy',
    estimatedTime: '1 semaine',
    requirements: ['Rédaction technique', 'Connaissance APIs', 'Markdown'],
    maxCandidates: 1,
    currentCandidates: 0,
    createdBy: 'admin',
    createdAt: '2024-01-22T11:15:00Z'
  },
  {
    id: '5',
    title: 'Optimisation SEO du site Ultra',
    description: 'Optimiser le référencement naturel du site principal Ultra pour améliorer la visibilité et le trafic organique.',
    shortDescription: 'Optimiser le SEO du site Ultra pour améliorer visibilité et trafic.',
    category: 'Marketing',
    tags: ['SEO', 'Analytics', 'Content'],
    reward: 1500,
    bonusPercentage: 20,
    deadline: '2024-03-10T16:00:00Z',
    status: 'completed',
    type: 'short',
    image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=600',
    difficulty: 'medium',
    estimatedTime: '2 semaines',
    requirements: ['SEO avancé', 'Google Analytics', 'Content marketing'],
    maxCandidates: 1,
    currentCandidates: 1,
    createdBy: 'admin',
    createdAt: '2024-01-10T08:30:00Z'
  },
  {
    id: '6',
    title: 'Traduction multilingue de l\'app mobile',
    description: 'Traduire l\'application mobile Ultra en 5 langues (français, espagnol, allemand, japonais, chinois) avec adaptation culturelle.',
    shortDescription: 'Traduire l\'app mobile Ultra en 5 langues avec adaptation culturelle.',
    category: 'Traduction',
    tags: ['Multilingue', 'Mobile', 'Localisation'],
    reward: 2200,
    bonusPercentage: 20,
    deadline: '2024-03-15T19:00:00Z',
    status: 'open',
    type: 'short',
    image: 'https://images.pexels.com/photos/1001914/pexels-photo-1001914.jpeg?auto=compress&cs=tinysrgb&w=600',
    difficulty: 'medium',
    estimatedTime: '3 semaines',
    requirements: ['Multilingue natif', 'Expérience mobile', 'Localisation'],
    maxCandidates: 2,
    currentCandidates: 1,
    createdBy: 'admin',
    createdAt: '2024-01-25T13:45:00Z'
  }
];

export const mockPayments: Payment[] = [
  {
    id: 'p1',
    missionId: '5',
    missionTitle: 'Optimisation SEO du site Ultra',
    userId: '3',
    amount: 1500,
    type: 'immediate',
    status: 'completed',
    transactionHash: '0xabc123...',
    createdAt: '2024-01-28T10:00:00Z',
    paidAt: '2024-01-28T10:05:00Z'
  },
  {
    id: 'p2',
    missionId: '3',
    missionTitle: 'Design d\'interface pour marketplace NFT',
    userId: '3',
    amount: 2160, // 1800 + 20%
    type: 'deferred',
    status: 'pending',
    createdAt: '2024-01-29T14:30:00Z',
    unlockDate: '2024-05-29T14:30:00Z'
  }
];

export const mockUserStats: UserStats = {
  completedMissions: 12,
  totalEarned: 18750,
  pendingPayments: 2160,
  completionRate: 94.2,
  averageTime: '1.8 semaines',
  badges: ['Premier pas', 'Contributeur régulier', 'Expert technique']
};

export const mockDashboardStats: DashboardStats = {
  totalMissions: 156,
  activeMissions: 34,
  completedMissions: 98,
  totalUsers: 245,
  activeUsers: 67,
  totalUosDistributed: 125000,
  totalUosLocked: 45000,
  availableUos: 180000,
  completionRate: 87.5,
  upcomingPayments: [
    {
      id: 'p3',
      missionId: '3',
      missionTitle: 'Design d\'interface pour marketplace NFT',
      userId: '3',
      amount: 2160,
      type: 'deferred',
      status: 'pending',
      createdAt: '2024-01-29T14:30:00Z',
      unlockDate: '2024-05-29T14:30:00Z'
    }
  ],
  topContributors: [
    {
      userId: '3',
      userName: 'John Doe',
      completedMissions: 12,
      totalEarned: 18750
    },
    {
      userId: '4',
      userName: 'Jane Smith',
      completedMissions: 8,
      totalEarned: 14200
    },
    {
      userId: '5',
      userName: 'Alex Johnson',
      completedMissions: 6,
      totalEarned: 9800
    }
  ]
};