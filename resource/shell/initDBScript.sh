

# ============================== Comments ==============================
### Name : initDBScript.sh
### Version : 1.0
### Author : Colin Jung (cwjung123@gmail.com)
### This file is for System initialization and PostgreDB.(Only 1 Time)
#
### Package and library
# - Database : PostgreSQL v15
# - Docker & Docker Compose

### Run shell commands :
# $ chmod 755 initDBScript.sh
# $ ./initDBScript.sh
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
sudo apt install -y zip unzip
sleep 1

# Setup firewall port
sudo iptables -I INPUT -m state --state NEW -p tcp --dport 5432 -j ACCEPT

sudo apt install iptables-persistent
sudo netfilter-persistent save
sudo netfilter-persistent reload
sleep 1

######### STEP-1.  Git Sunching #########
# Cloning source
echo "============ Cloning Source =============="
cd $HOME
wget https://objectstorage.ap-mumbai-1.oraclecloud.com/n/bmvg5qgj9l8l/b/pub-fandom-com/o/resource/db/dbwork.zip
unzip dbwork.zip
chmod 755 -R dbwork
echo "dbwork directory is created at $HOME/dbwork"
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
 
echo "============ Database Setup Completed =============="
