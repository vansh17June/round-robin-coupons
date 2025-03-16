# Round-Robin Coupon Distribution with Admin Panel

## Overview
This project is a **MERN stack application** that allows guest users to claim coupons in a round-robin manner while providing an **admin panel** to manage coupons.

## Features
### **User Side**
✅ Claim coupons without logging in.  
✅ Coupons are distributed in a **round-robin** fashion.  
✅ **Prevents abuse** with:
   - **IP Tracking** (prevents multiple claims from the same IP in a cooldown period).
   - **Cookie-Based Tracking** (restricts claims from the same browser session).  
✅ Displays **success/error messages** after claiming.

### **Admin Panel**
✅ **Secure login/logout** for admin users.  
✅ **View all coupons** (both available and claimed).  
✅ **Create new coupons** dynamically.  
✅ **Delete coupons** when needed.  


## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Security**: Cookie-based and IP tracking

## Dependencies
### **Backend Dependencies**
Install the required dependencies:
```sh
npm install express mongoose dotenv cors cookie-parser jsonwebtoken bcryptjs
```
#### **Backend Dependencies Explained:**
- `express` → Web framework for handling API requests.
- `mongoose` → Connects to MongoDB and manages schemas.
- `dotenv` → Loads environment variables from `.env`.
- `cors` → Enables cross-origin requests.
- `cookie-parser` → Parses cookies for session tracking.
- `jsonwebtoken` → Handles authentication using JWT tokens.
- `bcryptjs` → Hashes passwords for security.

### **Frontend Dependencies**
Install the required dependencies:
```sh
npm install react-router-dom axios tailwindcss
```
#### **Frontend Dependencies Explained:**
- `react-router-dom` → Manages frontend navigation.
- `axios` → Handles API requests.
- `tailwindcss` → Provides utility-based styling for the UI.

## Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/vansh17June/round-robin-coupons.git
cd round-robin-coupons
```

### 2️⃣ Install Dependencies
Run the following command to install dependencies for both frontend and backend:
```sh
npm install
```

### 3️⃣ Backend Setup
```sh
cd backend
npm install
cp .env.example .env  # Create a .env file and update it with your values
npm start
```
**Backend runs on:** `http://localhost:4000`

### 4️⃣ Frontend Setup
```sh
cd frontend
npm install
cp .env.example .env  # Create a .env file and update it with your values
npm run dev
```
**Frontend runs on:** `http://localhost:5173`

## Environment Variables
Create a `.env` file in both frontend and backend and add the following values:

### **Backend (`backend/.env`)**
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
PORT=4000
```

### **Frontend (`frontend/.env`)**
```
VITE_API_BASE_URL=http://localhost:4000
```

## API Endpoints
### **User API**
- `POST /api/coupons/claim` → Claim a coupon.

### **Admin API**
- `POST /api/admin/signup` → Register an admin.
- `POST /api/admin/login` → Admin login.
- `GET /api/admin/coupons` → Get all coupons.
- `POST /api/admin/add` → Add a new coupon.
- `DELETE /api/admin/delete/:id` → Delete a coupon.

## Deployment
### 1️⃣ Deploy Backend
- Use **Render, Heroku, or DigitalOcean** to deploy the backend.
- Update `FRONTEND_URL` in `.env` with your deployed frontend URL.

### 2️⃣ Deploy Frontend
- Use **Vercel or Netlify** to deploy the frontend.
- Update `VITE_API_BASE_URL` in `.env` with your deployed backend URL.

## Notes
- **Free hosting services may take some time** to process backend requests.
- Ensure **CORS is correctly configured** for production.



---

**🔗 Created with ❤️ by [Vansh]**
