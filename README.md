# KeyGuard: Secure Authentication System (MERN Stack)

KeyGuard is a modern authentication system built with the MERN stack (MongoDB, Express.js, React, Node.js) and Vite for the frontend. It provides a robust, secure, and user-friendly authentication experience, including features such as JWT-based login, email verification, password reset via OTP, and secure password storage.

## Features

- **User Registration & Login**: Users can register and log in using their email and password.
- **JWT Authentication**: Stateless session management using JSON Web Tokens for secure authentication.
- **Email Verification**: After registration, users must verify their email address by entering a 6-digit OTP sent to their email.
- **Password Reset**: Users can reset their password by requesting a password reset OTP, verifying it, and setting a new password.
- **Secure Password Storage**: Passwords are hashed using bcrypt before being stored in the database.
- **Responsive UI**: Built with React and Tailwind CSS for a modern, responsive user interface.
- **User Context**: Global authentication state and user data management using React Context API.
- **Toast Notifications**: User feedback and error handling via react-toastify.

## Project Structure

```
.env
.gitignore
eslint.config.js
index.html
package.json
README.md
vite.config.js
public/
  favicon.png
src/
  App.jsx
  index.css
  main.jsx
  assets/
    assets.js
    header.png
    logo.png
  components/
    Header.jsx
    Navbar.jsx
  context/
    AppContext.jsx
  pages/
    EmailVerify.jsx
    Home.jsx
    Login.jsx
    ResetPassword.jsx
```

## How It Works

1. **Registration**: Users sign up with their name, email, and password. An OTP is sent to their email for verification.
2. **Email Verification**: Users enter the OTP to verify their account. Only verified users can access protected features.
3. **Login**: Users log in with their email and password. JWT tokens are used for session management.
4. **Password Reset**: Users can request a password reset OTP, verify it, and set a new password securely.
5. **User Experience**: The UI provides clear feedback and guidance throughout the authentication process.

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, React Router, React Icons, Lucide React, React Toastify, Axios
- **State Management**: React Context API
- **Linting**: ESLint
- **Backend**: (Not included in this repo, but expected to be Node.js/Express with MongoDB)

## Getting Started

1. **Install dependencies**:
   ```sh
   npm install
   ```
2. **Set up environment variables**:
   - Create a `.env` file with your backend URL:
     ```
     VITE_BACKEND_URL=https://your-backend-url.com
     ```
3. **Run the development server**:
   ```sh
   npm run dev
   ```
4. **Build for production**:
   ```sh
   npm run build
   ```

## Screenshots

- **Home Page**: Welcome message, feature highlights, and navigation.
- **Login/Sign Up**: Forms for authentication with validation and feedback.
- **Email Verification**: OTP input for verifying email.
- **Password Reset**: Multi-step process for resetting password securely.

## Author

Harshal Khairnar

---

This project provides a solid foundation for secure authentication in any MERN stack application, with a focus on user experience and security best practices.