(function() {
'use strict';

// Configuration
const CONFIG = {
  debounceDelay: 300,
  animationDuration: 300,
  maxRecentSearches: 5,
  localStorageKey: 'aiToolsHub'
};

// Categories with enhanced data
const categories = [
  { id: 'all', name: 'All', icon: 'fas fa-th', color: 'gray' },
  { id: 'education', name: 'Education', icon: 'fas fa-graduation-cap', color: 'blue' },
  { id: 'business', name: 'Business', icon: 'fas fa-briefcase', color: 'green' },
  { id: 'productivity', name: 'Productivity', icon: 'fas fa-tasks', color: 'purple' },
  { id: 'coding', name: 'Coding', icon: 'fas fa-code', color: 'orange' },
  { id: 'design', name: 'Design', icon: 'fas fa-palette', color: 'pink' },
  { id: 'research', name: 'Research', icon: 'fas fa-microscope', color: 'indigo' },
  { id: 'freelancing', name: 'Freelancing', icon: 'fas fa-briefcase', color: 'rose' },
  { id: 'fitness', name: 'Fitness', icon: 'fas fa-dumbbell', color: 'red' },
  { id: 'writing', name: 'Writing', icon: 'fas fa-pen', color: 'teal' },
  { id: 'presentations', name: 'Presentations', icon: 'fas fa-presentation', color: 'red' },
  { id: 'marketing', name: 'Marketing', icon: 'fas fa-bullhorn', color: 'yellow' },
  { id: 'career', name: 'Career', icon: 'fas fa-user-tie', color: 'emerald' },
  { id: 'employees', name: 'Employees', icon: 'fas fa-users', color: 'cyan' }
];

// Enhanced tools database with logos
const tools = [
  // Education Tools
  {
    id: 'khanmigo',
    name: 'Khanmigo',
    description: 'Khan Academy\'s AI guide for personalized learning and tutoring across all subjects.',
    url: 'https://www.khanacademy.org/khan-labs',
    category: 'education',
    tags: ['tutoring', 'math', 'science', 'practice', 'personalized'],
    rating: 4.8,
    price: 'Free',
    difficulty: 'Beginner',
    features: ['Personalized Learning', 'Step-by-step Solutions', 'Progress Tracking'],
    logo: 'https://cdn.kastatic.org/images/khan-logo-dark-background-2.png',
    icon: 'fas fa-graduation-cap',
    color: 'from-blue-500 to-purple-600'
  },
  // Freelancing Tools
  {
    id: 'upwork-proposals',
    name: 'Jasper AI Proposals',
    description: 'Generate persuasive client proposals and messages quickly.',
    url: 'https://www.jasper.ai',
    category: 'freelancing',
    tags: ['proposals', 'clients', 'emails', 'copywriting'],
    rating: 4.5,
    price: 'Paid',
    difficulty: 'Beginner',
    features: ['Proposal Drafting', 'Email Templates', 'Brand Tone']
  },
  {
    id: 'social-scheduler',
    name: 'Hypefury Scheduler',
    description: 'Plan and schedule social posts to grow your freelancing brand.',
    url: 'https://hypefury.com',
    category: 'freelancing',
    tags: ['social-media', 'scheduling', 'growth'],
    rating: 4.4,
    price: 'Paid',
    difficulty: 'Beginner',
    features: ['Scheduling', 'Templates', 'Analytics']
  },
  {
    id: 'motion-freelance',
    name: 'Motion AI for Freelancers',
    description: 'Automatically schedules client work and meetings around your day.',
    url: 'https://www.usemotion.com',
    category: 'freelancing',
    tags: ['calendar', 'auto-schedule', 'time-blocking'],
    rating: 4.6,
    price: 'Paid',
    difficulty: 'Intermediate',
    features: ['Auto Scheduling', 'Calendar Integration', 'Prioritization']
  },

  // Fitness Tools
  {
    id: 'chatgpt-coach',
    name: 'ChatGPT Coach',
    description: 'Personalized workout and meal plan guidance with AI.',
    url: 'https://chat.openai.com',
    category: 'fitness',
    tags: ['workout', 'nutrition', 'coach'],
    rating: 4.3,
    price: 'Freemium',
    difficulty: 'Beginner',
    features: ['Workout Plans', 'Meal Guidance', 'Habit Tips']
  },
  {
    id: 'notion-tracker',
    name: 'Notion AI Tracker',
    description: 'Track workouts and habits with AI notes and summaries.',
    url: 'https://www.notion.so/product/ai',
    category: 'fitness',
    tags: ['tracking', 'habits', 'summaries'],
    rating: 4.2,
    price: 'Freemium',
    difficulty: 'Beginner',
    features: ['Templates', 'Summaries', 'Reminders']
  },
  {
    id: 'perplexity-nutrition',
    name: 'Perplexity Nutrition',
    description: 'Evidence-based nutrition research at your fingertips.',
    url: 'https://www.perplexity.ai',
    category: 'fitness',
    tags: ['nutrition', 'research', 'citations'],
    rating: 4.4,
    price: 'Freemium',
    difficulty: 'Intermediate',
    features: ['Citations', 'Summaries', 'Comparisons']
  },
  {
    id: 'chatgpt-education',
    name: 'ChatGPT for Education',
    description: 'AI assistant for homework help, essay writing, and concept explanation.',
    url: 'https://chat.openai.com',
    category: 'education',
    tags: ['homework', 'essay', 'explanation', 'study'],
    rating: 4.7,
    price: 'Freemium',
    difficulty: 'Beginner',
    features: ['Homework Help', 'Essay Writing', 'Concept Explanation'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    icon: 'fas fa-robot',
    color: 'from-green-500 to-teal-600'
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    description: 'AI-powered search engine with citations for academic research and fact-checking.',
    url: 'https://www.perplexity.ai',
    category: 'education',
    tags: ['research', 'citations', 'academic', 'fact-checking'],
    rating: 4.6,
    price: 'Freemium',
    difficulty: 'Intermediate',
    features: ['Academic Research', 'Citations', 'Fact Checking'],
    logo: 'https://www.perplexity.ai/favicon.ico',
    icon: 'fas fa-search',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    description: 'AI writing assistant integrated into Notion for note-taking and study organization.',
    url: 'https://www.notion.so/product/ai',
    category: 'education',
    tags: ['notes', 'organization', 'writing', 'study'],
    rating: 4.5,
    price: 'Freemium',
    difficulty: 'Beginner',
    features: ['Note Taking', 'Study Organization', 'AI Writing'],
    logo: 'https://www.notion.so/images/logo-ios.png',
    icon: 'fas fa-sticky-note',
    color: 'from-gray-600 to-gray-800'
  },

  // Business Tools
  {
    id: 'zapier-ai',
    name: 'Zapier AI',
    description: 'Automate business workflows and processes with AI-powered automation.',
    url: 'https://zapier.com/ai',
    category: 'business',
    tags: ['automation', 'workflow', 'business', 'productivity'],
    rating: 4.7,
    price: 'Freemium',
    difficulty: 'Intermediate',
    features: ['Workflow Automation', 'Business Process', 'Integration']
  },
  {
    id: 'jasper-ai',
    name: 'Jasper AI',
    description: 'AI content creation platform for marketing, sales, and business communications.',
    url: 'https://www.jasper.ai',
    category: 'business',
    tags: ['content', 'marketing', 'sales', 'business'],
    rating: 4.6,
    price: 'Paid',
    difficulty: 'Intermediate',
    features: ['Content Creation', 'Marketing Copy', 'Sales Materials']
  },
  {
    id: 'claude-ai',
    name: 'Claude AI',
    description: 'Advanced AI assistant for business analysis, document processing, and decision support.',
    url: 'https://claude.ai',
    category: 'business',
    tags: ['analysis', 'documents', 'decision', 'business'],
    rating: 4.8,
    price: 'Freemium',
    difficulty: 'Advanced',
    features: ['Business Analysis', 'Document Processing', 'Decision Support']
  },

  // Productivity Tools
  {
    id: 'notion-ai-prod',
    name: 'Notion AI',
    description: 'AI-powered workspace for project management, documentation, and team collaboration.',
    url: 'https://www.notion.so/product/ai',
    category: 'productivity',
    tags: ['project', 'management', 'collaboration', 'documentation'],
    rating: 4.7,
    price: 'Freemium',
    difficulty: 'Beginner',
    features: ['Project Management', 'Team Collaboration', 'Documentation']
  },
  {
    id: 'todoist-ai',
    name: 'Todoist AI',
    description: 'Smart task management with AI-powered suggestions and natural language processing.',
    url: 'https://todoist.com/ai',
    category: 'productivity',
    tags: ['tasks', 'management', 'scheduling', 'organization'],
    rating: 4.5,
    price: 'Freemium',
    difficulty: 'Beginner',
    features: ['Task Management', 'Smart Scheduling', 'Natural Language']
  },
  {
    id: 'motion-ai',
    name: 'Motion AI',
    description: 'AI calendar and project management tool that automatically schedules your tasks.',
    url: 'https://www.usemotion.com',
    category: 'productivity',
    tags: ['calendar', 'scheduling', 'automation', 'time-management'],
    rating: 4.6,
    price: 'Paid',
    difficulty: 'Intermediate',
    features: ['Auto Scheduling', 'Calendar Management', 'Time Blocking']
  },

  // Coding Tools
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description: 'AI pair programmer that suggests code completions and helps with debugging.',
    url: 'https://github.com/features/copilot',
    category: 'coding',
    tags: ['code', 'programming', 'debugging', 'autocomplete'],
    rating: 4.7,
    price: 'Paid',
    difficulty: 'Intermediate',
    features: ['Code Completion', 'Debugging Help', 'Multi-language Support'],
    logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    icon: 'fas fa-code',
    color: 'from-gray-800 to-gray-900'
  },
  {
    id: 'cursor-ai',
    name: 'Cursor AI',
    description: 'AI-powered code editor with advanced code generation and editing capabilities.',
    url: 'https://cursor.sh',
    category: 'coding',
    tags: ['editor', 'generation', 'editing', 'programming'],
    rating: 4.8,
    price: 'Freemium',
    difficulty: 'Intermediate',
    features: ['Code Generation', 'Smart Editing', 'AI Chat']
  },
  {
    id: 'replit-ghostwriter',
    name: 'Replit Ghostwriter',
    description: 'AI coding assistant that helps write, debug, and explain code in real-time.',
    url: 'https://replit.com/ghostwriter',
    category: 'coding',
    tags: ['coding', 'debugging', 'explanation', 'real-time'],
    rating: 4.5,
    price: 'Freemium',
    difficulty: 'Beginner',
    features: ['Real-time Coding', 'Code Explanation', 'Debugging']
  },

  // Design Tools
  {
    id: 'canva-magic',
    name: 'Canva Magic Design',
    description: 'AI-powered design tool that creates presentations, graphics, and visual content.',
    url: 'https://www.canva.com/magic-design/',
    category: 'design',
    tags: ['design', 'presentations', 'graphics', 'visual'],
    rating: 4.6,
    price: 'Freemium',
    difficulty: 'Beginner',
    features: ['Auto Design', 'Templates', 'Visual Content'],
    logo: 'https://static.canva.com/web/images/favicon.ico',
    icon: 'fas fa-palette',
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'AI image generation tool for creating stunning artwork and visual content.',
    url: 'https://www.midjourney.com',
    category: 'design',
    tags: ['art', 'images', 'generation', 'creative'],
    rating: 4.8,
    price: 'Paid',
    difficulty: 'Intermediate',
    features: ['Image Generation', 'Art Creation', 'Style Transfer']
  },
  {
    id: 'figma-ai',
    name: 'Figma AI',
    description: 'AI-powered design tool for UI/UX design with smart components and automation.',
    url: 'https://www.figma.com/ai',
    category: 'design',
    tags: ['ui', 'ux', 'design', 'prototyping'],
    rating: 4.7,
    price: 'Freemium',
    difficulty: 'Intermediate',
    features: ['UI/UX Design', 'Smart Components', 'Prototyping']
  },

  // Research Tools
  {
    id: 'perplexity-research',
    name: 'Perplexity AI',
    description: 'Advanced AI research assistant with real-time information and citations.',
    url: 'https://www.perplexity.ai',
    category: 'research',
    tags: ['research', 'citations', 'real-time', 'academic'],
    rating: 4.7,
    price: 'Freemium',
    difficulty: 'Intermediate',
    features: ['Real-time Research', 'Citations', 'Academic Sources']
  },
  {
    id: 'consensus-ai',
    name: 'Consensus AI',
    description: 'AI-powered research tool that finds and summarizes scientific papers.',
    url: 'https://consensus.app',
    category: 'research',
    tags: ['scientific', 'papers', 'summarization', 'academic'],
    rating: 4.6,
    price: 'Freemium',
    difficulty: 'Advanced',
    features: ['Scientific Papers', 'Summarization', 'Research Synthesis']
  },

  // Writing Tools
  {
    id: 'grammarly',
    name: 'Grammarly',
    description: 'AI writing assistant for grammar, clarity, and tone improvement.',
    url: 'https://www.grammarly.com',
    category: 'writing',
    tags: ['grammar', 'writing', 'clarity', 'tone'],
    rating: 4.5,
    price: 'Freemium',
    difficulty: 'Beginner',
    features: ['Grammar Check', 'Clarity Improvement', 'Tone Analysis'],
    logo: 'https://static.grammarly.com/assets/files/grammarly_logo.png',
    icon: 'fas fa-spell-check',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'copy-ai',
    name: 'Copy.ai',
    description: 'AI copywriting tool for marketing content, emails, and social media posts.',
    url: 'https://www.copy.ai',
    category: 'writing',
    tags: ['copywriting', 'marketing', 'content', 'social-media'],
    rating: 4.4,
    price: 'Freemium',
    difficulty: 'Beginner',
    features: ['Copywriting', 'Marketing Content', 'Social Media']
  },

  // Presentation Tools
  {
    id: 'slidesai',
    name: 'SlidesAI',
    description: 'AI tool that automatically creates presentation slides from text content.',
    url: 'https://www.slidesai.io',
    category: 'presentations',
    tags: ['slides', 'presentations', 'automation', 'content'],
    rating: 4.3,
    price: 'Freemium',
    difficulty: 'Beginner',
    features: ['Auto Slides', 'Content Conversion', 'Templates']
  },
  {
    id: 'gamma-ai',
    name: 'Gamma AI',
    description: 'AI-powered presentation and document creation platform.',
    url: 'https://gamma.app',
    category: 'presentations',
    tags: ['presentations', 'documents', 'ai-creation', 'templates'],
    rating: 4.5,
    price: 'Freemium',
    difficulty: 'Beginner',
    features: ['AI Creation', 'Templates', 'Document Generation']
  },

  // Marketing Tools
  {
    id: 'hypefury',
    name: 'Hypefury',
    description: 'AI social media management tool for content creation and scheduling.',
    url: 'https://hypefury.com',
    category: 'marketing',
    tags: ['social-media', 'content', 'scheduling', 'management'],
    rating: 4.4,
    price: 'Paid',
    difficulty: 'Intermediate',
    features: ['Social Media', 'Content Creation', 'Scheduling']
  },
  {
    id: 'copy-ai-marketing',
    name: 'Copy.ai',
    description: 'AI marketing copy generator for ads, emails, and promotional content.',
    url: 'https://www.copy.ai',
    category: 'marketing',
    tags: ['marketing', 'ads', 'emails', 'promotional'],
    rating: 4.4,
    price: 'Freemium',
    difficulty: 'Beginner',
    features: ['Ad Copy', 'Email Marketing', 'Promotional Content']
  },

  // Career Tools
  {
    id: 'resume-ai',
    name: 'Resume AI',
    description: 'AI-powered resume builder and career guidance tool.',
    url: 'https://resume.ai',
    category: 'career',
    tags: ['resume', 'career', 'job-search', 'guidance'],
    rating: 4.3,
    price: 'Freemium',
    difficulty: 'Beginner',
    features: ['Resume Building', 'Career Guidance', 'Job Search']
  },
  {
    id: 'linkedin-ai',
    name: 'LinkedIn AI',
    description: 'AI features in LinkedIn for profile optimization and networking.',
    url: 'https://www.linkedin.com',
    category: 'career',
    tags: ['networking', 'profile', 'optimization', 'professional'],
    rating: 4.2,
    price: 'Freemium',
    difficulty: 'Beginner',
    features: ['Profile Optimization', 'Networking', 'Professional Growth']
  },

  // Employee Tools
  {
    id: 'slack-ai',
    name: 'Slack AI',
    description: 'AI-powered team communication and collaboration platform.',
    url: 'https://slack.com/ai',
    category: 'employees',
    tags: ['communication', 'collaboration', 'team', 'workplace'],
    rating: 4.5,
    price: 'Freemium',
    difficulty: 'Beginner',
    features: ['Team Communication', 'Collaboration', 'Workflow Integration']
  },
  {
    id: 'microsoft-copilot',
    name: 'Microsoft Copilot',
    description: 'AI assistant integrated into Microsoft 365 for workplace productivity.',
    url: 'https://www.microsoft.com/copilot',
    category: 'employees',
    tags: ['productivity', 'office', 'workplace', 'automation'],
    rating: 4.6,
    price: 'Paid',
    difficulty: 'Intermediate',
    features: ['Office Integration', 'Workplace Automation', 'Productivity']
  }
];

// Application State
const state = {
  query: '',
  activeCategory: 'all',
  sortBy: 'name',
  viewMode: 'grid',
  recentSearches: [],
  favorites: [],
  isLoading: false
};

// DOM Elements
const elements = {
  // Navigation
  mobileMenuToggle: document.getElementById('mobileMenuToggle'),
  mobileMenu: document.getElementById('mobileMenu'),
  darkModeToggle: document.getElementById('darkModeToggle'),
  
  // Search and Filters
  searchInput: document.getElementById('searchInput'),
  categoryFilters: document.getElementById('categoryFilters'),
  
  // Content
  toolsGrid: document.getElementById('toolsGrid'),
  emptyState: document.getElementById('emptyState'),
  
  // Footer
  year: document.getElementById('year'),
  
  // Navigation Links
  navLinks: document.querySelectorAll('.nav-link'),
  logPanel: document.getElementById('logPanel'),
  logBody: document.getElementById('logBody'),
  logToggle: document.getElementById('logToggle')
};

// Utility Functions
function normalize(text) {
  return String(text || '').toLowerCase().trim();
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function saveToLocalStorage() {
  try {
    const data = {
      recentSearches: state.recentSearches,
      favorites: state.favorites,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    };
    localStorage.setItem(CONFIG.localStorageKey, JSON.stringify(data));
  } catch (error) {
    console.warn('Could not save to localStorage:', error);
  }
}

function getCategoryFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat && categories.find(c => c.id === cat)) {
      return cat;
    }
    const hash = (window.location.hash || '').replace('#', '');
    if (hash && categories.find(c => c.id === hash)) {
      return hash;
    }
  } catch (_) {}
  return null;
}

