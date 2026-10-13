#!/bin/bash

# Exit script if any command fails
set -e

echo "=================================================="
echo "    Initial VPS Setup for Portfolio Deployment    "
echo "=================================================="

# 1. Update system
echo "[1/4] Updating system packages..."
sudo apt-get update && sudo apt-get upgrade -y

# 2. Install Docker
echo "[2/4] Installing Docker and Docker Compose..."
# Remove old versions
sudo apt-get remove -y docker docker-engine docker.io containerd runc || true

# Install dependencies
sudo apt-get install -y ca-certificates curl gnupg lsb-release

# Add Docker’s official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor --yes -o /etc/apt/keyrings/docker.gpg

# Set up the repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 3. Setup Deployment Directory
echo "[3/4] Preparing deployment directory..."
sudo mkdir -p /opt/portfolio
# Change ownership to the current user (usually ubuntu or root)
sudo chown -R $USER:$USER /opt/portfolio

# 4. Setup SSH for GitHub Actions
echo "[4/4] Setting up instructions for GitHub Actions..."
echo ""
echo "=================================================="
echo "                   SUCCESS!                       "
echo "=================================================="
echo "Your VPS is now ready to run Docker containers."
echo ""
echo "To finish the CI/CD setup, you need to add these SECRETS to your GitHub Repository (Settings -> Secrets and variables -> Actions):"
echo ""
echo "1. VPS_HOST : $(curl -s ifconfig.me)"
echo "2. VPS_USERNAME : $USER"
echo "3. VPS_SSH_KEY : (Paste the private SSH key that allows access to this server)"
echo "4. DB_PASSWORD : (Create a strong password for your PostgreSQL database)"
echo "5. DOWNLOAD_PASSWORD : (The password people will use to download your CV)"
echo "6. DOMAIN : (Your domain name, e.g., michael-portmann.ch)"
echo "7. ACME_EMAIL : (Your email address for Let's Encrypt SSL certificates)"
echo ""
echo "Make sure your domain's DNS A-Record points to this server's IP address: $(curl -s ifconfig.me)"
echo "Once these are set up, pushing to the 'main' branch will automatically deploy your website over HTTPS."
