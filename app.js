// ============================================
// NAME DATE - APPLICATION LOGIC
// A collaborative baby name matching app
// ============================================

// ============================================
// FIREBASE IMPORTS
// ============================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
    getAuth,
    signInAnonymously,
    onAuthStateChanged,
    signInWithCustomToken
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    onSnapshot,
    arrayUnion,
    increment,
    setLogLevel
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// ============================================
// CONFIGURATION & CONSTANTS
// ============================================

// Firebase configuration (replace with your own)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Canvas-provided variables (auto-populated in Canvas environment)
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
const fbConfigString = typeof __firebase_config !== 'undefined' ? __firebase_config : null;

// Use Canvas config if available, otherwise fallback
const finalFirebaseConfig = fbConfigString ? JSON.parse(fbConfigString) : firebaseConfig;

// Default baby names with gender tags
const DEFAULT_NAMES = [
    // Female names
    { name: 'Olivia', gender: 'female' },
    { name: 'Emma', gender: 'female' },
    { name: 'Ava', gender: 'female' },
    { name: 'Charlotte', gender: 'female' },
    { name: 'Sophia', gender: 'female' },
    { name: 'Amelia', gender: 'female' },
    { name: 'Isabella', gender: 'female' },
    { name: 'Mia', gender: 'female' },
    { name: 'Evelyn', gender: 'female' },
    { name: 'Harper', gender: 'female' },
    { name: 'Luna', gender: 'female' },
    { name: 'Camila', gender: 'female' },
    { name: 'Gianna', gender: 'female' },
    { name: 'Elizabeth', gender: 'female' },
    { name: 'Eleanor', gender: 'female' },
    { name: 'Ella', gender: 'female' },
    { name: 'Avery', gender: 'female' },
    { name: 'Sofia', gender: 'female' },
    { name: 'Scarlett', gender: 'female' },
    { name: 'Emily', gender: 'female' },
    { name: 'Aria', gender: 'female' },
    { name: 'Chloe', gender: 'female' },
    { name: 'Mila', gender: 'female' },
    { name: 'Violet', gender: 'female' },
    { name: 'Lily', gender: 'female' },
    { name: 'Aurora', gender: 'female' },
    { name: 'Hazel', gender: 'female' },
    { name: 'Penelope', gender: 'female' },
    { name: 'Riley', gender: 'female' },
    { name: 'Layla', gender: 'female' },
    { name: 'Nora', gender: 'female' },
    { name: 'Zoey', gender: 'female' },
    { name: 'Stella', gender: 'female' },
    { name: 'Grace', gender: 'female' },
    { name: 'Ellie', gender: 'female' },
    { name: 'Hannah', gender: 'female' },
    { name: 'Lucy', gender: 'female' },
    { name: 'Maya', gender: 'female' },
    { name: 'Willow', gender: 'female' },
    { name: 'Zoe', gender: 'female' },

    // Male names
    { name: 'Liam', gender: 'male' },
    { name: 'Noah', gender: 'male' },
    { name: 'Oliver', gender: 'male' },
    { name: 'Elijah', gender: 'male' },
    { name: 'James', gender: 'male' },
    { name: 'William', gender: 'male' },
    { name: 'Benjamin', gender: 'male' },
    { name: 'Lucas', gender: 'male' },
    { name: 'Henry', gender: 'male' },
    { name: 'Theodore', gender: 'male' },
    { name: 'Jack', gender: 'male' },
    { name: 'Levi', gender: 'male' },
    { name: 'Alexander', gender: 'male' },
    { name: 'Jackson', gender: 'male' },
    { name: 'Mateo', gender: 'male' },
    { name: 'Daniel', gender: 'male' },
    { name: 'Michael', gender: 'male' },
    { name: 'Mason', gender: 'male' },
    { name: 'Sebastian', gender: 'male' },
    { name: 'Ethan', gender: 'male' },
    { name: 'Logan', gender: 'male' },
    { name: 'Owen', gender: 'male' },
    { name: 'Samuel', gender: 'male' },
    { name: 'Jacob', gender: 'male' },
    { name: 'Asher', gender: 'male' },
    { name: 'Aiden', gender: 'male' },
    { name: 'John', gender: 'male' },
    { name: 'Joseph', gender: 'male' },
    { name: 'Wyatt', gender: 'male' },
    { name: 'David', gender: 'male' },
    { name: 'Leo', gender: 'male' },
    { name: 'Luke', gender: 'male' },
    { name: 'Julian', gender: 'male' },
    { name: 'Hudson', gender: 'male' },
    { name: 'Grayson', gender: 'male' },
    { name: 'Matthew', gender: 'male' },
    { name: 'Ezra', gender: 'male' },
    { name: 'Gabriel', gender: 'male' },
    { name: 'Carter', gender: 'male' },
    { name: 'Isaac', gender: 'male' },
    { name: 'Jayden', gender: 'male' },
    { name: 'Luca', gender: 'male' },
    { name: 'Anthony', gender: 'male' },
    { name: 'Dylan', gender: 'male' },
    { name: 'Lincoln', gender: 'male' },
    { name: 'Thomas', gender: 'male' },
    { name: 'Maverick', gender: 'male' },
    { name: 'Elias', gender: 'male' },
    { name: 'Josiah', gender: 'male' },
    { name: 'Charles', gender: 'male' },
    { name: 'Caleb', gender: 'male' },
    { name: 'Christopher', gender: 'male' },
    { name: 'Ezekiel', gender: 'male' },
    { name: 'Miles', gender: 'male' },
    { name: 'Jaxon', gender: 'male' },
    { name: 'Isaiah', gender: 'male' },
    { name: 'Andrew', gender: 'male' },
    { name: 'Joshua', gender: 'male' },
    { name: 'Nathan', gender: 'male' },
    { name: 'Nolan', gender: 'male' },

    // Unisex names
    { name: 'Jordan', gender: 'unisex' },
    { name: 'Taylor', gender: 'unisex' },
    { name: 'Morgan', gender: 'unisex' },
    { name: 'Casey', gender: 'unisex' },
    { name: 'Alex', gender: 'unisex' },
    { name: 'Jamie', gender: 'unisex' },
    { name: 'River', gender: 'unisex' },
    { name: 'Sage', gender: 'unisex' },
    { name: 'Quinn', gender: 'unisex' },
    { name: 'Rowan', gender: 'unisex' },
    { name: 'Peyton', gender: 'unisex' },
    { name: 'Dakota', gender: 'unisex' },
    { name: 'Parker', gender: 'unisex' },
    { name: 'Avery', gender: 'unisex' },
    { name: 'Charlie', gender: 'unisex' },
    { name: 'Finley', gender: 'unisex' },
    { name: 'Hayden', gender: 'unisex' },
    { name: 'Emerson', gender: 'unisex' },
    { name: 'Blake', gender: 'unisex' },
    { name: 'Reese', gender: 'unisex' }
];

