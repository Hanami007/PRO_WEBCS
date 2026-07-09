#!/bin/bash
set -e

echo "Starting Docker and Jenkins Setup..."

echo "Installing dependencies..."
# Add Docker's official GPG key:
sudo apt update
sudo apt install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Signed-By: /etc/apt/keyrings/docker.asc
EOF

sudo apt update

echo "Installing Docker packages..."
# Install the Docker packages:
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo "Enabling and starting Docker service..."
# This ensures Docker starts now AND on every future reboot
sudo systemctl enable --now docker.service
sudo systemctl enable --now containerd.service

# Adds current user to docker group
echo "Configuring user permissions..."
if [ -n "$SUDO_USER" ]; then
    REAL_USER=$SUDO_USER
else
    REAL_USER=$USER
fi

# allow docker commands without sudo
sudo usermod -aG docker $REAL_USER

echo "Preparing Traefik Let's Encrypt storage..."
mkdir -p letsencrypt
touch letsencrypt/acme.json
chmod 600 letsencrypt/acme.json

echo "----------------------------------------------------"
echo "Verifying Installation..."
echo "----------------------------------------------------"
if [ -x "$(command -v docker)" ]; then
    echo "SUCCESS: Docker is installed."
    docker --version
    docker compose version
else
    echo "ERROR: Docker installation failed."
    exit 1
fi

echo "============================================="
echo "   SETUP COMPLETE!"
echo "============================================="
echo "You MUST log out or reboot before using docker without sudo."