function loadFromLocalStorage() {
  try {
    const data = localStorage.getItem(CONFIG.localStorageKey);
    if (data) {
      const parsed = JSON.parse(data);
      state.recentSearches = parsed.recentSearches || [];
      state.favorites = parsed.favorites || [];
      
      // Apply saved theme
      if (parsed.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (parsed.theme === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', prefersDark);
      }
    }
    // Category from URL overrides default
    const fromUrl = getCategoryFromUrl();
    if (fromUrl) {
      state.activeCategory = fromUrl;
    }
  } catch (error) {
    console.warn('Could not load from localStorage:', error);
  }
}

// Search and Filter Functions
function addToRecentSearches(query) {
  if (!query || query.length < 2) return;
  
  const normalizedQuery = normalize(query);
  state.recentSearches = state.recentSearches.filter(q => q !== normalizedQuery);
  state.recentSearches.unshift(normalizedQuery);
  state.recentSearches = state.recentSearches.slice(0, CONFIG.maxRecentSearches);
  saveToLocalStorage();
}

function matchesFilters(tool) {
  const query = normalize(state.query);
  const categoryMatch = state.activeCategory === 'all' || tool.category === state.activeCategory;
  
  if (!categoryMatch) return false;
  
  if (!query) return true;
  
  const searchFields = [
    tool.name,
    tool.description,
    ...(tool.tags || []),
    tool.features?.join(' ') || ''
  ];
  
  return searchFields.some(field => normalize(field).includes(query));
}

function sortTools(tools) {
  return tools.sort((a, b) => {
    switch (state.sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        const priceOrder = { 'Free': 0, 'Freemium': 1, 'Paid': 2 };
        return (priceOrder[a.price] || 3) - (priceOrder[b.price] || 3);
      case 'difficulty':
        const difficultyOrder = { 'Beginner': 0, 'Intermediate': 1, 'Advanced': 2 };
        return (difficultyOrder[a.difficulty] || 3) - (difficultyOrder[b.difficulty] || 3);
      default:
        return 0;
    }
  });
}

// Rendering Functions
function createCategoryButton(category) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `button-chip ${state.activeCategory === category.id ? 'active' : ''}`;
  button.innerHTML = `<i class="${category.icon} mr-2"></i>${category.name}`;
  
  button.addEventListener('click', () => {
    state.activeCategory = category.id;
    render();
    renderCategoryFilters();
  });
  
  return button;
}

