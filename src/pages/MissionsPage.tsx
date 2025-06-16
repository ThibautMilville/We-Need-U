import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  SlidersHorizontal, 
  ChevronLeft, 
  ChevronRight,
  Star,
  Clock,
  Users,
  Coins,
  TrendingUp,
  Zap,
  Eye,
  Heart,
  Bookmark,
  Gamepad2,
  Camera,
  Code,
  Palette,
  Headphones,
  Edit,
  MessageSquare,
  TrendingUpIcon,
  ChevronDown,
  Award,
  Target,
  Sparkles,
  X
} from 'lucide-react';
import { mockMissions } from '../data/mockData';
import { Mission } from '../types';
import MissionCard from '../components/MissionCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import { getMissionImage } from '../utils/missionImages';

const MISSIONS_PER_PAGE = 9;

// Catégories principales avec sous-catégories comme Fiverr/ComeUp
const CATEGORIES = [
  {
    id: 'gaming',
    name: 'Gaming & Tests',
    icon: Gamepad2,
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50',
    subcategories: [
      'Test de jeux',
      'Beta testing',
      'Feedback gameplay',
      'Bug reports',
      'Streaming',
      'Esports'
    ]
  },
  {
    id: 'content',
    name: 'Contenu & Médias',
    icon: Camera,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50',
    subcategories: [
      'Création vidéo',
      'Montage',
      'Photography',
      'Animation',
      'Podcast',
      'Social Media'
    ]
  },
  {
    id: 'development',
    name: 'Développement',
    icon: Code,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    subcategories: [
      'Web dev',
      'Mobile apps',
      'Blockchain',
      'Smart contracts',
      'UI/UX',
      'Testing'
    ]
  },
  {
    id: 'design',
    name: 'Design & Créatif',
    icon: Palette,
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50',
    subcategories: [
      'Logo design',
      'UI/UX Design',
      'Illustration',
      'Graphic design',
      '3D modeling',
      'NFT creation'
    ]
  },
  {
    id: 'audio',
    name: 'Audio & Musique',
    icon: Headphones,
    color: 'from-indigo-500 to-purple-600',
    bgColor: 'bg-indigo-50',
    subcategories: [
      'Composition',
      'Sound design',
      'Voice over',
      'Mixing',
      'Jingles',
      'Podcast editing'
    ]
  },
  {
    id: 'writing',
    name: 'Rédaction & Traduction',
    icon: Edit,
    color: 'from-teal-500 to-cyan-600',
    bgColor: 'bg-teal-50',
    subcategories: [
      'Articles',
      'Scripts',
      'Traduction',
      'Copywriting',
      'Technical writing',
      'Social media copy'
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing & Communication',
    icon: MessageSquare,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
    subcategories: [
      'Social media',
      'Influencer marketing',
      'Community management',
      'Content strategy',
      'Analytics',
      'SEO'
    ]
  },
  {
    id: 'trending',
    name: 'Tendances',
    icon: TrendingUp,
    color: 'from-yellow-500 to-orange-600',
    bgColor: 'bg-yellow-50',
    subcategories: [
      'Web3',
      'Métaverse',
      'AI & Machine Learning',
      'NFTs',
      'DeFi',
      'GameFi'
    ]
  }
];

const MissionsPage: React.FC = () => {
  const [missions] = useState<Mission[]>(mockMissions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<Mission['status'] | ''>('');
  const [selectedType, setSelectedType] = useState<Mission['type'] | ''>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Mission['difficulty'] | ''>('');
  const [sortBy, setSortBy] = useState<'date' | 'reward' | 'deadline'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [savedMissions, setSavedMissions] = useState<Set<string>>(new Set());
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(missions.map(m => m.category)));
    return cats.sort();
  }, [missions]);

  // Filter and sort missions
  const filteredMissions = useMemo(() => {
    let filtered = missions.filter(mission => {
      const matchesSearch = mission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mission.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = !selectedCategory || mission.category === selectedCategory;
      const matchesStatus = !selectedStatus || mission.status === selectedStatus;
      const matchesType = !selectedType || mission.type === selectedType;
      const matchesDifficulty = !selectedDifficulty || mission.difficulty === selectedDifficulty;
      
      // Filtrage par catégorie principale et sous-catégorie
      const matchesMainCategory = !selectedMainCategory || 
        mission.tags.some(tag => {
          const category = CATEGORIES.find(c => c.id === selectedMainCategory);
          return category?.subcategories.some(sub => 
            tag.toLowerCase().includes(sub.toLowerCase()) ||
            sub.toLowerCase().includes(tag.toLowerCase())
          );
        }) ||
        mission.category.toLowerCase().includes(selectedMainCategory) ||
        mission.title.toLowerCase().includes(selectedMainCategory) ||
        mission.description.toLowerCase().includes(selectedMainCategory);
      
      const matchesSubcategory = !selectedSubcategory || 
        mission.tags.some(tag => tag.toLowerCase().includes(selectedSubcategory.toLowerCase())) ||
        mission.category.toLowerCase().includes(selectedSubcategory.toLowerCase()) ||
        mission.title.toLowerCase().includes(selectedSubcategory.toLowerCase()) ||
        mission.description.toLowerCase().includes(selectedSubcategory.toLowerCase());

      return matchesSearch && matchesCategory && matchesStatus && matchesType && matchesDifficulty && matchesMainCategory && matchesSubcategory;
    });

    // Sort missions
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'reward':
          return b.reward - a.reward;
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case 'date':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return filtered;
  }, [missions, searchTerm, selectedCategory, selectedStatus, selectedType, selectedDifficulty, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredMissions.length / MISSIONS_PER_PAGE);
  const startIndex = (currentPage - 1) * MISSIONS_PER_PAGE;
  const paginatedMissions = filteredMissions.slice(startIndex, startIndex + MISSIONS_PER_PAGE);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedStatus('');
    setSelectedType('');
    setSelectedDifficulty('');
    setSelectedMainCategory('');
    setSelectedSubcategory('');
    setSortBy('date');
    setCurrentPage(1);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedMainCategory(categoryId);
    setSelectedSubcategory('');
    setShowCategoryDropdown(false);
    setCurrentPage(1);
  };

  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    setCurrentPage(1);
  };

  const toggleSavedMission = (missionId: string) => {
    setSavedMissions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(missionId)) {
        newSet.delete(missionId);
      } else {
        newSet.add(missionId);
      }
      return newSet;
    });
  };

  const activeFiltersCount = [selectedCategory, selectedStatus, selectedType, selectedDifficulty, selectedMainCategory, selectedSubcategory].filter(Boolean).length;

  const getStatusColor = (status: Mission['status']) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: Mission['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedStatus, selectedType, selectedDifficulty, selectedMainCategory, selectedSubcategory, sortBy]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCategoryDropdown) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCategoryDropdown]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-2px);
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
                Missions Gaming
              </h1>
              <p className="text-gray-600 text-lg">
                Découvrez {filteredMissions.length} mission{filteredMissions.length > 1 ? 's' : ''} qui correspondent à vos critères
                {selectedMainCategory && (
                  <span className="ml-2 text-blue-600 font-medium">
                    dans {CATEGORIES.find(c => c.id === selectedMainCategory)?.name}
                  </span>
                )}
                {selectedSubcategory && (
                  <span className="ml-2 text-purple-600 font-medium">
                    • {selectedSubcategory}
                  </span>
                )}
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">+12% cette semaine</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 card-hover">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{missions.filter(m => m.status === 'open').length}</div>
                  <div className="text-sm text-gray-600">Missions ouvertes</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 card-hover">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Coins className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.round(missions.reduce((sum, m) => sum + m.reward, 0) / missions.length)}
                  </div>
                  <div className="text-sm text-gray-600">UOS moyen</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 card-hover">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{categories.length}</div>
                  <div className="text-sm text-gray-600">Catégories</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 card-hover">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">4.8</div>
                  <div className="text-sm text-gray-600">Note moyenne</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Explorer par catégorie</h2>
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="bg-white shadow-lg border-gray-200 hover:shadow-xl"
              >
                {selectedMainCategory ? 
                  CATEGORIES.find(c => c.id === selectedMainCategory)?.name || 'Toutes les catégories'
                  : 'Toutes les catégories'
                }
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
              
              {showCategoryDropdown && (
                <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 w-80">
                  <div className="p-4">
                    <button
                      onClick={() => handleCategorySelect('')}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        !selectedMainCategory ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                      }`}
                    >
                      Toutes les catégories
                    </button>
                                         {CATEGORIES.map((category) => {
                       const Icon = category.icon;
                       return (
                         <button
                           key={category.id}
                           onClick={() => handleCategorySelect(category.id)}
                           className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                             selectedMainCategory === category.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                           }`}
                         >
                           <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-r ${category.color} flex-shrink-0`}>
                             <Icon className="w-4 h-4 text-white" />
                           </div>
                           <div className="flex-1 min-w-0">
                             <span className="font-medium">{category.name}</span>
                             <div className="text-xs text-gray-500 mt-1">
                               {category.subcategories.length} spécialités
                             </div>
                           </div>
                         </button>
                       );
                     })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedMainCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`group relative h-32 p-4 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 flex flex-col ${
                    isSelected 
                      ? `${category.bgColor} border-2 border-blue-300 shadow-lg` 
                      : 'bg-white border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex-1 flex items-center justify-center">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${category.color} group-hover:scale-110 transition-transform flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="h-10 flex items-center justify-center">
                    <h3 className={`text-sm font-semibold text-center leading-tight ${isSelected ? 'text-blue-700' : 'text-gray-700 group-hover:text-gray-900'}`}>
                      {category.name}
                    </h3>
                  </div>
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Subcategories */}
          {selectedMainCategory && (
            <div className="animate-fade-in-up">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Spécialités en {CATEGORIES.find(c => c.id === selectedMainCategory)?.name}
              </h3>
                             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                 <button
                   onClick={() => setSelectedSubcategory('')}
                   className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border text-center hover:scale-105 ${
                     !selectedSubcategory 
                       ? 'bg-blue-100 text-blue-700 border-blue-200 shadow-sm' 
                       : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                   }`}
                 >
                   <div className="font-medium">Toutes</div>
                   <div className="text-xs opacity-75 mt-1">
                     ({CATEGORIES.find(c => c.id === selectedMainCategory)?.subcategories.length || 0})
                   </div>
                 </button>
                 {CATEGORIES.find(c => c.id === selectedMainCategory)?.subcategories.map((sub) => (
                   <button
                     key={sub}
                     onClick={() => handleSubcategorySelect(sub)}
                     className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border text-center hover:scale-105 ${
                       selectedSubcategory === sub 
                         ? 'bg-blue-100 text-blue-700 border-blue-200 shadow-sm' 
                         : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                     }`}
                   >
                     <div className="font-medium">{sub}</div>
                     <div className="text-xs opacity-75 mt-1">
                       ({Math.floor(Math.random() * 50) + 5})
                     </div>
                   </button>
                 ))}
               </div>
            </div>
          )}
        </div>

        {/* Popular Categories Banner */}
        {!selectedMainCategory && (
          <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <Card className="overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 border-none">
              <CardBody className="p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2 flex items-center">
                      <Sparkles className="w-6 h-6 mr-2" />
                      Catégories populaires cette semaine
                    </h2>
                    <p className="text-blue-100 mb-4">Découvrez les missions les plus demandées</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Gaming & Tests', 'Design & Créatif', 'Développement', 'Contenu & Médias'].map((cat) => {
                        const category = CATEGORIES.find(c => c.name === cat);
                        const Icon = category?.icon || Target;
                        return (
                          <button
                            key={cat}
                            onClick={() => {
                              if (category) handleCategorySelect(category.id);
                            }}
                            className="flex items-center justify-center p-3 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-medium hover:bg-white/30 transition-all duration-300 border border-white/20 hover:scale-105"
                          >
                            <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
                            <div className="flex-1 text-left">
                              <div className="font-medium">{cat}</div>
                              <div className="text-xs text-white/80">
                                +{Math.floor(Math.random() * 30) + 10}% cette semaine
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="relative">
                      <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Award className="w-16 h-16 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-yellow-900" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {/* Search and Controls */}
        <div className="mb-8 space-y-6 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher par titre, description ou tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-lg transition-all"
            />
          </div>

          {/* Breadcrumb */}
          {(selectedMainCategory || selectedSubcategory) && (
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <button 
                onClick={() => {setSelectedMainCategory(''); setSelectedSubcategory('');}}
                className="hover:text-blue-600 transition-colors"
              >
                Toutes les missions
              </button>
              {selectedMainCategory && (
                <>
                  <span>/</span>
                  <button 
                    onClick={() => setSelectedSubcategory('')}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {CATEGORIES.find(c => c.id === selectedMainCategory)?.name}
                  </button>
                </>
              )}
              {selectedSubcategory && (
                <>
                  <span>/</span>
                  <span className="text-blue-600 font-medium">{selectedSubcategory}</span>
                </>
              )}
            </div>
          )}

          {/* Controls row */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="relative bg-white shadow-lg hover:shadow-xl border-gray-200"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filtres
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-lg transition-all"
              >
                <option value="date">Plus récentes</option>
                <option value="reward">Mieux rémunérées</option>
                <option value="deadline">Deadline proche</option>
              </select>

              {activeFiltersCount > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="flex flex-wrap gap-2">
                    {selectedMainCategory && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center">
                        {CATEGORIES.find(c => c.id === selectedMainCategory)?.name}
                        <button 
                          onClick={() => setSelectedMainCategory('')}
                          className="ml-2 hover:bg-blue-200 rounded-full p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {selectedSubcategory && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium flex items-center">
                        {selectedSubcategory}
                        <button 
                          onClick={() => setSelectedSubcategory('')}
                          className="ml-2 hover:bg-purple-200 rounded-full p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={clearFilters} 
                    className="text-sm bg-white shadow-lg hover:shadow-xl border border-gray-200"
                  >
                    Tout effacer
                  </Button>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                onClick={() => setViewMode('grid')}
                className="p-3 shadow-lg"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                onClick={() => setViewMode('list')}
                className="p-3 shadow-lg"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="mb-8 shadow-xl border-gray-200 animate-fade-in-up">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Filtres avancés</h3>
            </CardHeader>
            <CardBody className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Catégorie
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white shadow-sm transition-all"
                  >
                    <option value="">Toutes les catégories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Statut
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as any)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white shadow-sm transition-all"
                  >
                    <option value="">Tous les statuts</option>
                    <option value="open">Ouvertes</option>
                    <option value="in_progress">En cours</option>
                    <option value="completed">Terminées</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as any)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white shadow-sm transition-all"
                  >
                    <option value="">Tous les types</option>
                    <option value="short">Missions courtes</option>
                    <option value="long">Missions longues</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Difficulté
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white shadow-sm transition-all"
                  >
                    <option value="">Toutes les difficultés</option>
                    <option value="beginner">Débutant</option>
                    <option value="intermediate">Intermédiaire</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Missions Grid/List */}
        <div className="mb-8">
          {paginatedMissions.length === 0 ? (
            <Card className="text-center py-16 shadow-xl border-gray-200">
              <CardBody>
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Aucune mission trouvée
                </h3>
                <p className="text-gray-600 mb-6">
                  Essayez de modifier vos critères de recherche ou vos filtres.
                </p>
                <Button onClick={clearFilters} variant="primary">
                  Effacer tous les filtres
                </Button>
              </CardBody>
            </Card>
          ) : (
            <>
              {viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedMissions.map((mission, index) => (
                    <div 
                      key={mission.id} 
                      className="animate-fade-in-up"
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <MissionCard mission={mission} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {paginatedMissions.map((mission, index) => (
                    <Card 
                      key={mission.id} 
                      className="bg-white shadow-lg border-gray-200 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                      style={{animationDelay: `${index * 0.05}s`}}
                    >
                      <CardBody className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-3">
                              <h3 className="text-lg font-bold text-gray-900">{mission.title}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(mission.status)}`}>
                                {mission.status === 'open' && 'Ouverte'}
                                {mission.status === 'in_progress' && 'En cours'}
                                {mission.status === 'completed' && 'Terminée'}
                              </span>
                              <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(mission.difficulty)}`}>
                                {mission.difficulty === 'beginner' && 'Débutant'}
                                {mission.difficulty === 'intermediate' && 'Intermédiaire'}
                                {mission.difficulty === 'expert' && 'Expert'}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-3">{mission.shortDescription}</p>
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{mission.estimatedTime}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{mission.currentCandidates}/{mission.maxCandidates}</span>
                              </div>
                              <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium">
                                {mission.category}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="flex items-center space-x-2">
                                <Coins className="w-5 h-5 text-yellow-500" />
                                <span className="text-xl font-bold text-gray-900">{mission.reward}</span>
                                <span className="text-sm text-gray-600">UOS</span>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-primary-500 to-secondary-600 hover:from-primary-600 hover:to-secondary-700 text-white shadow-lg hover:shadow-xl"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Voir
                            </Button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 animate-fade-in-up">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 shadow-lg"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'primary' : 'outline'}
                      onClick={() => setCurrentPage(page)}
                      className="w-10 h-10 shadow-lg"
                    >
                      {page}
                    </Button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return <span key={page} className="px-2 text-gray-400">...</span>;
                }
                return null;
              })}
            </div>
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 shadow-lg"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Page Info */}
        {paginatedMissions.length > 0 && (
          <div className="text-center mt-6 text-sm text-gray-600 animate-fade-in-up">
            Affichage de {startIndex + 1} à {Math.min(startIndex + MISSIONS_PER_PAGE, filteredMissions.length)} sur {filteredMissions.length} missions
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionsPage;