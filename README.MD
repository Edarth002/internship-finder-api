# Internship Finder API

**Location-Based Internship Finder API for Computer Science Students Using Career Path Preferences and Real-Time Availability Data**

Internship Finder helps computer science students discover nearby internship opportunities tailored to their interests. Users create a profile indicating their preferred internship location (city/state) and career path. The platform fetches internships from an external job source or seeded data, and uses the Haversine formula to calculate and sort internships by distance to the specified location. Students can apply to internships and track their applications through a dashboard.

---

## ✨ Key Features

| Feature                 | Description                                                              |
| ----------------------- | ------------------------------------------------------------------------ |
| 🔐 Authentication       | Secure login and registration with hashed passwords using JWT and bcrypt |
| 📍 Student Profile      | Students input city, state, and career interests                         |
| 🌍 Haversine Matching   | Smart filtering and sorting of internships by proximity                  |
| 💼 Internship Listings  | Pulled from external job board                                           |
| 📨 Apply to Internships | Students can apply and update application status                         |
| 📄 Dashboard            | View and manage all submitted applications                               |

---

## 🔧 Tech Stack

| Layer       | Technology                              |
| ----------- | --------------------------------------- |
| Frontend    | Next.js 14, React, Tailwind CSS         |
| Backend     | Node.js, Express.js (JavaScript)        |
| Database    | MySQL                                   |
| ORM         | Prisma ORM                              |
| Auth        | JSON Web Tokens (JWT), bcrypt           |
| Hosting     | Vercel (Frontend), Railway (Backend+DB) |
| Geolocation | Custom Haversine formula logic          |

---

## 📁 Project Structure(Still in progress, hence Inaccurate)

```
internship-finder/
├── app/                           # Next.js frontend
│   ├── login/                    # Login form
│   ├── register/                 # Register form
│   ├── profile/                  # Student profile setup
│   ├── internships/              # Internship listings + details
│   ├── dashboard/                # User dashboard to track applications
├── backend/                      # Express.js backend
│   ├── controllers/              # Business logic
│   ├── routes/                   # Express routes
│   ├── middleware/               # Auth middleware
│   ├── utils/                    # Utility functions
│   │   └── geolocation.ts        # Haversine formula
│   └── prisma/                   # Prisma client setup
│       └── schema.prisma         # MySQL data schema
├── components/                   # Shared UI components
├── types/                        # TypeScript types
├── .env.local                    # Environment variables
└── README.md
```

---

## 📅 Database Models (Prisma Schema)

```prisma
model User {
    id Int @id @default(autoincrement())
    email String @unique
    password String
    number String?
    age Int?
    department String?
    school String?
    industry String?
    applications Application[]
}

model Application {
    id Int @id @default(autoincrement())
    userId Int
    title String
    company String
    location String
    url String?
    status Status @default(pending)
    appliedAt DateTime @default(now())
    user User @relation( fields: [userId], references: [id])
}

enum Status {
    pending
    accepted
    rejected
}

model Internship {
  id            Int            @id @default(autoincrement())
  title         String
  company       String
  location      String
  latitude      Float?
  longitude     Float?
  description   String
  url           String?
  postedAt      DateTime       @default(now())
  applications  Application[]
}

```

---

## 🚀 Getting Started

```bash
# 1. Clone the project
$ git clone https://github.com/edarth002/internship-finder-api
$ cd internship-finder-api

# 2. Install dependencies
$ npm install
```

---

## 📊 Future Improvements

* User email notifications

---

## 📜 License

MIT License