function renderCategoryFilters() {
  elements.categoryFilters.innerHTML = '';
  categories.forEach(category => {
    elements.categoryFilters.appendChild(createCategoryButton(category));
  });
}

function createToolCard(tool) {
  const card = document.createElement('article');
  card.className = 'tool-card-3d card-3d fade-in';
  card.setAttribute('data-tool-id', tool.id);
  
  // Tool Icon/Logo
  const iconContainer = document.createElement('div');
  iconContainer.className = 'tool-icon-3d';
  
  if (tool.logo) {
    const logo = document.createElement('img');
    logo.src = tool.logo;
    logo.alt = `${tool.name} logo`;
    logo.className = 'tool-logo w-full h-full object-cover rounded-2xl';
    iconContainer.appendChild(logo);
  } else {
    const icon = document.createElement('i');
    icon.className = `${tool.icon || 'fas fa-cube'} text-white text-4xl`;
    iconContainer.appendChild(icon);
  }
  
  // Apply gradient background
  if (tool.color) {
    iconContainer.className += ` bg-gradient-to-br ${tool.color}`;
  } else {
    iconContainer.className += ' bg-gradient-to-br from-gray-500 to-gray-600';
  }
  
  // Tool Header
  const header = document.createElement('div');
  header.className = 'flex items-start justify-between mb-4';
  
  const title = document.createElement('h3');
  title.className = 'tool-title text-white text-xl font-bold font-poppins';
  title.textContent = tool.name;
  
  const rating = document.createElement('div');
  rating.className = 'flex items-center text-sm text-orange-200';
  rating.innerHTML = `<i class="fas fa-star text-yellow-400 mr-1"></i>${tool.rating}`;
  
  header.appendChild(title);
  header.appendChild(rating);
  
  // Description
  const description = document.createElement('p');
  description.className = 'tool-description text-orange-100 text-sm leading-relaxed mb-4 font-poppins';
  description.textContent = tool.description;
  
  // Meta Information
  const meta = document.createElement('div');
  meta.className = 'tool-meta flex flex-wrap gap-2 items-center justify-between mt-4';
  
  const categoryPill = document.createElement('span');
  categoryPill.className = 'text-xs px-3 py-1 rounded-full bg-white/20 text-white font-medium';
  categoryPill.textContent = categories.find(c => c.id === tool.category)?.name || tool.category;
  
  const priceBadge = document.createElement('span');
  priceBadge.className = 'text-xs px-3 py-1 rounded-full bg-white/20 text-white';
  priceBadge.textContent = tool.price;
  
  const difficultyBadge = document.createElement('span');
  difficultyBadge.className = 'text-xs px-3 py-1 rounded-full bg-white/20 text-white';
  difficultyBadge.textContent = tool.difficulty;
  
  const link = document.createElement('a');
  link.href = tool.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'tool-link text-white hover:text-yellow-300 font-medium text-sm transition-colors';
  link.innerHTML = '<i class="fas fa-external-link-alt mr-1"></i>Visit';
  
  meta.appendChild(categoryPill);
  meta.appendChild(priceBadge);
  meta.appendChild(difficultyBadge);
  meta.appendChild(link);
  
  // Assemble card
  card.appendChild(iconContainer);
  card.appendChild(header);
  card.appendChild(description);
  card.appendChild(meta);
  
  // Add click tracking
  card.addEventListener('click', (e) => {
    if (!e.target.closest('a')) {
      window.open(tool.url, '_blank', 'noopener,noreferrer');
    }
  });
  
  return card;
}

