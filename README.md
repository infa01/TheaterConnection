# TheaterConnection

TheaterConnection is a mobile theatre reservation application developed for the CN6035 Mobile & Distributed Systems module. The system allows users to register, log in, browse theatre shows, search available performances, view showtimes, select seats, create reservations, modify future reservations, and cancel bookings.

The project follows a distributed system architecture with a React Native mobile frontend, a Node.js/Express REST API backend, and a MariaDB database.

---

## Technologies Used

### Frontend
- React Native
- Expo
- JavaScript
- Axios
- Expo SecureStore
- React Navigation
- AsyncStorage for non-sensitive user metadata

### Backend
- Node.js
- Express.js
- JavaScript
- JWT authentication
- Refresh token authentication flow
- bcryptjs
- crypto
- dotenv
- cors
- nodemon
- MariaDB / MySQL driver

### Database
- MariaDB
- SQL
- Relational schema with primary and foreign keys

### Tools
- Postman
- GitHub
- Visual Studio Code

---

## Main Features

### User Features
- User registration and login
- Secure authentication using JWT access tokens and refresh tokens
- Secure local token storage using Expo SecureStore
- Browse available theatre shows
- Search shows by title, theatre name, or location
- View show details and available showtimes
- View seat availability per showtime
- Select seats and create reservations
- View reservation history
- Modify future reservations
- Cancel reservations
- Logout with refresh token revocation

### Admin Features
- Admin dashboard
- Add new shows
- Add new showtimes
- View and manage shows
- Activate or deactivate shows
- View and manage showtimes
- Activate or deactivate showtimes

---

## System Architecture

The application follows a distributed client-server architecture.

```text
React Native Mobile App
        |
        | HTTP requests using Axios
        v
Node.js / Express REST API
        |
        | SQL queries through database services
        v
MariaDB Database
```

### Frontend Application Flow

The frontend is organised around screens, components, services, and navigation.

```text
User opens the mobile app
        |
        v
App.js
        |
        v
AppNavigator.js
        |
        v
Screen component
        |
        v
Reusable UI components
        |
        v
Frontend service layer
        |
        v
Axios API instance
        |
        v
Backend REST API
```

Example user reservation flow:

```text
ShowsScreen
        |
        | calls getShows()
        v
showService.js
        |
        | uses API.get('/shows')
        v
Backend /shows endpoint
        |
        v
ShowDetailsScreen
        |
        | calls getShowtimesByShowId()
        v
SeatSelectionScreen
        |
        | calls getSeatsByShowtimeId()
        | calls createReservation() or updateReservation()
        v
Reservation endpoint
```

The frontend services are responsible for calling the backend API, while the screens focus on page-level state, navigation, and user interaction. Reusable UI blocks such as cards, buttons, inputs, seat legends, and seat grids are separated into the `components` folder.

### Backend Application Flow

The backend follows a layered Express architecture.

```text
Incoming HTTP request
        |
        v
server.js
        |
        v
Express route
        |
        v
Middleware
        |
        v
Controller
        |
        v
Service
        |
        v
Database query
        |
        v
MariaDB
        |
        v
JSON response returned to frontend
```

Example reservation request flow:

```text
POST /reservations
        |
        v
reservationRoutes.js
        |
        v
authMiddleware.js
        |
        v
reservationController.js
        |
        v
reservationService.js
        |
        v
MariaDB transaction
        |
        v
reservation + reservation_seats records
        |
        v
JSON success/error response
```

The routes define the available endpoints. Middleware checks authentication and admin access where required. Controllers handle request validation and HTTP responses. Services contain business logic, SQL queries, transactions, and database operations.

---

## Project Structure

```text
TheaterConnection/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── database/
│   │   ├── schema.sql
│   │   └── seed.sql
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── navigation/
│   │   ├── screens/
│   │   ├── services/
│   │   └── styles/
│   ├── app.json
│   ├── package.json
│   └── App.js
│
├── README.md
└── .gitignore
```

---

## Database Setup

1. Create a MariaDB database:

```sql
CREATE DATABASE theater_reservation_db;
```

2. Select the database:

