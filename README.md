# 💕 Name Date

> Find the perfect baby name together - A collaborative name-matching app for expecting parents

**Name Date** is a beautiful, Tinder-style baby name matching application where you and your partner can swipe on names together, get instant matches, and involve your loved ones in the naming journey.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/name-date)

## 🎯 Two Versions Available

### 🆓 localStorage MVP (Recommended for Getting Started!)
**Zero setup, zero accounts, works offline**
- ✅ NO Firebase account needed
- ✅ NO cloud setup required
- ✅ Works completely offline
- ✅ 100% private (data never leaves your device)
- ✅ Export/import to sync with partner
- ⚠️ Manual sync (no real-time updates)

**Quick Start:** See [LOCALSTORAGE-GUIDE.md](./LOCALSTORAGE-GUIDE.md) for 15-minute setup!

### ☁️ Firebase Version (Full Features)
**Cloud-based with real-time sync**
- ✅ Real-time collaboration
- ✅ Automatic sync between parents
- ✅ Access from any device
- ⚠️ Requires Firebase account (free tier available)

**Quick Start:** Continue reading below for Firebase setup.

---

## ✨ Features

### For Parents (Admin)
- 🔐 **Secure Admin Access** - Private admin link ensures only you and your partner can swipe
- 💑 **Dual Swiping** - Both parents swipe independently to find mutual favorites
- 💖 **Instant Match Detection** - Get notified with confetti when you both love a name
- ⭐ **Favorites & Notes** - Star your top picks and add private thoughts about each name
- 📊 **Progress Tracking** - Visual progress bar showing your swiping completion
- 🎯 **Drag-to-Rank** - Organize your matched names by preference
- 🏷️ **Gender Badges** - Every name is tagged as male, female, or unisex

### For Friends & Family
- 💡 **Name Suggestions** - Anyone can submit name ideas with gender tags
- 🗳️ **Community Voting** - Help choose from the parents' finalists
- 🔗 **Easy Sharing** - Simple links for suggesting and voting

### User Experience
- 🎨 **Calming Pastel Design** - Beautiful, soothing color palette
- ✨ **Smooth Animations** - Delightful transitions and feedback
- 📱 **Mobile-First** - Perfect on phones, tablets, and desktop
- 🎓 **Onboarding Tutorial** - First-time users get a helpful guide
- 🚀 **Real-Time Sync** - Changes appear instantly for both parents

## 🎬 Demo

