// ============================================
// NAME DATE - LOCALSTORAGE VERSION
// No Firebase required - all data stored locally
// ============================================

// ============================================
// CONFIGURATION & CONSTANTS
// ============================================

// App identifier for localStorage namespacing
const APP_ID = 'namedate';

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
    // User
    userId: null,
    isParent: false,

    // Room
    currentRoomId: null,
    currentAdminKey: null,
    roomData: {},

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
    exportBtn: null,
    importBtn: null,
    importFileInput: null,

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
// LOCAL STORAGE SERVICE
// ============================================
const StorageService = {
    /**
     * Initialize user ID
     */
    init() {
        // Get or create user ID
        let userId = localStorage.getItem(`${APP_ID}_userId`);
        if (!userId) {
            userId = 'user_' + Math.random().toString(36).substring(2, 15);
            localStorage.setItem(`${APP_ID}_userId`, userId);
        }
        State.userId = userId;
        console.log('User ID:', userId);
    },

    /**
     * Create a new room
     */
    createRoom(roomId, adminKey) {
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

        const key = `${APP_ID}_room_${roomId}`;
        localStorage.setItem(key, JSON.stringify(newRoomData));
        return newRoomData;
    },

    /**
     * Get room data
     */
    getRoom(roomId) {
        const key = `${APP_ID}_room_${roomId}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    /**
     * Update room data
     */
    updateRoom(roomId, updates) {
        const room = this.getRoom(roomId);
        if (!room) throw new Error('Room not found');

        const updated = { ...room, ...updates };
        const key = `${APP_ID}_room_${roomId}`;
        localStorage.setItem(key, JSON.stringify(updated));
        State.roomData = updated;
        return updated;
    },

    /**
     * Join an existing room
     */
    joinRoom(roomId) {
        const room = this.getRoom(roomId);
        if (!room) {
            throw new Error("This room doesn't exist.");
        }

        // Check if user is parent 1
        if (room.parent1_id === State.userId) {
            State.isParent = true;
        }
        // Check if user is parent 2
        else if (room.parent2_id === State.userId) {
            State.isParent = true;
        }
        // Claim parent 2 slot if open
        else if (!room.parent2_id) {
            room.parent2_id = State.userId;
            this.updateRoom(roomId, { parent2_id: State.userId });
            State.isParent = true;
        }
        // Room is full
        else {
            State.isParent = false;
            throw new Error("This room is full. Only two parents can swipe.");
        }

        State.roomData = room;
        return room;
    },

    /**
     * Record a swipe
     */
    recordSwipe(roomId, name, swipeType) {
        const room = this.getRoom(roomId);
        if (!room) throw new Error('Room not found');

        if (!room.swipes[name]) {
            room.swipes[name] = {};
        }
        room.swipes[name][State.userId] = swipeType;

        this.updateRoom(roomId, { swipes: room.swipes });
    },

    /**
     * Update ranked list
     */
    updateRankedList(roomId, rankedList) {
        this.updateRoom(roomId, { ranked_list: rankedList });
    },

    /**
     * Add a suggestion
     */
    addSuggestion(roomId, nameData) {
        const room = this.getRoom(roomId);
        if (!room) throw new Error('Room not found');

        room.suggestions.push(JSON.stringify(nameData));
        this.updateRoom(roomId, { suggestions: room.suggestions });
    },

    /**
     * Toggle favorite
     */
    toggleFavorite(roomId, name, isFavorite) {
        const room = this.getRoom(roomId);
        if (!room) throw new Error('Room not found');

        if (!room.parent_notes[State.userId]) {
            room.parent_notes[State.userId] = {};
        }
        if (!room.parent_notes[State.userId][name]) {
            room.parent_notes[State.userId][name] = {};
        }
        room.parent_notes[State.userId][name].favorite = isFavorite;

        this.updateRoom(roomId, { parent_notes: room.parent_notes });
    },

    /**
     * Save a note
     */
    saveNote(roomId, name, noteText) {
        const room = this.getRoom(roomId);
        if (!room) throw new Error('Room not found');

        if (!room.parent_notes[State.userId]) {
            room.parent_notes[State.userId] = {};
        }
        if (!room.parent_notes[State.userId][name]) {
            room.parent_notes[State.userId][name] = {};
        }
        room.parent_notes[State.userId][name].note = noteText;

        this.updateRoom(roomId, { parent_notes: room.parent_notes });
    },

    /**
     * Record a vote
     */
    recordVote(roomId, name) {
        const room = this.getRoom(roomId);
        if (!room) throw new Error('Room not found');

        if (!room.votes[name]) {
            room.votes[name] = 0;
        }
        room.votes[name]++;

        this.updateRoom(roomId, { votes: room.votes });
    },

    /**
     * Export all data as JSON
     */
    exportData() {
        const allData = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(APP_ID)) {
                allData[key] = localStorage.getItem(key);
            }
        }
        return JSON.stringify(allData, null, 2);
    },

    /**
     * Import data from JSON
     */
    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            let imported = 0;

            for (const [key, value] of Object.entries(data)) {
                if (key.startsWith(APP_ID)) {
                    // Merge logic: keep newer data
                    const existing = localStorage.getItem(key);
                    if (existing) {
                        const existingData = JSON.parse(existing);
                        const newData = JSON.parse(value);

                        // Merge swipes
                        if (existingData.swipes && newData.swipes) {
                            existingData.swipes = { ...existingData.swipes, ...newData.swipes };
                        }

                        // Merge suggestions
                        if (existingData.suggestions && newData.suggestions) {
                            const combined = [...existingData.suggestions, ...newData.suggestions];
                            existingData.suggestions = [...new Set(combined)];
                        }

                        // Keep newer ranked list
                        if (newData.ranked_list && newData.ranked_list.length > 0) {
                            existingData.ranked_list = newData.ranked_list;
                        }

                        // Merge votes
                        if (existingData.votes && newData.votes) {
                            for (const [name, count] of Object.entries(newData.votes)) {
                                existingData.votes[name] = (existingData.votes[name] || 0) + count;
                            }
                        }

                        // Merge parent notes
                        if (existingData.parent_notes && newData.parent_notes) {
                            existingData.parent_notes = { ...existingData.parent_notes, ...newData.parent_notes };
                        }

                        localStorage.setItem(key, JSON.stringify(existingData));
                    } else {
                        localStorage.setItem(key, value);
                    }
                    imported++;
                }
            }

            return imported;
        } catch (err) {
            throw new Error('Invalid import file: ' + err.message);
        }
    }
};

// Continue in next message due to length...
