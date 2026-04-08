# 🚀 ONE-CLICK DEPLOYMENT GUIDE

## Easiest Way to Deploy - Using Hostinger File Manager

---

## 📋 Prerequisites

1. Hostinger VPS account
2. Your project folder (this folder)
3. 15 minutes of time

---

## ⚡ Method 1: Upload & Run (Easiest - 3 Steps)

### Step 1: Upload Project (5 minutes)

**Using Hostinger File Manager:**

1. Login to Hostinger hPanel
2. Go to "VPS" → Your VPS → "File Manager"
3. Navigate to `/var/www/`
4. Click "Upload" button
5. **Compress your project folder first:**
   - On Windows: Right-click project folder → "Send to" → "Compressed (zipped) folder"
   - Name it: `sonal-agritech.zip`
6. Upload `sonal-agritech.zip`
7. After upload, right-click → "Extract"
8. Rename extracted folder to `sonal-agritech`

**OR Using FTP (FileZilla):**

1. Download FileZilla: https://filezilla-project.org/
2. Connect to your VPS:
   - Host: Your VPS IP
   - Username: root
   - Password: Your VPS password
   - Port: 22
3. Navigate to `/var/www/`
4. Drag and drop your project folder
5. Rename to `sonal-agritech`

### Step 2: Run Setup Script (5 minutes)

**In Hostinger hPanel:**

1. Go to "VPS" → "Browser SSH Terminal"
2. Copy and paste these commands:

```bash
# Go to project directory
cd /var/www/sonal-agritech

# Make scripts executable
chmod +x setup-server.sh auto-deploy.sh quick-ssl.sh

# Run server setup (ONLY FIRST TIME)
./setup-server.sh

# Run deployment
./auto-deploy.sh
```

3. Wait for completion (shows ✅ when done)

### Step 3: Configure DNS & SSL (5 minutes)

**Configure DNS:**

1. In Hostinger hPanel → "Domains" → "sonalagritech.co.in"
2. Click "DNS / Name Servers"
3. Add A Record:
   - Type: `A`
   - Name: `linktree`
   - Points to: `YOUR_VPS_IP` (shown in deployment output)
   - TTL: `14400`
4. Click "Add Record"
5. Wait 5-30 minutes

**Setup SSL (after DNS propagates):**

```bash
cd /var/www/sonal-agritech
./quick-ssl.sh
```

**Done! Visit:** https://linktree.sonalagritech.co.in 🎉

---

## ⚡ Method 2: Using Hostinger's One-Click Apps (Alternative)

### If Your Hostinger Has Node.js App Manager:

1. **Login to hPanel**
2. **Go to:** "VPS" → "Applications"
3. **Click:** "Create Application"
4. **Select:** Node.js
5. **Configure:**
   - Application root: `/var/www/sonal-agritech`
   - Application URL: `linktree.sonalagritech.co.in`
   - Application startup file: `server/index.js`
   - Node.js version: 18.x
6. **Upload your project** to `/var/www/sonal-agritech`
7. **In SSH Terminal:**

```bash
cd /var/www/sonal-agritech

# Create .env file
cat > .env << 'EOF'
MONGODB_URI=mongodb+srv://harshkuhikar68:Kuhikar%401122@image-gallery.mkgdpbp.mongodb.net/sonal-agritech
JWT_SECRET=sonal_agritech_super_secret_key_2024_production
PORT=5000
CLOUDINARY_CLOUD_NAME=dqzbrs69t
CLOUDINARY_API_KEY=228621393946327
CLOUDINARY_API_SECRET=lB8c1rtuOJ95bX7xgI4JBGKba7s
ADMIN_EMAIL=sonalagritech@gmail.com
ADMIN_PASSWORD=Sonal@2026
NODE_ENV=production
EOF

# Install and build
npm install
cd client && npm install --legacy-peer-deps && npm run build && cd ..
```

8. **Start application** in hPanel
9. **Configure DNS** (same as Method 1)
10. **Setup SSL** in hPanel SSL section

---

## 🎯 Method 3: GitHub + Automatic Deployment (Most Professional)

### Setup Once, Deploy Anytime:

**Step 1: Push to GitHub**

```bash
# In your local project folder
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/sonal-agritech.git
git push -u origin main
```

