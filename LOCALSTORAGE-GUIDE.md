# localStorage Version - Quick Start Guide

## 🎯 Two Options

### Option 1: Hybrid Approach (Recommended for MVP)
Keep the current Firebase version but make it work **without** Firebase config:
- Uses localStorage as fallback
- No real-time sync
- Add export/import buttons
- 15-minute implementation

### Option 2: Pure localStorage Rewrite
Complete localStorage-only version:
- No Firebase code at all
- Simpler, lighter
- Export/import built-in
- 1-2 hour implementation

---

## 🚀 Quick Start: Hybrid Approach

### Step 1: Make Firebase Optional

In `app.js`, replace lines 33-48 with:

```javascript
// Firebase configuration (OPTIONAL - works without it!)
const firebaseConfig = {
    apiKey: "SKIP",
    authDomain: "SKIP",
    projectId: "SKIP",
    storageBucket: "SKIP",
    messagingSenderId: "SKIP",
    appId: "SKIP"
};

// Use localStorage instead of Firebase
const USE_LOCALSTORAGE = true; // Set to true for local-only mode
```

### Step 2: Add Export/Import Buttons

Add to `index.html` in the matches view (after line 136):

```html
<!-- Export/Import Controls -->
<div class="export-import-controls" style="margin-top: 2rem; padding: 1rem; background: var(--lavender-light); border-radius: 1rem;">
    <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 0.75rem;">Sync with Partner</h3>
    <div style="display: flex; gap: 0.75rem;">
        <button id="export-btn" class="btn btn-secondary btn-small">
            📤 Export Data
        </button>
        <button id="import-btn" class="btn btn-secondary btn-small">
            📥 Import Partner's Data
        </button>
        <input type="file" id="import-file" accept=".json" style="display: none;">
    </div>
    <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.5rem;">
        Export your swipes and send to your partner. Import theirs to see matches!
    </p>
</div>
```

### Step 3: Add Export/Import Logic

Add this to `app.js` before the `init()` function:

```javascript
// Export/Import Functions
function exportData() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('namedate')) {
            data[key] = localStorage.getItem(key);
        }
    }

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `namedate-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    UI.showModal('Exported!', 'Send this file to your partner via text/email.');
}

function importData() {
    const input = document.getElementById('import-file');
    input.click();
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);

                // Merge imported data
                for (const [key, value] of Object.entries(data)) {
                    if (key.startsWith('namedate_room')) {
                        const existing = localStorage.getItem(key);
                        if (existing) {
                            const oldData = JSON.parse(existing);
                            const newData = JSON.parse(value);

                            // Merge swipes
                            oldData.swipes = { ...oldData.swipes, ...newData.swipes };
                            localStorage.setItem(key, JSON.stringify(oldData));
                        } else {
                            localStorage.setItem(key, value);
                        }
                    } else {
                        localStorage.setItem(key, value);
                    }
                }

                UI.showModal('Import Successful!', 'Refresh the page to see updates.');
                setTimeout(() => window.location.reload(), 2000);
            } catch (err) {
                UI.showModal('Import Failed', 'Invalid file format.');
            }
        };
        reader.readAsText(file);
    };
}
```

### Step 4: Wire Up Buttons

Add to the event listeners in `init()` function:

```javascript
// Export/Import buttons
document.getElementById('export-btn')?.addEventListener('click', exportData);
document.getElementById('import-btn')?.addEventListener('click', importData);
```

### Step 5: Use localStorage Keys

Replace all Firebase paths with localStorage keys:

Change `FirebaseService.getRoomsCollectionPath()` to return:
```javascript
return `namedate_room_${roomId}`; // Just the localStorage key
```

---

## 📋 How to Use (After Setup)

1. **Create Room**: Click "Create a New Room"
2. **Get Admin Link**: Copy the admin link (works locally!)
3. **Start Swiping**: Swipe on names
4. **Export**: Click "📤 Export Data" button
5. **Send to Partner**: Text/email the .json file
6. **Partner Imports**: They click "📥 Import" and select your file
7. **See Matches**: Both refresh to see combined results!

---

## 🔄 Workflow

```
You:                          Partner:
├─ Swipe on names            ├─ Swipe on names
├─ Export data.json          ├─ Export data.json
├─ Send file ──────────────> ├─ Receive file
├─ Receive file <──────────── ├─ Send file
├─ Import partner's file     ├─ Import your file
└─ Refresh = See matches! ✨  └─ Refresh = See matches! ✨
```

---

## ✅ Pros of localStorage Approach

- ✨ **Zero setup** - No Firebase account needed
- 🔒 **Complete privacy** - Data never leaves your device
- ⚡ **Works offline** - No internet required
- 🆓 **100% free** - No cloud costs
- 🎯 **Simple** - Just export/import to sync

## ⚠️ Cons to Know

- 📱 **No real-time sync** - Must manually export/import
- 💾 **Browser-tied** - Data lives in one browser
- 🗑️ **Can be lost** - Clearing browser cache clears data
- 🔄 **Manual merge** - You handle export/import timing

---

## 🆘 Troubleshooting

**"My data disappeared!"**
- Don't clear browser cache/cookies
- Export regularly as backup

**"Import not working"**
- Make sure file is the .json export
- Try refreshing after import

**"Partner's swipes not showing"**
- Both need to export → exchange → import → refresh
- Make sure using same room ID

---

## 🚀 Next Steps

Once you're happy with the MVP:
1. Can add Firebase later for real-time sync
2. Or build the Node.js server version (Option B)
3. Or use it as-is forever - it works great!

---

**Need the complete localStorage-only rewrite instead?**
Let me know and I'll create `app-localStorage.js` with everything built-in.