[Live Demo](https://your-app.netlify.app) *(Replace with your Netlify URL after deployment)*

## 🚀 Super Quick Start (2 Minutes!)

**The app is ready to use NOW - no setup needed!**

### Option 1: Use Locally (Instant)

1. Open `index.html` in your browser (double-click it)
2. Click "Start Swiping!"
3. Done! ✨

### Option 2: Deploy to Netlify (5 Minutes)

**Easiest way - Drag & Drop:**

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag these two files into your browser:
   - `index.html`
   - `styles.css`
3. Get your live URL! (e.g., `https://your-name-date.netlify.app`)
4. Share with your partner!

**OR via GitHub:**

```bash
# 1. Create repo
git init
git add index.html styles.css
git commit -m "Deploy Name Date"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/name-date.git
git push -u origin main

# 2. Go to app.netlify.com
# 3. "Add new site" → "Import from Git" → Select your repo
# 4. Deploy! (No build settings needed)
```

Done! You'll get a live URL to share.

---

## 📖 How to Use

See [HOW-TO-USE.md](./HOW-TO-USE.md) for detailed instructions!

**Quick version:**
1. Open the app
2. Click "Start Swiping!"
3. Parent 1 swipes → Click "👤 Parent 1" button to switch → Parent 2 swipes
4. Click "Matches" to see names you both loved!

---

## 🌍 Indian-German Names Included!

This version includes 32 names that work beautifully in both Indian and German cultures!

Examples: Ari, Maya, Rohan, Mira, Leon, Nina, Arjun, Elena, and more!

See [INDIAN-GERMAN-NAMES.md](./INDIAN-GERMAN-NAMES.md) for the complete list with meanings.

---

## 💾 Technical Details (For Developers)

### Prerequisites (None!)

- ✅ No accounts needed
- ✅ No Firebase
- ✅ No database
- ✅ No build process
- ✅ Just open and use!

### How It Works

- **Storage**: Browser localStorage (data stays on your device)
- **Styling**: Beautiful pastel CSS
- **JavaScript**: Vanilla JS, no frameworks
- **Parent Switching**: Toggle button switches user context

### Files

- `index.html` - Complete app (330 lines, all-in-one)
- `styles.css` - Pastel theme
- `HOW-TO-USE.md` - Usage guide
- `INDIAN-GERMAN-NAMES.md` - Name list with meanings

### For the Full Firebase Version

If you want real-time sync across devices, see the Firebase version:
- Backup available in `index-firebase-backup.html` and `app.js`
- Requires Firebase account setup
- See original README sections below for Firebase instructions

---

## 🎯 Current Features (Simple Version)

✅ **40+ Names** - English + Indian-German compatible
✅ **Parent Toggle** - Switch between Parent 1 & Parent 2
✅ **Gender Badges** - Male, Female, Unisex tags
✅ **Progress Tracking** - See how many names swiped
✅ **Instant Matches** - Know when you both love a name
✅ **Works Offline** - No internet needed
✅ **Zero Setup** - Just open and go!

---

## 🚀 Next Steps After Basic Setup

Once you've tried it and want more features:

1. **Add more names** - Edit line 133 in `index.html`
2. **Add real-time sync** - Tell me and I'll add Netlify Blobs!
3. **Add voting** - Let friends vote on finalists
4. **Customize colors** - Edit `styles.css`

---

## Clone the Repository (Optional)

```bash
git clone https://github.com/YOUR_USERNAME/name-date.git
cd name-date
```

### 2. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" and follow the wizard
3. Once created, click "Web" (</> icon) to add a web app
4. Copy your Firebase configuration object

5. Enable Authentication:
   - Go to Authentication → Sign-in method
   - Enable "Anonymous" authentication

6. Create Firestore Database:
   - Go to Firestore Database
   - Click "Create database"
   - Choose "Start in production mode"
   - Select a region close to you

7. Set up Firestore Security Rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /artifacts/{artifactId}/public/data/rooms/{roomId} {
         // Anyone can read rooms
         allow read: if true;

         // Anyone can create rooms
         allow create: if true;

         // Only allow updates to specific fields (not adminKey)
         allow update: if request.resource.data.diff(resource.data).affectedKeys()
           .hasOnly(['parent2_id', 'suggestions', 'swipes', 'ranked_list', 'votes', 'parent_notes']);
       }
     }
   }
   ```

### 3. Configure the App

Open `app.js` and replace the Firebase configuration (lines 37-43):

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 4. Test Locally

```bash
# Using Python 3
python3 -m http.server 8000

# Or using Node.js
npx serve .

# Or using PHP
php -S localhost:8000
```

Open http://localhost:8000 in your browser.

### 5. Deploy to Netlify

#### Option A: Deploy via GitHub (Recommended)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/name-date.git
   git push -u origin main
   ```

