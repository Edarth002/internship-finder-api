Internship Finder
Location‑Based Internship Finder for Computer Science Students Using Career Path Preferences and Real‑time Availability Data

Internship Finder helps computer science students find nearby internships that match their preferences. Students create a profile with their interests and location, and the platform fetches internships from an external job source or seeded data. It uses geolocation to filter and sort relevant listings and allows students to apply and track their submissions.

✨ Key Features

Feature Description
🔐 Authentication Secure login and registration with hashed passwords
📍 Student Profile Students input their city, state, and career interests
🌍 Geolocation Matching Calculates distance between internships and user location using Haversine formula
💼 Internship Listings Fetched from external source
📨 Apply to Internships Students can apply and track their applications
📄 Dashboard View saved and applied internships

🛠️ Tech Stack
Layer Technology
Frontend Next.js 14, React, Tailwind CSS
Backend Node.js, Express.js, TypeScript
Database MySQL
ORM Prisma ORM
Auth JSON Web Tokens (JWT), bcrypt
Hosting Vercel (Frontend), Railway (Backend + MySQL)
Geolocation Custom Haversine formula logic

📁 Project Structure

internship-finder/
├── app/ # Next.js frontend
│ ├── login/ # Login form
│ ├── register/ # Register form
│ ├── profile/ # Student profile setup
│ ├── internships/ # Internship listings + details
│ ├── dashboard/ # User dashboard to track applications
├── backend/ # Express.js backend
│ ├── controllers/ # Business logic
│ ├── routes/ # Express routes
│ ├── middleware/ # Auth middleware
│ ├── utils/
│ │ └── geolocation.ts # Haversine formula
│ └── prisma/ # Prisma client setup
│ └── schema.prisma # MySQL data schema
├── components/ # Shared UI components
├── types/ # TypeScript types
├── .env.local # Environment variables
└── README.md

📅 Database Models (Prisma Schema)

model User {
id Int @id @default(autoincrement())
name String
email String @unique
password String
city String
state String
interest String[]
applications Application[]
}

model Internship {
id Int @id @default(autoincrement())
title String
company String
location String
latitude Float?
longitude Float?
description String
url String?
postedAt DateTime @default(now())
applications Application[]
}

model Application {
id Int @id @default(autoincrement())
userId Int
internshipId Int
status String @default("pending")
appliedAt DateTime @default(now())
user User @relation(fields: [userId], references: [id])
internship Internship @relation(fields: [internshipId], references: [id])
}

🚀 Getting Started

# 1. Clone the project

$ git clone https://github.com/edarth002/internship-finder
$ cd internship-finder

# 2. Install dependencies

$ npm install
📊 Future Improvements
Internship map view with Leaflet or Mapbox
User email notifications

📜 License
MIT License
