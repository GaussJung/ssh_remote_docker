#!/bin/bash

# ============================== Comments ==============================
### Name : initBasicScript.sh
### Version : 1.0 
### Author : Colin Jung (cwjung123@gmail.com)
### This file is for System initialization and source initial deployment.(Only 1 Time)
#
### Package and library  
# - Language : Node.js 
# - Framework : Nest.js 
# - Package Manager : pnpm
# - Process Manager : pm2 
#
### Setup
# - If needed, edit library version 
# - Check and modify git repository name. 
# - SRCHOME can be changed according to git repository name. 
#
### Run shell commands :   
# $ chmod 755 initBasicScrpit.sh 
# $ ./initBasicScrpit.sh
#
### Check Running 
# 1) Shell  : $ curl http://localhost:3000
# 2) Web-Brower : http://Server-PublicIP:3000
#
### Process Check 
# Show logs : $ pm2 logs 
# Show status  : $ pm2 status  
# ========================================================================

# Start Message  
echo "============ Start of Settting Environment =============="

# Declare variables
HOME=/home/ubuntu
SRCHOME=/home/ubuntu/ssh_remote_docker

# Init update library
cd $HOME
sudo apt update -y
sleep 1

# Setup firewall port  
sudo iptables -I INPUT -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo iptables -I INPUT -m state --state NEW -p tcp --dport 3000 -j ACCEPT
sudo iptables -I INPUT -m state --state NEW -p tcp --dport 5000 -j ACCEPT

sudo apt install iptables-persistent
sudo netfilter-persistent save
sudo netfilter-persistent reload
sleep 1

# Install Node.js and pnpm (package manager) and pm2 (process manger)
curl -sL https://deb.nodesource.com/setup_22.x | sudo -E bash --  
sudo apt-get install -y nodejs
sudo npm install pnpm -g
sudo npm install pm2 -g  
sleep 1

# Cloning source
echo "============ Cloning Source =============="
cd $HOME
git clone https://github.com/GaussJung/ssh_remote_docker
sleep 1

# Install dependicies
cd $SRCHOME
pnpm install
sleep 1

# Build sources (After build source, 'dist' folder is created )
pnpm build
sleep 1

# Start PM2 (ecosystem.config.js is included in the cloned source)
pm2 start ecosystem.config.js
  
# Add logfile
cd $HOME
log_file="InitialCreation_At_$(date '+%Y%m%d_%H%M%S').log"
ls -al >> $log_file

# Final Message  
echo "============ End of Source Init Deployment =============="