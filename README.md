# weatherapp
Here’s the updated README for your `weatherapp` project, including setup instructions for both the frontend (`weatherappzeotap-main`) and backend (`weatherappbackend-main`):


# WeatherApp

This project is a weather application that includes a frontend and backend component. The frontend (`weatherappzeotap-main`) is built with React, and the backend (`weatherappbackend-main`) uses Node.js, Express, PostgreSQL, and the OpenWeather API.

## Table of Contents
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)

---

## Frontend Setup (weatherappzeotap-main)

### Steps to run the frontend:

1. Open Terminal:
   Navigate to the `weatherappzeotap-main` directory in your terminal:
   ```bash
   cd weatherappzeotap-main
   ```

2. Install Dependencies:
   Install the required dependencies:
   ```bash
   npm install
   

3. Start the Application:
   Start the frontend application:
   ```bash
   npm start
   ```

4. Access the Application:
   Once started, the application will open on your browser at:
   ```
   http://localhost:3000


## Backend Setup (weatherappbackend-main)

 Steps to run the backend:

1. Open Terminal:
   Navigate to the `weatherappbackend-main` directory in your terminal:
   ```bash
   cd weatherappbackend-main
   ```

2. Install Dependencies:
   Install all required backend dependencies:
   ```bash
   npm install
   ```

3. Set Up Environment Variables:
   Create a `.env` file in the `weatherappbackend-main` directory and add the following variables:
   ```
   DATABASE_URL=your-postgres-database-url
   PORT=4000
   OPENWEATHER_API_KEY=your-openweather-api-key
   EMAIL_USER=your-email@example.com
   EMAIL_PASS=your-email-password
   ```

   Replace each placeholder with your actual credentials.

4. Start the Backend Server:
   Run the backend server with:
   ```bash
   npm start
   ```

5. Access the Backend:
   The backend server will run at:
   ```
   http://localhost:4000


## Environment Variables

For the backend to function, the following environment variables are required in an `.env` file:

  DATABASE_URL: PostgreSQL database connection string.
  PORT: The port for the backend server (e.g., `4000`).
  OPENWEATHER_API_KEY: API key for the OpenWeather API.
  EMAIL_USER: Email address used for sending emails.
  EMAIL_PASS: Password for the email account used for sending emails.

Example `.env` file:


DATABASE_URL=postgres://username:password@hostname:port/dbname
PORT=4000
OPENWEATHER_API_KEY=your-openweather-api-key
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password

Technologies Used

  Frontend: React.js
  Backend: Node.js, Express.js, PostgreSQL
  API : OpenWeather API
  Environment Management: dotenv


