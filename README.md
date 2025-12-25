Healthcare Appointment Booking System - (Angular, ASP.NET Core Web API, SQL Server)

A full-stack healthcare scheduling platform that enables patients to book appointments, doctors to manage availability, and administrators to oversee the system through role-based workflows.

Project Overview:
- The Healthcare Appointment Booking System digitizes medical appointment management by replacing manual scheduling with a secure, role-driven web platform.
- Patients can book and track appointments online
- Doctors manage schedules and upcoming consultations
- Administrators control users, roles, and reporting

The system was built with clean separation of concerns to ensure predictable behavior, secure access, and long-term maintainability.

User Roles & Flows:
- Patient:
	- Register and authenticate securely
	- Browse available doctors and time slots
	- Book, view, and track appointment history
	- Receive appointment status updates

- Doctor:
	- Manage availability and schedules
	- View assigned patient appointments
	- Track daily and upcoming consultations

- Admin:
	- Manage doctors and patients
	- Enforce role-based access
	- Monitor system usage and reports

Features:
- Secure authentication using JWT
- Role-based dashboards (Patient, Doctor, Admin)
- Appointment booking and scheduling
- Doctor availability management
- Patient appointment history
- Admin reporting and oversight

Tech Stack:
- Frontend:
	- Angular
	- TypeScript
	- SCSS
	- Angular Router
	- RxJS

- Backend:
	- ASP.NET Core Web API
	- C#
	- Entity Framework Core
	- LINQ

- Database:
	- SQL Server
	- Architecture & Security
	- JWT Authentication
	- Role-Based Access Control (RBAC)

- SOLID principles:
	- Service / Repository pattern

Project Structure:
- /Backend    → ASP.NET Core Web API
- /hcas        → Angular frontend
- /db         → SQL scripts

Setup & Run:
- Backend:
	- dotnet restore
	- dotnet run

- Frontend:
	- npm install
	- ng serve

Production Build:
- ng build --configuration production

Links:
- Live Demo: Coming Soon
- GitHub Repository: This Repo
