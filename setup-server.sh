#!/bin/bash

# ============================================
# AUTOMATED SERVER SETUP SCRIPT
# Run this ONCE on your VPS
# ============================================

echo "🚀 Starting automated server setup..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Update system
echo -e "${BLUE}📦 Updating system...${NC}"
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
echo -e "${BLUE}📦 Installing Node.js 18...${NC}"
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js
node --version
npm --version

# Install PM2
echo -e "${BLUE}📦 Installing PM2...${NC}"
sudo npm install -g pm2

# Install Nginx
echo -e "${BLUE}📦 Installing Nginx...${NC}"
sudo apt install nginx -y

# Install Certbot
echo -e "${BLUE}📦 Installing Certbot...${NC}"
sudo apt install certbot python3-certbot-nginx -y

# Install Git
echo -e "${BLUE}📦 Installing Git...${NC}"
sudo apt install git -y

# Setup firewall
echo -e "${BLUE}🔒 Setting up firewall...${NC}"
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
echo "y" | sudo ufw enable

# Create project directory
echo -e "${BLUE}📁 Creating project directory...${NC}"
sudo mkdir -p /var/www/sonal-agritech
sudo chown -R $USER:$USER /var/www/sonal-agritech

echo ""
echo -e "${GREEN}✅ Server setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Upload your project to /var/www/sonal-agritech"
echo "2. Run: cd /var/www/sonal-agritech && ./deploy.sh"
echo ""
