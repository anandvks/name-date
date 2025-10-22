# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Name Date** is a collaborative baby name selection application where expecting parents swipe on names Tinder-style to find their perfect match. The app features gender categorization, favorites/notes, real-time collaboration, and community voting.

Key features:
- **Swipe Interface**: Parents swipe right (like) or left (pass) on names
- **Gender Categorization**: All names tagged as male/female/unisex with visual badges
- **Match Detection**: Automatic matching when both parents like the same name
- **Ranking System**: Drag-and-drop to rank matched names
- **Favorites & Notes**: Star favorites and add private notes to matched names
- **Community Features**: Friends/family can suggest names and vote on finalists
- **Progress Tracking**: Visual progress bar showing swipe completion
- **Onboarding**: First-time user tutorial explaining the flow

## Architecture

### File Structure

The app is split into three clean files:

1. **index.html** - Semantic HTML structure with all views
2. **styles.css** - Complete styling with pastel color palette
3. **app.js** - Modularized JavaScript with Firebase integration

### Color Palette (Pastel & Calming)

- **Lavender** (`#E6D5F5`) - Primary actions, navigation
- **Mint** (`#D4F0E0`) - Success states, confirmations
- **Peach** (`#FFE5D9`) - Accents, favorites
- **Soft Blue** (`#D9E9FF`) - Secondary elements
- **Rose** (`#FFD4E5`) - Love/heart elements, voting
- **Cream** (`#FFF9F5`) - Backgrounds

### JavaScript Module Organization (app.js)

The code is organized into clear, logical modules:

**1. Firebase Service** (`FirebaseService` object)
- All Firestore operations centralized
- Functions: `init()`, `createRoom()`, `joinRoom()`, `listenToRoom()`, `recordSwipe()`, `updateRankedList()`, `addSuggestion()`, `toggleFavorite()`, `saveNote()`, `recordVote()`

**2. UI Controller** (`UI` object)
- View management and modal system
- Functions: `showView()`, `showModal()`, `hideModal()`, `showOnboarding()`, `copyToClipboard()`
- Handles navigation state and active button highlighting

**3. Renderers** (`Renderers` object)
- All UI rendering logic
- Functions: `renderShareLinks()`, `renderSwipeCard()`, `renderMatchesList()`, `renderVotingList()`, `updateProgress()`
- Handles gender badge display and dynamic content

**4. Event Handlers** (`EventHandlers` object)
- All user interaction handlers
- Functions: `handleCreateRoom()`, `handleSwipe()`, `handleSuggestionSubmit()`, `handleVote()`, `setupDragAndDrop()`, `setupCopyButtons()`

**5. Animations** (`Animations` object)
- Visual feedback and celebrations
- Functions: `swipeCard()`, `resetCard()`, `confetti()`, `pulse()`, `heartbeat()`

**6. Utilities** (`Utilities` object)
- Helper functions
- Functions: `generateRoomId()`, `getDragAfterElement()`

**7. Router** (`Router` object)
- URL parameter routing
- Functions: `route()`, `handleRoomRoute()`, `handleSuggestRoute()`, `handleVoteRoute()`

**8. State Management** (`State` object)
- Centralized global state
- Properties: `userId`, `isParent`, `currentRoomId`, `currentAdminKey`, `roomData`, `currentView`, `hasSeenOnboarding`, `expandedNoteId`, `totalNames`, `swipedCount`

### Firebase Firestore Structure

```
/artifacts/${appId}/public/data/rooms/
  └── {roomId}/
      ├── parent1_id: string
      ├── parent2_id: string | null
      ├── adminKey: string (12-char secure key for admin access)
      ├── suggestions: string[]  // JSON stringified { name, gender } objects
      ├── swipes: { [name]: { [userId]: "like" | "dislike" } }
      ├── ranked_list: string[]  // Parent-ordered matched names
      ├── votes: { [name]: number }
      ├── parent_notes: { [userId]: { [name]: { favorite: bool, note: string } } }
      └── createdAt: string (ISO date)
```

### Views System

All views use the same pattern:
- HTML: `<div id="view-name" class="view">...</div>`
- CSS: `.view { display: none; }` and `.view.active { display: flex; }`
- JS: `UI.showView('viewName')` to switch

**Available Views:**
1. `loading` - Initial connection state
2. `home` - Room creation landing page
3. `share` - Share links for partner/suggestors/voters
4. `swiping` - Main swipe interface (parents only)
5. `matches` - Drag-to-rank matched names (parents only)
6. `suggestion` - Name suggestion form (friends/family)
7. `voting` - Public voting on finalists (friends/family)

### Admin Key System

**Purpose**: Restricts swiping access to only the room creators (admin) while allowing others to suggest names and vote.

**How It Works**:
1. **Key Generation** (app.js:1258): When a room is created, a secure 12-character admin key is generated using `Utilities.generateAdminKey()`
2. **Storage** (app.js:324): The admin key is stored in the Firestore room document
3. **Distribution**: The admin key is embedded in the admin link: `?room=XYZ&adminKey=ABC123DEF456`
4. **Verification** (app.js:1339): When accessing a room, the router checks if the provided admin key matches the one in Firestore
5. **Fallback** (app.js:1342): If no admin key or invalid key is provided, users are automatically redirected to the suggestion form

**Security Notes**:
- Admin keys are 12 characters using only unambiguous characters (excludes I, O, 0, 1, L)
- Keys are visible in URLs but only admins have the admin link
- Keys cannot be modified via Firestore security rules (update restricted)
- If compromised, create a new room with a new key

