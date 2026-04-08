# 🆓 COMPLETELY FREE DEPLOYMENT GUIDE

## 100% Free - No Credit Card Required

---

## ⚠️ Important: Netlify Limitation

**Netlify CANNOT host your full-stack app** because:
- ❌ Netlify only hosts static websites (HTML, CSS, JS)
- ❌ Your app needs Node.js backend (Express server)
- ❌ Your app needs MongoDB connection
- ❌ Your app needs file uploads (Multer)

**Solution:** Use FREE alternatives that support full-stack apps!

---

## 🎯 BEST FREE OPTIONS (Recommended)

### Option 1: Render.com (EASIEST & FREE) ⭐

**Why Render?**
- ✅ 100% FREE forever
- ✅ No credit card required
- ✅ Supports Node.js + MongoDB
- ✅ Free SSL certificate
- ✅ Easy deployment
- ✅ Free subdomain

**Limitations:**
- App sleeps after 15 minutes of inactivity
- Wakes up in ~30 seconds when visited
- 750 hours/month free (enough for most use)

---

## 🚀 DEPLOY TO RENDER.COM (15 Minutes)

### Step 1: Prepare Your Project (2 minutes)

1. **Update package.json** (already done ✅)
2. **Ensure .env is in .gitignore** (already done ✅)

### Step 2: Push to GitHub (5 minutes)

**If you don't have Git installed:**
- Download: https://git-scm.com/downloads
- Install with default settings

**Push your project:**

```bash
# Open terminal in your project folder
cd path/to/your/project

# Initialize Git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create repository on GitHub:
# 1. Go to https://github.com
# 2. Click "+" → "New repository"
# 3. Name: sonal-agritech
# 4. Click "Create repository"

# Link and push
git remote add origin https://github.com/harshkuhikar/image_gallery.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy Backend on Render (5 minutes)

1. **Go to:** https://render.com
2. **Sign up** with GitHub (free, no credit card)
3. **Click:** "New +" → "Web Service"
4. **Connect** your GitHub repository
5. **Configure:**

```
Name: sonal-agritech-backend
Region: Choose closest to you
Branch: main
Root Directory: (leave empty)
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

6. **Add Environment Variables** (click "Advanced"):

```
MONGODB_URI = mongodb+srv://harshkuhikar68:Kuhikar%401122@image-gallery.mkgdpbp.mongodb.net/sonal-agritech
JWT_SECRET = sonal_agritech_super_secret_key_2024_production
PORT = 5000
CLOUDINARY_CLOUD_NAME = dqzbrs69t
CLOUDINARY_API_KEY = 228621393946327
CLOUDINARY_API_SECRET = lB8c1rtuOJ95bX7xgI4JBGKba7s
ADMIN_EMAIL = sonalagritech@gmail.com
ADMIN_PASSWORD = Sonal@2026
NODE_ENV = production
```

7. **Click:** "Create Web Service"
8. **Wait** 5-10 minutes for deployment
9. **Copy** your backend URL (e.g., `https://sonal-agritech-backend.onrender.com`)

### Step 4: Deploy Frontend on Render (3 minutes)

1. **Click:** "New +" → "Static Site"
2. **Connect** same GitHub repository
3. **Configure:**

```
Name: sonal-agritech-frontend
Branch: main
Root Directory: client
Build Command: npm install --legacy-peer-deps && npm run build
Publish Directory: client/dist
```

MONGODB_URI = mongodb+srv://harshkuhikar68:Kuhikar%401122@image-gallery.mkgdpbp.mongodb.net/sonal-agritech
JWT_SECRET = f496feefac9b6b283dedf670bf4a3cf51317ec0504599f2731eeb8efa34b7eeb
PORT = 5000
CLOUDINARY_CLOUD_NAME = dqzbrs69t
CLOUDINARY_API_KEY = 228621393946327
CLOUDINARY_API_SECRET = lB8c1rtuOJ95bX7xgI4JBGKba7s
ADMIN_EMAIL = sonalagritech@gmail.com
ADMIN_PASSWORD = Sonal@2026
NODE_ENV = production


4. **Add Environment Variable:**

```
VITE_API_URL = https://sonal-agritech-backend.onrender.com/api
```

(Replace with YOUR backend URL from Step 3)

5. **Click:** "Create Static Site"
6. **Wait** 3-5 minutes

### Step 5: Configure Custom Domain (Optional)

**Free Subdomain:**
- Your site: `https://sonal-agritech-frontend.onrender.com`

