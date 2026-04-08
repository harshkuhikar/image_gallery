#!/bin/bash

# ============================================
# QUICK SSL SETUP
# Run this after DNS is configured
# ============================================

echo "🔒 Setting up SSL certificate..."
echo ""

DOMAIN="linktree.sonalagritech.co.in"

# Check if domain resolves
echo "Checking DNS..."
if ! ping -c 1 $DOMAIN &> /dev/null; then
    echo "⚠️  Warning: Domain not resolving yet"
    echo "Please wait for DNS propagation (5-30 minutes)"
    echo "Then run this script again"
    exit 1
fi

# Get SSL certificate
sudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email sonalagritech@gmail.com --redirect

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SSL certificate installed!"
    echo ""
    echo "Your website is now live at:"
    echo "https://$DOMAIN"
    echo ""
    echo "Admin panel:"
    echo "https://$DOMAIN/admin"
    echo ""
else
    echo ""
    echo "❌ SSL setup failed"
    echo "Please check:"
    echo "1. DNS is configured correctly"
    echo "2. Domain is pointing to this server"
    echo "3. Ports 80 and 443 are open"
    echo ""
fi
