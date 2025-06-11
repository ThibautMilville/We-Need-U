import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Coins, Clock, Tag, ArrowRight, Zap, Star } from 'lucide-react';
import { Mission } from '../types';
import Card, { CardBody } from './ui/Card';
import Button from './ui/Button';
import { getMissionImage } from '../utils/missionImages';

interface MissionCardProps {
  mission: Mission;
  showActions?: boolean;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission, showActions = true }) => {
  const getDifficultyColor = (difficulty: Mission['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'from-green-500 to-emerald-600';
      case 'intermediate':
        return 'from-amber-500 to-orange-600';
      case 'expert':
        return 'from-red-500 to-rose-600';
      default:
        return 'from-gray-500 to-slate-600';
    }
  };

  const getDifficultyText = (difficulty: Mission['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'Facile';
      case 'intermediate':
        return 'Moyen';
      case 'expert':
        return 'Difficile';
      default:
        return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="group relative h-full">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500" />
      
      <Card className="relative bg-white/80 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 rounded-3xl overflow-hidden group h-full flex flex-col">
        {/* Mission Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={getMissionImage(mission.category, mission.title)}
            alt={`Mission ${mission.category} - ${mission.title}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20" />
          
          {/* Floating elements */}
          <div className="absolute top-4 right-4">
            <div className={`px-4 py-2 bg-gradient-to-r ${getDifficultyColor(mission.difficulty)} rounded-full shadow-lg border border-white/20 backdrop-blur-sm`}>
              <span className="text-white text-sm font-bold">
                {getDifficultyText(mission.difficulty)}
              </span>
            </div>
          </div>

          {/* Category badge */}
          <div className="absolute bottom-4 left-4">
            <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <span className="text-gray-800 text-sm font-bold">{mission.category}</span>
            </div>
          </div>

          {/* Reward highlight */}
          <div className="absolute bottom-4 right-4">
            <div className="flex items-center space-x-1 px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg">
              <Coins className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-bold">{mission.reward.toLocaleString()}</span>
              <span className="text-white/90 text-xs">UOS</span>
            </div>
          </div>
        </div>

        <CardBody className="p-6 space-y-4 flex-1 flex flex-col">
          {/* Title and description */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
              {mission.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {mission.shortDescription}
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <Clock className="w-4 h-4 text-blue-600" />
              <div>
                <div className="text-xs text-blue-600 font-medium">Durée</div>
                <div className="text-sm font-bold text-gray-900">{mission.estimatedTime}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <Users className="w-4 h-4 text-green-600" />
              <div>
                <div className="text-xs text-green-600 font-medium">Places</div>
                <div className="text-sm font-bold text-gray-900">{mission.currentCandidates}/{mission.maxCandidates}</div>
              </div>
            </div>
          </div>

          {/* Deadline */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Deadline</span>
            </div>
            <span className="text-sm font-bold text-gray-900">{formatDate(mission.deadline)}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 flex-1">
            {mission.tags.slice(0, 3).map((tag, index) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs font-medium rounded-full border border-gray-200"
              >
                {tag}
              </span>
            ))}
            {mission.tags.length > 3 && (
              <span className="px-3 py-1 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 text-xs font-medium rounded-full border border-primary-200">
                +{mission.tags.length - 3}
              </span>
            )}
          </div>

          {/* Action button */}
          {showActions && (
            <div className="pt-2 mt-auto">
              <Button
                as={Link}
                to={`/missions/${mission.id}`}
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-600 hover:from-primary-600 hover:to-secondary-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 rounded-2xl py-3 font-bold"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Voir la mission</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Button>
            </div>
          )}
        </CardBody>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
      </Card>
    </div>
  );
};

export default MissionCard;