// ============================================
// GLOBAL STATE
// ============================================
const State = {
    // Firebase
    app: null,
    auth: null,
    db: null,

    // User
    userId: null,
    isParent: false,

    // Room
    currentRoomId: null,
    currentAdminKey: null,
    roomData: {},
    unsubscribeRoom: null,

    // UI
    currentView: 'loading',
    draggedItem: null,

    // Features
    hasSeenOnboarding: false,
    expandedNoteId: null,

    // Progress
    totalNames: 0,
    swipedCount: 0
};

// ============================================
// DOM ELEMENT REFERENCES
// ============================================
const Elements = {
    // Views
    views: {
        loading: null,
        home: null,
        share: null,
        swiping: null,
        matches: null,
        suggestion: null,
        voting: null,
    },

    // Navigation
    navBar: null,
    navSwipeBtn: null,
    navMatchesBtn: null,

    // Modals
    modalOverlay: null,
    modal: null,

    // Buttons
    createRoomBtn: null,
    startSwipingBtn: null,
    likeBtn: null,
    dislikeBtn: null,

    // Forms
    suggestionForm: null,
    suggestionInput: null,
    genderSelect: null,

    // Content containers
    swipeCard: null,
    swipeCardName: null,
    swipeCardContent: null,
    swipeCardPlaceholder: null,
    genderBadge: null,
    matchesList: null,
    matchesPlaceholder: null,
    votingList: null,
    votingPlaceholder: null,
    progressBar: null,
    progressText: null
};

