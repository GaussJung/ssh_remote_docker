#!/bin/bash
 
# ============================== Comments ==============================
### Name : srcBasicDeploy.sh
### Version : 1.0 
### Author : Colin Jung (cwjung123@gmail.com)
### This file is for source deployment (N-Times whenever source changed)
# 
### Setup
# - Check and modify git repository name. 
# - SRCHOME can be changed according to git repository name. 
#
### Run shell commands :  
# $ chmod 755 srcBasicScrpit.sh 
# $ ./srcBasicScrpit.sh
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
echo "============ Start of Source Deployment =============="

# Declare variables
HOME=/home/ubuntu
SRCHOME=/home/ubuntu/ssh_remote_docker

# Stop Node Service (root user and basic user)
sudo pm2 stop all && pm2 stop all 
sleep 1

# Delete Source Directory
sudo rm -rf $SRCHOME
sleep 1
echo "============ Previous Source Removal Completed! =============="


# Cloning source
git clone https://github.com/GaussJung/ssh_remote_docker

# Install dependicies
cd $SRCHOME
pnpm install
sleep 1

echo "============ New Source Installation completed! =============="
# Build sources
pnpm build
sleep 1
echo "============ New Source Build completed! =============="

# Start PM2
pm2 start ecosystem.config.js

# Add logfile
log_file="Deployment_At_$(date '+%Y%m%d_%H%M%S').log"
cd $HOME
echo $log_file
ls -al >> $log_file

# Check 
echo "============ End of Source Deployment =============="
