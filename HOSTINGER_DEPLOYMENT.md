# 🚀 Deploy to Hostinger - linktree.sonalagritech.co.in

## Complete Step-by-Step Guide

---

## 📋 What You're Deploying

- **Subdomain**: linktree.sonalagritech.co.in
- **Project**: Sonal AgriTech Portfolio with iOS Design
- **Features**: Company logos floating in background, edit functionality, image gallery

---

## ⚡ Quick Deployment (30 Minutes)

### Step 1: Connect to Your Hostinger VPS

```bash
ssh root@your-vps-ip
# Enter your password when prompted
```

### Step 2: Install Required Software

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Install Git (if using Git)
sudo apt install git -y
```

### Step 3: Upload Your Project

**Option A: Using Git (Recommended)**
```bash
cd /var/www
git clone https://github.com/yourusername/your-repo.git sonal-agritech
cd sonal-agritech
```

**Option B: Using FTP/SFTP**
- Use FileZilla or WinSCP
- Connect to your VPS
- Upload entire project folder to `/var/www/sonal-agritech`

### Step 4: Create Environment File

```bash
cd /var/www/sonal-agritech
nano .env
```

Paste this configuration:

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://harshkuhikar68:Kuhikar%401122@image-gallery.mkgdpbp.mongodb.net/sonal-agritech

# JWT Secret (IMPORTANT: Change this!)
JWT_SECRET=sonal_agritech_super_secret_key_2024_production

# Server Port
PORT=5000

# Cloudinary
CLOUDINARY_CLOUD_NAME=dqzbrs69t
CLOUDINARY_API_KEY=228621393946327
CLOUDINARY_API_SECRET=lB8c1rtuOJ95bX7xgI4JBGKba7s

# Admin Credentials
ADMIN_EMAIL=sonalagritech@gmail.com
ADMIN_PASSWORD=Sonal@2026

# Environment
NODE_ENV=production
```

Save: Press `Ctrl+X`, then `Y`, then `Enter`

### Step 5: Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install --legacy-peer-deps

# Build frontend
npm run build

# Go back to root
cd ..
```

### Step 6: Start Application with PM2

```bash
# Start the server
pm2 start server/index.js --name sonal-agritech

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Copy and run the command it gives you

# Check status
pm2 status
pm2 logs sonal-agritech --lines 50
```

### Step 7: Configure Nginx for Subdomain

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/linktree.sonalagritech
```

Paste this configuration:

```nginx
server {
    listen 80;
    server_name linktree.sonalagritech.co.in;

    # Increase upload size for images
    client_max_body_size 50M;

    # Proxy to Node.js
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
}
```

Save: `Ctrl+X`, `Y`, `Enter`

Enable the site:

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/linktree.sonalagritech /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Enable Nginx on boot
sudo systemctl enable nginx
```

### Step 8: Setup SSL Certificate (HTTPS)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate for your subdomain
sudo certbot --nginx -d linktree.sonalagritech.co.in

# Follow the prompts:
# - Enter your email
# - Agree to terms
# - Choose option 2 (redirect HTTP to HTTPS)

# Test auto-renewal
sudo certbot renew --dry-run
```

### Step 9: Configure DNS in Hostinger

1. Login to Hostinger hPanel
2. Go to "Domains" → "sonalagritech.co.in"
3. Click "DNS / Name Servers"
4. Add/Update these records:

```
Type: A
Name: linktree
Points to: YOUR_VPS_IP_ADDRESS
TTL: 14400
```

5. Save changes
6. Wait 5-30 minutes for DNS propagation

### Step 10: Configure MongoDB Atlas

1. Login to MongoDB Atlas
2. Go to "Network Access"
3. Click "Add IP Address"
4. Add your VPS IP OR use `0.0.0.0/0` (allow all)
5. Save

---

## ✅ Verify Deployment

### Test Your Website

Visit: `https://linktree.sonalagritech.co.in`

You should see:
- ✅ iOS-style portfolio homepage
- ✅ Company logo at top
- ✅ Floating company logos in background (rain animation)
- ✅ Category filters working
- ✅ Images loading from Cloudinary
- ✅ Smooth animations

### Test Admin Panel

Visit: `https://linktree.sonalagritech.co.in/admin`

Login with:
- Email: `sonalagritech@gmail.com`
- Password: `Sonal@2026`

Test:
- ✅ Login works
- ✅ Can upload images
- ✅ Can create/edit companies
- ✅ Can upload company logos
- ✅ Edit button works for companies
- ✅ Logos appear in background rain

