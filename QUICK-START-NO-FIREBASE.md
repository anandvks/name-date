# 🚀 Quick Start - NO Firebase Required!

## ⚡ Get Running in 2 Minutes

You have **3 options** to use Name Date without Firebase:

---

## Option 1: Use Existing Files with Manual Sync (Fastest!)

**What you get:** Full app, all features, just manual export/import for syncing

### Steps:

1. **Open the app**
   ```bash
   ./start.sh
   # or
   python3 -m http.server 8000
   ```

2. **Create a room** - Click "Create New Room"

3. **Both parents use the SAME admin link**
   - Person 1: Swipes on names
   - Person 2: Swipes on names (on their device)
   - Data stays on each device separately

4. **To see matches together:**
   - Add export/import buttons (see below)
   - OR just compare manually

### Add Export/Import (Optional but Recommended)

Add this to `index.html` after line 136 (in the matches view):

```html
<div style="margin-bottom: 1.5rem; padding: 1rem; background: #E6D5F5; border-radius: 1rem;">
    <h3 style="font-size: 0.95rem; font-weight: 600; margin-bottom: 0.75rem;">📲 Sync Data</h3>
    <button onclick="exportData()" style="padding: 0.5rem 1rem; background: #D4F0E0; border: none; border-radius: 0.5rem; cursor: pointer; margin-right: 0.5rem;">
        📤 Export
    </button>
    <button onclick="document.getElementById('importFile').click()" style="padding: 0.5rem 1rem; background: #FFE5D9; border: none; border-radius: 0.5rem; cursor: pointer;">
        📥 Import
    </button>
    <input type="file" id="importFile" accept=".json" style="display:none" onchange="importData(event)">
    <p style="font-size: 0.75rem; margin-top: 0.5rem; opacity: 0.8;">
        Export → Send to partner → They import → Both refresh!
    </p>
</div>
```

Add this script to `index.html` before `</body>`:

```html
<script>
function exportData() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        data[key] = localStorage.getItem(key);
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'namedate-' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
}

function importData(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        Object.entries(data).forEach(([key, value]) => {
            if (!localStorage.getItem(key)) {
                localStorage.setItem(key, value);
            }
        });
        alert('Imported! Refresh the page.');
        setTimeout(() => location.reload(), 1000);
    };
    reader.readAsText(file);
}
</script>
```

**Done!** Now you have export/import working.

---

## Option 2: Use Simple P2P Sharing (Most Realistic)

**Reality check:** Most couples use this app by:
1. Sitting together with ONE device
2. Taking turns swiping
3. Seeing matches immediately

**Steps:**
1. Open app on one device
2. Both sit together
3. Take turns swiping
4. See matches instantly!

**Pros:**
- Zero setup
- Zero sync hassle
- Fun couple activity

**Cons:**
- Must be together
- One device only

---

## Option 3: Build the Node.js Server (2 hours, real-time sync)

If you want real-time sync without Firebase:

### What I'll Create:
- `server.js` - Simple WebSocket server
- Real-time updates when either parent swipes
- Runs on your computer

### Steps:

**Tell me if you want this** and I'll create:
1. `server.js` (Node.js + Socket.io)
2. Modified `app.js` to use WebSocket
3. Clear instructions

You run `node server.js` and both parents connect to your local network.

---

## 💡 Recommendation

**For MVP (Right Now):**
→ Use Option 1 or 2

**Why?**
- Works immediately
- Zero accounts
- Zero configuration
- Export/import is actually fine for casual use

**Later:**
- Can add Firebase if you want real-time sync
- Or build the Node server (I can help!)
- Or just keep using export/import forever

---

## 🤔 Which Option Should You Choose?

| Scenario | Best Option |
|----------|-------------|
| Just want to try it | Option 2 (one device) |
| Need to sync occasionally | Option 1 (export/import) |
| Want real-time without cloud | Option 3 (Node server) |
| Prefer cloud magic | Firebase version (see main README) |

---

## ❓ FAQ

**Q: Is export/import annoying?**
A: Not really! You'll probably only need to sync 2-3 times total. Most couples finish swiping in one session anyway.

**Q: What if I forget to export?**
A: Just compare your matches verbally. It's actually kind of fun!

**Q: Can I still use voting/suggestions?**
A: Yes! All features work. Voting is shared automatically via the link.

**Q: Will this scale?**
A: It's perfect for 2 parents + friends voting. If you need more, add Firebase later.

---

## 🚀 Next Steps

1. Pick your option above
2. Start swiping!
3. Find the perfect name 👶✨

Questions? Check [LOCALSTORAGE-GUIDE.md](./LOCALSTORAGE-GUIDE.md) for detailed implementation.

Want me to build the Node.js server version? Just let me know!
