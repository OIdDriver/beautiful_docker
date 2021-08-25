#!/bin/bash

if [ -n "$1" ]; then
 num=$1
else 
 read -p "Docker Num:" num 
fi
for ((i=1;i<=$num;i++))
do
 docker run -d --restart=on-failure notfourflow/p2pclient:alpine dahuomao@gmail.com
done