// ============================================
// FIREBASE SERVICE
// ============================================
const FirebaseService = {
    /**
     * Initialize Firebase app and services
     */
    init() {
        State.app = initializeApp(finalFirebaseConfig);
        State.auth = getAuth(State.app);
        State.db = getFirestore(State.app);
        setLogLevel('error'); // Only show errors in production
    },

    /**
     * Get the namespaced Firestore collection path
     */
    getRoomsCollectionPath() {
        return `/artifacts/${appId}/public/data/rooms`;
    },

    /**
     * Get Firestore document reference for a room
     */
    getRoomRef(roomId) {
        return doc(State.db, this.getRoomsCollectionPath(), roomId);
    },

    /**
     * Handle user authentication
     */
    async handleAuth() {
        return new Promise((resolve) => {
            onAuthStateChanged(State.auth, async (user) => {
                if (user) {
                    console.log('User authenticated:', user.uid);
                    State.userId = user.uid;
                    resolve();
                } else {
                    console.log('No user, signing in...');
                    if (!initialAuthToken) {
                        await signInAnonymously(State.auth);
                    }
                }
            });

            // If Canvas token provided, use it
            if (initialAuthToken) {
                signInWithCustomToken(State.auth, initialAuthToken)
                    .catch(err => {
                        console.error('Token sign-in failed:', err);
                        signInAnonymously(State.auth);
                    });
            }
        });
    },

    /**
     * Create a new room
     */
    async createRoom(roomId, adminKey) {
        const roomRef = this.getRoomRef(roomId);
        const newRoomData = {
            parent1_id: State.userId,
            parent2_id: null,
            adminKey: adminKey,
            suggestions: [],
            swipes: {},
            ranked_list: [],
            votes: {},
            parent_notes: {},
            createdAt: new Date().toISOString()
        };

        await setDoc(roomRef, newRoomData);
        return newRoomData;
    },

    /**
     * Join an existing room
     */
    async joinRoom(roomId) {
        const roomRef = this.getRoomRef(roomId);
        const roomSnap = await getDoc(roomRef);

        if (!roomSnap.exists()) {
            throw new Error("This room doesn't exist. Please check the link.");
        }

        const data = roomSnap.data();

        // Check if user is parent 1
        if (data.parent1_id === State.userId) {
            State.isParent = true;
        }
        // Check if user is parent 2
        else if (data.parent2_id === State.userId) {
            State.isParent = true;
        }
        // Claim parent 2 slot if open
        else if (!data.parent2_id) {
            await updateDoc(roomRef, { parent2_id: State.userId });
            State.isParent = true;
        }
        // Room is full
        else {
            State.isParent = false;
            throw new Error("This room is full. Only two parents can swipe.");
        }

        return data;
    },

    /**
     * Listen to room changes in real-time
     */
    listenToRoom(roomId, callback) {
        if (State.unsubscribeRoom) {
            State.unsubscribeRoom();
        }

        const roomRef = this.getRoomRef(roomId);
        State.unsubscribeRoom = onSnapshot(
            roomRef,
            (doc) => {
                if (doc.exists()) {
                    State.roomData = doc.data();
                    callback(State.roomData);
                } else {
                    UI.showModal('Room Not Found', 'This room no longer exists.');
                    UI.showView('home');
                }
            },
            (error) => {
                console.error('Snapshot error:', error);
                UI.showModal('Connection Error', 'Lost connection to room. Please refresh.');
            }
        );
    },

    /**
     * Record a swipe
     */
    async recordSwipe(name, swipeType) {
        const roomRef = this.getRoomRef(State.currentRoomId);
        const swipeKey = `swipes.${name}.${State.userId}`;
        await updateDoc(roomRef, { [swipeKey]: swipeType });
    },

    /**
     * Update ranked list
     */
    async updateRankedList(rankedList) {
        const roomRef = this.getRoomRef(State.currentRoomId);
        await updateDoc(roomRef, { ranked_list: rankedList });
    },

    /**
     * Add a name suggestion
     */
    async addSuggestion(name, gender) {
        const roomRef = this.getRoomRef(State.currentRoomId);
        // Store suggestion with gender info
        await updateDoc(roomRef, {
            suggestions: arrayUnion(JSON.stringify({ name, gender }))
        });
    },

    /**
     * Toggle favorite for a name
     */
    async toggleFavorite(name, isFavorite) {
        const roomRef = this.getRoomRef(State.currentRoomId);
        const noteKey = `parent_notes.${State.userId}.${name}.favorite`;
        await updateDoc(roomRef, { [noteKey]: isFavorite });
    },

    /**
     * Save a note for a name
     */
    async saveNote(name, noteText) {
        const roomRef = this.getRoomRef(State.currentRoomId);
        const noteKey = `parent_notes.${State.userId}.${name}.note`;
        await updateDoc(roomRef, { [noteKey]: noteText });
    },

    /**
     * Record a vote
     */
    async recordVote(name) {
        const roomRef = this.getRoomRef(State.currentRoomId);
        const voteKey = `votes.${name}`;
        await updateDoc(roomRef, { [voteKey]: increment(1) });
    }
};

