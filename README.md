# NodeJs framework
This is REST apis framework using the nodejs,express,seqlelize and mysql. Managed user security using JWT and other security 

## Postman collection
Link: https://api.postman.com/collections/19810913-bdfa202a-db5f-4a1f-a873-283635a35ecf?access_key=PMAT-01H7EXF8EAFXZSTAHNFRQBZNHK

## Table of Contents
- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)

## Introduction

#### Node.js
Node.js is an open-source, cross-platform JavaScript runtime environment built on Chrome's V8 JavaScript engine. It allows developers to run server-side JavaScript code, enabling them to create scalable, h	igh-performance web applications. Node.js has a non-blocking, event-driven architecture, making it efficient for handling concurrent operations. It has a vast ecosystem of modules and packages available through npm (Node Package Manager), which makes it easy to extend its capabilities and build powerful applications.

#### Express
Express is a fast, minimalist, and flexible Apis framework for Node.js. It provides a set of robust features for building web and mobile applications. With Express, you can easily handle HTTP requests, define routes, implement middleware, and manage application states. Its simplicity and focus on modularity make it a popular choice for developers who want to build RESTful APIs.

#### Sequelize
Sequelize is an Object-Relational Mapping (ORM) library for Node.js, which simplifies database management by mapping database objects to JavaScript objects. It supports various database systems, including PostgreSQL, MySQL, SQLite, and MSSQL, making it versatile for different projects. Sequelize enables developers to interact with the database using JavaScript methods rather than raw SQL queries, which improves code readability and maintainability. It also provides features like data validation, associations between tables, and easy migration management, streamlining the development process.
Provide a brief introduction to your project. Mention the technologies used and the main purpose of the application.

#### JWT (JSON Web Tokens)

JSON Web Tokens (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way to securely transmit information between parties as a JSON object. JWTs are commonly used for authentication and authorization in applications. The token contains a payload with a set of claims that can include user information and metadata. The payload is digitally signed by the server using a secret key or a private key/public key pair. Upon receiving a JWT, the server can validate the token's signature to ensure its authenticity and extract the claims to identify the user and grant access to protected resources. JWTs are widely used in modern applications, websites due to their stateless nature, scalability, and ease of implementation.

#### Express-fileupload

Express-fileupload is a middleware for Express.js, a popular Node.js Apis framework. This middleware simplifies the process of handling file uploads from client requests. It enables developers to handle multipart/form-data requests that include files, such as images, videos, or documents, in a straightforward manner. Express-fileupload parses the incoming requests, extracts the uploaded files, and makes them accessible within the Express route handlers. With its simple configuration and integration into Express, developers can easily implement file upload functionality in their applications, such as uploading avatars, attachments, or any other file-based content.

#### Express-validator

express-validator is a middleware library for Express.js, designed to validate and sanitize user input data sent to the server. Input validation is crucial for securing Apis and preventing potential security vulnerabilities like SQL injection or cross-site scripting (XSS) attacks. Express-validator provides a set of functions and methods to validate and sanitize data from various sources, such as query parameters, request body, or URL parameters. It allows developers to define validation rules, check data against these rules, and generate error messages to handle invalid input gracefully. By integrating express-validator into an Express application, developers can ensure that only valid and sanitized data is processed, improving the overall robustness and security of their web services.

Using JWT for authentication and authorization, Express-fileupload for handling file uploads, and express-validator for validating user input data are valuable tools to enhance the functionality and security of Express.js apis.


## Getting Started

### Installation

Provided step-by-step instructions on how to set up the codebaes on a local machine. :

1. Clone the repository:
    https://eros.narola.online/git/nislreactnative/nodejs_framework
    
2. Install dependencies: <br />
    Using Yarn: ``` yarn install ```
    <br /> Using Npm: ``` npm install ```

### Configuration
1. Run local server using wamp or xampp
2. Create new database. Please make sure your database name same as mentioned in .env file DB_NAME.
3. Run the project using command :<br />
    Using Yarn: ``` yarn start ```
   <br /> Using Npm: ``` npm start ```
4. You can check your database all tables are sync or created.
5. Now we need to add admin table configurations records.You can edit it according your need.
```
INSERT INTO 'admin' 
('id', 'config_key', 'config_value', 'value_unit', 'is_delete', 'is_testdata') VALUES
(1, 'userAgent', 'iOS,Android,Mozilla/5.0,PostmanRuntime/2.5.0', 'comma-separated', 0, 1),
(2, 'tempToken', 'allowAcessToApp', 'text', 0, 1),
(3, 'globalPassword', '(codebase)(nodejs)09/05/2023', 'text', 0, 1)
```
	
