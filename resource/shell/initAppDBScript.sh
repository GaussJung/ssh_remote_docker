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
### Check Basic Running 
# 1) Shell  : $ curl http://localhost:3000
# 2) Web-Brower : http://Server-PublicIP:3000

### Check Util 
# 1) Health Check : http://Server-PublicIP:3000/health
# 2) IP : http://Server-PublicIP:3000/ip
# 3) Time : http://Server-PublicIP:3000/time

### Check CRUD Running
#  DB Connection Test :  Normal User (dbuser/dbuser123!)
#  $ psql -h localhost -p 5432 -U dbuser -d mysvcdb  
#  http://Server-PublicIP:3000/fruits
#  http://Server-PublicIP:3000/fruits/1 

### Check DB Connection Shell
#  DB Connection Test :  Normal User (dbuser/dbuser123!)
#  $ psql -h localhost -p 5432 -U dbuser -d mysvcdb  
#  SELECT * from fruit; 

### Process Check 
# Show logs : $ pm2 logs 
# Show status  : $ pm2 status  
# ========================================================================

# Start Message  
echo "============ Start of Settting Environment =============="

# Declare variables
HOME=/home/ubuntu
SRCHOME=/home/ubuntu/ssh_remote_docker
DBHOME=//home/ubuntu/dbwork
APPHOME=/home/ubuntu/appbase

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

######### STEP-1.  Git Sunching #########
# Cloning source
echo "============ Cloning Source =============="
cd $HOME
git clone https://github.com/GaussJung/ssh_remote_docker
sleep 1

######## STEP-2. SETUP fro Application ########

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
cp  $DBHOME/conf_docker-compose.yml   $DBHOME/docker-compose.yml  
sudo docker compose up -d 
sleep 1 
echo "============ Database Setup Completed =============="


######## STEP-3. SETUP for Application ########
# Copying Appbase Directory
cd $HOME
cp -r $SRCHOME/resource/appbase $APPHOME
sleep 1

echo "============ Copying APP Source and Create readonly module dir =============="
cd $APPHOME
cp -r $SRCHOME  $APPHOME/app
mkdir  $APPHOME/node_readonly_modules
sleep 1
 
# Setup environment dotenv file
cd $APPHOME/app
echo "============ Setting up Environment Variables =============="
NODE_ENV=$(sed -nE 's/^NODE_ENV=([^\r\n]*)/\1/p' .env)

echo ">>>> Detected NODE_ENV: $NODE_ENV"

if [ "$NODE_ENV" = "production" ]; then
  echo "Setting up production env file..."
  cp -f .env.production.example .env.production
  ENV_MAIN_FILE=".env.production"

elif [ "$NODE_ENV" = "test" ]; then
  echo "Setting up test env file..."
  cp -f .env.test.example .env.test
  ENV_MAIN_FILE=".env.test"

elif [ "$NODE_ENV" = "development" ] || [ -z "$NODE_ENV" ]; then
  echo "Setting up development env file..."
  cp -f .env.development.example .env.development
  ENV_MAIN_FILE=".env.development"

else
  echo "Unknown NODE_ENV: '$NODE_ENV', falling back to development."
  cp -f .env.development.example .env.development
  ENV_MAIN_FILE=".env.development"

fi

# Generate Public IP
PUBLIC_IP=$(curl -s ifconfig.me)
echo "Host Public IP: $PUBLIC_IP"

cp "$ENV_MAIN_FILE" "${ENV_MAIN_FILE}.bak"

# DB_HOST to Public IP
if [ -n "$PUBLIC_IP" ]; then
  sed -i "s/^DB_HOST=.*/DB_HOST=$PUBLIC_IP/" "$ENV_MAIN_FILE"
  echo "DB_HOST updated to $PUBLIC_IP in $ENV_MAIN_FILE"
else
  echo "Failed to get public IP. DB_HOST not updated."
fi

# Run Docker Compose to start the application
cd $APPHOME
sudo docker compose up -d
sudo docker ps -a 
echo "============ Application Setup Completed =============="
 
# Add logfile
cd $HOME
log_file="InitialCreation_At_$(date '+%Y%m%d_%H%M%S').log"
ls -al >> $log_file

echo "============ Application Setup Completed =============="
# Final Message  
echo  "============ End of Setting Environment =============="

echo  "Version : http://$PUBLIC_IP"
echo  "Health Check : http://$PUBLIC_IP/health"
echo  "Timp Check : http://$PUBLIC_IP/time"
echo  "IP Check : http://$PUBLIC_IP/ip"
echo  "Databse Check : http://$PUBLIC_IP/fruits"
echo  "Monitor CPU  : http://$PUBLIC_IP/monitor/cpu"
echo  "Monitor Memory : http://$PUBLIC_IP/monitor/memory"
 