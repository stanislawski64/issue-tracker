# Issue Tracker App

This project is aimed to showcase a sample issue tracker application based on Create React App. 😎

## Features

- API integration for fetching data 🚀
- Authentication with JWT Tokens 💎
- Custom components with CSS variables 🦄
- Night Mode with transitions 🌙

## Backend Setup

Install Postgresql version “10-15” on your machine. During installation, choose user ‘root’ and set a password

Fire up pgAdmin application after you’re done, and add a database called ‘jira_development’

Clone repository https://github.com/slawojstanislawski/gira-api and navigate to api directory, perform npm install.

Modify .env file - set database password to the one you chose during installation of Postgres, the rest should likely stay the same.

Execute `npm start` in the api folder

Install Postman application on your machine, add a collection ‘Gira’, set up ‘http://localhost:3001/guest/authenticate’ request, get a bearer token with this, set it as collection’s authentication and click ‘Save’, add ‘http://localhost:3001/issues’ request and test if it works.

## Frontend Setup

Run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
