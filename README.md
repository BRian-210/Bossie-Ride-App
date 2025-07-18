# Bossie Ride
# 🚗 Bossie Ride App

## 👤 Author
**Brian Githinji**

## 📄 Description
Bossie Ride is a single-page frontend web application inspired by ride-hailing platforms like Uber. Built using HTML, CSS, and JavaScript, the app allows users to register, log in, request rides, and track drivers in real-time. All ride data is fetched and managed using a public backend API.

This project demonstrates key concepts in web development including asynchronous API communication, DOM manipulation, event handling, and responsive UI design.


## 🧰 Technologies Used
## 🧰 Technologies Used

### 🌐 Frontend
- **HTML5** – Markup for building the structure of the app.
- **CSS3** – Styling for layouts, buttons, and responsive design.
- **JavaScript (ES6)** – Logic for handling user interactions and API communication.
- **Google Maps API** – For map display, pickup & drop-off autocomplete, and location tracking.
- **Socket.IO (Client)** – For real-time updates like driver location tracking.

### 🖥️ Backend
- **Node.js** – JavaScript runtime environment for the backend.
- **Express.js** – Web framework for handling routes and middleware.
- **MongoDB** – NoSQL database for storing users, rides, and driver info.
- **Mongoose** – ODM for interacting with MongoDB in an object-oriented way.
- **Socket.IO (Server)** – WebSocket library for real-time communication between riders and drivers.
- **PDFKit** – For generating PDF receipts after rides.
- **MPESA Daraja API (Safaricom)** – To simulate mobile payments via STK Push.



## 📦 Features
- Rider and Driver registration/login system
- Submit and save ride requests to the backend
- Real-time driver tracking using Google Maps + Socket.IO
- MPESA STK Push payment integration (Daraja API)
- Admin dashboard for monitoring ride activity
- Responsive mobile-first design
- Clean, DRY, and modular JavaScript code
- Form validation and clearing on submission

## 🛠️ Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/BRian-210/Bossie-Ride-App.git
