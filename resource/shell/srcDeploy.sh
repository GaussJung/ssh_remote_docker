#!/bin/bash

# Src Deploy without Docker 
echo "============ Start of Source Deployment =============="

# Declare variables
HOME=/home/ubuntu
SRCHOME=/home/ubuntu/ssh_remote_docker

# Stop Node Service
pm2 stop all
sleep 1

# Delete Source Directory
rm -rf $SRCHOME
sleep 1

# Add logfile
log_file="StartUp_$(date '+%Y%m%d_%H:%M:%S').log"
cd $HOME
echo $log_file
ls -al >> $log_file

# Cloning source
git clone https://github.com/GaussJung/ssh_remote_docker

# Install dependicies
cd $SRCHOME
pnpm install
sleep 1

# Build sources
pnpm build
sleep 1

# Start PM2
pm2 start ecosystem.config.js

echo "============ End of Source Deployment =============="
