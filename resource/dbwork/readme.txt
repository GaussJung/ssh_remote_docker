1. Initial progress
Copy init_docker-compose.yml to docker-compose.yml and start it
- $ cp init_docker-compose.yml docker-compose.yml
- $ sudo docker compose up -d

2. Check container operation
- $ sudo docker ps -a

- $ ls ./db : Check that the "./db/data" folder has been created

3. Bind environment variables
- $ sudo docker compose down
- $ cp conf_docker-compose.yml docker-compose.yml
- $ sudo docker compose up -d

4. Connection test
sudo apt install postgresql-client

: Superuser
- $ psql -h localhost -p 5432 -U dbadmin -d dbadmin

: Normal User (dbuser/dbuser123!)
- $ psql -h localhost -p 5432 -U dbuser -d mysvcdb

mysvcdb=> select * from fruit; 
id | name
----+------------ 
1 | Apple 
2 | Banana 
3 | Orange 
4 | Grape 
5 | Mango 
6 | Pineapple 
7 | Strawberries 
8 | Watermelon 
9 | Peach 
10 | Cherry
(10 rows)