// ============================================
// UI CONTROLLER
// ============================================
const UI = {
    /**
     * Initialize DOM element references
     */
    init() {
        // Views
        Elements.views.loading = document.getElementById('loading-view');
        Elements.views.home = document.getElementById('home-view');
        Elements.views.share = document.getElementById('share-view');
        Elements.views.swiping = document.getElementById('swiping-view');
        Elements.views.matches = document.getElementById('matches-view');
        Elements.views.suggestion = document.getElementById('suggestion-view');
        Elements.views.voting = document.getElementById('voting-view');

        // Navigation
        Elements.navBar = document.getElementById('nav-bar');
        Elements.navSwipeBtn = document.getElementById('nav-swipe-btn');
        Elements.navMatchesBtn = document.getElementById('nav-matches-btn');

        // Modals
        Elements.modalOverlay = document.getElementById('modal-overlay');
        Elements.modal = document.getElementById('modal');

        // Other elements
        Elements.createRoomBtn = document.getElementById('create-room-btn');
        Elements.startSwipingBtn = document.getElementById('start-swiping-btn');
        Elements.likeBtn = document.getElementById('like-btn');
        Elements.dislikeBtn = document.getElementById('dislike-btn');
        Elements.suggestionForm = document.getElementById('suggestion-form');
        Elements.suggestionInput = document.getElementById('suggestion-input');
        Elements.genderSelect = document.getElementById('gender-select');
        Elements.swipeCard = document.getElementById('swipe-card');
        Elements.swipeCardName = document.getElementById('swipe-card-name');
        Elements.swipeCardContent = document.getElementById('swipe-card-content');
        Elements.swipeCardPlaceholder = document.getElementById('swipe-card-placeholder');
        Elements.genderBadge = document.getElementById('gender-badge');
        Elements.matchesList = document.getElementById('matches-list');
        Elements.matchesPlaceholder = document.getElementById('matches-placeholder');
        Elements.votingList = document.getElementById('voting-list');
        Elements.votingPlaceholder = document.getElementById('voting-placeholder');
        Elements.progressBar = document.getElementById('progress-fill');
        Elements.progressText = document.getElementById('progress-text');
    },

    /**
     * Show a specific view
     */
    showView(viewName) {
        // Hide all views
        Object.values(Elements.views).forEach(view => {
            if (view) view.classList.remove('active');
        });

        // Show target view
        if (Elements.views[viewName]) {
            Elements.views[viewName].classList.add('active');
            State.currentView = viewName;
        }

        // Show/hide navigation bar
        if (viewName === 'swiping' || viewName === 'matches') {
            Elements.navBar?.classList.add('visible');
        } else {
            Elements.navBar?.classList.remove('visible');
        }

        // Update nav button states
        this.updateNavButtons(viewName);
    },

    /**
     * Update navigation button active states
     */
    updateNavButtons(viewName) {
        if (!Elements.navSwipeBtn || !Elements.navMatchesBtn) return;

        Elements.navSwipeBtn.classList.toggle('active', viewName === 'swiping');
        Elements.navMatchesBtn.classList.toggle('active', viewName === 'matches');
    },

    /**
     * Show a modal dialog
     */
    showModal(title, message, actions = [{ label: 'OK', primary: true }]) {
        const modal = Elements.modal;
        if (!modal) return;

        // Build modal HTML
        modal.innerHTML = `
            <div class="modal-header">
                <h2 class="modal-title">${title}</h2>
            </div>
            <div class="modal-content">
                <p class="modal-message">${message}</p>
            </div>
            <div class="modal-actions">
                ${actions.map(action => `
                    <button class="btn ${action.primary ? 'btn-success' : 'btn-secondary'} btn-small"
                            data-action="${action.label}">
                        ${action.label}
                    </button>
                `).join('')}
            </div>
        `;

        // Show overlay
        Elements.modalOverlay.classList.add('visible');

        // Attach click handlers
        modal.querySelectorAll('[data-action]').forEach(btn => {
            btn.onclick = () => {
                const action = actions.find(a => a.label === btn.dataset.action);
                if (action?.callback) action.callback();
                this.hideModal();
            };
        });
    },

    /**
     * Hide the modal
     */
    hideModal() {
        Elements.modalOverlay?.classList.remove('visible');
    },

    /**
     * Show onboarding modal for first-time users
     */
    showOnboarding() {
        const hasSeenOnboarding = localStorage.getItem('namedate_onboarding_seen');
        if (hasSeenOnboarding) return;

        const modal = Elements.modal;
        if (!modal) return;

        modal.innerHTML = `
            <div class="modal-header">
                <h2 class="modal-title">Welcome to Name Date! 💕</h2>
                <p class="modal-description">Find the perfect baby name together</p>
            </div>
            <div class="modal-content">
                <div class="onboarding-steps">
                    <div class="onboarding-step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h3>Share with Your Partner</h3>
                            <p>Send them the Parent 2 link so you can both start swiping</p>
                        </div>
                    </div>
                    <div class="onboarding-step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h3>Swipe on Names</h3>
                            <p>Like names you love, pass on ones you don't. Gender badges help you identify each name.</p>
                        </div>
                    </div>
                    <div class="onboarding-step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h3>Find Your Matches</h3>
                            <p>When you both like a name, it's a match! Rank them and add private notes.</p>
                        </div>
                    </div>
                    <div class="onboarding-step">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h3>Get Input from Loved Ones</h3>
                            <p>Share the voting link to let friends & family vote on your top picks</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn btn-success">Let's Get Started!</button>
            </div>
        `;

        Elements.modalOverlay.classList.add('visible');

        modal.querySelector('.btn').onclick = () => {
            localStorage.setItem('namedate_onboarding_seen', 'true');
            this.hideModal();
        };
    },

    /**
     * Copy text to clipboard
     */
    async copyToClipboard(text, successMessage = 'Copied!') {
        try {
            await navigator.clipboard.writeText(text);
            this.showModal('Success', successMessage);
        } catch (err) {
            // Fallback for older browsers
            const input = document.createElement('input');
            input.value = text;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            this.showModal('Success', successMessage);
        }
    }
};

