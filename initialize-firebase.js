// Firebase Database Initialization Script for OGTools
// Run this script to set up your Firebase database with initial data

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, doc, setDoc, getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AlzaSyCFaUobke7T2EXPhO-DYwC81B7MYHuu2_I",
    authDomain: "ogtool-36ed2.firebaseapp.com",
    projectId: "ogtool-36ed2",
    storageBucket: "ogtool-36ed2.appspot.com",
    messagingSenderId: "785065252249",
    appId: "ogtool-36ed2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize database with OGTools data
async function initializeOGToolsDatabase() {
    console.log('🚀 Initializing OGTools Firebase Database...');
    
    try {
        // Initialize categories
        await initializeCategories();
        
        // Initialize tools
        await initializeTools();
        
        // Initialize user analytics
        await initializeAnalytics();
        
        console.log('✅ Database initialization completed successfully!');
        console.log('🎉 Your OGTools platform is ready to use!');
        
    } catch (error) {
        console.error('❌ Error initializing database:', error);
    }
}

// Initialize categories
async function initializeCategories() {
    console.log('📚 Setting up categories...');
    
    const categories = [
        {
            id: 'education',
            name: 'Education',
            description: 'AI tools for learning, tutoring, research, and academic success',
            icon: 'fas fa-graduation-cap',
            color: '#3B82F6',
            toolCount: 8,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'business',
            name: 'Business',
            description: 'AI solutions for business operations, marketing, and productivity',
            icon: 'fas fa-briefcase',
            color: '#10B981',
            toolCount: 6,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'productivity',
            name: 'Productivity',
            description: 'AI-powered tools to boost efficiency and streamline workflows',
            icon: 'fas fa-tasks',
            color: '#F59E0B',
            toolCount: 5,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'coding',
            name: 'Coding',
            description: 'AI assistants for programming, debugging, and code generation',
            icon: 'fas fa-code',
            color: '#EF4444',
            toolCount: 4,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'design',
            name: 'Design',
            description: 'AI tools for graphic design, presentations, and visual content',
            icon: 'fas fa-palette',
            color: '#8B5CF6',
            toolCount: 3,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'research',
            name: 'Research',
            description: 'AI-powered research tools for data analysis and insights',
            icon: 'fas fa-search',
            color: '#06B6D4',
            toolCount: 2,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    for (const category of categories) {
        await setDoc(doc(db, 'categories', category.id), category);
        console.log(`✅ Added category: ${category.name}`);
    }
}

// Initialize tools
async function initializeTools() {
    console.log('🛠️ Setting up AI tools...');
    
    const tools = [
        // Education Tools
        {
            id: 'quillbot',
            name: 'QuillBot',
            description: 'AI-powered writing assistant for paraphrasing, grammar checking, and content improvement',
            category: 'education',
            url: 'https://quillbot.com',
            icon: 'https://logo.clearbit.com/quillbot.com',
            rating: 4.8,
            price: 'Freemium',
            features: ['Paraphrasing', 'Grammar Check', 'Summarizer', 'Citation Generator'],
            tags: ['writing', 'grammar', 'academic', 'paraphrasing'],
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'khan-academy-ai',
            name: 'Khan Academy AI',
            description: 'Personalized learning platform with AI tutors for various subjects',
            category: 'education',
            url: 'https://khanacademy.org',
            icon: 'https://logo.clearbit.com/khanacademy.org',
            rating: 4.9,
            price: 'Free',
            features: ['Personalized Learning', 'AI Tutoring', 'Progress Tracking', 'Multiple Subjects'],
            tags: ['learning', 'tutoring', 'math', 'science'],
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'gradescope',
            name: 'Gradescope',
            description: 'AI-powered grading and feedback system for educators',
            category: 'education',
            url: 'https://gradescope.com',
            icon: 'https://logo.clearbit.com/gradescope.com',
            rating: 4.6,
            price: 'Paid',
            features: ['Auto Grading', 'Rubric Creation', 'Analytics', 'Student Feedback'],
            tags: ['grading', 'education', 'assessment', 'feedback'],
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'photomath',
            name: 'Photomath',
            description: 'AI-powered math solver that scans and solves problems step-by-step',
            category: 'education',
            url: 'https://photomath.com',
            icon: 'https://logo.clearbit.com/photomath.com',
            rating: 4.7,
            price: 'Freemium',
            features: ['Math Solver', 'Step-by-step Solutions', 'Graphing', 'Multiple Languages'],
            tags: ['math', 'solver', 'homework', 'step-by-step'],
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'socratic',
            name: 'Socratic',
            description: 'AI-powered homework helper that provides explanations and resources',
            category: 'education',
            url: 'https://socratic.org',
            icon: 'https://logo.clearbit.com/socratic.org',
            rating: 4.5,
            price: 'Free',
            features: ['Homework Help', 'Visual Explanations', 'Multiple Subjects', 'Study Guides'],
            tags: ['homework', 'study', 'explanations', 'multisubject'],
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'duolingo',
            name: 'Duolingo',
            description: 'AI-powered language learning platform with personalized lessons',
            category: 'education',
            url: 'https://duolingo.com',
            icon: 'https://logo.clearbit.com/duolingo.com',
            rating: 4.8,
            price: 'Freemium',
            features: ['Language Learning', 'Gamification', 'Speech Recognition', 'Progress Tracking'],
            tags: ['language', 'learning', 'gamification', 'multilingual'],
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'wolfram-alpha',
            name: 'Wolfram Alpha',
            description: 'Computational knowledge engine for math, science, and general knowledge',
            category: 'education',
            url: 'https://wolframalpha.com',
            icon: 'https://logo.clearbit.com/wolframalpha.com',
            rating: 4.9,
            price: 'Freemium',
            features: ['Computational Engine', 'Step-by-step Solutions', 'Data Analysis', 'Visualizations'],
            tags: ['math', 'science', 'computation', 'data'],
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'otter-ai',
            name: 'Otter.ai',
            description: 'AI-powered transcription and note-taking for lectures and meetings',
            category: 'education',
            url: 'https://otter.ai',
            icon: 'https://logo.clearbit.com/otter.ai',
            rating: 4.6,
            price: 'Freemium',
            features: ['Live Transcription', 'Speaker Identification', 'Searchable Notes', 'Integration'],
            tags: ['transcription', 'notes', 'lectures', 'meetings'],
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Business Tools
        {
            id: 'chatgpt',
            name: 'ChatGPT',
            description: 'Advanced AI chatbot for business communication and content creation',
            category: 'business',
            url: 'https://chat.openai.com',
            icon: 'https://logo.clearbit.com/openai.com',
            rating: 4.9,
            price: 'Freemium',
            features: ['Conversational AI', 'Content Generation', 'Code Writing', 'Analysis'],
            tags: ['chatbot', 'content', 'business', 'productivity'],
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'notion-ai',
            name: 'Notion AI',
            description: 'AI-powered workspace for notes, docs, and project management',
            category: 'business',
            url: 'https://notion.so',
            icon: 'https://logo.clearbit.com/notion.so',
            rating: 4.7,
            price: 'Freemium',
            features: ['Note Taking', 'Project Management', 'AI Writing', 'Collaboration'],
            tags: ['notes', 'productivity', 'collaboration', 'management'],
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'canva-ai',
            name: 'Canva AI',
            description: 'AI-powered design platform for creating professional graphics and presentations',
            category: 'business',
            url: 'https://canva.com',
            icon: 'https://logo.clearbit.com/canva.com',
            rating: 4.8,
            price: 'Freemium',
            features: ['Design Templates', 'AI Image Generation', 'Brand Kit', 'Collaboration'],
            tags: ['design', 'graphics', 'presentations', 'branding'],
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'hugging-face',
            name: 'Hugging Face',
            description: 'AI model hub and platform for machine learning and NLP applications',
            category: 'business',
            url: 'https://huggingface.co',
            icon: 'https://logo.clearbit.com/huggingface.co',
            rating: 4.9,
            price: 'Freemium',
            features: ['Model Hub', 'NLP Tools', 'API Access', 'Community'],
            tags: ['ml', 'nlp', 'models', 'api'],
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'zapier-ai',
            name: 'Zapier AI',
            description: 'AI-powered automation platform for connecting apps and workflows',
            category: 'business',
            url: 'https://zapier.com',
            icon: 'https://logo.clearbit.com/zapier.com',
            rating: 4.6,
            price: 'Freemium',
            features: ['Workflow Automation', 'App Integration', 'AI Actions', 'Triggers'],
            tags: ['automation', 'workflow', 'integration', 'productivity'],
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'grammarly',
            name: 'Grammarly',
            description: 'AI-powered writing assistant for grammar, style, and tone improvement',
            category: 'business',
            url: 'https://grammarly.com',
            icon: 'https://logo.clearbit.com/grammarly.com',
            rating: 4.8,
            price: 'Freemium',
            features: ['Grammar Check', 'Style Suggestions', 'Tone Detection', 'Plagiarism Check'],
            tags: ['writing', 'grammar', 'style', 'communication'],
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    for (const tool of tools) {
        await setDoc(doc(db, 'tools', tool.id), tool);
        console.log(`✅ Added tool: ${tool.name}`);
    }
}

// Initialize analytics structure
async function initializeAnalytics() {
    console.log('📊 Setting up analytics...');
    
    const analyticsData = {
        totalUsers: 0,
        totalToolViews: 0,
        totalSearches: 0,
        popularTools: [],
        categoryStats: {},
        lastUpdated: new Date()
    };

    await setDoc(doc(db, 'analytics', 'overview'), analyticsData);
    console.log('✅ Analytics structure initialized');
}

// Run initialization
initializeOGToolsDatabase();
