# URL Shortener

A production-ready URL Shortener built using **Node.js, Express.js, MongoDB, JWT Authentication, Redis Caching, and QR Code Generation**.

The application allows authenticated users to generate short URLs, redirect users efficiently, track click analytics, and share links easily using QR codes.

---

##  Features

-  JWT Authentication using HTTP-only Cookies
-  Generate unique short URLs using NanoID
-  Click Analytics with visit history
-  QR Code generation for every shortened URL
-  Redis caching for faster URL redirection
-  User-specific URL management
-  Role-based authorization (Admin & Normal User)
-  Server-side rendering using EJS

---

##  Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Redis
- NanoID
- QRCode

### Frontend

- EJS
- HTML
- CSS

---

##  Project Structure

```
URL-P/
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── views/
├── config/
├── app.js
├── package.json
└── README.md
```

---

##  Architecture

```
                 User
                  │
                  ▼
           Express Server
                  │
         Authentication (JWT)
                  │
                  ▼
            URL Controller
                  │
        ┌─────────┴──────────┐
        │                    │
        ▼                    ▼
      Redis              MongoDB
(Cache Hit/Miss)      URL Mapping
        │                    │
        └─────────┬──────────┘
                  ▼
            Redirect User
```

---

## Working Flow

1. User logs in using JWT authentication.
2. User enters a long URL.
3. NanoID generates a unique 8-character Short ID.
4. URL mapping is stored in MongoDB.
5. A QR Code is generated for the shortened URL.
6. When a user opens the short URL:
   - Redis is checked first.
   - On cache hit → Redirect immediately.
   - On cache miss → Fetch from MongoDB → Store in Redis → Redirect.
7. Every visit is recorded for analytics.

---

##  Analytics

The application tracks:

- Total Clicks
- Visit History
- Timestamp of every click

---

##  Future Improvements

- Docker Support
- AWS S3 Integration
- Rate Limiting
- URL Expiration
- Custom Alias Support
- Kafka/RabbitMQ for Async Analytics
- Horizontal Scaling
- MongoDB Sharding

---

##  Authentication

- JWT Token
- HTTP-only Cookies
- Role Based Authorization

---

##  QR Code

Every generated short URL automatically includes a QR Code that users can scan to open the URL directly from mobile devices.

---

## Redis Caching

Frequently accessed URLs are cached in Redis.

Flow:

```
Client
   │
Redis
 │    │
Hit  Miss
 │      │
 ▼      ▼
Redirect MongoDB
         │
         ▼
     Store in Redis
         │
         ▼
      Redirect
```

This reduces database load and improves response latency.

---

##  Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Start MongoDB

Start Redis

Run the server

```bash
npm start
```

---

##  API Endpoints

### Generate Short URL

```
POST /url
```

### Redirect

```
GET /:shortId
```

### Analytics

```
GET /url/analytics/:shortId
```

---
