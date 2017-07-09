#!/bin/sh

echo "Starting DB..."  
docker run --name db -d \  
  -e MYSQL_ROOT_PASSWORD=123 \
  -e MYSQL_DATABASE=wikipet -e MYSQL_USER=wikipetsdev -e MYSQL_PASSWORD=RBxKVaMJDjbYCSvf \
  -p 3306:3306 \
  mysql:latest

# Wait for the database service to start up.
echo "Waiting for DB to start up..."  
docker exec db mysqladmin --silent --wait=30 -uwikipetsdev -pRBxKVaMJDjbYCSvf ping || exit 1

# Run the setup script.
echo "Setting up initial data..."  
docker exec -i db mysql -uwikipetsdev -pRBxKVaMJDjbYCSvf wikipet < wikipetby.sql  