// ============================================
// RENDERERS
// ============================================
const Renderers = {
    /**
     * Populate share links
     */
    renderShareLinks(roomId, adminKey) {
        const baseUrl = window.location.href.split('?')[0];

        const parentLink = document.getElementById('parent-link');
        const suggestLink = document.getElementById('suggest-link');
        const voteLink = document.getElementById('vote-link');

        // Admin link includes the admin key for secure access
        if (parentLink) parentLink.value = `${baseUrl}?room=${roomId}&adminKey=${adminKey}`;
        if (suggestLink) suggestLink.value = `${baseUrl}?suggest=${roomId}`;
        if (voteLink) voteLink.value = `${baseUrl}?vote=${roomId}`;
    },

    /**
     * Get all names with gender info
     */
    getAllNames() {
        const defaultNames = DEFAULT_NAMES;
        const suggestions = (State.roomData.suggestions || []).map(s => {
            try {
                return JSON.parse(s);
            } catch (e) {
                // Legacy suggestions without gender
                return { name: s, gender: 'unisex' };
            }
        });

        return [...defaultNames, ...suggestions];
    },

    /**
     * Get next name to swipe
     */
    getNextName() {
        const allNames = this.getAllNames();
        return allNames.find(nameObj => {
            const swipeData = State.roomData.swipes?.[nameObj.name];
            return !swipeData || !swipeData[State.userId];
        });
    },

    /**
     * Render swipe card
     */
    renderSwipeCard() {
        const nextName = this.getNextName();

        if (!Elements.swipeCardName || !Elements.swipeCardContent || !Elements.swipeCardPlaceholder) {
            return;
        }

        if (nextName) {
            Elements.swipeCardName.textContent = nextName.name;

            // Update gender badge
            if (Elements.genderBadge) {
                Elements.genderBadge.className = `gender-badge ${nextName.gender}`;
                Elements.genderBadge.textContent = nextName.gender.charAt(0).toUpperCase() + nextName.gender.slice(1);
            }

            Elements.swipeCardContent.classList.remove('hidden');
            Elements.swipeCardPlaceholder.classList.add('hidden');
        } else {
            Elements.swipeCardContent.classList.add('hidden');
            Elements.swipeCardPlaceholder.classList.remove('hidden');
        }

        // Update progress
        this.updateProgress();
    },

    /**
     * Update swipe progress indicator
     */
    updateProgress() {
        const allNames = this.getAllNames();
        State.totalNames = allNames.length;

        let swipedCount = 0;
        allNames.forEach(nameObj => {
            const swipeData = State.roomData.swipes?.[nameObj.name];
            if (swipeData && swipeData[State.userId]) {
                swipedCount++;
            }
        });

        State.swipedCount = swipedCount;
        const percentage = State.totalNames > 0 ? (swipedCount / State.totalNames) * 100 : 0;

        if (Elements.progressBar) {
            Elements.progressBar.style.width = `${percentage}%`;
        }

        if (Elements.progressText) {
            Elements.progressText.textContent = `${swipedCount} / ${State.totalNames} names swiped`;
        }
    },

    /**
     * Get matched names
     */
    getMatches() {
        if (!State.roomData.parent1_id || !State.roomData.parent2_id) {
            return [];
        }

        const p1 = State.roomData.parent1_id;
        const p2 = State.roomData.parent2_id;
        const matches = new Set();

        for (const name in State.roomData.swipes || {}) {
            const swipeData = State.roomData.swipes[name];
            if (swipeData[p1] === 'like' && swipeData[p2] === 'like') {
                matches.add(name);
            }
        }

        return Array.from(matches);
    },

    /**
     * Render matches list with drag-to-rank
     */
    renderMatchesList() {
        if (!Elements.matchesList || !Elements.matchesPlaceholder) return;

        const currentMatches = this.getMatches();

        if (currentMatches.length === 0) {
            Elements.matchesList.innerHTML = '';
            Elements.matchesPlaceholder.classList.remove('hidden');
            return;
        }

        Elements.matchesPlaceholder.classList.add('hidden');

        // Don't re-render during drag
        if (State.draggedItem) return;

        // Get ranked list, filter to current matches only
        let rankedList = (State.roomData.ranked_list || []).filter(name => currentMatches.includes(name));

        // Add new matches not yet in ranked list
        currentMatches.forEach(name => {
            if (!rankedList.includes(name)) {
                rankedList.push(name);
            }
        });

        // Update Firestore if list changed
        const currentRanked = State.roomData.ranked_list || [];
        if (JSON.stringify(rankedList) !== JSON.stringify(currentRanked)) {
            FirebaseService.updateRankedList(rankedList);
        }

        // Get all names with gender info
        const allNames = this.getAllNames();
        const nameMap = new Map(allNames.map(n => [n.name, n.gender]));

        // Render items
        Elements.matchesList.innerHTML = '';
        rankedList.forEach(name => {
            const votes = State.roomData.votes?.[name] || 0;
            const gender = nameMap.get(name) || 'unisex';
            const userNotes = State.roomData.parent_notes?.[State.userId]?.[name] || {};
            const isFavorite = userNotes.favorite || false;
            const noteText = userNotes.note || '';

            const item = document.createElement('div');
            item.className = 'match-item';
            item.draggable = true;
            item.dataset.name = name;

            item.innerHTML = `
                <div class="match-item-content">
                    <div class="match-item-left">
                        <span class="match-item-name">${name}</span>
                        <span class="gender-badge ${gender}">${gender}</span>
                    </div>
                    <div class="match-item-right">
                        <div class="match-stats">
                            <span>${votes} ${votes === 1 ? 'vote' : 'votes'}</span>
                        </div>
                        <button class="favorite-btn ${isFavorite ? 'favorited' : ''}" data-name="${name}">
                            <svg viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                            </svg>
                        </button>
                        <button class="note-btn ${noteText ? 'has-note' : ''}" data-name="${name}">
                            ${noteText ? 'Edit Note' : 'Add Note'}
                        </button>
                    </div>
                </div>
                ${State.expandedNoteId === name ? `
                    <div class="match-note">
                        <textarea placeholder="Add your private thoughts about this name..." class="note-textarea">${noteText}</textarea>
                        <div class="match-note-actions">
                            <button class="btn btn-success btn-small save-note-btn" data-name="${name}">Save</button>
                            <button class="btn btn-secondary btn-small cancel-note-btn" data-name="${name}">Cancel</button>
                        </div>
                    </div>
                ` : ''}
            `;

            Elements.matchesList.appendChild(item);
        });

        // Attach event listeners
        this.attachMatchItemListeners();
    },

    /**
     * Attach event listeners to match items
     */
    attachMatchItemListeners() {
        // Favorite buttons
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.onclick = async (e) => {
                e.stopPropagation();
                const name = btn.dataset.name;
                const isFavorite = btn.classList.contains('favorited');

                try {
                    await FirebaseService.toggleFavorite(name, !isFavorite);
                    Animations.heartbeat(btn);
                } catch (err) {
                    console.error('Error toggling favorite:', err);
                    UI.showModal('Error', 'Could not save favorite. Please try again.');
                }
            };
        });

        // Note buttons
        document.querySelectorAll('.note-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const name = btn.dataset.name;
                State.expandedNoteId = State.expandedNoteId === name ? null : name;
                this.renderMatchesList();
            };
        });

        // Save note buttons
        document.querySelectorAll('.save-note-btn').forEach(btn => {
            btn.onclick = async (e) => {
                const name = btn.dataset.name;
                const textarea = btn.closest('.match-note').querySelector('.note-textarea');
                const noteText = textarea.value.trim();

                try {
                    await FirebaseService.saveNote(name, noteText);
                    State.expandedNoteId = null;
                    UI.showModal('Saved', 'Your note has been saved.');
                } catch (err) {
                    console.error('Error saving note:', err);
                    UI.showModal('Error', 'Could not save note. Please try again.');
                }
            };
        });

        // Cancel note buttons
        document.querySelectorAll('.cancel-note-btn').forEach(btn => {
            btn.onclick = () => {
                State.expandedNoteId = null;
                this.renderMatchesList();
            };
        });
    },

    /**
     * Render voting list
     */
    renderVotingList() {
        if (!Elements.votingList || !Elements.votingPlaceholder) return;

        const rankedList = State.roomData.ranked_list || [];
        const votes = State.roomData.votes || {};

        if (rankedList.length === 0) {
            Elements.votingList.innerHTML = '';
            Elements.votingPlaceholder.classList.remove('hidden');
            return;
        }

        Elements.votingPlaceholder.classList.add('hidden');

        // Get user's voted names from localStorage
        const storageKey = `namedate_voted_${State.currentRoomId}`;
        const userVotes = JSON.parse(localStorage.getItem(storageKey) || '[]');

        // Get all names with gender info
        const allNames = this.getAllNames();
        const nameMap = new Map(allNames.map(n => [n.name, n.gender]));

        Elements.votingList.innerHTML = '';
        rankedList.forEach((name, index) => {
            const voteCount = votes[name] || 0;
            const hasVoted = userVotes.includes(name);
            const gender = nameMap.get(name) || 'unisex';

            const item = document.createElement('div');
            item.className = 'voting-item';

            item.innerHTML = `
                <div class="voting-item-left">
                    <span class="voting-rank">${index + 1}</span>
                    <div>
                        <span class="voting-name">${name}</span>
                        <span class="gender-badge ${gender}">${gender}</span>
                    </div>
                </div>
                <div class="voting-item-right">
                    <span class="vote-count">${voteCount} ${voteCount === 1 ? 'vote' : 'votes'}</span>
                    <button class="vote-btn" data-name="${name}" ${hasVoted ? 'disabled' : ''}>
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                        </svg>
                    </button>
                </div>
            `;

            Elements.votingList.appendChild(item);

            // Attach vote handler
            const voteBtn = item.querySelector('.vote-btn');
            if (!hasVoted) {
                voteBtn.onclick = () => EventHandlers.handleVote(name);
            }
        });
    }
};

