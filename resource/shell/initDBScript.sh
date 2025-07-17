#!/bin/bash

# ============================== Comments ==============================
### Name : initAppDBScript.sh
### Version : 1.0 
### Author : Colin Jung (cwjung123@gmail.com)
### This file is for System initialization and source initial deployment + PostgreDB.(Only 1 Time)
#
### Package and library  
# - Language : Node.js 
# - Framework : Nest.js 
# - Package Manager : pnpm
# - Process Manager : pm2 
# - Database : PostgreSQL v15 
# - Docker & Docker Compose
#
### Setup
# - If needed, edit library version 
# - Check and modify git repository name. 
# - SRCHOME can be changed according to git repository name. 
#
### Run shell commands :   
# $ chmod 755 initAppDBScript.sh
# $ ./initAppDBScript.sh
#
### Check DB Connection Shell 
#  DB Connection Test :  Normal User (dbuser/dbuser123!)
## $ psql -h localhost -p 5432 -U dbuser -d mysvcdb  
## mysvcdb=> SELECT count(*) from fruit;
# --> 10 rows fetched ( 1 | Apple,..)
## mysvcdb=> \dt
#         List of relations
# Schema |  Name   | Type  | Owner
#--------+---------+-------+--------
# public | company | table | dbuser
# public | fruit   | table | dbuser
#(2 rows)
 



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
sudo iptables -I INPUT -m state --state NEW -p tcp --dport 5432 -j ACCEPT

sudo apt install iptables-persistent
sudo netfilter-persistent save
sudo netfilter-persistent reload
sleep 1

######### Section 2.  Git Sunching #########
# Cloning source
echo "============ Cloning Source =============="
cd $HOME
git clone https://github.com/GaussJung/ssh_remote_docker
sleep 1

######### Section 3.  Database Setup #########

# Setup Docker and Docker Compose
echo "============ Setting up Docker =============="
sudo apt update -y
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo apt-get install -y docker-compose
rm get-docker.sh
sleep 1

# Install PostgreSQL client
sudo apt install postgresql-client -y
sleep 1

echo "============ Setting up Database =============="
# Copy dbwork directory
echo "============ Copying DBwork Directory =============="
cd $HOME
cp -r $SRCHOME/resource/dbwork dbwork 
sleep 1

echo "============ Starting Database =============="
cd $HOME/dbwork 
sudo docker compose up -d

# Wait for DB to be ready
for ((i=10; i>=1; i--)); do
  echo "$i sec for DB installation"
  sleep 1
done

# Shutdown for configure file binding
echo "============ Shutting Down Database =============="
sudo docker compose down 
sleep 2 

# Restart Database 
echo "============ Restarting Database  =============="
cp  $HOME/dbwork/conf_docker-compose.yml   $HOME/dbwork/docker-compose.yml  
sudo docker compose up -d 
sleep 1 
echo "============ Database Setup Completed =============="


######### Section 4.  Application Setup #########
cd $SRCHOME
echo "============ Setting up Application =============="
# Install Node.js and pnpm (package manager) and pm2 (process manger)
curl -sL https://deb.nodesource.com/setup_22.x | sudo -E bash --  
 
sudo apt-get install -y nodejs
 
echo "Node.js and npm installed:"
node -v
npm -v

echo "============ Installing global tools =============="
sudo env "PATH=$PATH" npm install -g pnpm
sudo env "PATH=$PATH" npm install -g pm2

# Install dependicies
cd $SRCHOME
pnpm install
sleep 1

# Setup environment dotenv file
echo "============ Setting up Environment Variables =============="
NODE_ENV=$(sed -nE 's/^NODE_ENV=([^\r\n]*)/\1/p' .env)

echo " >>>> Detected NODE_ENV: $NODE_ENV"

if [ "$NODE_ENV" = "production" ]; then
  echo "Setting up production env file..."
  cp -f .env.production.example .env.production

elif [ "$NODE_ENV" = "test" ]; then
  echo "Setting up test env file..."
  cp -f .env.test.example .env.test

elif [ "$NODE_ENV" = "development" ] || [ -z "$NODE_ENV" ]; then
  echo "Setting up development env file..."
  cp -f .env.development.example .env.development

else
  echo "Unknown NODE_ENV: '$NODE_ENV', falling back to development."
  cp -f .env.development.example .env.development
fi

# Build sources (After build source, 'dist' folder is created )
pnpm build
sleep 1

# Start PM2 (ecosystem.config.js is included in the cloned source)
pm2 start ecosystem.config.js
  
# Add logfile
cd $HOME
log_file="InitialCreation_At_$(date '+%Y%m%d_%H%M%S').log"
ls -al >> $log_file

echo "============ Application Setup Completed =============="
# Final Message  
echo  "============ End of Setting Environment =============="