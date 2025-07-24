#!/bin/bash

# ============================== Comments ==============================
### Name : initAppScript.sh
### Version : 1.0 
### Author : Colin Jung (cwjung123@gmail.com)
### This file is for System initialization and source initial backEnd application deployment.
#
### Package and library  
# - Docker & Docker Compose

### Pre-requisites
# vi .env_app 
# setup environment variables for the application
# -DB_HOST=140.---.---.11
# DB_PORT=5432
# DB_USERNAME=username
# DB_PASSWORD=password
# DB_DATABASE=dbname

### Run shell commands :   
# $ chmod 755 initAppScript.sh
# $ ./initAppScript.sh
#
### Check Basic Running 
# 1) Shell  : $ curl http://localhost 
# 2) Web-Brower : http://Server-PublicIP 

### Check Util 
# 1) Health Check : http://Server-PublicIP/health
# 2) IP : http://Server-PublicIP/ip
# 3) Time : http://Server-PublicIP/time

### Process Check 
# Show logs : $ cd ~/appbase  &&  sudo docker compose logs -f 
# ========================================================================

# Start Message  
echo "============ Start of Settting Environment =============="

# Declare variables
HOME=/home/ubuntu
SRCHOME=/home/ubuntu/appbase  

# Init update library
cd $HOME
sudo apt update -y
sleep 1

# Setup firewall port  
sudo iptables -I INPUT -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo iptables -I INPUT -m state --state NEW -p tcp --dport 3000 -j ACCEPT

sudo apt install iptables-persistent
sudo netfilter-persistent save
sudo netfilter-persistent reload
sleep 1

######### STEP-1. Git Sunching #########
# Cloning source
echo "============ Cloning Source =============="
cd $HOME
git clone https://github.com/GaussJung/ssh_remote_docker
sleep 1
 
# Setup Docker and Docker Compose
echo "============ Setting up Docker =============="
sudo apt update -y
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo apt-get install -y docker-compose
rm get-docker.sh
sleep 1
  
echo "============ Start of Settting Environment =============="

# Declare variables
HOME=/home/ubuntu
SRCHOME=/home/ubuntu/ssh_remote_docker
APPHOME=/home/ubuntu/appbase
 
# Copying Appbase Directory
echo "============ Copying Appbase Directory =============="
cd $HOME
cp -r $SRCHOME/resource/appbase $APPHOME
cp -r ~/.env_app $APPHOME/.env_app
sleep 1

echo "============ Create Directory for application =============="
cd $APPHOME
cp -r $SRCHOME  $APPHOME/app
cp -r $APPHOME/app/.env  $APPHOME/.env
mkdir  $APPHOME/node_readonly_modules
sleep 1

# Run Docker Compose to start the application
sudo docker compose up -d

      