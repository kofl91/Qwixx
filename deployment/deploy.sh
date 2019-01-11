#!/usr/bin/env bash

ssh -i qwixx.pem ec2-user@ec2-18-206-123-221.compute-1.amazonaws.com

cd Qwixx
nvm use 8.9.4
pkill --signal SIGINT node
git pull
npm run build
serve -s build -l 8080 &
exit