**Custom Domain (linktree.sonalagritech.co.in):**
1. In Render → Settings → Custom Domain
2. Add: `linktree.sonalagritech.co.in`
3. Copy the CNAME record
4. In Hostinger DNS:
   - Type: CNAME
   - Name: linktree
   - Points to: (Render's CNAME)
5. Wait 5-30 minutes

**Done! Your website is live! 🎉**

---

Name: sonal-agritech-frontend
Branch: main
Root Directory: client
Build Command: npm install --legacy-peer-deps && npm run build
Publish Directory: client/dist

Environment Variables:
Key: VITE_API_URL
Value: https://sonal-agritech-backend.onrender.com/api


MONGODB_URI = mongodb+srv://harshkuhikar68:Kuhikar%401122@image-gallery.mkgdpbp.mongodb.net/sonal-agritech
JWT_SECRET = sonal_agritech_super_secret_key_2024_production
PORT = 5000
CLOUDINARY_CLOUD_NAME = dqzbrs69t
CLOUDINARY_API_KEY = 228621393946327
CLOUDINARY_API_SECRET = lB8c1rtuOJ95bX7xgI4JBGKba7s
ADMIN_EMAIL = sonalagritech@gmail.com
ADMIN_PASSWORD = Sonal@2026
NODE_ENV = production



## 🎯 Option 2: Railway.app (Also FREE)

**Why Railway?**
- ✅ 100% FREE (with $5 credit/month)
- ✅ No credit card for trial
- ✅ Easier than Render
- ✅ Better performance

**Limitations:**
- $5 credit/month (usually enough)
- Requires credit card after trial

### Deploy to Railway:

1. **Go to:** https://railway.app
2. **Sign up** with GitHub
3. **Click:** "New Project" → "Deploy from GitHub repo"
4. **Select** your repository
5. **Add** environment variables (same as Render)
6. **Deploy!**

Railway automatically detects Node.js and deploys both frontend and backend.

---

## 🎯 Option 3: Vercel (Frontend) + Render (Backend)

**Best for:**
- Fastest frontend performance
- Free SSL
- Global CDN

### Deploy Backend to Render (same as Option 1, Step 3)

### Deploy Frontend to Vercel:

1. **Go to:** https://vercel.com
2. **Sign up** with GitHub
3. **Click:** "Add New" → "Project"
4. **Import** your repository
5. **Configure:**

```
Framework Preset: Vite
Root Directory: client
Build Command: npm run build
Output Directory: dist
Install Command: npm install --legacy-peer-deps
```

6. **Add Environment Variable:**

```
VITE_API_URL = https://sonal-agritech-backend.onrender.com/api
```

7. **Deploy!**

**Your site:** `https://sonal-agritech.vercel.app`

---

## 🎯 Option 4: Cyclic.sh (Simplest)

**Why Cyclic?**
- ✅ Simplest deployment
- ✅ 100% FREE
- ✅ No credit card
- ✅ One-click deploy

### Deploy to Cyclic:

1. **Go to:** https://cyclic.sh
2. **Sign up** with GitHub
3. **Click:** "Link Your Own"
4. **Select** your repository
5. **Add** environment variables
6. **Deploy!**

Cyclic automatically handles everything.

---

## 📊 Comparison of FREE Options

| Platform | Difficulty | Speed | Best For |
|----------|-----------|-------|----------|
| Render | ⭐⭐ Easy | Medium | Most reliable |
| Railway | ⭐ Easiest | Fast | Best performance |
| Vercel + Render | ⭐⭐⭐ Medium | Fastest | Production apps |
| Cyclic | ⭐ Easiest | Medium | Quick deploy |

---

## 🎯 RECOMMENDED: Render.com

**Why?**
- 100% FREE forever
- No credit card required
- Most reliable
- Easy to use
- Free SSL
- Good documentation

**Total Time:** 15 minutes
**Cost:** $0 (FREE)
**Difficulty:** Easy

---

## 📝 Detailed Step-by-Step for Render

### Prerequisites:

1. **GitHub Account** (free)
   - Go to: https://github.com
   - Sign up (free)

2. **Git Installed** (free)
   - Download: https://git-scm.com/downloads
   - Install with default settings

### Step-by-Step:

#### 1. Push Project to GitHub (First Time)

**Open Command Prompt/Terminal in your project folder:**

```bash
# Check if Git is installed
git --version

# If not installed, install from https://git-scm.com/downloads

# Initialize Git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit for deployment"

# Create repository on GitHub:
# - Go to https://github.com
# - Click "+" icon (top right)
# - Click "New repository"
# - Repository name: sonal-agritech
# - Description: Sonal AgriTech Portfolio
# - Public or Private: Your choice
# - DON'T check "Initialize with README"
# - Click "Create repository"

# Copy the commands GitHub shows you, or use these:
git remote add origin https://github.com/YOUR_USERNAME/sonal-agritech.git
git branch -M main
git push -u origin main

# Enter your GitHub username and password when prompted
```

#### 2. Deploy Backend on Render

**A. Sign Up:**
1. Go to: https://render.com
2. Click "Get Started for Free"
3. Click "GitHub" to sign up with GitHub
4. Authorize Render to access your repositories

**B. Create Web Service:**
1. Click "New +" (top right)
2. Click "Web Service"
3. Click "Connect" next to your repository
4. If you don't see it, click "Configure account" and grant access

**C. Configure Service:**

Fill in these fields:

```
Name: sonal-agritech-backend
Region: Choose closest to you (e.g., Oregon, Frankfurt)
Branch: main
Root Directory: (leave empty)
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

**D. Add Environment Variables:**

Click "Advanced" → "Add Environment Variable"

Add these ONE BY ONE:

```
Key: MONGODB_URI
Value: mongodb+srv://harshkuhikar68:Kuhikar%401122@image-gallery.mkgdpbp.mongodb.net/sonal-agritech

Key: JWT_SECRET
Value: sonal_agritech_super_secret_key_2024_production

Key: PORT
Value: 5000

Key: CLOUDINARY_CLOUD_NAME
Value: dqzbrs69t

Key: CLOUDINARY_API_KEY
Value: 228621393946327

Key: CLOUDINARY_API_SECRET
Value: lB8c1rtuOJ95bX7xgI4JBGKba7s

Key: ADMIN_EMAIL
Value: sonalagritech@gmail.com

Key: ADMIN_PASSWORD
Value: Sonal@2026

Key: NODE_ENV
Value: production
```

**E. Deploy:**
1. Click "Create Web Service"
2. Wait 5-10 minutes (watch the logs)
3. When you see "Your service is live 🎉", copy the URL
4. Example: `https://sonal-agritech-backend.onrender.com`

#### 3. Deploy Frontend on Render

**A. Create Static Site:**
1. Click "New +" (top right)
2. Click "Static Site"
3. Connect same repository

**B. Configure:**

```
Name: sonal-agritech-frontend
Branch: main
Root Directory: client
Build Command: npm install --legacy-peer-deps && npm run build
Publish Directory: client/dist
```

**C. Add Environment Variable:**

Click "Advanced" → "Add Environment Variable"

```
Key: VITE_API_URL
Value: https://sonal-agritech-backend.onrender.com/api
```

(Replace with YOUR backend URL from step 2)

**D. Deploy:**
1. Click "Create Static Site"
2. Wait 3-5 minutes
3. Your site is live!

#### 4. Test Your Website

**Your URLs:**
- Frontend: `https://sonal-agritech-frontend.onrender.com`
- Backend: `https://sonal-agritech-backend.onrender.com`
- Admin: `https://sonal-agritech-frontend.onrender.com/admin`

**Test:**
1. Visit frontend URL
2. Check if logos float in background
3. Click on categories
4. View images
5. Login to admin panel
6. Upload test image
7. Create test company

---

## 🎯 Custom Domain (Optional)

### Use Your Subdomain: linktree.sonalagritech.co.in

**In Render:**
1. Go to your frontend service
2. Click "Settings"
3. Scroll to "Custom Domain"
4. Click "Add Custom Domain"
5. Enter: `linktree.sonalagritech.co.in`
6. Copy the CNAME record shown

**In Hostinger:**
1. Login to hPanel
2. Go to "Domains" → "sonalagritech.co.in"
3. Click "DNS / Name Servers"
4. Add CNAME Record:
   - Type: CNAME
   - Name: linktree
   - Points to: (paste Render's CNAME)
   - TTL: 14400
5. Save
6. Wait 5-30 minutes

**Done! Visit:** https://linktree.sonalagritech.co.in

---

## 💡 Important Notes

### About Free Tier:

**Render Free Tier:**
- ✅ 750 hours/month (enough for 1 app running 24/7)
- ✅ App sleeps after 15 min inactivity
- ✅ Wakes up in ~30 seconds
- ✅ Free SSL certificate
- ✅ No credit card required

**To Keep App Awake:**
- Use a service like UptimeRobot (free)
- Pings your site every 5 minutes
- Keeps it awake during business hours

### MongoDB Atlas:

- Already configured ✅
- Free tier: 512 MB storage
- Enough for thousands of images
- No credit card required

### Cloudinary:

- Already configured ✅
- Free tier: 25 GB storage
- 25 GB bandwidth/month
- Enough for most use cases

---

## 🐛 Troubleshooting

### Issue: Build failed on Render

**Solution:**
1. Check build logs
2. Ensure package.json has "start" script
3. Ensure all dependencies are in package.json

### Issue: Frontend can't connect to backend

**Solution:**
1. Check VITE_API_URL is correct
2. Ensure backend is deployed and running
3. Check backend logs for errors

### Issue: Images not uploading

**Solution:**
1. Check Cloudinary credentials
2. Check backend logs
3. Ensure MongoDB is connected

### Issue: App keeps sleeping

**Solution:**
1. Use UptimeRobot to ping every 5 minutes
2. Or upgrade to paid plan ($7/month)

---

## 🎉 Summary

**COMPLETELY FREE DEPLOYMENT:**

1. ✅ Push to GitHub (free)
2. ✅ Deploy backend on Render (free)
3. ✅ Deploy frontend on Render (free)
4. ✅ MongoDB Atlas (free)
5. ✅ Cloudinary (free)
6. ✅ SSL certificate (free)
7. ✅ Custom domain (free if you have domain)

**Total Cost: $0**
**Time: 15 minutes**
**Difficulty: Easy**

---

## 📞 Need Help?

**Render Support:**
- Docs: https://render.com/docs
- Community: https://community.render.com

**GitHub Help:**
- Docs: https://docs.github.com

**Video Tutorials:**
- Search YouTube: "Deploy Node.js app to Render"
- Search YouTube: "Deploy React app to Render"

---

**Your website will be live and 100% FREE! 🎉**

**No credit card, no hidden costs, completely free!** 🆓
