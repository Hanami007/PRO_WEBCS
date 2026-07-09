#!/bin/bash
# Exit immediately if any command fails
set -e

echo "Installing Docker"
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

sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# This ensures Docker starts now AND on every future reboot
sudo systemctl enable --now docker.service
sudo systemctl enable --now containerd.service

echo "Swarm Initialization"
# sudo is required here because the group change hasn't taken effect in this shell yet
sudo docker swarm init 2>/dev/null || echo "Swarm already active."