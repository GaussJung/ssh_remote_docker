#!/bin/bash

# ============================== Comments ==============================
### Name : initPostgreScript.sh
### Version : 1.0 
### Author : Colin Jung (cwjung123@gmail.com)
### This file is for System initialization for postgreSQL (Only 1 Time)
#
### Package and library  
# - postgreSQL : v15 
#
### Setup
# - If needed, edit library version 
# - Check and modify git repository name. 
# - SRCHOME can be changed according to git repository name. 
#
### Pre-requisite : Cloning git repository

### Run shell commands :   
# chmod 755 initPostgreScript.sh
# ./initPostgreScript.sh


##### Ater running this script, you can check the following:
### B1.  Install postgreSQL Repo   
# cd ~ 
# git clone https://github.com/GaussJung/ssh_remote_docker

# cp -r ./ssh_remote_docker/resource/shell/initPostgreScript.sh .
# cp -r ./ssh_remote_docker/resource/dbwork .
# rm -rf ~/ssh_remote_docker

### B2. Setup postgreSQL 
# cd ~/.dbwork
# Read readme.txt for more information
# sudo docker compose up -d 
# ========================================================================

# Start Message  
echo "============ Start of Settting Environment =============="

# Declare variables
HOME=/home/ubuntu
 
# Init update library
sudo apt update -y
sleep 1

# Setup firewall port  
sudo iptables -I INPUT -m state --state NEW -p tcp --dport 5432 -j ACCEPT

# Setup Docker and Docker Compose
sudo apt update -y
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo apt-get install -y docker-compose
rm get-docker.sh
sleep 1

 