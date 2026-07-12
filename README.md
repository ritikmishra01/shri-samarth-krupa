# 🏥 Shree Samarth Krupa Diagnostic Centre

> **Trusted Diagnostic Centre for Accurate & Affordable Healthcare**
> Full-Stack Pathology Laboratory Website — Production Ready

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org)
[![MySQL](https://img.shields.io/badge/MySQL-8-orange.svg)](https://mysql.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-teal.svg)](https://tailwindcss.com)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Default Admin Credentials](#default-admin-credentials)

---

## ✨ Features

### Public Website
- 🎨 Premium healthcare UI with glassmorphism & animations
- 🌙 Dark mode toggle
- 📱 Fully responsive (mobile-first)
- ⚡ Framer Motion page transitions
- 🔍 Instant test search
- 📦 Health package comparison table
- 📅 Online appointment booking
- 💬 WhatsApp booking integration
- 🏠 Home sample collection info
- 🖼️ Gallery with lightbox
- ⭐ Patient testimonials
- ❓ FAQ accordion
- 📍 Google Maps integration
- 💬 Floating WhatsApp + Call buttons
- 🔢 Animated statistics
- 📧 Contact form

### Admin Panel
- 🔐 JWT authentication
- 📊 Dashboard with Chart.js analytics
- 📅 Appointment management (CRUD + status)
- 🧪 Tests management (CRUD)
- 📦 Packages management (CRUD)
- 🖼️ Gallery management (upload/delete)
- ⭐ Testimonial approval system
- 📧 Contact message management
- ❓ FAQ management
- 🎯 Sunday offers management
- ⚙️ Website settings editor (no code changes needed)

### Technical
- 🔒 JWT + HttpOnly cookie auth
- 🛡️ bcrypt password hashing
- 🚦 Rate limiting
- ✅ Input validation
- 🔄 Centralized error handling
- 📁 Multer file uploads
- 🔒 SQL injection protection
- 🌐 CORS configured
- 📂 MVC architecture

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS 3.4 |
| Routing | React Router DOM v6 |
| HTTP | Axios |
| Forms | React Hook Form |
| Animations | Framer Motion |
| Icons | React Icons |
| Charts | Chart.js + react-chartjs-2 |
| Notifications | react-hot-toast |
| Backend | Node.js + Express.js |
| Auth | JWT + bcryptjs |
| Upload | Multer |
| Database | MySQL 8 (mysql2) |
| ORM | Raw SQL (parameterized) |

---

## 📁 Project Structure

```
shree-samarth-krupa/
├── client/                    # React frontend
│   ├── public/
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── admin/             # Admin panel pages
│   │   │   └── components/    # Admin-specific components
│   │   ├── components/
│   │   │   ├── common/        # FloatingButtons, Breadcrumb, etc.
│   │   │   ├── layout/        # Navbar, Footer, Layout
│   │   │   └── ui/            # Button, StatCard, ServiceCard, etc.
│   │   ├── context/           # ThemeContext, AuthContext
│   │   ├── hooks/             # useCountUp, useScrollTop
│   │   ├── pages/             # All public pages
│   │   ├── services/          # Axios API service
│   │   └── utils/             # Helper functions
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── server/                    # Express backend
    ├── config/
    │   └── db.js              # MySQL connection pool
    ├── controllers/           # Business logic (10 controllers)
    ├── middleware/            # auth, errorHandler, upload, etc.
    ├── models/                # DB query functions (10 models)
    ├── routes/                # Express routes (10 route files)
    ├── uploads/               # Uploaded images
    ├── utils/                 # generateToken, helpers
    ├── .env.example
    ├── database.sql           # Full MySQL schema + seed data
    ├── package.json
    └── server.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MySQL 8
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/shree-samarth-krupa.git
cd shree-samarth-krupa
```

### 2. Setup Database

```bash
mysql -u root -p < server/database.sql
```

### 3. Configure Backend

```bash
cd server
cp .env.example .env
# Edit .env with your database credentials
npm install
npm run dev
```

### 4. Configure Frontend

```bash
cd client
cp .env.example .env
# Edit .env with your API URL
npm install
npm run dev
```

The app will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

---

## 🔑 Environment Variables

### Backend (`server/.env`)

```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=shree_samarth_krupa
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
UPLOAD_PATH=uploads/
```

### Frontend (`client/.env`)

```env
VITE_API_URL=http://localhost:5000/api
VITE_WHATSAPP_NUMBER=918169686040
```

---

## 👤 Default Admin Credentials

```
Email:    admin@shreesamarth.com
Password: Admin@123
```

> ⚠️ **IMPORTANT**: Change the admin password immediately after first login!

---

## 📡 API Endpoints

See [API_DOCS.md](./API_DOCS.md) for complete API documentation.

Quick reference:

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | ❌ | Admin login |
| POST | /api/auth/logout | ✅ | Admin logout |
| GET | /api/appointments | ✅ | List appointments |
| POST | /api/appointments | ❌ | Book appointment |
| GET | /api/tests | ❌ | List tests |
| GET | /api/packages | ❌ | List packages |
| GET | /api/gallery | ❌ | Gallery images |
| GET | /api/testimonials | ❌ | Approved testimonials |
| GET | /api/faqs | ❌ | FAQ list |
| GET | /api/offers | ❌ | Sunday offers |
| POST | /api/contact | ❌ | Send message |
| GET | /api/settings | ❌ | Website settings |

---

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment guide.

Quick deploy:
- **Frontend** → Vercel
- **Backend** → Render
- **Database** → Railway MySQL

---

## 📞 Contact Information

**Center 1 (Kalyan West)**
- Address: Sai Villa, Near Ayyappa Mandir, Gauri Pada Talao Road, Kalyan West
- Phone: +91 8169686040, +91 9004525820
- Email: shreesamarthkrupadiagnostic@gmail.com

**Center 2 (Kongaon, Kalyan West)**
- Address: Shop No.04, Mahadev Drushti Complex, Near Dharma Niwas, Kongaon, Kalyan West
- Phone: +91 8169686040, +91 8766645123
- Email: shaileshdubey566@gmail.com

---

## 📄 License

© 2025 Shree Samarth Krupa Diagnostic Centre. All Rights Reserved.
