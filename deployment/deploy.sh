#!/usr/bin/env bash

ssh -i qwixx.pem ec2-user@ec2-18-206-123-221.compute-1.amazonaws.com 'bash -s' < update.sh