**URL Parameters**:
- `?room=XYZ&adminKey=ABC123` - Admin access (swiping + matches)
- `?room=XYZ` (no admin key) - Redirects to suggestion form
- `?suggest=XYZ` - Suggestion form (no key needed)
- `?vote=XYZ` - Voting page (no key needed)

**State Management**:
- `State.currentAdminKey` stores the admin key after successful verification
- `State.isParent` is set to true only after admin key verification

## Key Features Implementation

### Gender Categorization

**Default Names** (app.js:60-181):
- All 100+ default names include `{ name: string, gender: 'male' | 'female' | 'unisex' }`
- Suggestions store gender via JSON.stringify when submitted

**Visual Display**:
- Gender badges on swipe cards: `<span class="gender-badge male|female|unisex">`
- Badges styled in styles.css:369-382 with distinct colors per gender
- Displayed in matches and voting lists

### Favorites & Notes System

**Firestore Structure**:
```javascript
parent_notes: {
  [userId]: {
    [nameName]: {
      favorite: boolean,
      note: string
    }
  }
}
```

**UI Implementation** (app.js:734-803):
- Star button in matches list toggles favorite (gold when active)
- "Add Note" / "Edit Note" button expands textarea
- Notes are private to each parent
- Real-time sync via Firestore

### Progress Tracking

**Implementation** (app.js:690-709):
- Counts total names (defaults + suggestions)
- Tracks swiped count per user
- Updates progress bar: `<div class="progress-fill" style="width: ${percentage}%">`
- Shows "X / Y names swiped" text

### Animations

**Swipe Animation** (app.js:979-991):
- Cubic bezier spring physics: `cubic-bezier(0.175, 0.885, 0.32, 1.275)`
- Direction-based rotation (±20deg)
- Opacity fade during swipe

**Confetti Celebration** (app.js:1000-1016):
- 50 random colored confetti particles
- Triggered on new match detection
- Auto-cleanup after 3 seconds

**Other Animations**:
- `heartbeat()` on favorite toggle
- `pulse()` on vote submission
- Fade transitions between views

### Onboarding Modal

**Implementation** (app.js:511-559):
- Shows on first room creation (if not seen before)
- localStorage key: `namedate_onboarding_seen`
- 4-step tutorial with numbered circles
- Clean design with step-by-step guidance

### Drag-and-Drop Ranking

**Implementation** (app.js:908-937):
- HTML5 Drag & Drop API
- Event listeners on matches container
- `getDragAfterElement()` calculates insert position
- Auto-saves to Firestore on drop

## Development Commands

**Run locally:**
```bash
# Serve with Python
python3 -m http.server 8000
# Open http://localhost:8000

# Or use any other local server
npx serve .
```

**Firebase Setup** (required before first use):
1. Create Firebase project at https://console.firebase.google.com
2. Enable Anonymous Authentication
3. Create Firestore database
4. Copy config object
5. Replace `firebaseConfig` in app.js:37-43

## Common Modification Patterns

### Adding a New Name to Defaults
Edit `DEFAULT_NAMES` array in app.js:60-181:
```javascript
{ name: 'NewName', gender: 'male' | 'female' | 'unisex' }
```

### Changing Color Scheme
Edit CSS variables in styles.css:15-35:
```css
:root {
    --lavender: #E6D5F5;
    /* ... etc */
}
```

### Adding a New View
1. Add HTML in index.html: `<div id="new-view" class="view">...</div>`
2. Register in app.js Elements.views object (line 131)
3. Add routing logic in Router object (line 1130)
4. Create render function in Renderers object

### Modifying Swipe Animation
Edit `Animations.swipeCard()` in app.js:979:
```javascript
card.style.transform = `translateX(${direction * 150}%) rotate(${direction * 20}deg)`;
```

### Adding New Firestore Fields
1. Update room creation in `FirebaseService.createRoom()` (line 230)
2. Add read/write functions in FirebaseService
3. Update TypeScript-style documentation in this file's Firestore Structure section

## User Roles & Access Control

**Parents** (identified by `parent1_id` or `parent2_id`):
- Access: swiping, matches, navigation
- Can: swipe on names, rank matches, add favorites/notes, view votes
- Cannot: submit suggestions, vote

**Suggestors** (anyone with suggestion link):
- Access: suggestion form only
- Can: submit name suggestions with gender tags
- Cannot: see swipes or matches

**Voters** (anyone with voting link):
- Access: voting view only
- Can: vote once per name (localStorage-based)
- Cannot: see which names are ranked higher (only see ranked order)

## Important Constraints

- **No build process**: Plain HTML/CSS/JS only, no transpilation
- **Firebase required**: App won't work without Firebase configuration
- **Two-parent limit**: Enforced in `joinRoom()` logic (app.js:254)
- **Anonymous auth**: No user accounts or passwords
- **localStorage voting**: Can be bypassed by clearing storage
- **Real-time only**: No offline support

## Code Location Reference

- **View switching**: app.js:465 (`UI.showView()`)
- **Swipe handling**: app.js:835 (`EventHandlers.handleSwipe()`)
- **Match detection**: app.js:713 (`Renderers.getMatches()`)
- **Onboarding**: app.js:511 (`UI.showOnboarding()`)
- **Favorites**: app.js:1073 (listeners in `Renderers.attachMatchItemListeners()`)
- **Notes**: app.js:1086 (save handler)
- **Confetti**: app.js:1000 (`Animations.confetti()`)
- **Progress bar**: app.js:690 (`Renderers.updateProgress()`)
- **Gender badges**: Rendered in `Renderers.renderSwipeCard()`, `renderMatchesList()`, `renderVotingList()`
- **Drag-and-drop**: app.js:908 (`EventHandlers.setupDragAndDrop()`)
