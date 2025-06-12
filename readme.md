# Authentication System – Server

A Node.js-based authentication system with user registration, login, email verification, and password reset features. Built with Express, MongoDB, JWT, and Nodemailer.

## Features

- **User Registration & Login**
  - Register with name, email, and password (hashed with bcrypt)
  - Login issues a JWT token stored in an HTTP-only cookie

- **Email Verification**
  - Send OTP to user’s email for account verification
  - Verify account by submitting OTP

- **Password Reset**
  - Send OTP to user’s email for password reset
  - Reset password by submitting OTP and new password

- **User Info**
  - Authenticated endpoint to fetch user profile info

- **Security**
  - JWT-based authentication
  - HTTP-only cookies
  - CORS with configurable allowed origins

- **Email Notifications**
  - Nodemailer for sending OTPs and welcome emails

## Folder Structure

```
server/
│
├── app.js                # Express app setup
├── server.js             # Entry point, starts server and connects DB
├── package.json
├── .env                  # Environment variables (not committed)
│
├── controllers/
│   ├── auth.controller.js
│   └── user.controller.js
│
├── middleware/
│   └── userAuth.js
│
├── models/
│   └── user.model.js
│
├── routes/
│   ├── auth.route.js
│   └── user.route.js
│
└── utils/
    ├── db.js
    └── nodemailer.js
```

## Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```
PORT=4000
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ALLOWED_ORIGIN=http://localhost:3000
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SERVICE=your_smtp_service
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
SENDER_EMAIL=your_email@example.com
NODE_ENV=development
```

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Set up environment variables:**  
   Copy `.env.example` to `.env` and fill in your values.

3. **Start the server:**
   ```sh
   npm run server
   ```
   or
   ```sh
   npm start
   ```

4. **API Endpoints:**

   - `POST   /api/auth/register`
   - `POST   /api/auth/login`
   - `POST   /api/auth/logout`
   - `POST   /api/auth/send-verify-otp`
   - `POST   /api/auth/verify-account`
   - `GET    /api/auth/is-authenticated`
   - `POST   /api/auth/send-password-reset-otp`
   - `POST   /api/auth/reset-password`
   - `GET    /api/user/user-info`

## License

ISC

---

**Author:** Harshal Khairnar