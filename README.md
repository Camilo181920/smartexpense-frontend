# 💰 SmartExpense

A full-stack personal finance management system built with **Spring Boot** and **React** that allows users to securely manage expenses, analyze spending habits, and visualize financial statistics.

---

## ✨ Features

* 🔐 Secure authentication with JWT
* 👤 User registration and login
* 💸 Expense management (CRUD)
* 📊 Financial dashboard
* 📈 Expense statistics by category
* 📚 REST API documentation with Swagger
* 🐳 Docker support
* ⚙️ GitHub Actions CI

---

## 🛠 Tech Stack

### Backend

* Java 21
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA / Hibernate
* PostgreSQL
* Maven
* Swagger (OpenAPI)
* Docker

### Frontend

* React 19
* Vite
* Tailwind CSS
* Axios
* React Router
* Chart.js

### DevOps

* Docker
* Docker Compose
* GitHub Actions
* Multi-stage Docker Builds

---

## 🏗 Architecture

```text
                React + Vite
                      │
                Axios REST API
                      │
              Spring Boot API
                      │
         Spring Security + JWT
                      │
              PostgreSQL Database
```

---

## 🚀 Getting Started

### Clone the repositories

```bash
git clone <backend-repository>

git clone <frontend-repository>
```

---

### Backend

```bash
cd SmartExpense
./mvnw spring-boot:run
```

---

### Frontend

```bash
cd smart-expense-frontend
npm install
npm run dev
```

---

## 🐳 Running with Docker

```bash
docker compose up --build
```

Frontend:

```
http://localhost:8081
```

Backend:

```
http://localhost:8080
```

Swagger:

```
http://localhost:8080/swagger-ui/index.html
```

---

## ⚙️ Environment Variables

### Backend

```env
DB_URL=
DB_USER=
DB_PASS=
JWT_SECRET=
CORS_ORIGINS=
```

### Frontend

```env
VITE_API_URL=
```

---

## 📁 Project Structure

### Backend

```
controller/
service/
repository/
entity/
dto/
security/
mapper/
exception/
config/
```

### Frontend

```
components/
pages/
context/
services/
routes/
api/
utils/
```

---

## 📷 Screenshots

Screenshots of the application will be added soon.

---

## 🔮 Future Improvements

* Monthly reports
* Budget management
* Export to PDF/Excel
* Email notifications
* Dark mode
* Unit and integration tests for the frontend
* CI/CD deployment

---

## 👨‍💻 Author

Developed as a portfolio project to demonstrate full-stack development, REST API design, authentication with JWT, Docker containerization, and modern React development.