function renderTools() {
  const filteredTools = tools.filter(matchesFilters);
  const sortedTools = sortTools(filteredTools);
  
  elements.toolsGrid.innerHTML = '';
  
  if (sortedTools.length === 0) {
    elements.toolsGrid.classList.add('hidden');
    elements.emptyState.classList.remove('hidden');
    return;
  }
  
  elements.toolsGrid.classList.remove('hidden');
  elements.emptyState.classList.add('hidden');
  
  sortedTools.forEach((tool, index) => {
    const card = createToolCard(tool);
    card.style.animationDelay = `${index * 0.06}s`;
    elements.toolsGrid.appendChild(card);
  });
}

// Event Handlers
function setupSearch() {
  const debouncedSearch = debounce((query) => {
    state.query = query;
    if (query.length >= 2) {
      addToRecentSearches(query);
    }
    renderTools();
  }, CONFIG.debounceDelay);
  
  elements.searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
  });
  
  // Add search suggestions
  elements.searchInput.addEventListener('focus', () => {
    // Could implement search suggestions here
  });
}

function setupMobileMenu() {
  elements.mobileMenuToggle.addEventListener('click', () => {
    elements.mobileMenu.classList.toggle('hidden');
  });
  
  // Close mobile menu when clicking on links
  elements.mobileMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      elements.mobileMenu.classList.add('hidden');
    }
  });
}

