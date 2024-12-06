# Railway Management System API

## Overview
This is a Node.js-based Railway Management System API that allows users to register, login, check train availability, and book seats. The system supports role-based access with admin and user roles.

## Prerequisites
- Node.js (v14 or higher)
- MySQL
- npm

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd railway-management-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup
Create a MySQL database and update the `.env` file with your database credentials:

```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=railway_management
JWT_SECRET=your_jwt_secret
PORT=3000
ADMIN_API_KEY=your_secret_admin_key
```

### 4. Database Migrations
Run the following SQL to create necessary tables:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('USER', 'ADMIN') DEFAULT 'USER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trains (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  source VARCHAR(50) NOT NULL,
  destination VARCHAR(50) NOT NULL,
  total_seats INT NOT NULL,
  available_seats INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  train_id INT NOT NULL,
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (train_id) REFERENCES trains(id)
);
```

### 5. Run the Application
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: User login (returns JWT token)

### Trains
- `POST /api/trains`: Add a new train (Admin only)
- `GET /api/trains/availability`: Get train availability between stations

### Bookings
- `POST /api/bookings/book`: Book a seat
- `GET /api/bookings/my-bookings`: Get user's booking details

## Security Features
- JWT-based authentication
- Role-based access control
- Race condition handling for seat booking
- Admin API protection

## Assumptions
- Admin can be created during user registration by setting role to 'ADMIN'
- Seat booking uses row-level database locking to handle concurrent requests
- JWT tokens expire in 24 hours

## Testing
Use Postman or curl to test the API endpoints.

## Error Handling
- 401 for authentication failures
- 403 for unauthorized access
- 400 for invalid requests
- 500 for server errors

## Future Improvements
- Add more comprehensive validation
- Implement refresh tokens
- Add logging
- Create more detailed error responses