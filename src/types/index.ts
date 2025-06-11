export interface Mission {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  tags: string[];
  reward: number;
  bonusPercentage: number;
  deadline: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  type: 'short' | 'long';
  image: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  requirements: string[];
  maxCandidates: number;
  currentCandidates: number;
  createdBy: string;
  createdAt: string;
  steps?: MissionStep[];
}

export interface MissionStep {
  id: string;
  title: string;
  description: string;
  reward: number;
  status: 'locked' | 'open' | 'completed';
  deadline: string;
  assignedTo?: string;
}

export interface Payment {
  id: string;
  missionId: string;
  missionTitle: string;
  userId: string;
  amount: number;
  type: 'immediate' | 'deferred';
  status: 'pending' | 'completed' | 'failed';
  transactionHash?: string;
  createdAt: string;
  paidAt?: string;
  unlockDate?: string;
}

export interface UserStats {
  completedMissions: number;
  totalEarned: number;
  pendingPayments: number;
  completionRate: number;
  averageTime: string;
  badges: string[];
}

export interface DashboardStats {
  totalMissions: number;
  activeMissions: number;
  completedMissions: number;
  totalUsers: number;
  activeUsers: number;
  totalUosDistributed: number;
  totalUosLocked: number;
  availableUos: number;
  completionRate: number;
  upcomingPayments: Payment[];
  topContributors: Array<{
    userId: string;
    userName: string;
    completedMissions: number;
    totalEarned: number;
  }>;
}