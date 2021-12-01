TO-DO

- Folders
- Fixed a bug where when Updating an Item the server returns code 500
- However, when Adding an Item, it works (same Endpoint)

**Introduction**
- This Web Page was developed using Spring Tools for backend + React.js for frontend.
- It's an SPA that provides CRUD operations.
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
- curl 7.68.0 (Only for the script)