// Firebase Database Setup for OGTools
// This file handles all database operations for the AI tools platform

// Import Firebase modules (make sure to include Firebase SDK in your HTML)
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where, orderBy, limit } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Database Collections
const COLLECTIONS = {
    USERS: 'users',
    TOOLS: 'tools',
    CATEGORIES: 'categories',
    REVIEWS: 'reviews',
    FAVORITES: 'favorites',
    SEARCH_HISTORY: 'searchHistory',
    ANALYTICS: 'analytics'
};

// Initialize default data
const initializeDatabase = async () => {
    try {
        // Initialize categories
        await initializeCategories();
        
        // Initialize tools
        await initializeTools();
        
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

// Initialize categories data
const initializeCategories = async () => {
    const categories = [
        {
            id: 'education',
            name: 'Education',
            description: 'AI tools for learning, tutoring, research, and academic success',
            icon: 'fas fa-graduation-cap',
            color: '#3B82F6',
            toolCount: 25,
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
            toolCount: 18,
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
            toolCount: 22,
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
            toolCount: 15,
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
            toolCount: 12,
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
            toolCount: 8,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    for (const category of categories) {
        await setDoc(doc(db, COLLECTIONS.CATEGORIES, category.id), category);
    }
};

// Initialize tools data
const initializeTools = async () => {
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
        }
    ];

    for (const tool of tools) {
        await setDoc(doc(db, COLLECTIONS.TOOLS, tool.id), tool);
    }
};

// User Management Functions
const createUser = async (email, password, userData = {}) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Create user document in Firestore
        await setDoc(doc(db, COLLECTIONS.USERS, user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: userData.displayName || '',
            photoURL: userData.photoURL || '',
            createdAt: new Date(),
            updatedAt: new Date(),
            preferences: {
                theme: 'dark',
                notifications: true,
                categories: []
            },
            stats: {
                toolsViewed: 0,
                toolsFavorited: 0,
                searchesPerformed: 0
            }
        });
        
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

const signInUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error('Error signing in user:', error);
        throw error;
    }
};

const signOutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Error signing out user:', error);
        throw error;
    }
};

// Tool Management Functions
const getTools = async (category = null, limitCount = 50) => {
    try {
        let q = query(collection(db, COLLECTIONS.TOOLS), where('isActive', '==', true));
        
        if (category) {
            q = query(q, where('category', '==', category));
        }
        
        q = query(q, orderBy('rating', 'desc'), limit(limitCount));
        
        const querySnapshot = await getDocs(q);
        const tools = [];
        querySnapshot.forEach((doc) => {
            tools.push({ id: doc.id, ...doc.data() });
        });
        
        return tools;
    } catch (error) {
        console.error('Error getting tools:', error);
        throw error;
    }
};

const getToolById = async (toolId) => {
    try {
        const docRef = doc(db, COLLECTIONS.TOOLS, toolId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error('Tool not found');
        }
    } catch (error) {
        console.error('Error getting tool:', error);
        throw error;
    }
};

const searchTools = async (searchTerm, category = null) => {
    try {
        let q = query(collection(db, COLLECTIONS.TOOLS), where('isActive', '==', true));
        
        if (category) {
            q = query(q, where('category', '==', category));
        }
        
        const querySnapshot = await getDocs(q);
        const tools = [];
        
        querySnapshot.forEach((doc) => {
            const toolData = { id: doc.id, ...doc.data() };
            const searchLower = searchTerm.toLowerCase();
            
            // Search in name, description, and tags
            if (toolData.name.toLowerCase().includes(searchLower) ||
                toolData.description.toLowerCase().includes(searchLower) ||
                toolData.tags.some(tag => tag.toLowerCase().includes(searchLower))) {
                tools.push(toolData);
            }
        });
        
        return tools;
    } catch (error) {
        console.error('Error searching tools:', error);
        throw error;
    }
};

// Favorites Management
const addToFavorites = async (userId, toolId) => {
    try {
        await setDoc(doc(db, COLLECTIONS.FAVORITES, `${userId}_${toolId}`), {
            userId,
            toolId,
            createdAt: new Date()
        });
    } catch (error) {
        console.error('Error adding to favorites:', error);
        throw error;
    }
};

const removeFromFavorites = async (userId, toolId) => {
    try {
        await deleteDoc(doc(db, COLLECTIONS.FAVORITES, `${userId}_${toolId}`));
    } catch (error) {
        console.error('Error removing from favorites:', error);
        throw error;
    }
};

const getUserFavorites = async (userId) => {
    try {
        const q = query(collection(db, COLLECTIONS.FAVORITES), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const favorites = [];
        
        for (const doc of querySnapshot.docs) {
            const favoriteData = doc.data();
            const tool = await getToolById(favoriteData.toolId);
            favorites.push(tool);
        }
        
        return favorites;
    } catch (error) {
        console.error('Error getting user favorites:', error);
        throw error;
    }
};

// Analytics Functions
const trackToolView = async (userId, toolId) => {
    try {
        await addDoc(collection(db, COLLECTIONS.ANALYTICS), {
            type: 'tool_view',
            userId,
            toolId,
            timestamp: new Date()
        });
    } catch (error) {
        console.error('Error tracking tool view:', error);
    }
};

const trackSearch = async (userId, searchTerm, resultsCount) => {
    try {
        await addDoc(collection(db, COLLECTIONS.ANALYTICS), {
            type: 'search',
            userId,
            searchTerm,
            resultsCount,
            timestamp: new Date()
        });
    } catch (error) {
        console.error('Error tracking search:', error);
    }
};

// Export functions
export {
    initializeDatabase,
    createUser,
    signInUser,
    signOutUser,
    getTools,
    getToolById,
    searchTools,
    addToFavorites,
    removeFromFavorites,
    getUserFavorites,
    trackToolView,
    trackSearch,
    auth,
    db,
    storage
};
