## myNest  V1.1.7
- New Dev & Test DB setup

## Description
- Docker-based backend service Architecture example by linking Nest.JS with NginX  
- Initial creation  
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Initial creation process  
```bash
$ npm i -g @nestjs/cli 
$ nest new ssh_remote_docker 
- Then some examples added.   
- Added file by author: Dockerfile, ecosystem.config.js  
- Condition

# Simple usage 
app.module_Basic.ts will be changed to app.module.ts and edited.

# DB CRUD usage 
app.module_DB.ts will be changed to app.module.ts and edited. 

pnpm add @nestjs/typeorm typeorm pg @nestjs/config class-validator class-transformer @nestjs/mapped-types

```


## Project setup

```bash
$ pnpm install
```

## Compile and run the project  

```bash

# Required package install
pnpm add @nestjs/typeorm @nestjs/config
pnpm add pg
pnpm add class-validator class-transformer

# build only 
$ pnpm build ( = npm run build )

# development (including build)
$ pnpm run start   ( = npm run start )

# dev(watch) mode
$ pnpm run start:dev  ( = npm run start:dev  )

# production mode
$ pnpm run start:prod ( = node dist/main )
```

## Compile and run in case of error with window OS   
```bash
# build only 
> nest build 

# run (including build)
> nest start  
 
# production mode
> node dist/main
```

## Run the project using PM2 
```bash
# Install PM2
$ npm install pm2 -g  

# create config file (ecosystem.config.js at same directory tsconfig.js )  
module.exports = {
  apps: [
    {
      name: 'mynest',
      script: 'dist/main.js',
      instances: 'max', // or Number ( vCPU count ex:2 )
      exec_mode: 'cluster', // Activate cluster mode
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};

# start PM2 for production mode 
$ pm2 start ecosystem.config.js

# PM2 auto startup and save  
$ pm2  startup  
$ sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
$ pm2 save

# PM2 log check 
$ pm2 logs  

# PM2 status check 
$ pm2 status

# PM2 stop 
$ pm2 stop all 
```

## Run the project using Docker-compose 
```bash
# Go to docker-compose home dir which docker-compose.yml is located
cd $DOCKER_COMPOSE_ROOT (ex:/svcwork/svcbin)

# start up
$ sudo docker compose up -d 

# service stop 
$ sudo docker compose down  

# view logs 
$ sudo docker compose logs -f 
```

## Quick Setup for installation : just follow below step 1~4. (Step3 is not essential.)
```bash
# Step1. Launch a instance and setup
- Ubuntu 24.04 with over 2vCPU / 4GB 
- Port open (80, 443, 3000 etc) 

# Step2. Download init-setup batch file 
cd ~ 
git clone https://github.com/GaussJung/ssh_remote_docker
cp -f ~/ssh_remote_docker/resource/shell/initBasicScript.sh  ~/. 
rm -rf ~/ssh_remote_docker

# Step3. Modify batch file (Optional)
vi initBasicScript.sh  :  you can modify parameter(ex:SRCHOME) and git-repository. 

# Step4. Execute batch file 
chmod 755 initBasicScript.sh 
./initBasicScript.sh
```

## Quick setup for update : just follow below step 1~3. (Step2 is not essential.)  
```bash
# Step1. Copu update batch 
cp -f ~/ssh_remote_docker/resource/shell/srcBasicDeploy.sh  ~/.  
 
# Step2. Modify batch file (Optional)
vi srcBasicDeploy.sh  :  you can modify parameter(ex:SRCHOME) and git-repository. 

# Step3. Execute batch file 
chmod 755 srcBasicDeploy.sh 
./srcBasicDeploy.sh 
```
 
## Quick setup for github action 
- Create a github action file (Normal or Docker) 
- Normal - [.github/workflows/master_deploy_normal.yml](resource/sample_action/master_deploy_normal.yml)   
- Docker - [.github/workflows/master_deploy_docker.yml](resource/sample_action/master_deploy_docker.yml)   
- Before apply it, make github secrets and variables.        
 

## All in One quick setup for PostgreDB + Nest.JS App in a Host : just follow below step 1~2.  
```bash
# Step1. Copu update batch 
cp -f ~/ssh_remote_docker/resource/shell/initAppDBScript.sh ~/.  
rm -rf ~/ssh_remote_docker  (will be cloning by the script)

# Step2. Execute batch file 
chmod 755 initAppDBScript.sh 
./initAppDBScript.sh 

# Step3. Check Result ( refer Browser Result Test Port 80)
http://Public_IP/fruits   

# Description
# ~/dbwork :  Docker-compose Root For PostgreDB (v15)  
# ~/appbase : Docker-compose Root For Next.js Application 
# view log : (go to the docker compose root directory)
sudo docker compose logs -f 
```
## Browser Result Test   
```bash
# Port 
- Basic Arch Test : 3000 Port ( Node Only)
- Docker Based Arch : 80 Port ( NginX + Node / All in One ) 

# Basic App Service 
http://ServerIP or domain:3000/    --> ex) Hello! App version: 1.1.5    

# Show IP 
http://ServerIP or domain:3000/ip   --> ex) 201.53.23.101 

# Show Date (Also show version)
http://ServerIP or domain:3000/date   --> ex) V1.45 >> Now : 2025-06-25T05:48:32.363Z

# Monitor CPU-Usage 
http://ServerIP or domain:3000/monitor/cpu  --> ex) {"cpu-usage":0.12758333333333333}

# Monitor Memory-Usage 
http://ServerIP or domain:3000/monitor/memory  --> ex) {"memory-usage":0.9039504415152291}

# CRUD Table data fetch 
http://ServerIP or domain:3000/fruits --> ex) [{"id":1,"name":"Apple"},{"id":2,"name":"Banana"},{"id":3,"name":"Orange"},{"id":4,"name":"Grape"},{"id":5,"name":"Mango"},{"id":6,"name":"Pineapple"},{"id":7,"name":"Strawberry"},{"id":8,"name":"Watermelon"},{"id":9,"name":"Peach"},{"id":10,"name":"Cherry"}]

```

## Run tests
```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Resources
- NestJS Website - [https://nestjs.com](https://nestjs.com/)
- NestJS Document -  [https://docs.nestjs.com](https://docs.nestjs.com) 
- Docker-Hub - [https://hub.docker.com/](https://hub.docker.com)
- GitHub - [https://www.github.com/](https://www.github.com)
- SSH-Action - [https://github.com/appleboy/ssh-action](https://github.com/appleboy/ssh-action)
   
## License
Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
