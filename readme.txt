The application uses two different docker containers.

To start MySQL server you have to go to database folder and run start.sh script.

To start NodeJS server you have to execute the following commands:
1. To build the images : "docker build -t wikipet ."
2. To run the image : "docker run -it -d -p 8090:8090 --link db:db -e DATABASE_HOST=db wikipet"
Probably we also need to run "docker-machine ssh default" before the previous command