**Step 2: Setup on Server (One Time)**

```bash
# SSH into your VPS
ssh root@YOUR_VPS_IP

# Run setup
cd /var/www
git clone https://github.com/YOUR_USERNAME/sonal-agritech.git
cd sonal-agritech
chmod +x setup-server.sh auto-deploy.sh
./setup-server.sh
./auto-deploy.sh
```

**Step 3: Future Updates (1 Command)**

```bash
# On your server
cd /var/www/sonal-agritech
git pull && ./auto-deploy.sh
```

---

## 📊 Comparison of Methods

| Method | Difficulty | Time | Best For |
|--------|-----------|------|----------|
| Method 1: Upload & Run | ⭐ Easy | 15 min | First-time users |
| Method 2: One-Click Apps | ⭐⭐ Medium | 20 min | Hostinger app users |
| Method 3: GitHub | ⭐⭐⭐ Advanced | 25 min | Developers |

---

## 🎯 Recommended: Method 1 (Upload & Run)

**Why?**
- Easiest for beginners
- No Git knowledge needed
- Works with any Hostinger VPS
- Automated scripts do everything
- Just upload and run 3 commands

**Total Time:** 15 minutes
**Difficulty:** Very Easy
**Success Rate:** 99%

---

## 📝 What the Scripts Do

### `setup-server.sh` (Run once)
- Installs Node.js 18
- Installs PM2 (process manager)
- Installs Nginx (web server)
- Installs Certbot (SSL)
- Configures firewall
- Creates project directory

### `auto-deploy.sh` (Run every time)
- Creates .env file automatically
- Installs all dependencies
- Builds frontend
- Configures Nginx
- Starts application with PM2
- Shows next steps

### `quick-ssl.sh` (Run after DNS)
- Checks DNS propagation
- Installs SSL certificate
- Configures HTTPS
- Shows your live URLs

---

## ✅ After Deployment Checklist

Visit these URLs to verify:

- [ ] Homepage: https://linktree.sonalagritech.co.in
- [ ] Admin: https://linktree.sonalagritech.co.in/admin
- [ ] Login with: sonalagritech@gmail.com / Sonal@2026
- [ ] Upload a test image
- [ ] Create a test company
- [ ] Upload company logo
- [ ] Check floating logos in background
- [ ] Test edit functionality
- [ ] Test on mobile

---

## 🔧 Quick Commands Reference

```bash
# View application logs
pm2 logs sonal-agritech

# Restart application
pm2 restart sonal-agritech

# Check status
pm2 status

# Update application
cd /var/www/sonal-agritech
git pull  # if using Git
./auto-deploy.sh

# View Nginx logs
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

---

## 🐛 Troubleshooting

### Issue: Upload failed
**Solution:** 
- Compress folder first (zip)
- Upload zip file
- Extract on server

### Issue: Scripts not running
**Solution:**
```bash
chmod +x setup-server.sh auto-deploy.sh quick-ssl.sh
```

### Issue: Website not loading
**Solution:**
```bash
pm2 restart sonal-agritech
sudo systemctl restart nginx
```

### Issue: SSL not working
**Solution:**
- Wait for DNS propagation (30 minutes)
- Run `./quick-ssl.sh` again

---

## 💡 Pro Tips

1. **Compress before upload** - Faster upload, single file
2. **Use SSH Terminal** - Easier than typing commands
3. **Bookmark admin URL** - Quick access
4. **Save VPS IP** - For future reference
5. **Test on mobile** - Most users are mobile

---

## 🎉 Success!

After following Method 1, your website will be live at:

**Homepage:** https://linktree.sonalagritech.co.in
**Admin:** https://linktree.sonalagritech.co.in/admin

**Features Working:**
- ✅ Floating company logos (25 logos)
- ✅ Edit functionality
- ✅ Image upload
- ✅ iOS-inspired design
- ✅ Fully responsive
- ✅ HTTPS/SSL

---

## 📞 Need Help?

1. Check script output for errors
2. Run: `pm2 logs sonal-agritech`
3. Contact Hostinger support
4. Check HOSTINGER_DEPLOYMENT.md for detailed guide

---

**Total Time: 15 minutes**
**Difficulty: Very Easy**
**Result: Professional website live!** 🚀
