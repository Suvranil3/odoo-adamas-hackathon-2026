# HRMS - Human Resource Management System

> A modern Human Resource Management System (HRMS) built for the **Odoo x Adamas Hackathon 2026**.

---

## Team

| Name | Role |
|------|------|
| Sayan Biswas | Frontend Developer |
| Suvranil | Backend & Database Developer |
| Team Member 3 | Integration & Testing |

---

# Project Overview

The Human Resource Management System (HRMS) is a web-based application designed to simplify and digitize HR operations inside an organization.

The platform provides dedicated dashboards for both **Employees** and **HR/Admins**, allowing secure management of:

- Employee Profiles
- Attendance
- Leave Requests
- Payroll
- Employee Management
- Leave Approval
- Authentication
- Role-Based Access

---

# Problem Statement

Traditional HR systems often rely on manual workflows that result in:

- Attendance errors
- Payroll delays
- Inefficient leave management
- Poor employee record organization
- Lack of centralized HR data

Our solution digitizes these processes into one unified platform.

---

# Features

## Authentication

- Secure Login
- Employee Login
- Admin Login
- JWT Authentication (Backend)
- Password Encryption
- Role-Based Authorization

---

## Employee Features

- Employee Dashboard
- Employee Profile
- Attendance Tracking
- Check In / Check Out
- Leave Requests
- Leave Calendar
- Payroll View
- Notifications

---

## Admin Features

- Admin Dashboard
- Employee Management
- Attendance Management
- Leave Approval
- Payroll Management
- Employee Search
- Employee Filters
- Analytics Dashboard

---

# Tech Stack

## Frontend

- HTML5
- Tailwind CSS
- Vanilla JavaScript

---

## Backend

- Node.js
- Express.js

---

## Database

- MySQL

---

## Authentication

- JWT
- bcrypt

---

## Development Tools

- VS Code
- Git
- GitHub
- Postman
- Copilot
- ChatGPT
- Google Stitch (UI Prototyping)

---

# Project Structure

```
HRMS
│
├── frontend
│   ├── loginpage.html
│   ├── admin_login.html
│   ├── master_sign_up.html
│   │
│   ├── employee_landing_page.html
│   ├── employee_attendance_section.html
│   ├── employee_details_page.html
│   ├── employee_management.html
│   ├── employee_payroll.html
│   ├── time_off_section.html
│   │
│   ├── admin_landing_page.html
│   ├── admin_attendance_section.html
│   ├── leave_approval.html
│   ├── admin_payroll.html
│   │
│   ├── style.css
│   │
│   ├── script.js
│   ├── employee_landing.js
│   ├── employee_details.js
│   ├── employee_attendance.js
│   ├── employee_management.js
│   ├── employee_payroll.js
│   ├── admin_landing.js
│   ├── admin_attendance.js
│   ├── admin_payroll.js
│   ├── leave_approval.js
│   ├── time_off.js
│   │
│   └── assets/
│
├── backend
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── config/
│   ├── utils/
│   ├── validators/
│   ├── database/
│   ├── app.js
│   └── server.js
│
├── README.md
└── LICENSE
```

---

# Workflow

```
User

↓

Login

↓

Authentication

↓

Role Detection

↓

Employee Dashboard
OR
Admin Dashboard

↓

API Calls

↓

Express Server

↓

Controllers

↓

Services

↓

MySQL Database

↓

JSON Response

↓

Frontend Updates
```

---

# Employee Workflow

```
Employee Login

↓

Dashboard

↓

Attendance

↓

Leave Requests

↓

Payroll

↓

Profile

↓

Logout
```

---

# Admin Workflow

```
Admin Login

↓

Dashboard

↓

Employee Management

↓

Attendance Management

↓

Leave Approval

↓

Payroll Management

↓

Logout
```

---

# Database Design

Main Tables

- Users
- Employees
- Admins
- Departments
- Roles
- Attendance
- Leave Requests
- Payroll
- Sessions
- Notifications

Relationships

```
Department
     │
     │
Employee
     │
 ┌───┼───────────┐
 │   │           │
Attendance    Leave
 │             │
 └──── Payroll ┘
```

---

# Frontend Pages

## Authentication

- Login
- Admin Login
- Sign Up

---

## Employee

- Dashboard
- Attendance
- Profile
- Leave Calendar
- Payroll

---

## Admin

- Dashboard
- Employee Management
- Attendance Management
- Leave Approval
- Payroll Management

---

# API Architecture

```
Frontend

↓

JavaScript

↓

REST API

↓

Express Routes

↓

Controllers

↓

Services

↓

Database

↓

JSON

↓

Frontend
```

---

# Security

- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes
- Role-Based Access
- Input Validation
- SQL Injection Prevention
- Environment Variables
- CORS
- Helmet
- Rate Limiting

---

# Development Process

## Phase 1

Project Planning

- Requirement Analysis
- UI Planning
- Page Flow
- Wireframing

---

## Phase 2

Frontend

- Authentication Pages
- Employee Pages
- Admin Pages
- Navigation
- Responsive Design

---

## Phase 3

Backend

- Express Setup
- Database Design
- Authentication
- CRUD APIs

---

## Phase 4

Integration

- Frontend ↔ Backend
- API Integration
- Authentication
- Validation

---

## Phase 5

Testing

- Navigation
- Authentication
- Attendance
- Leave
- Payroll
- CRUD Operations

---

# Future Improvements

- Email Notifications
- Real-Time Attendance
- Analytics Dashboard
- PDF Payslip Download
- Calendar Sync
- Employee Performance Module
- Mobile Responsive Improvements
- Audit Logs
- Multi-Company Support

---

# Coding Standards

- Modular JavaScript
- Clean Folder Structure
- Reusable Components
- Consistent Naming
- Responsive Design
- Accessibility Friendly
- Minimal Code Duplication

---

# Git Workflow

```
main
│
├── frontend
│
├── backend
│
├── feature/auth
│
├── feature/attendance
│
├── feature/payroll
│
└── feature/leave
```

Commit Format

```
feat: add employee dashboard

fix: attendance filtering

refactor: improve payroll module

docs: update README

style: improve responsiveness
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Frontend

Open:

```
frontend/loginpage.html
```

or serve with Live Server.

---

## Backend

```bash
cd backend
npm install
npm run dev
```

---

## Database

Create a MySQL database.

Import the SQL schema.

Update the `.env` file.

---

# Environment Variables

```
PORT=

DB_HOST=

DB_PORT=

DB_USER=

DB_PASSWORD=

DB_NAME=

JWT_SECRET=
```

---

# Testing Checklist

- Login
- Logout
- Employee Dashboard
- Admin Dashboard
- Attendance
- Leave Requests
- Payroll
- Employee CRUD
- API Responses
- Database Connection
- Responsive UI

---

# Contributors

**Frontend**
- Sayan Biswas

**Backend & Database**
- Suvranil Ghatak

**Integration & Testing**
- Rohi Mondal

---

# License

This project was developed for the **Odoo x Adamas Hackathon 2026** for educational and competition purposes.

---

# Acknowledgements

- Odoo
- Adamas University
- Open Source Community
- Tailwind CSS
- Express.js
- Node.js
- MySQL

---


Made with ❤️ by Team HRMS.