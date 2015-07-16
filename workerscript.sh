#!/bin/bash
echo "Stopping Dyno $1 ON Heroku"

heroku ps:scale $1=0

echo "Sleeping for a $3"
sleep $3

echo "Starting Dyno $1 ON Heroku"

heroku ps:scale $1=1