// ============================================
// EVENT HANDLERS
// ============================================
const EventHandlers = {
    /**
     * Create a new room
     */
    async handleCreateRoom() {
        const roomId = Utilities.generateRoomId();
        const adminKey = Utilities.generateAdminKey();
        State.currentRoomId = roomId;
        State.currentAdminKey = adminKey;
        State.isParent = true;

        try {
            await FirebaseService.createRoom(roomId, adminKey);
            Renderers.renderShareLinks(roomId, adminKey);

            // Listen to room updates
            FirebaseService.listenToRoom(roomId, (data) => {
                if (State.currentView === 'swiping') {
                    Renderers.renderSwipeCard();
                } else if (State.currentView === 'matches') {
                    Renderers.renderMatchesList();
                }
            });

            UI.showView('share');
            UI.showOnboarding();
        } catch (err) {
            console.error('Error creating room:', err);
            UI.showModal('Error', 'Could not create room. Please try again.');
        }
    },

    /**
     * Handle swipe action
     */
    async handleSwipe(swipeType) {
        const nextName = Renderers.getNextName();
        if (!nextName) return;

        // Animate card
        Animations.swipeCard(Elements.swipeCard, swipeType);

        try {
            await FirebaseService.recordSwipe(nextName.name, swipeType);

            // Check if this created a new match
            if (swipeType === 'like') {
                setTimeout(() => {
                    const matches = Renderers.getMatches();
                    if (matches.includes(nextName.name)) {
                        Animations.confetti();
                        UI.showModal('It\'s a Match! 💕', `You both love "${nextName.name}"!`);
                    }
                }, 500);
            }
        } catch (err) {
            console.error('Error recording swipe:', err);
            UI.showModal('Error', 'Swipe failed. Please try again.');
            Animations.resetCard(Elements.swipeCard);
        }
    },

    /**
     * Handle suggestion form submit
     */
    async handleSuggestionSubmit(e) {
        e.preventDefault();

        const name = Elements.suggestionInput?.value.trim();
        const gender = Elements.genderSelect?.value || 'unisex';

        if (!name) return;

        // Capitalize first letter
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

        try {
            await FirebaseService.addSuggestion(formattedName, gender);
            UI.showModal('Success!', `"${formattedName}" has been added to the name pool. Thanks!`);
            Elements.suggestionInput.value = '';
            Elements.genderSelect.value = 'unisex';
        } catch (err) {
            console.error('Error submitting suggestion:', err);
            UI.showModal('Error', 'Could not submit suggestion. Please try again.');
        }
    },

    /**
     * Handle vote click
     */
    async handleVote(name) {
        const storageKey = `namedate_voted_${State.currentRoomId}`;
        let userVotes = JSON.parse(localStorage.getItem(storageKey) || '[]');

        if (userVotes.includes(name)) {
            UI.showModal('Already Voted', 'You\'ve already voted for this name!');
            return;
        }

        try {
            await FirebaseService.recordVote(name);

            // Update localStorage
            userVotes.push(name);
            localStorage.setItem(storageKey, JSON.stringify(userVotes));

            // Show feedback
            Animations.pulse(event.target.closest('.vote-btn'));
        } catch (err) {
            console.error('Error recording vote:', err);
            UI.showModal('Error', 'Vote failed. Please try again.');
        }
    },

    /**
     * Setup drag and drop for ranking
     */
    setupDragAndDrop() {
        if (!Elements.matchesList) return;

        Elements.matchesList.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('match-item')) {
                State.draggedItem = e.target;
                e.target.classList.add('dragging');
            }
        });

        Elements.matchesList.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('match-item')) {
                e.target.classList.remove('dragging');
                State.draggedItem = null;

                // Save new order
                const newOrder = Array.from(Elements.matchesList.children)
                    .map(child => child.dataset.name);
                FirebaseService.updateRankedList(newOrder);
            }
        });

        Elements.matchesList.addEventListener('dragover', (e) => {
            e.preventDefault();
            const afterElement = Utilities.getDragAfterElement(Elements.matchesList, e.clientY);

            if (State.draggedItem) {
                if (afterElement == null) {
                    Elements.matchesList.appendChild(State.draggedItem);
                } else {
                    Elements.matchesList.insertBefore(State.draggedItem, afterElement);
                }
            }
        });
    },

    /**
     * Setup copy link buttons
     */
    setupCopyButtons() {
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.onclick = () => {
                const targetId = btn.dataset.target;
                const input = document.getElementById(targetId);
                if (input) {
                    UI.copyToClipboard(input.value, 'Link copied to clipboard!');
                }
            };
        });
    }
};

