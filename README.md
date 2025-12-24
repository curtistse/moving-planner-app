# Toronto Moving Planner 📦

An interactive moving checklist and timeline planner.

## Features
- ✅ Task checklist organized by category
- 📅 Gantt chart timeline view
- ➕ Add, edit, and delete tasks
- 📊 Progress tracking
- 📤 Export to CSV (for Trello import)

---

## 🚀 Deploy to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `moving-planner` (or whatever you prefer)
3. Keep it **Public** (required for free GitHub Pages)
4. Click **Create repository**

### Step 2: Update the Base Path

If your repo name is NOT `moving-planner`, edit `vite.config.js`:

```js
base: '/your-repo-name/',
```

### Step 3: Push the Code

Run these commands in this folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/moving-planner.git
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Build and deployment":
   - Source: **GitHub Actions**
4. That's it! The workflow will auto-run.

### Step 5: Access Your Site

After ~2 minutes, your site will be live at:

```
https://YOUR_USERNAME.github.io/moving-planner/
```

---

## 🛠 Local Development

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
moving-planner/
├── .github/workflows/deploy.yml  # Auto-deploy on push
├── src/
│   ├── App.jsx                   # Main planner component
│   └── main.jsx                  # React entry point
├── index.html
├── package.json
└── vite.config.js
```
