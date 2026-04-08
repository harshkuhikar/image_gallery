# 🌿 Sonal AgriTech - Portfolio Website

Production-ready portfolio website with iOS-inspired design, floating company logos, and admin panel.

## 🆓 100% FREE DEPLOYMENT

**⚡ Deploy for FREE on Render.com (No Credit Card Required!)**

**📖 Read:** [FREE_DEPLOYMENT.md](FREE_DEPLOYMENT.md) ⭐ COMPLETELY FREE

**Time:** 15 minutes | **Cost:** $0 | **Difficulty:** Easy

---

## 📚 Deployment Options

### Option 1: FREE Deployment (Recommended) ⭐
**Platform:** Render.com (100% Free)
- ✅ No credit card required
- ✅ Free SSL certificate
- ✅ 15 minutes setup
- ✅ $0 cost forever
- 📖 Guide: [FREE_DEPLOYMENT.md](FREE_DEPLOYMENT.md)

### Option 2: Hostinger VPS (Paid)
**Platform:** Hostinger ($4-10/month)
- ✅ Full control
- ✅ Better performance
- ✅ No sleep mode
- 📖 Guide: [ONE_CLICK_DEPLOY.md](ONE_CLICK_DEPLOY.md)

---

## ⚡ Quick Start (FREE - 15 Minutes)

### Step 1: Push to GitHub (5 min)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/sonal-agritech.git
git push -u origin main
```

### Step 2: Deploy Backend on Render (5 min)
1. Go to https://render.com
2. Sign up with GitHub (free)
3. New Web Service → Connect repository
4. Add environment variables
5. Deploy!

### Step 3: Deploy Frontend on Render (5 min)
1. New Static Site → Connect repository
2. Root: `client`
3. Build: `npm install --legacy-peer-deps && npm run build`
4. Publish: `client/dist`
5. Add API URL
6. Deploy!

**Done! Your site is live! 🎉**

**Full Guide:** [FREE_DEPLOYMENT.md](FREE_DEPLOYMENT.md)

---

## 🌟 Features

### 🎨 Design
- iOS-inspired aesthetic
- Floating company logos in background (rain animation)
- Smooth animations with Framer Motion
- Fully responsive (mobile/tablet/desktop)
- Clean, professional look

### 📱 Portfolio
- Company/client showcase
- Image gallery with filters
- Category-based organization
- Full-screen image viewer
- Fast loading with Cloudinary CDN

### 🔐 Admin Panel
- Secure JWT authentication
- Upload images
- Create/edit companies
- Upload company logos
- Edit button for easy updates
- Delete functionality

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **Storage**: Cloudinary
- **Deployment**: Hostinger VPS + Nginx + PM2 + SSL

---

## 🔑 Admin Access

- **URL**: https://linktree.sonalagritech.co.in/admin
- **Email**: sonalagritech@gmail.com
- **Password**: Sonal@2026

---

## 📦 Local Development

### Prerequisites
- Node.js 16+
- MongoDB Atlas account
- Cloudinary account

### Installation

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install --legacy-peer-deps

# Create .env file in root
# (See HOSTINGER_DEPLOYMENT.md for configuration)

# Start backend
npm run dev

# Start frontend (in another terminal)
cd client
npm run dev
```

Visit: http://localhost:5173

---

## 🚀 Deploy to Hostinger

Follow the complete guide: **[HOSTINGER_DEPLOYMENT.md](HOSTINGER_DEPLOYMENT.md)**

Quick steps:
1. Connect to VPS via SSH
2. Install Node.js, PM2, Nginx
3. Upload project files
4. Create .env file
5. Install dependencies & build
6. Start with PM2
7. Configure Nginx for subdomain
8. Setup SSL certificate
9. Configure DNS
10. Done! 🎉

---

## 🎯 Key Features Explained

### Floating Company Logos
- All uploaded company logos float in the background
- Rain animation effect
- More visible than before (opacity 0.12-0.27)
- 25 logos floating at once
- Smooth rotation and movement

### Edit Functionality
- Edit button on each company card
- Update company name
- Update company logo
- Update description
- No need to delete and recreate

### Admin Panel
- Upload images with preview
- Assign to companies
- Add/edit companies
- Upload company logos
- Delete images/companies
- Dashboard with statistics

---