---

## 🔧 Maintenance Commands

### View Logs
```bash
# View application logs
pm2 logs sonal-agritech

# View last 100 lines
pm2 logs sonal-agritech --lines 100

# View Nginx logs
sudo tail -f /var/log/nginx/error.log
```

### Restart Application
```bash
# Restart app
pm2 restart sonal-agritech

# Restart Nginx
sudo systemctl restart nginx
```

### Update Application
```bash
cd /var/www/sonal-agritech

# Pull latest changes (if using Git)
git pull

# Install dependencies
npm install
cd client && npm install --legacy-peer-deps && cd ..

# Rebuild frontend
cd client && npm run build && cd ..

# Restart
pm2 restart sonal-agritech
```

### Check Status
```bash
# Check PM2 status
pm2 status

# Check Nginx status
sudo systemctl status nginx

# Check disk space
df -h

# Check memory
free -h
```

---

## 🐛 Troubleshooting

### Issue: Website not loading

```bash
# Check PM2 status
pm2 status

# If stopped, restart
pm2 restart sonal-agritech

# Check logs for errors
pm2 logs sonal-agritech --lines 50
```

### Issue: 502 Bad Gateway

```bash
# Restart both services
pm2 restart sonal-agritech
sudo systemctl restart nginx

# Check if Node.js is running
pm2 status

# Check Nginx configuration
sudo nginx -t
```

### Issue: Images not uploading

1. Check Cloudinary credentials in `.env`
2. Check file size limit in Nginx config (`client_max_body_size 50M;`)
3. Check PM2 logs: `pm2 logs sonal-agritech`

### Issue: Can't connect to MongoDB

1. Go to MongoDB Atlas
2. Network Access → Add IP Address
3. Add your VPS IP or `0.0.0.0/0`
4. Restart app: `pm2 restart sonal-agritech`

### Issue: SSL certificate not working

```bash
# Try getting certificate again
sudo certbot --nginx -d linktree.sonalagritech.co.in

# Check certificate status
sudo certbot certificates
```

### Issue: DNS not resolving

1. Check DNS records in Hostinger
2. Verify A record points to correct VPS IP
3. Wait 30 minutes for propagation
4. Test: `ping linktree.sonalagritech.co.in`

---

## 🔒 Security Best Practices

### 1. Setup Firewall

```bash
# Install UFW
sudo apt install ufw

# Allow SSH
sudo ufw allow 22

# Allow HTTP/HTTPS
sudo ufw allow 80
sudo ufw allow 443

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

### 2. Change Default Passwords

Update `.env` file:
```env
JWT_SECRET=your_new_super_secure_random_string_here
ADMIN_PASSWORD=YourNewSecurePassword123!
```

Then restart:
```bash
pm2 restart sonal-agritech
```

### 3. Regular Updates

```bash
# Update system weekly
sudo apt update && sudo apt upgrade -y

# Update Node.js packages monthly
cd /var/www/sonal-agritech
npm update
```

---

## 📊 Performance Optimization

### Enable Caching in Nginx

Edit Nginx config:
```bash
sudo nano /etc/nginx/sites-available/linktree.sonalagritech
```

Add inside `server` block:
```nginx
# Cache static files
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

Restart Nginx:
```bash
sudo systemctl restart nginx
```

---

## 🎉 Your Website is Live!

### URLs:
- **Homepage**: https://linktree.sonalagritech.co.in
- **Admin Panel**: https://linktree.sonalagritech.co.in/admin

### Features Working:
- ✅ Floating company logos in background
- ✅ Edit button for companies
- ✅ Upload/edit company logos
- ✅ Image gallery with filters
- ✅ iOS-inspired design
- ✅ Fully responsive
- ✅ HTTPS/SSL enabled

### Admin Access:
- Email: sonalagritech@gmail.com
- Password: Sonal@2026

---

## 📞 Need Help?

### Quick Fixes:
1. Restart app: `pm2 restart sonal-agritech`
2. Check logs: `pm2 logs sonal-agritech`
3. Restart Nginx: `sudo systemctl restart nginx`

### Support:
- Hostinger Support: https://www.hostinger.com/contact
- MongoDB Atlas: https://www.mongodb.com/support
- Cloudinary: https://support.cloudinary.com/

---

**Congratulations! Your portfolio is now live! 🎉**

Visit: **https://linktree.sonalagritech.co.in**
