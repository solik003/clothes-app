# Clothes App — Frontend

This is the frontend for the Clothes App — a web application where users can browse, filter, and order clothes.
It consumes the backend API for all data and operations.

## Live Demo: https://clothes-app-x7kb.onrender.com/

## Tech Stack

- React

- React Router

- Axios

- Material UI

- Redux

- Stripe

## Prerequisites
- Node.js >= 18

## Installation
1. Clone the repository:
    git clone https://github.com/solik003/clothes-app.git
    cd clothes-app

2. Install dependencies:
    npm install

## Running Locally
Start the development server:
    npm start

The app will be running at:
    http://localhost:3000

## Features
    Browse all available clothes
    Filter and sort clothes
    View item details
    Add to cart
    Place an order
    User login and registration

## Project Structure

├── public/
├── src/
│   ├── components/        # Reusable components
│   ├── hooks/        # Custom hooks
│   ├── pages/             # Application pages
│   ├── redux/          # State management
│   ├── App.jsx            # Root component
│   ├── config.js            
│   ├── data.js
│   ├── index.js
│   └── productsApi.js
│   └── reportWebVitals.js
│   └── requestMethods.js