// ============================================
// ANIMATIONS
// ============================================
const Animations = {
    /**
     * Animate card swipe
     */
    swipeCard(card, swipeType) {
        if (!card) return;

        const direction = swipeType === 'like' ? 1 : -1;
        card.style.transform = `translateX(${direction * 150}%) rotate(${direction * 20}deg)`;
        card.style.opacity = '0';
        card.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease';

        setTimeout(() => {
            this.resetCard(card);
        }, 400);
    },

    /**
     * Reset card position
     */
    resetCard(card) {
        if (!card) return;

        card.style.transform = 'translateX(0) rotate(0deg)';
        card.style.opacity = '1';
    },

    /**
     * Confetti celebration animation
     */
    confetti() {
        const colors = ['#E6D5F5', '#FFD4E5', '#FFE5D9', '#D4F0E0', '#D9E9FF'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 3000);
        }
    },

    /**
     * Pulse animation
     */
    pulse(element) {
        if (!element) return;
        element.style.animation = 'pulse 0.6s ease';
        setTimeout(() => {
            element.style.animation = '';
        }, 600);
    },

    /**
     * Heartbeat animation
     */
    heartbeat(element) {
        if (!element) return;
        element.style.animation = 'heartbeat 0.6s ease';
        setTimeout(() => {
            element.style.animation = '';
        }, 600);
    }
};

