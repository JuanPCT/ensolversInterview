TO-DO

- Script allowing to run the app.
- This command should set up everything that is required to run the app like, for instance, setting up a DB schema,
  pre-creating any config file, etc.

- describing all the runtimes, engines, tools etc. required to run the
  app, with their concrete versions - for instance, MySQL 5.7, Spring Boot 2.1, React 16.10, etc. 

**Introduction**
- This Web Page was developed using Spring Tools for backend + React.js for frontend.
- It's an SPA that provides CRUD operations.\
- The backend provides a REST API that is used by the FrontEnd.
- So far, the backend was separated in layers _repository/service/controller_

**Dependencies**
- Spring Boot Version ~ 2.6.1 
- OpenJDK version "11.0.11" 2021-04-20
- React version ~ 17.0.2
- React-native version ~ 0.66.3
- mysql ~ Ver 8.0.27-0ubuntu0.20.04.1 for Linux on x86_64 ((Ubuntu))
    - You will need to have a Database called db_example;
    - CREATE DATABASE db_example;
    - Also, you need root to have 'password' as password
    - ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';
- Lombok is used to minimize/remove the boilerplate code