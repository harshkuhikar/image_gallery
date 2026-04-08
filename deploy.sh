#!/bin/bash

echo "🚀 Starting deployment process..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Are you in the project root?${NC}"
    exit 1
fi

# Pull latest changes (if using git)
if [ -d ".git" ]; then
    echo -e "${BLUE}📥 Pulling latest changes...${NC}"
    git pull
    echo ""
fi

# Install backend dependencies
echo -e "${BLUE}📦 Installing backend dependencies...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Backend dependency installation failed${NC}"
    exit 1
fi
echo ""

# Install frontend dependencies
echo -e "${BLUE}📦 Installing frontend dependencies...${NC}"
cd client
npm install --legacy-peer-deps
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Frontend dependency installation failed${NC}"
    exit 1
fi
echo ""

# Build frontend
echo -e "${BLUE}🏗️  Building frontend...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Frontend build failed${NC}"
    exit 1
fi
cd ..
echo ""

# Check if PM2 is installed
if command -v pm2 &> /dev/null; then
    echo -e "${BLUE}♻️  Restarting application with PM2...${NC}"
    pm2 restart sonal-agritech || pm2 start server/index.js --name sonal-agritech
    pm2 save
    echo ""
    
    echo -e "${GREEN}✅ Deployment complete!${NC}"
    echo ""
    echo -e "${BLUE}📊 Application status:${NC}"
    pm2 status
    echo ""
    echo -e "${BLUE}📝 Recent logs:${NC}"
    pm2 logs sonal-agritech --lines 20 --nostream
else
    echo -e "${BLUE}⚠️  PM2 not found. Starting with Node.js...${NC}"
    echo -e "${BLUE}💡 For production, install PM2: npm install -g pm2${NC}"
    echo ""
    echo -e "${GREEN}✅ Build complete! Start server with: npm start${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Deployment finished successfully!${NC}"
