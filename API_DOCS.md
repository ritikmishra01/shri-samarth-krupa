# 📡 API Documentation — Shree Samarth Krupa Diagnostic Centre

**Base URL (Development)**: `http://localhost:5000/api`  
**Base URL (Production)**: `https://your-render-api.onrender.com/api`

**Authentication**: JWT via HttpOnly Cookie or `Authorization: Bearer <token>` header

---

## 🔐 Authentication

### POST /api/auth/login
Login as admin.

**Request Body:**
```json
{
  "email": "admin@shreesamarth.com",
  "password": "Admin@123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@shreesamarth.com",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### POST /api/auth/logout
Logout (clears cookie).

**Response (200):**
```json
{ "success": true, "message": "Logged out successfully" }
```

---

### GET /api/auth/me *(Protected)*
Get current admin info.

**Headers:** `Authorization: Bearer <token>` OR cookie

**Response (200):**
```json
{
  "success": true,
  "user": { "id": 1, "name": "Admin", "email": "...", "role": "admin" }
}
```

---

### PUT /api/auth/change-password *(Protected)*
Change admin password.

**Request Body:**
```json
{ "oldPassword": "Admin@123", "newPassword": "NewPass@456" }
```

---

## 📅 Appointments

### GET /api/appointments *(Protected)*
Get all appointments with filters.

**Query Params:**
- `status` — pending | confirmed | completed | cancelled
- `date` — YYYY-MM-DD
- `search` — patient name
- `page` — default 1
- `limit` — default 10

**Response (200):**
```json
{
  "success": true,
  "data": [...],
  "pagination": { "page": 1, "limit": 10, "total": 50, "pages": 5 }
}
```

---

### GET /api/appointments/:id *(Protected)*

---

### POST /api/appointments
Book a new appointment (public).

**Request Body:**
```json
{
  "patient_name": "Rajesh Sharma",
  "mobile": "9876543210",
  "email": "rajesh@example.com",
  "address": "Kalyan West",
  "test_name": "CBC",
  "package_name": "",
  "preferred_date": "2025-02-01",
  "preferred_time": "09:00",
  "home_collection": true,
  "notes": "Please call before coming"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Appointment booked successfully",
  "appointmentId": 42
}
```

---

### PUT /api/appointments/:id *(Protected)*
Update appointment.

---

### PATCH /api/appointments/:id/status *(Protected)*
Update appointment status.

**Request Body:**
```json
{ "status": "confirmed" }
```

---

### DELETE /api/appointments/:id *(Protected)*

---

## 🧪 Tests

### GET /api/tests
Get all tests (public).

**Query Params:** `search`, `category`, `page`, `limit`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Complete Blood Count (CBC)",
      "category": "blood",
      "description": "...",
      "preparation": "...",
      "sample_type": "Blood",
      "price": 250,
      "is_active": 1
    }
  ]
}
```

---

### GET /api/tests/:id

### POST /api/tests *(Protected)*

**Request Body:**
```json
{
  "name": "CBC",
  "category": "blood",
  "description": "Complete blood count...",
  "preparation": "No special preparation",
  "sample_type": "Blood",
  "price": 250
}
```

### PUT /api/tests/:id *(Protected)*
### DELETE /api/tests/:id *(Protected)*

---

## 📦 Packages

### GET /api/packages

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Basic Health Package",
      "price": 1300,
      "description": "...",
      "includes": ["CBC", "Blood Sugar", "Thyroid Profile", "KFT", "LFT", "Lipid Profile", "Urine Examination"],
      "is_featured": 0
    }
  ]
}
```

### POST /api/packages *(Protected)*
### PUT /api/packages/:id *(Protected)*
### DELETE /api/packages/:id *(Protected)*

---

## 🖼️ Gallery

### GET /api/gallery
**Query Params:** `category` (reception|laboratory|equipment|sample_collection), `page`, `limit`

### POST /api/gallery *(Protected)*
Upload image (multipart/form-data).

**Form Fields:**
- `image` — image file
- `title` — image title
- `category` — reception|laboratory|equipment|sample_collection

### DELETE /api/gallery/:id *(Protected)*

---

## ⭐ Testimonials

### GET /api/testimonials
**Query Params:** `status` (approved for public), `page`, `limit`

### POST /api/testimonials
Submit a review (public).

**Request Body:**
```json
{
  "patient_name": "Priya Patel",
  "rating": 5,
  "review": "Excellent service and accurate reports!"
}
```

### PATCH /api/testimonials/:id/status *(Protected)*
**Request Body:** `{ "status": "approved" }` or `{ "status": "rejected" }`

### DELETE /api/testimonials/:id *(Protected)*

---

## ❓ FAQs

### GET /api/faqs
**Query Params:** `category`

### POST /api/faqs *(Protected)*
### PUT /api/faqs/:id *(Protected)*
### DELETE /api/faqs/:id *(Protected)*

---

## 🎯 Offers (Sunday Camp)

### GET /api/offers
### POST /api/offers *(Protected)*
### PUT /api/offers/:id *(Protected)*
### DELETE /api/offers/:id *(Protected)*

---

## 📧 Contact

### POST /api/contact
Send a contact message (public).

**Request Body:**
```json
{
  "name": "Amit Kumar",
  "email": "amit@example.com",
  "mobile": "9876543210",
  "subject": "Enquiry about home collection",
  "message": "I want to know if you provide home collection in Kalyan East..."
}
```

### GET /api/contact *(Protected)*
### GET /api/contact/:id *(Protected)*
### PATCH /api/contact/:id/read *(Protected)*
### DELETE /api/contact/:id *(Protected)*

---

## ⚙️ Settings

### GET /api/settings
Get all website settings (public).

**Response:**
```json
{
  "success": true,
  "data": {
    "hero_heading": "Trusted Diagnostic Centre in Kalyan",
    "hero_subtitle": "Accurate Diagnostic Services...",
    "stat_tests": "100+",
    "stat_centers": "2",
    "stat_years": "8+",
    "stat_patients": "5000+",
    "working_hours_weekday": "Mon-Sat: 7:00 AM - 9:00 PM",
    "working_hours_sunday": "Sun: 7:00 AM - 2:00 PM"
  }
}
```

### PUT /api/settings *(Protected)*
Update multiple settings at once.

**Request Body:**
```json
{
  "hero_heading": "New Heading",
  "hero_subtitle": "New subtitle"
}
```

---

## ❌ Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // validation errors if any
}
```

**Common Status Codes:**
- `200` — Success
- `201` — Created
- `400` — Bad Request / Validation Error
- `401` — Unauthorized
- `403` — Forbidden
- `404` — Not Found
- `422` — Unprocessable Entity (validation)
- `429` — Too Many Requests (rate limited)
- `500` — Internal Server Error