## 📝 Environment Variables

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
NODE_ENV=production
```

---

## 🔧 Maintenance

### Update Content
1. Login to admin panel
2. Upload images or create companies
3. Changes appear instantly

### Update Code
```bash
ssh root@your-vps-ip
cd /var/www/sonal-agritech
git pull
npm install
cd client && npm install --legacy-peer-deps && npm run build && cd ..
pm2 restart sonal-agritech
```

### View Logs
```bash
pm2 logs sonal-agritech
```

---

## 🐛 Troubleshooting

See **[HOSTINGER_DEPLOYMENT.md](HOSTINGER_DEPLOYMENT.md)** for detailed troubleshooting.

Quick fixes:
- Restart app: `pm2 restart sonal-agritech`
- Check logs: `pm2 logs sonal-agritech`
- Restart Nginx: `sudo systemctl restart nginx`

---

## 📄 License

MIT License

---

## 👨‍💻 Support

For deployment help, see [HOSTINGER_DEPLOYMENT.md](HOSTINGER_DEPLOYMENT.md)

For other questions: sonalagritech@gmail.com

---

**Built with ❤️ for Sonal AgriTech**

**Live at**: https://linktree.sonalagritech.co.in 🚀

## 🌟 Features

### 🎨 iOS-Inspired Design
- **Apple Aesthetic**: Clean, minimal, professional design
- **Smooth Animations**: Framer Motion with spring physics
- **Responsive Layout**: 2-4 column grid (mobile to desktop)
- **Company Logo**: Displays your actual company logo
- **Horizontal Scrolling**: iOS-style category pills
- **Full-Screen Viewer**: Black background with iOS close button
- **Subtle Background**: Animated logo rain (very low opacity)
- **Hidden Admin Access**: Professional look, no visible admin button

### 📱 Portfolio Features
- **Company Portfolios**: YMCA, Gujarat Tourism, Arvind Smart City, etc.
- **Category Filtering**: Filter by company/project
- **Image Gallery**: Beautiful grid with rounded corners
- **Logo Support**: Upload company logos for categories
- **Fast Loading**: Cloudinary CDN with optimization
- **Touch-Friendly**: Optimized for mobile devices

### 🔐 Admin Panel
- **Secure Authentication**: JWT-based login system
- **Image Management**: Upload, edit, delete images
- **Category Management**: Create companies with logos
- **Logo Upload**: Add company logos to categories
- **Cloudinary Integration**: Automatic image optimization
- **Dashboard**: Overview of images and categories
- **Auto-Persist**: No logout on page refresh

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Framer Motion
- GSAP
- React Router
- React Hook Form
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Cloudinary
- Multer

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Cloudinary account

### 1. Clone Repository
\`\`\`bash
git clone <your-repo-url>
cd sonal-agritech-gallery
\`\`\`

### 2. Install Dependencies

#### Backend
\`\`\`bash
npm install
\`\`\`

#### Frontend
\`\`\`bash
cd client
npm install
\`\`\`

### 3. Environment Variables

#### Root `.env` (Backend)
\`\`\`env
MONGODB_URI=mongodb+srv://harshkuhikar68:Kuhikar@1122@image-gallery.mkgdpbp.mongodb.net/sonal-agritech
JWT_SECRET=your_super_secret_jwt_key_change_in_production
PORT=5000

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

ADMIN_EMAIL=admin@sonalagritech.co.in
ADMIN_PASSWORD=Admin@123
\`\`\`

#### `client/.env` (Frontend)
\`\`\`env
VITE_API_URL=http://localhost:5000/api
\`\`\`

### 4. Setup Cloudinary

1. Go to [Cloudinary](https://cloudinary.com/)
2. Create a free account
3. Get your credentials from Dashboard:
   - Cloud Name
   - API Key
   - API Secret
4. Update `.env` file with your credentials

## 🚀 Running the Application

### Development Mode

#### Start Backend (Terminal 1)
\`\`\`bash
npm run dev
\`\`\`

#### Start Frontend (Terminal 2)
\`\`\`bash
cd client
npm run dev
\`\`\`

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Production Build

#### Build Frontend
\`\`\`bash
cd client
npm run build
\`\`\`

## 🔐 Admin Access

Admin credentials:
- Email: sonalagritech@gmail.com
- Password: Sonal@2026

Access methods:
1. Click top-left corner of homepage (hidden)
2. Visit `/admin` directly
3. Bookmark the admin URL

**⚠️ IMPORTANT**: Change JWT_SECRET in production!

## 📱 Pages

### User Pages
- **Portfolio** (`/`): Single-page iOS-style portfolio with all features

### Admin Pages
- **Login** (`/admin`): Admin authentication
- **Dashboard** (`/admin/dashboard`): Image & category management with logo upload

## 🎨 Customization

### Colors
Edit `client/tailwind.config.js`:
\`\`\`javascript
colors: {
  primary: {
    500: '#2E7D32', // Change this
  },
}
\`\`\`

### WhatsApp Number
Edit `client/src/components/WhatsAppButton.jsx`:
\`\`\`javascript
const phoneNumber = '919XXXXXXXXX'; // Your number
\`\`\`

### Contact Information
Edit `client/src/components/Footer.jsx` and `client/src/pages/Contact.jsx`

## 🌐 Deployment to Hostinger

### Complete Deployment Package Included! 🎉

I've created comprehensive deployment guides for Hostinger:

1. **[START_HERE.md](START_HERE.md)** - Overview and quick links
2. **[PRE_DEPLOYMENT_CHECKLIST.md](PRE_DEPLOYMENT_CHECKLIST.md)** - Complete checklist
3. **[DEPLOYMENT_QUICK_START.md](DEPLOYMENT_QUICK_START.md)** - 30-minute deployment guide
4. **[HOSTINGER_DEPLOYMENT_GUIDE.md](HOSTINGER_DEPLOYMENT_GUIDE.md)** - Full documentation
5. **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical details
6. **[DEPLOYMENT_FLOWCHART.md](DEPLOYMENT_FLOWCHART.md)** - Visual guide
7. **[DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md)** - Complete summary

### Quick Deployment (VPS)

```bash
# 1. Connect to VPS
ssh root@your-vps-ip