```sql
USE theater_reservation_db;
```

3. Import the database schema:

```sql
SOURCE backend/database/schema.sql;
```

4. Import the seed data:

```sql
SOURCE backend/database/seed.sql;
```

Alternatively, the SQL files can be imported manually using a database tool such as phpMyAdmin, HeidiSQL, DBeaver, or the MariaDB command line.

---

## Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

The `npm install` command installs all backend dependencies listed in `backend/package.json`, including Express, MariaDB/MySQL database driver, JWT, bcryptjs, dotenv, cors, and nodemon.

Create a `.env` file based on `.env.example`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_database_password
DB_NAME=theater_reservation_db
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

The backend should run on:

```text
http://localhost:5000
```

### Backend Dependency Notes

If dependencies need to be installed manually, the main backend packages are:

```bash
npm install express mysql2 bcryptjs jsonwebtoken dotenv cors
npm install --save-dev nodemon
```

However, this is normally not required if `package.json` and `package-lock.json` are included. Running `npm install` inside the backend folder is enough.

---

## Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

The `npm install` command installs all frontend dependencies listed in `frontend/package.json`, including React Native, Expo, Axios, React Navigation, Expo SecureStore, and other required packages.

Update the API base URL in:

```text
frontend/src/services/api.js
```

Example:

```js
const API = axios.create({
  baseURL: 'http://YOUR_LOCAL_IP:5000'
});
```

When testing on a physical mobile device, use the local IPv4 address of the computer running the backend server.

Start the Expo app:

```bash
npx expo start -c
```

Then scan the QR code using Expo Go or run the app on an emulator/device.

### Frontend Dependency Notes

If dependencies need to be installed manually, the main frontend packages are:

```bash
npm install axios
npx expo install expo-secure-store
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

However, this is normally not required if `package.json` and `package-lock.json` are included. Running `npm install` inside the frontend folder is enough.

---

## Demo Accounts

### Admin Account

```text
Email: mobile@test.com
Password: 123456
Role: admin
```

### User Account

```text
Email: giannis@test.gr
Password: 123456
Role: user
```

A new user can also be created from the registration screen.

---

## Main API Endpoints

### Authentication

```text
POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout
GET  /auth/profile
```

### Public/User Endpoints

```text
GET    /theatres
GET    /shows
GET    /shows?search=value
GET    /shows/:id
GET    /showtimes?showId=1
GET    /seats?showtimeId=1
GET    /reservations/user
POST   /reservations
PUT    /reservations/:id
DELETE /reservations/:id
```

### Admin Endpoints

```text
GET   /admin/shows
POST  /admin/shows
PATCH /admin/shows/:id/activate
PATCH /admin/shows/:id/deactivate

GET   /admin/showtimes
POST  /admin/showtimes
PATCH /admin/showtimes/:id/activate
PATCH /admin/showtimes/:id/deactivate
```

---

## Security Features

- Passwords are hashed using bcrypt before being stored in the database.
- Authentication uses JWT access tokens.
- Refresh tokens are stored server-side as hashed values.
- Refresh tokens can be revoked during logout.
- Mobile tokens are stored using Expo SecureStore.
- Protected routes require a valid Bearer token.
- Admin routes require both authentication and admin authorization.

---

## Reservation Consistency

The reservation system prevents double booking by using:

- Database transactions
- Row-level checks
- Seat availability validation
- A unique database constraint on seat and showtime reservations

This ensures that the same seat cannot be reserved twice for the same showtime, even if multiple users attempt to book at the same time.

---

## Notes for Running the Project

The `node_modules` folders are not included in the repository. After cloning the project, dependencies must be installed separately in both the backend and frontend folders using:

```bash
npm install
```

The `.env` file is also not included for security reasons. A local `.env` file must be created manually in the backend folder.

---

## Known Limitations

- The API base URL must be manually updated in the frontend depending on the local network IP address.
- The admin Add Showtime form uses manual input with validation instead of dropdown selection to avoid mobile Picker stability issues.
- The application is designed for coursework/demo purposes and is not deployed to a production server.

---

## Author

Developed for the CN6035 Mobile & Distributed Systems coursework.
