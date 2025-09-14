// Database Configuration and User Management
class DatabaseManager {
    constructor() {
        this.db = null;
        this.auth = null;
        this.currentUser = null;
        this.init();
    }
    
    async init() {
        try {
            // Initialize Firebase if not already initialized
            if (typeof firebase === 'undefined') {
                console.error('Firebase not loaded. Please include Firebase SDK.');
                return;
            }
            
            // Firebase configuration - Replace with your actual Firebase config
            const firebaseConfig = {
                apiKey: "YOUR_API_KEY_HERE",
                authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
                projectId: "YOUR_PROJECT_ID",
                storageBucket: "YOUR_PROJECT_ID.appspot.com",
                messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
                appId: "YOUR_APP_ID"
            };
            
            // Initialize Firebase
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }
            
            this.db = firebase.firestore();
            this.auth = firebase.auth();
            
            // Listen for auth state changes
            this.auth.onAuthStateChanged((user) => {
                this.currentUser = user;
                this.updateUI(user);
            });
            
            console.log('Database initialized successfully');
        } catch (error) {
            console.error('Error initializing database:', error);
        }
    }
    
    // User Management Methods
    async createUser(userData) {
        try {
            const userRef = this.db.collection('users').doc(userData.uid);
            await userRef.set({
                ...userData,
                createdAt: new Date(),
                lastLogin: new Date(),
                isActive: true
            });
            
            // Save to localStorage
            localStorage.setItem('user', JSON.stringify(userData));
            return { success: true, user: userData };
        } catch (error) {
            console.error('Error creating user:', error);
            return { success: false, error: error.message };
        }
    }
    
    async updateUser(uid, userData) {
        try {
            const userRef = this.db.collection('users').doc(uid);
            await userRef.update({
                ...userData,
                updatedAt: new Date()
            });
            
            // Update localStorage
            const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
            const updatedUser = { ...currentUser, ...userData };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            return { success: true };
        } catch (error) {
            console.error('Error updating user:', error);
            return { success: false, error: error.message };
        }
    }
    
    async getUser(uid) {
        try {
            const userDoc = await this.db.collection('users').doc(uid).get();
            if (userDoc.exists) {
                return { success: true, user: userDoc.data() };
            } else {
                return { success: false, error: 'User not found' };
            }
        } catch (error) {
            console.error('Error getting user:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Favorites Management
    async addToFavorites(toolId) {
        if (!this.currentUser) return { success: false, error: 'User not logged in' };
        
        try {
            const userRef = this.db.collection('users').doc(this.currentUser.uid);
            const userDoc = await userRef.get();
            const userData = userDoc.data();
            const favorites = userData.favorites || [];
            
            if (!favorites.includes(toolId)) {
                favorites.push(toolId);
                await userRef.update({ favorites });
                
                // Update localStorage
                const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
                currentUser.favorites = favorites;
                localStorage.setItem('user', JSON.stringify(currentUser));
            }
            
            return { success: true, favorites };
        } catch (error) {
            console.error('Error adding to favorites:', error);
            return { success: false, error: error.message };
        }
    }
    
    async removeFromFavorites(toolId) {
        if (!this.currentUser) return { success: false, error: 'User not logged in' };
        
        try {
            const userRef = this.db.collection('users').doc(this.currentUser.uid);
            const userDoc = await userRef.get();
            const userData = userDoc.data();
            const favorites = userData.favorites || [];
            
            const updatedFavorites = favorites.filter(id => id !== toolId);
            await userRef.update({ favorites: updatedFavorites });
            
            // Update localStorage
            const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
            currentUser.favorites = updatedFavorites;
            localStorage.setItem('user', JSON.stringify(currentUser));
            
            return { success: true, favorites: updatedFavorites };
        } catch (error) {
            console.error('Error removing from favorites:', error);
            return { success: false, error: error.message };
        }
    }
    
    async getFavorites() {
        if (!this.currentUser) return { success: false, error: 'User not logged in' };
        
        try {
            const userDoc = await this.db.collection('users').doc(this.currentUser.uid).get();
            const userData = userDoc.data();
            return { success: true, favorites: userData.favorites || [] };
        } catch (error) {
            console.error('Error getting favorites:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Search History Management
    async addToSearchHistory(searchQuery) {
        if (!this.currentUser) return { success: false, error: 'User not logged in' };
        
        try {
            const userRef = this.db.collection('users').doc(this.currentUser.uid);
            const userDoc = await userRef.get();
            const userData = userDoc.data();
            const searchHistory = userData.searchHistory || [];
            
            // Add to beginning and limit to 50 items
            searchHistory.unshift({
                query: searchQuery,
                timestamp: new Date()
            });
            
            const limitedHistory = searchHistory.slice(0, 50);
            await userRef.update({ searchHistory: limitedHistory });
            
            return { success: true, searchHistory: limitedHistory };
        } catch (error) {
            console.error('Error adding to search history:', error);
            return { success: false, error: error.message };
        }
    }
    
    async getSearchHistory() {
        if (!this.currentUser) return { success: false, error: 'User not logged in' };
        
        try {
            const userDoc = await this.db.collection('users').doc(this.currentUser.uid).get();
            const userData = userDoc.data();
            return { success: true, searchHistory: userData.searchHistory || [] };
        } catch (error) {
            console.error('Error getting search history:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Tool Analytics
    async trackToolClick(toolId, toolName) {
        try {
            const analyticsRef = this.db.collection('analytics').doc('toolClicks');
            await analyticsRef.set({
                [toolId]: firebase.firestore.FieldValue.increment(1)
            }, { merge: true });
            
            // Track user-specific tool usage
            if (this.currentUser) {
                const userRef = this.db.collection('users').doc(this.currentUser.uid);
                await userRef.update({
                    [`toolUsage.${toolId}`]: firebase.firestore.FieldValue.increment(1),
                    [`lastToolUsed.${toolId}`]: new Date()
                });
            }
            
            return { success: true };
        } catch (error) {
            console.error('Error tracking tool click:', error);
            return { success: false, error: error.message };
        }
    }
    
    // User Preferences
    async updatePreferences(preferences) {
        if (!this.currentUser) return { success: false, error: 'User not logged in' };
        
        try {
            const userRef = this.db.collection('users').doc(this.currentUser.uid);
            await userRef.update({
                preferences: preferences,
                updatedAt: new Date()
            });
            
            // Update localStorage
            const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
            currentUser.preferences = preferences;
            localStorage.setItem('user', JSON.stringify(currentUser));
            
            return { success: true };
        } catch (error) {
            console.error('Error updating preferences:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Authentication Methods
    async signInWithEmail(email, password) {
        try {
            const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
            await this.updateLastLogin(userCredential.user.uid);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    
    async signUpWithEmail(email, password, displayName) {
        try {
            const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
            await userCredential.user.updateProfile({ displayName });
            
            const userData = {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: displayName,
                createdAt: new Date(),
                lastLogin: new Date(),
                isActive: true,
                favorites: [],
                searchHistory: [],
                preferences: {
                    theme: 'light',
                    notifications: true,
                    emailUpdates: true
                }
            };
            
            await this.createUser(userData);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    
    async signOut() {
        try {
            await this.auth.signOut();
            localStorage.removeItem('user');
            this.currentUser = null;
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    
    async updateLastLogin(uid) {
        try {
            const userRef = this.db.collection('users').doc(uid);
            await userRef.update({
                lastLogin: new Date(),
                loginCount: firebase.firestore.FieldValue.increment(1)
            });
        } catch (error) {
            console.error('Error updating last login:', error);
        }
    }
    
    // UI Update Methods
    updateUI(user) {
        const loginBtn = document.getElementById('loginBtn');
        const userMenu = document.getElementById('userMenu');
        
        if (user) {
            // User is logged in
            if (loginBtn) {
                loginBtn.innerHTML = `
                    <i class="fas fa-user mr-2"></i>
                    ${user.displayName || 'User'}
                `;
                loginBtn.href = '#';
                loginBtn.onclick = () => this.showUserMenu();
            }
            
            if (userMenu) {
                userMenu.style.display = 'block';
            }
        } else {
            // User is not logged in
            if (loginBtn) {
                loginBtn.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Login';
                loginBtn.href = 'login.html';
                loginBtn.onclick = null;
            }
            
            if (userMenu) {
                userMenu.style.display = 'none';
            }
        }
    }
    
    showUserMenu() {
        // Create and show user menu dropdown
        const userMenu = document.createElement('div');
        userMenu.className = 'absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50';
        userMenu.innerHTML = `
            <div class="py-2">
                <a href="#" class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i class="fas fa-user mr-2"></i>Profile
                </a>
                <a href="#" class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i class="fas fa-heart mr-2"></i>Favorites
                </a>
                <a href="#" class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i class="fas fa-cog mr-2"></i>Settings
                </a>
                <hr class="my-2">
                <a href="#" onclick="databaseManager.signOut()" class="block px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i class="fas fa-sign-out-alt mr-2"></i>Sign Out
                </a>
            </div>
        `;
        
        // Position and show menu
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.style.position = 'relative';
            loginBtn.appendChild(userMenu);
            
            // Remove menu when clicking outside
            setTimeout(() => {
                document.addEventListener('click', (e) => {
                    if (!loginBtn.contains(e.target)) {
                        userMenu.remove();
                    }
                });
            }, 100);
        }
    }
    
    // Utility Methods
    isLoggedIn() {
        return this.currentUser !== null;
    }
    
    getCurrentUser() {
        return this.currentUser;
    }
    
    getStoredUser() {
        try {
            return JSON.parse(localStorage.getItem('user') || '{}');
        } catch (error) {
            return {};
        }
    }
}

// Initialize database manager
const databaseManager = new DatabaseManager();

// Export for use in other files
window.databaseManager = databaseManager;
