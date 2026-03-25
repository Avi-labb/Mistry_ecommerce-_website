#  Mistry E-Commerce Web Application

A full-stack e-commerce web application with **user and admin roles**, secure authentication using **JWT (Access & Refresh Tokens)**, and a complete shopping experience.

---

###  User Features

* User Registration & Login
* Secure Authentication (JWT + Refresh Token)
* Browse Products
* Add to Cart & Purchase Products
* View Orders (Meesho-like order tracking experience)
* Responsive UI

---

###  Admin Features

* Admin Login & Registration
* Add / Edit / Delete Products
* Upload Product Images (Cloudinary)
* Dashboard Overview:

  * Total Users
  * Total Products
  * Total Orders
* Manage Users & Products

---

##  Authentication

* JWT-based authentication
* Access Token (short-lived)
* Refresh Token (secure session handling)

---

##  Tech Stack

### Frontend

* React.js
* Axios
* Tailwind CSS / CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### Other Tools

* Cloudinary (Image Upload)
* JWT (Authentication)

---

##  Project Structure

/client   → React Frontend
/server   → Node + Express Backend

---

##  Installation & Setup

### 1️ Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### 2️ Install dependencies

#### Frontend

```bash
cd client
npm install
npm run dev
```

#### Backend

```bash
cd server
npm install
npm start
```

---

### 3️ Environment Variables

Create `.env` file in backend:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

##  Screenshots

(Add your project screenshots here)

---

##  Live Demo

(Add your deployed link here)

---

##  Future Improvements

* Payment Gateway Integration
* Order Tracking Status Updates
* Admin Analytics Dashboard
* Wishlist Feature

---

## 👨 Author

**Avi Kushwaha**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
