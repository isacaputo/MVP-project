# MVP Project - CodeOp
## Fromageria Tesilli Online Store

Fromageria Tesilli is **a small artisan cheese factory tocated at Belo Horizonte - Brazil**.
The Fromageria produces matured artisanal cheeses with semi-cooked curd.
The cheeses are carefully crafted, combining delicious ingredients with creativity.

## Objectives
In this repository, you will find all the files needed for running the Fromageria Tesilli Web Page.
The purpose of the page is to offer a digital channel for customers, so they can order and purchase cheeses online.
The web page provides a display of the products and also a shopping cart and checkout for customers choosing cheeses and ordering them in the size and quantity they want.
The project also aims to provide the Fromageria with a well organized and centralized database.

## Some data about the business
Fromageria Tesilli has 20 different products in its portfolio:
- 17 cheeses with different ingredients (4 categories: Nuts and Dried Fruits, Aromatics, Seasoned, To Sweeten Life);
- 1 cheese palette with 12 slices of 3 different flavors;
- 1 customized cheese (the customer choose from a list of ingredients);
- 1 box with two half cheeses of customers' choice.

The current payment method is by cash or online transfer. The payment is held in the delivery step.
The Fromageria charges shipping for delivery in other regions/cities.

## The Database Schema
Database Folder: /model/database.js
Database Name: "fromageria"

3 Tables: "products", "orders", "order_has_product" (pivot table)
> For the database visualization, please check "database_visualization.png" file located at the root of the project.

## Server
2 Routes:
1. products,
2. orders.

**products** - API Routes Folder: /routes/products.js

2 endpoints:
  - get all products from products table
  - get producst from products table

**orders** - API Routes Folder: /routes/orders.js

2 endpoints:
  - get all orders from orders table
  - post in orders and order_has_product tables

Actions being performed in the **post endpoint**:
  - mapping products that are in the order (mapping by id)
  - selecting product_half_price and product_whole_price of the products selected, so with the quantity set in the order it is possible to calculate the total price of each item in the order
  - calculating the total amount for each item
  - inserting into orders all the data requested in the database
  - getting the order_id just inserted into the database so it is possible to fill in the order_has_product table, as it needs product_id and order_id for its primary key
  - inserting the items data into the order_has_product table
  - getting data from the order and sending an email to the customer

## Client
### React-router Routes:
1. Layout (inside the /client/src/components folder); 
2. Home (inside the /client/src/pages folder);
3. ProductList (inside the pages /client/src/pages folder);
4. Product (inside the pages /client/src/pages folder);
5. Checkout (inside the pages /client/src/pages folder).

### Componentes (inside the /client/src/components folder):
1. Layout; *for setting the navbar, footer and ancoring the drawer for the shopping cart*
2. ProductCard; *for building the display card for each product*
3. AddressForm; *for getting inputs of clients data*
4. Review. *for displaying the order details for the customer to check and confirm*

*Products Images (inside the /client/public/images folder)*

## Color pallete
primary:
- main: "#549470"

secondary:
- main: "#F5CB8B",

neutral:
- contrastText: "#FFFFFF",

## Setup
### Dependencies
Run `npm install` in the project folder to install dependencies related to Express (the server).

`cd client` and run `npm install` to install dependencies related to React (the client).

### Database Prep
Create .env file in project directory and add


DB_NAME=fromageria

DB_PASS=*YOUR_PASSWORD*


- Type `mysql -u root -p` to access the MySQL CLI using your password.
- In the MySQL CLI, type create database **fromageria**; to create a database in MySQL.
- Run the following in the MySQL CLI: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YOUR_PASSWORD'; (replace YOUR_PASSWORD with your actual password)
- Run `npm run migrate` in your TERMINAL, in the project folder to create the tables of te project.

## Run Your Development Servers
Run `npm start` in project directory to start the Express server on port 4000
cd client and run npm run dev to start client server in development mode with hot reloading in port 5173.
Client is configured so all API calls will be proxied to port 4000 for a smoother development experience. Yay!
You can test your client app in http://localhost:5173
You can test your API in http://localhost:4000/api

**LET'S GET TO WORK!**
