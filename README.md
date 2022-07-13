# Basic E-Commerce Backend using Node.js, Express.js, MySQL, Sequelize, JWT (Json Web Token) Authentication, and Authorization

<b>Welcome!</b> This application merges node + express + sequelize + jwt. With Sequelize, we count on an ORM solution 
that help us to manage a relational database using JavaScript code. With JWT, we add a security layer using tokens for
authentication. This backend application exposes endpoints for a basic e-commerce site. 
It includes an authorization level based on roles and authentication based on tokens to access to specific endpoints. 
This application uses MySQL engine.

## Versions at the Environment

- MySQL 8
- Node.js 18.4.0
- Express.js 4.17.1
- Sequelize 5.21.3
- JWT 8.5.1

## Installation Steps
```
$ git clone [repository.https.link]
$ cd [downloaded.directory]
$ npm install
```

### About MySQL Database Integration

1. Create a database with the following command in your MySQL CLI:
```
> create database testdb;
```
2. Open the file /app/config/db.config.js
3. Custom the following key values:
   1. HOST : the host where the mysql engine runs
   2. USER : the user that owns the database
   3. PASSWORD : with the user's password
   4. DB : with the databse name

### About the Secret Key for the Token Generation

1. Open the file /app/config/auth.config.js
2. Edit the secret key with your customized string

If you do not update this file, the app will work normally.

### About the Database Structure Recreation
In the server.js file, you will find the following line of code.

```
db.sequelize.sync({force: true}).then(() => {
initial();
});
```

You can comment it fully after the first execution of the
application because in the first execution the database tables
have been generated. If you do not comment this after the first
execution of the application, all data stored in the database
will be deleted in the following execution and the tables will be
re-generated resulting the new empty ones.

## Execution Steps
In the root directory of the project, run the following command:

```
$ node server.js
```


## Endpoints

### Register a new user (with admin role)
This can be executed by any user

```
POST http://localhost:8080/api/auth/signup
Content-Type: application/json

{
"username": "mar",
"email": "mar@mail.com",
"password": "password",
"roles": ["admin"]
}
```

### Register a new user (with moderator role)
This can be executed by any user

```
POST http://localhost:8080/api/auth/signup
Content-Type: application/json

{
"username": "mod",
"email": "mod@mail.com",
"password": "password",
"roles": ["moderator"]
}
```

### Register a new user (with user role)
This can be executed by any user

```
POST http://localhost:8080/api/auth/signup
Content-Type: application/json

{
"username": "lop",
"email": "lop@mail.com",
"password": "password",
"roles": ["user"]
}
```

### Register a new user (with moderator + admin role)
This can be executed by any user

```
POST http://localhost:8080/api/auth/signup
Content-Type: application/json

{
"username": "kof",
"email": "kof@mail.com",
"password": "password",
"roles": ["moderator", "admin"]
}
```

### Login
This can be executed by any user

```
POST http://localhost:8080/api/auth/signin
Content-Type: application/json

{
"username": "mod",
"password": "password"
}
```

### Create a new product
This can be executed by users with moderator role

```
POST http://127.0.0.1:8080/api/product/create
Content-Type: application/json
x-access-token: <put.your.generated.token.here>

{
"name": "smart-phone"
}
```

### Create a new shop
This can be executed by users with admin role

```
POST http://127.0.0.1:8080/api/shop/create
Content-Type: application/json
x-access-token: <put.your.generated.token.here>

{
"name": "zapo"
}
```

### Locate a product into a shop
This can be executed by users with moderator role

```
POST http://127.0.0.1:8080/api/product/locate
Content-Type: application/json
x-access-token: <put.your.generated.token.here>

{
    "product_id": 2,
    "shops": ["zapo"]
}
```

### Locate a product into several shops
This can be executed by users with moderator role

```
POST http://127.0.0.1:8080/api/product/locate
Content-Type: application/json
x-access-token: <put.your.generated.token.here>

{
"product_id": 1,
"shops": ["coah", "tolu"]
}
```

### Add some products to the cart
This can be executed by any user

```
POST http://127.0.0.1:8080/api/product/cart
Content-Type: application/json
x-access-token: <put.your.generated.token.here>

{
"user_id": 1,
"products": ["pencil", "pants", "table"]
}
```