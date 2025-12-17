ClubSphere – Membership & Event Management for Local Clubs

📌 Project Purpose

ClubSphere is a full-stack MERN web application designed to help users discover, join, and manage local clubs and events.
It provides role-based dashboards for Admins, Club Managers, and Members, allowing seamless club creation, membership management, event registration, and secure online payments via Stripe.

The platform focuses on real-world club management scenarios, secure authentication, and a modern, recruiter-friendly UI.

🌐 Live Site

🔗 https://club-sphere.netlify.app

📂 GitHub Repositories

Client: https://github.com/Azizul-haque1/club-sphere-client

Server: https://github.com/Azizul-haque1/club-sphere-server


🚀 Key Features
🔑 Authentication & Security

Firebase Authentication (Email/Password + Google Login)

Password validation (uppercase, lowercase, minimum 6 characters)

JWT-based secure API access

Firebase token verification on server-side

Role-based protected routes (Admin, Club Manager, Member)

🏠 Public Features

Browse all approved clubs and upcoming events

Club details with membership fee information

Event details with registration option

Server-side search and category filtering

Sorting by membership fee, event date, or creation date

Fully responsive design (mobile, tablet, desktop)

Animated sections using Framer Motion

👤 Member Dashboard

View joined clubs and membership status

Register for free or paid events

View upcoming registered events

Membership & payment history

Secure Stripe payments for memberships and events

🏢 Club Manager Dashboard

Create and manage clubs

Set free or paid membership fees

Create, update, and delete events

View club members and event registrations

Track payments received for their clubs

🛡️ Admin Dashboard

Monitor total users, clubs, events, memberships, and payments

Approve or reject club creation requests

Manage user roles (Admin / Club Manager / Member)

View all transactions and platform statistics

Data visualization using charts

💳 Stripe Payment Integration

Secure Stripe payment flow (test mode)

Paid club memberships

Paid event registrations

Payment records stored and linked to memberships

🧩 Technologies Used
Frontend

React 18

React Router 

Firebase Authentication

React Hook Form

TanStack Query (React Query)

Tailwind CSS

DaisyUI

Framer Motion

Axios

Stripe.js

Backend

Node.js

Express.js

MongoDB

Firebase Admin SDK

Stripe API
