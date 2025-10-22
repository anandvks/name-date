# 🚀 How to Use Name Date - Super Simple!

## ⚡ Quick Start (2 steps)

1. **Open the app**: Double-click `name-date-working.html`
2. **Start swiping**: Click "Start Swiping!"

That's it! You're ready to find your perfect baby name.

---

## 📱 Single Device Setup (Recommended)

### Perfect for couples who want to do this together

1. **Open** `name-date-working.html` in your browser
2. **Click** "Start Swiping!"
3. **Parent 1 swipes** (you'll see "👤 Parent 1" in top-right)
4. **Click the button** in top-right to switch → Now shows "👤 Parent 2"
5. **Parent 2 swipes** on the same device
6. **Click "Matches"** tab to see names you both loved! 💕

### How the switcher works:

```
👤 Parent 1  →  [Click button]  →  👤 Parent 2
```

Each parent sees only names they haven't swiped yet. Your swipes are saved separately.

---

## 🎯 Step-by-Step Workflow

### 1. Start
- Open `name-date-working.html`
- Click "Start Swiping!"

### 2. Parent 1 Swipes
- See name cards one by one
- Gender badges show: Male / Female / Unisex
- ❤️ Swipe right (like) = you love it
- ❌ Swipe left (pass) = not your favorite
- Progress bar shows how many you've swiped

### 3. Switch to Parent 2
- Click "👤 Parent 1" button in top-right
- It changes to "👤 Parent 2"
- Now Parent 2 sees their own queue of names

### 4. Parent 2 Swipes
- Same process as Parent 1
- Independent swipes
- Each parent has their own progress

### 5. See Matches!
- Click "Matches" tab (bottom navigation)
- See all names BOTH parents loved
- Get a "Match! 💕" notification when you both like the same name

---

## 🎨 Features

✅ **Gender badges**: Every name tagged as Male/Female/Unisex
✅ **Progress tracking**: See how many names you've swiped
✅ **Instant matches**: Know immediately when you both love a name
✅ **Indian-German names**: 32 names that work in both cultures!
✅ **Works offline**: No internet needed after first load
✅ **Completely private**: All data stays on your device

---

## 📊 Name Collection

**Total names**: 40+ including:
- Popular English names
- Indian-German compatible names:
  - Unisex: Ari, Kiran, Maya, Nila, Ravi
  - Boys: Arjun, Dev, Karan, Leon, Milan, Rohan, and more
  - Girls: Alina, Elena, Freya, Mira, Nina, Priya, Tara, and more

See [INDIAN-GERMAN-NAMES.md](./INDIAN-GERMAN-NAMES.md) for full list with meanings!

---

## 💡 Pro Tips

1. **Take your time**: There's no rush. Swipe at your own pace.
2. **Be honest**: Swipe based on your gut feeling, not what you think your partner wants.
3. **Switch freely**: Can switch between parents anytime - your progress is saved.
4. **Refresh anytime**: Your swipes are saved in browser, so you can close and come back.

---

## 🌐 Deploy to Netlify (Live Website)

Want to access it from anywhere?

### Option 1: Drag & Drop (Easiest - 2 minutes)

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag these files into the browser:
   - `name-date-working.html`
   - `styles.css`
3. Done! You get a live URL like `https://your-app.netlify.app`

### Option 2: GitHub + Netlify (5 minutes)

1. **Create GitHub repo**:
   ```bash
   git init
   git add name-date-working.html styles.css
   git commit -m "Deploy Name Date"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/name-date.git
   git push -u origin main
   ```

2. **Deploy on Netlify**:
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import from Git"
   - Connect GitHub → Select your repo
   - Leave everything default
   - Click "Deploy"

3. **Done!** You'll get a URL like `https://romantic-name-date-abc123.netlify.app`

### After Deployment:

- Share the URL with your partner
- Both can access from any device
- Swipes are saved per-device (localStorage)

---

## ❓ Troubleshooting

**Q: I clicked the parent switcher but nothing changed**
A: The button text should change from "Parent 1" to "Parent 2". The names you see change based on what that parent hasn't swiped yet.

**Q: I don't see any matches**
A: Both parents need to swipe. Matches only appear when BOTH parents like the same name.

**Q: My swipes disappeared!**
A: Don't clear your browser data/cache. Swipes are saved in localStorage.

**Q: Can I add more names?**
A: Yes! Edit line 121 in `name-date-working.html` and add to the NAMES array.

**Q: Can two people use it at the same time on different devices?**
A: Not with the simple version (localStorage). For real-time sync, you'd need the Firebase version or Netlify Blobs (I can add this!).

---

## 🚀 Next Steps

### Using it now:
1. Open `name-date-working.html`
2. Start swiping!
3. Find your perfect name! 👶✨

### Want to improve it later?
- Add real-time sync (tell me and I'll add Netlify Blobs)
- Add voting from friends/family
- Add more names
- Customize colors

**Questions?** Just ask!
