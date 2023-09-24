#!/bin/bash
#Stopping existing node servers
sudo chmod -R 777 /home/ec2-user/express-app
echo "Stopping any existing node servers"
# Check if the process exists before attempting to kill it


pkill node