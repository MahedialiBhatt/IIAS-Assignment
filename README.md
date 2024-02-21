## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Assumptions](#assumptions)

## Getting Started

# Institute Instructor Attendance System

This Node.js application provides APIs for managing the check-in and check-out times of instructors in an institute. It also generates aggregated monthly reports.

## Github Repository Link

- [https://github.com/MahedialiBhatt/IIAS-Assignment]

### Prerequisites

- Node.js
- Mysql

### Installation

Follow these steps to set up and run the project:

1. Clone the repository (provide your repository link here).

2. Open the cloned folder in your preferred code editor.

3. Install npm dependencies: `npm install`

4. Create a .env file with the variables mentioned in the .env.example file, providing appropriate values for each variable.

5. Start the application: `npm run start` / `npm run start:dev`

## Features

- Add check-in and check-out times for instructors.
- Validate input data to ensure correct date and time formats.
- Prevent overlapping time slots for the same instructor.
- Generate monthly reports for total checked-in time.

## API Endpoints

(postman collection is available in devhelper)

- POST /api/checkin
  Description: Record instructor check-in times.
- POST /api/checkout
  Description: Record instructor check-out times.
- GET /api/monthly-report/:month
  Description: Fetches aggregated monthly report for total checked-in time per instructor.

## Project Structure

- src/
  - controllers/ # Handles API request/response logic
  - services/ # Contains business logic and interacts with the repository
  - repository/ # Deals with the interaction with the database
  - config/ # Holds configuration files, especially for the database
  - routes/ # Defines API routes
  - utility/ # Houses utility functions for date, time, and response handling
- app.js # Entry point for the application

## Assumptions

- Only one check-in is allowed for the same date. To perform another check-in, the previous check-in must be completed by checking out.
- The Monthly Report generation API considers only the month and does not check the year. Therefore, the API will return a report for the specified month without considering the year.
- Date is in yyyy-mm-dd format (API request)
- Time is in hh:mm format (API request)