function setupDarkMode() {
  elements.darkModeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    // Persist theme in our app storage and native key for compatibility
    try {
      const data = JSON.parse(localStorage.getItem(CONFIG.localStorageKey) || '{}');
      data.theme = isDark ? 'dark' : 'light';
      localStorage.setItem(CONFIG.localStorageKey, JSON.stringify(data));
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (_) {}
    log('info', `Theme toggled to ${isDark ? 'dark' : 'light'}`);
  });
}

function setupNavigation() {
  elements.navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || '';
      const isSamePageAnchor = href.startsWith('#') || href.startsWith(window.location.pathname + '#') || href.startsWith('index.html#');
      if (isSamePageAnchor) {
      e.preventDefault();
        const targetId = href.includes('#') ? href.split('#').pop() : href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          log('info', `Navigated to #${targetId}`);
        }
      } else {
        // For full navigations, let the browser handle it but log
        log('info', `Navigating to ${href}`);
      }
    });
  });
}

function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        // If container has children to stagger
        if (entry.target.classList.contains('stagger')) {
          const children = Array.from(entry.target.children);
          children.forEach((child, idx) => {
            child.style.animationDelay = `${idx * 0.08}s`;
            child.classList.add('fade-in');
          });
        }
      }
    });
  }, observerOptions);
  
  // Observe all category cards and feature cards
  document.querySelectorAll('.category-card, .feature-card, .stagger').forEach(card => {
    observer.observe(card);
  });
}

