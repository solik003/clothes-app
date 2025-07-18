# Clothes App — Backend

This is the backend service for the Clothes App.  
It provides a RESTful API for managing clothes, users, and orders.

## Tech Stack

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- dotenv for environment variables

## Prerequisites

- Node.js >= 18
- MongoDB instance (local or cloud)

## Installation

1. Clone the repository:
    git clone https://github.com/solik003/clothes-app.git
    cd clothes-app

2. Install dependencies:
    npm install

3. Create a .env file in the root:
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

## Running Locally
    node index.js

The API will be running at:
    http://localhost:5000

## API Endpoints

Authentication
    POST /api/auth/register — Register a user

    POST /api/auth/login — Login and get token

Clothes
    GET /api/products — Get all clothes

    GET /api/products/:id — Get a single item

    POST /api/products — Add a new item (admin)

    PUT /api/products/:id — Update an item (admin)

    DELETE /api/products/:id — Delete an item (admin)

Orders
    GET /api/orders — Get user orders

    POST /api/orders — Create an order

    PUT /api/orders/:id — Update an order (admin)

    DELETE /api/orders/:id — Delete an order (admin)

## Project Structure

backend/
├── config/  # Database and other configs
├── controllers/  # Route handlers
├── migrations/  # DB migration scripts
├── models/  # Mongoose models
├── routes/   # API routes
├── .env  # Environment variables
├── index.js  # Application entry point