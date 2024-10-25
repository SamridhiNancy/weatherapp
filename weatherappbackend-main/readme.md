## Weather Monitoring Backend

This is a Node.js backend application for monitoring weather conditions and sending alerts based on user-defined thresholds. It utilizes PostgreSQL for data storage and Nodemailer for sending email notifications.

## Features

- Fetches real-time weather data from the OpenWeatherMap API.
- Stores user-defined thresholds for various cities.
- Sends email alerts when the temperature exceeds or drops below specified thresholds in a specific city.

## Technologies Used

- Node.js
- Express
- PostgreSQL
- Nodemailer
- Axios
- Node-Cron

## Installation

- Node JS
- Express
- Postgre sql
- Nodemailer
- Axios
- Node-Cron
- dotenv
- pg (for postgre in node)

### Prerequisites

- Node.js (v20)
- PostgreSQL (v14)
- Access to OpenWeatherMap API (you will need an API key)

.env file should contains

- open weather map api key and endpoints
- database url of postgre
- email user and password to send email
