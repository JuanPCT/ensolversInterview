#!/bin/bash

#This will Start the .jar file for the backend and the React Frontend.
#When using Ctrl + C in the terminal, both backend and frontend will shutdown.

(trap 'kill 0' SIGINT;

java -jar /home/francisco/Downloads/ensolvers/spring-boot-mysql/target/spring-boot-mysql-0.0.1-SNAPSHOT.jar &
sleep 5
cd /home/francisco/Downloads/ensolvers/react-frontend-springboot
npm start

)

