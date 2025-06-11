export const getMissionImage = (category: string, title: string): string => {
  // Images spécifiques selon la catégorie et le titre
  const imageMap: Record<string, string[]> = {
    'Développement': [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&crop=center', // Code sur écran
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&crop=center', // Code coloré
      'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop&crop=center', // Setup développeur
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop&crop=center', // Code sur laptop
      'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400&h=300&fit=crop&crop=center', // Programmation
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center'  // Développement web
    ],
    'Design': [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&crop=center', // Design UI
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop&crop=center', // Palette couleurs
      'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=300&fit=crop&crop=center', // Design graphique
      'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=300&fit=crop&crop=center', // Wireframes
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop&crop=center', // Design tools
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&crop=center'  // UX Design
    ],
    'Marketing': [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center', // Analytics
      'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=400&h=300&fit=crop&crop=center', // Social media
      'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop&crop=center', // Marketing digital
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop&crop=center', // Stratégie
      'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=300&fit=crop&crop=center', // Content marketing
      'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400&h=300&fit=crop&crop=center'  // Growth hacking
    ],
    'Rédaction': [
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop&crop=center', // Écriture
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop&crop=center', // Blog writing
      'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=400&h=300&fit=crop&crop=center', // Journalisme
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop&crop=center', // Content creation
      'https://images.unsplash.com/photo-1542435503-956c469947f6?w=400&h=300&fit=crop&crop=center', // Copywriting
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center'  // Documentation
    ],
    'Test': [
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center', // Testing
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center', // QA Testing
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center', // Bug testing
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop&crop=center', // Quality assurance
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center', // Software testing
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop&crop=center'  // Mobile testing
    ]
  };

  // Images gaming par défaut
  const gamingImages = [
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&crop=center', // Gaming setup
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop&crop=center', // Gaming keyboard
    'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop&crop=center', // Gaming controller
    'https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=300&fit=crop&crop=center', // Esports
    'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop&crop=center', // Gaming monitor
    'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop&crop=center'  // Gaming room
  ];

  // Obtenir les images pour la catégorie
  const categoryImages = imageMap[category] || gamingImages;
  
  // Utiliser le hash du titre pour obtenir une image consistante
  const titleHash = title.split('').reduce((hash, char) => {
    return ((hash << 5) - hash) + char.charCodeAt(0);
  }, 0);
  
  const imageIndex = Math.abs(titleHash) % categoryImages.length;
  return categoryImages[imageIndex];
};

export const getCategoryIcon = (category: string): string => {
  const iconMap: Record<string, string> = {
    'Développement': '💻',
    'Design': '🎨',
    'Marketing': '📢',
    'Rédaction': '✍️',
    'Test': '🧪',
    'Gaming': '🎮',
    'Audio': '🎵',
    'Video': '🎬',
    'Community': '👥'
  };
  
  return iconMap[category] || '🎮';
}; 