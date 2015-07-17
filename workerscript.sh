#!/bin/bash

cd ./naijaodds/naijaodds2
echo "Stopping Dyno $1 ON Heroku"

heroku ps:scale $1=0

echo "Sleeping for a $2"
sleep $2

echo "Starting Dyno $1 ON Heroku"

heroku ps:scale $1=1


