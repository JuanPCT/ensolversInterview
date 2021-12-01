#!/bin/bash

#This will Start the .jar file for the backend and the React Frontend.
#When using Ctrl + C in the terminal, both backend and frontend will shutdown.
# I also added a POST request to create some items checked/unchecked

(trap 'kill 0' SIGINT;

java -jar /home/francisco/Downloads/ensolvers/spring-boot-mysql/target/spring-boot-mysql-0.0.1-SNAPSHOT.jar &
sleep 5
curl -X POST -H "Content-Type: application/json" -d @req.json http://localhost:9191/addItems &
cd /home/francisco/Downloads/ensolvers/react-frontend-springboot
npm start

)

