Secure User Management API (Node.js + PostgreSQL)

![Node.js](https://img.shields.io/badge/Node.js-v18-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v14-blue)
![License](https://img.shields.io/badge/License-MIT-lightgrey)


Production-ready authentication backend implementing:

JWT Access Tokens

Refresh Tokens

Role-Based Access (Admin/User)

Protected Routes

Password Hashing (bcrypt)

Swagger API Docs

PostgreSQL Persistence

Designed for interview-ready demonstration and real projects.

🚀 Tech Stack

Node.js / Express

PostgreSQL (pg)

JWT (jsonweb­token)

bcryptjs

Swagger (swagger-ui-express, swagger-jsdoc)

Nodemon (development)

⚠️ Security Note

Before committing code:

DO NOT commit .env
DO NOT commit node_modules


Ensure .gitignore contains:

.env
node_modules/
*.log


Design and Architecture : 
sequenceDiagram
participant U as User (Client)
participant A as API Server (Node.js / Express)
participant DB as PostgreSQL


Note over U,A: 1️⃣ Register
U->>A: POST /api/auth/register (name, email, password)
A->>DB: Hash password & save user
A-->>U: 201 Created


Note over U,A: 2️⃣ Login
U->>A: POST /api/auth/login (email, password)
A->>DB: Validate user & password
A-->>U: accessToken + refreshToken


Note over U,A: 3️⃣ Access Protected APIs
U->>A: GET /protected (Authorization: Bearer accessToken)
A->>A: Verify JWT via middleware
A-->>U: 200 OK (Authorized)


Note over U,A: 4️⃣ Refresh Token
U->>A: POST /refresh (refreshToken)
A->>DB: Validate refresh token
A-->>U: New accessToken


Note over U,A: 5️⃣ Logout
U->>A: POST /logout (refreshToken)
A->>DB: Remove refresh token
A-->>U: Logged out



📁 Project Structure
backend/
 ├── config/db.js
 ├── controllers/authController.js
 ├── middleware/
 │     ├── authMiddleware.js
 │     └── roleMiddleware.js
 ├── models/userModel.js
 ├── routes/authRoutes.js
 ├── swagger.js
 ├── app.js
 ├── server.js
 └── .env   (ignored)

🛠️ Setup & Installation
1️⃣ Install dependencies
npm install

2️⃣ Configure environment variables

Create .env:

PORT=3000

# JWT
JWT_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

# DB
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=postgres
DB_PORT=5432

3️⃣ Create Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  password TEXT,
  role VARCHAR(20) DEFAULT 'user',
  refresh_token TEXT
);

4️⃣ Run server
npm run dev

📘 API Documentation (Swagger)

Open in browser:

http://localhost:3000/docs


Use Swagger during demos to walk interviewers through endpoints.

🔐 Authentication Flow (High Level)

1️⃣ Register user
2️⃣ Login → receive:

accessToken

refreshToken

3️⃣ Access protected routes using Authorization header
4️⃣ Refresh when expired
5️⃣ Logout invalidates refresh token

🧪 Test Using Postman (Recommended)
▶ REGISTER

POST

http://localhost:3000/api/auth/register


Body (JSON):

{
  "name": "Sourabh",
  "email": "test@test.com",
  "password": "password123",
  "role": "user"
}

▶ LOGIN

POST

http://localhost:3000/api/auth/login


Body:

{
  "email": "test@test.com",
  "password": "password123"
}


Copy:

accessToken

refreshToken

▶ PROTECTED ROUTE (Requires Access Token)

GET

http://localhost:3000/api/auth/protected


Headers:

Authorization: Bearer <accessToken>

▶ ADMIN-ONLY ROUTE

(Ensure DB role is admin)

UPDATE users SET role='admin' WHERE email='test@test.com';


GET

http://localhost:3000/api/auth/admin-only

▶ REFRESH TOKEN

POST

http://localhost:3000/api/auth/refresh


Body:

{
  "refreshToken": "<refreshToken>"
}

▶ LOGOUT

POST

http://localhost:3000/api/auth/logout


Body:

{
  "refreshToken": "<refreshToken>"
}

🖼️ API Architecture Diagram (Conceptual)
Client → Login → Access Token + Refresh Token
        ↓
Protected Route ← verifies JWT via middleware
        ↓
Refresh Token → Issues new access token
        ↓
Logout → Refresh token invalidated

🧩 Future Enhancements

Password reset flow

Email verification

Docker support

CI/CD

Deployment guide

👨‍💻 Author

Sourabh
Secure backend developer — Node.js | Vue | PostgreSQL | LMS systems
