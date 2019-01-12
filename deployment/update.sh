#!/usr/bin/env bash

cd Qwixx
nvm use 8.9.4
pkill --signal SIGINT node
git pull
npm run build
serve -s build -l 8080 &
exit