2. Go to [Netlify](https://app.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Deploy settings:
   - **Build command**: (leave empty)
   - **Publish directory**: (leave empty or put `.`)
6. Click "Deploy site"

#### Option B: Deploy via Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

#### Option C: Drag & Drop

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag your project folder into the browser
3. Done!

### 6. Configure Firebase for Production

In Firebase Console, add your Netlify domain to authorized domains:
1. Go to Authentication → Settings → Authorized domains
2. Click "Add domain"
3. Add your Netlify URL (e.g., `your-app.netlify.app`)

## 📖 How to Use

### Creating Your Room

1. Visit the app and click **"Create a New Room"**
2. You'll get three links:
   - **Admin Link** - For you and your partner (required for swiping)
   - **Suggestion Link** - For friends/family to submit name ideas
   - **Voting Link** - Share after you've ranked your matches

### For Parents (Admins)

1. **Share the admin link** with your partner privately
2. **Start swiping** - Swipe right (❤️) on names you love, left (✗) to pass
3. **Get matches** - When you both like a name, it's a match! 🎉
4. **Add favorites** - Star your absolute favorites
5. **Add notes** - Write private thoughts about each name
6. **Rank your matches** - Drag and drop to organize by preference
7. **Share voting link** - Let friends/family vote on your top picks

### For Friends & Family

**Suggesting Names:**
1. Open the suggestion link
2. Enter a name and select gender (male/female/unisex)
3. Submit - it's added to the parents' swipe deck!

**Voting:**
1. Open the voting link
2. See the parents' ranked finalists
3. Click the heart on your favorites
4. Your vote is counted!

## 🔐 Admin Key System

The admin key ensures only you and your partner can swipe on names.

- **Admin link includes a secret key**: `?room=XYZ&adminKey=ABC123`
- **Without the key**, the room link redirects to the suggestion form
- **The key is generated automatically** when creating a room
- **Share the admin link privately** (text message, Signal, etc.)
- **Suggestion/voting links don't need the key** - they're public

### Security Notes

- Admin keys are stored in Firestore (read-only via security rules)
- Keys are visible in the URL but only you have the admin link
- Don't share the admin link publicly
- If compromised, create a new room

## 🛠️ Development

### Project Structure

```
name-date/
├── index.html       # HTML structure with all views
├── styles.css       # Pastel-themed styling
├── app.js          # Modularized JavaScript
├── README.md       # This file
├── CLAUDE.md       # Developer documentation
├── netlify.toml    # Netlify configuration
├── _redirects      # SPA routing rules
└── .gitignore      # Git ignore rules
```

### Code Organization (app.js)

The JavaScript is organized into logical modules:

- **FirebaseService** - All database operations
- **UI** - View management and modals
- **Renderers** - Display logic for all views
- **EventHandlers** - User interaction handlers
- **Animations** - Visual feedback and effects
- **Router** - URL-based navigation
- **State** - Centralized state management
- **Utilities** - Helper functions

See `CLAUDE.md` for detailed architecture documentation.

### Tech Stack

- **Frontend**: Vanilla JavaScript (ES6 modules), HTML5, CSS3
- **Styling**: Custom CSS with CSS variables
- **Backend**: Firebase (Firestore + Anonymous Auth)
- **Hosting**: Netlify (static hosting)
- **Fonts**: Inter (Google Fonts)

### Why No Build Process?

This app intentionally uses no build tools, bundlers, or frameworks to:
- ✅ Keep deployment simple
- ✅ Make the code easy to understand
- ✅ Avoid dependency management
- ✅ Enable instant local development

## 🎨 Customization

### Changing Colors

Edit CSS variables in `styles.css` (lines 15-35):

```css
:root {
    --lavender: #E6D5F5;
    --mint: #D4F0E0;
    --peach: #FFE5D9;
    /* ... */
}
```

### Adding Names

Edit the `DEFAULT_NAMES` array in `app.js` (lines 60-181):

```javascript
{ name: 'YourName', gender: 'male' | 'female' | 'unisex' }
```

### Modifying Animations

See the `Animations` object in `app.js` (lines 979-1024).

## 🐛 Troubleshooting

**Names aren't appearing**
- Check Firebase configuration in `app.js`
- Ensure Firestore database is created
- Check browser console for errors

**Can't create a room**
- Verify Anonymous Authentication is enabled in Firebase
- Check Firestore security rules
- Ensure you're connected to the internet

**Admin link not working**
- Make sure the entire URL is copied (including `&adminKey=...`)
- Check if Firestore has the room document
- Try creating a new room

**Deployed app shows blank page**
- Check browser console for errors
- Ensure Netlify domain is in Firebase authorized domains
- Verify `_redirects` file is deployed

## 📝 License

MIT License - feel free to use this for your own baby naming journey!

## 🙏 Acknowledgments

- Inspired by the joy of finding the perfect name
- Built with love for expecting parents everywhere
- Colors chosen for a calm, stress-free experience

## 💬 Support

Found a bug? Have a suggestion? Open an issue on GitHub!

---

**Made with 💕 for parents-to-be**

Good luck finding your perfect name! 👶✨
