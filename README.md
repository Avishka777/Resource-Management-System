# Resource Booking System

The Resource Booking System is a web application designed to streamline the process of booking various resources and facilities for sports activities. It provides users with a platform to reserve resources such as bats, balls, rackets, shuttlecocks, volleyballs, and kickboards for specific dates and times.


# Introduction

The Resource Booking System aims to simplify the process of reserving sports resources and facilities for sports enthusiasts. Users can easily book resources by providing essential details such as resource name, quantity (if applicable), contact information, date, and time.


# Features

- User-friendly interface for resource booking
- Support for various resources and facilities
- Validation of user inputs for correctness and completeness
- Ability to view, update, and delete existing bookings
- Exporting booking data to CSV and PDF formats for reporting purposes


# Getting Started with Project

To get started with the project, follow these steps:

1. Install Dependencies: Open a terminal within the project directory and run the following command to install all dependencies:
    - npm install 
2. Create .env file in root directry: use "MONGO" for your url:
    - MONGO = "mongodb+srv://xxx:xxx@xxx-xxx.nfsmyma.mongodb.net/?retryWrites=true&w=majority&appName=xxx-xxx"
3. Run Backend Server: Start the backend server by running the following command in the terminal:
    - npm run dev
4. Run Frontend Server: Open a new terminal and navigate to the frontend directory within the project directory using the following command:
    - cd frontend
5. Install Dependencies: Open a terminal within the project frontnedn directory and run the following command to install all dependencies:
    - npm install 
6. Then, run the following command to start the frontend server:
    - npm start
7. Access the Application: Open a web browser and go.
8. With these steps, you should now be able to run the project locally and access it through your web browser.


# Technologies

- Frontend: React.js, React Router, Bootstrap
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Other: React-pdf/renderer for PDF generation, react-csv for CSV generation