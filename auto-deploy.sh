#!/bin/bash

# ============================================
# AUTOMATED DEPLOYMENT SCRIPT
# Run this after uploading project files
# ============================================

echo "🚀 Starting automated deployment..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration
PROJECT_DIR="/var/www/sonal-agritech"
DOMAIN="linktree.sonalagritech.co.in"
APP_NAME="sonal-agritech"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found${NC}"
    echo "Please run this script from the project root directory"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo -e "${BLUE}📝 Creating .env file...${NC}"
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
    echo -e "${GREEN}✅ .env file created${NC}"
fi

# Install backend dependencies
echo -e "${BLUE}📦 Installing backend dependencies...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Backend installation failed${NC}"
    exit 1
fi

# Install frontend dependencies
echo -e "${BLUE}📦 Installing frontend dependencies...${NC}"
cd client
npm install --legacy-peer-deps
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Frontend installation failed${NC}"
    exit 1
fi

# Build frontend
echo -e "${BLUE}🏗️  Building frontend...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Frontend build failed${NC}"
    exit 1
fi
cd ..

# Configure Nginx
echo -e "${BLUE}⚙️  Configuring Nginx...${NC}"
sudo tee /etc/nginx/sites-available/$DOMAIN > /dev/null << 'EOF'
server {
    listen 80;
    server_name linktree.sonalagritech.co.in;
    client_max_body_size 50M;

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

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
}
EOF

# Enable Nginx site
if [ ! -L "/etc/nginx/sites-enabled/$DOMAIN" ]; then
    sudo ln -s /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
fi

# Test Nginx configuration
sudo nginx -t
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Nginx configuration error${NC}"
    exit 1
fi

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx

# Start/Restart application with PM2
echo -e "${BLUE}🚀 Starting application...${NC}"
if pm2 list | grep -q $APP_NAME; then
    pm2 restart $APP_NAME
else
    pm2 start server/index.js --name $APP_NAME
fi

pm2 save
pm2 startup | tail -n 1 | sudo bash

# Check PM2 status
pm2 status

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo "1. Configure DNS in Hostinger:"
echo "   Type: A"
echo "   Name: linktree"
echo "   Points to: $(curl -s ifconfig.me)"
echo "   TTL: 14400"
echo ""
echo "2. Wait 5-30 minutes for DNS propagation"
echo ""
echo "3. Setup SSL certificate:"
echo "   sudo certbot --nginx -d $DOMAIN"
echo ""
echo "4. Visit: http://$DOMAIN"
echo "   Admin: http://$DOMAIN/admin"
echo ""
echo -e "${BLUE}📊 View logs: pm2 logs $APP_NAME${NC}"
echo -e "${BLUE}🔄 Restart: pm2 restart $APP_NAME${NC}"
echo ""