# 2. Install Node.js & PM2
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2

# 3. Upload project & setup
cd /var/www/sonal-agritech
npm install
cd client && npm install --legacy-peer-deps && npm run build && cd ..

# 4. Start with PM2
pm2 start server/index.js --name sonal-agritech
pm2 save && pm2 startup

# 5. Configure Nginx & SSL
# See DEPLOYMENT_QUICK_START.md for details
```

**Full guide:** [DEPLOYMENT_QUICK_START.md](DEPLOYMENT_QUICK_START.md)

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Images
- `GET /api/images` - Get all images (with filters)
- `POST /api/images` - Upload image (protected)
- `PUT /api/images/:id` - Update image (protected)
- `DELETE /api/images/:id` - Delete image (protected)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (protected)
- `DELETE /api/categories/:id` - Delete category (protected)

## 🔒 Security

- JWT authentication for admin routes
- Password hashing with bcrypt
- Protected API endpoints
- Input validation
- Secure file uploads

## 📊 Database Schema

### User
\`\`\`javascript
{
  email: String,
  password: String (hashed),
  role: String,
  timestamps: true
}
\`\`\`

### Image
\`\`\`javascript
{
  title: String,
  description: String,
  imageUrl: String,
  publicId: String,
  category: ObjectId (ref: Category),
  tags: [String],
  timestamps: true
}
\`\`\`

### Category
\`\`\`javascript
{
  name: String,
  slug: String,
  description: String,
  logoUrl: String,        // Cloudinary URL
  logoPublicId: String,   // For deletion
  timestamps: true
}
\`\`\`

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Check your IP whitelist in MongoDB Atlas
- Verify connection string format
- Ensure network access is configured

### Cloudinary Upload Fails
- Verify API credentials
- Check file size limits
- Ensure proper file format

### CORS Errors
- Update CORS settings in `server/index.js`
- Add your frontend URL to allowed origins

## 📚 Documentation

- **[START_HERE.md](START_HERE.md)** - Start here for deployment
- **[IOS_DESIGN.md](IOS_DESIGN.md)** - Design documentation
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture
- **[DEPLOYMENT_QUICK_START.md](DEPLOYMENT_QUICK_START.md)** - Quick deployment
- **[HOSTINGER_DEPLOYMENT_GUIDE.md](HOSTINGER_DEPLOYMENT_GUIDE.md)** - Full guide
- **[PRE_DEPLOYMENT_CHECKLIST.md](PRE_DEPLOYMENT_CHECKLIST.md)** - Checklist
- **[DEPLOYMENT_FLOWCHART.md](DEPLOYMENT_FLOWCHART.md)** - Visual guide
- **[DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md)** - Summary

## 🎯 Project Status

✅ **Production Ready**
- iOS-inspired design implemented
- All features working
- MongoDB Atlas configured
- Cloudinary integrated
- Admin panel functional
- Ready for Hostinger deployment

## 📄 License

MIT License - feel free to use for your projects

## 👨‍💻 Support

For deployment help, see the comprehensive guides in this repository.

For other questions, contact: sonalagritech@gmail.com

---

Built with ❤️ for Sonal AgriTech | Ready to deploy to Hostinger 🚀