// Logger
function log(level, message) {
  try {
    if (!elements.logPanel || !elements.logBody) return;
    const el = document.createElement('div');
    el.className = `log-item ${level}`;
    const time = new Date().toLocaleTimeString();
    el.textContent = `[${time}] ${message}`;
    elements.logBody.appendChild(el);
    elements.logBody.scrollTop = elements.logBody.scrollHeight;
    if (elements.logPanel.classList.contains('hidden')) {
      elements.logPanel.classList.remove('hidden');
    }
  } catch (_) {}
}

// Main render function
function render() {
  renderTools();
}

// Initialize application
function init() {
  // Load saved data
  loadFromLocalStorage();
  
  // Setup event listeners
  setupSearch();
  setupMobileMenu();
  setupDarkMode();
  setupNavigation();
  setupScrollAnimations();
  if (elements.logToggle && elements.logPanel) {
    elements.logToggle.addEventListener('click', () => {
      elements.logPanel.classList.toggle('hidden');
    });
  }
  
  // Initial render
  renderCategoryFilters();
  render();
  
  // Update year
  if (elements.year) {
    elements.year.textContent = new Date().getFullYear();
  }
  
  // Add loading states
  document.body.classList.add('loaded');

  // Initial logs
  log('info', 'AI Tools Hub initialized');
  log('info', `Loaded ${tools.length} tools across ${categories.length} categories`);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for potential external use
window.AIToolsHub = {
  state,
  tools,
  categories,
  render,
  addToRecentSearches
};

})();