// ============================================
// UTILITIES
// ============================================
const Utilities = {
    /**
     * Generate random room ID
     */
    generateRoomId() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    },

    /**
     * Generate secure admin key (12 characters)
     */
    generateAdminKey() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude similar-looking characters
        let key = '';
        for (let i = 0; i < 12; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return key;
    },

    /**
     * Get element after dragged item
     */
    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.match-item:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
};

// ============================================
// ROUTER
// ============================================
const Router = {
    /**
     * Route app based on URL parameters
     */
    async route() {
        const params = new URLSearchParams(window.location.search);
        const roomId = params.get('room');
        const adminKey = params.get('adminKey');
        const suggestId = params.get('suggest');
        const voteId = params.get('vote');

        try {
            if (roomId) {
                await this.handleRoomRoute(roomId, adminKey);
            } else if (suggestId) {
                await this.handleSuggestRoute(suggestId);
            } else if (voteId) {
                await this.handleVoteRoute(voteId);
            } else {
                UI.showView('home');
            }
        } catch (err) {
            console.error('Routing error:', err);
            UI.showModal('Error', err.message);
            UI.showView('home');
        }
    },

    /**
     * Handle room join route
     */
    async handleRoomRoute(roomId, adminKey) {
        State.currentRoomId = roomId;

        // Verify room exists and get admin key
        const roomRef = FirebaseService.getRoomRef(roomId);
        const roomSnap = await getDoc(roomRef);

        if (!roomSnap.exists()) {
            throw new Error("This room doesn't exist. Please check the link.");
        }

        const roomData = roomSnap.data();

        // If no admin key provided or invalid, redirect to suggestion form
        if (!adminKey || adminKey !== roomData.adminKey) {
            console.log('Invalid or missing admin key. Redirecting to suggestion form.');
            State.currentRoomId = roomId;
            UI.showView('suggestion');
            return;
        }

        // Valid admin key - proceed with parent access
        State.currentAdminKey = adminKey;
        await FirebaseService.joinRoom(roomId);

        // Listen to room updates
        FirebaseService.listenToRoom(roomId, (data) => {
            if (State.currentView === 'swiping') {
                Renderers.renderSwipeCard();
            } else if (State.currentView === 'matches') {
                Renderers.renderMatchesList();
            }
        });

        UI.showView('swiping');
        Renderers.renderSwipeCard();
    },

    /**
     * Handle suggestion route
     */
    async handleSuggestRoute(roomId) {
        State.currentRoomId = roomId;

        // Verify room exists
        const roomRef = FirebaseService.getRoomRef(roomId);
        const roomSnap = await getDoc(roomRef);

        if (!roomSnap.exists()) {
            throw new Error('This suggestion link is invalid.');
        }

        UI.showView('suggestion');
    },

    /**
     * Handle voting route
     */
    async handleVoteRoute(roomId) {
        State.currentRoomId = roomId;

        // Listen to room updates for voting
        FirebaseService.listenToRoom(roomId, (data) => {
            Renderers.renderVotingList();
        });

        UI.showView('voting');
    }
};

// ============================================
// INITIALIZATION
// ============================================
async function init() {
    console.log('Name Date initializing...');

    // Initialize Firebase
    FirebaseService.init();

    // Initialize UI
    UI.init();

    // Authenticate user
    await FirebaseService.handleAuth();

    // Setup event listeners
    Elements.createRoomBtn?.addEventListener('click', EventHandlers.handleCreateRoom);
    Elements.startSwipingBtn?.addEventListener('click', () => UI.showView('swiping'));
    Elements.likeBtn?.addEventListener('click', () => EventHandlers.handleSwipe('like'));
    Elements.dislikeBtn?.addEventListener('click', () => EventHandlers.handleSwipe('dislike'));
    Elements.suggestionForm?.addEventListener('submit', EventHandlers.handleSuggestionSubmit);

    // Navigation
    Elements.navSwipeBtn?.addEventListener('click', () => UI.showView('swiping'));
    Elements.navMatchesBtn?.addEventListener('click', () => UI.showView('matches'));

    // Modal close
    Elements.modalOverlay?.addEventListener('click', (e) => {
        if (e.target === Elements.modalOverlay) {
            UI.hideModal();
        }
    });

    // Setup drag and drop
    EventHandlers.setupDragAndDrop();

    // Setup copy buttons
    EventHandlers.setupCopyButtons();

    // Route the app
    await Router.route();

    // Hide loading view
    UI.showView(State.currentView === 'loading' ? 'home' : State.currentView);

    console.log('Name Date ready!');
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
