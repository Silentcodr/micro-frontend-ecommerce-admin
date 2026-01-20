# 🛍️ Micro-Frontend E-Commerce Admin Panel

A **micro-frontend e-commerce admin panel** built using **React + TypeScript + Module Federation (Webpack)** for the frontend and a **Node.js + Express** backend.  
This project demonstrates a **scalable frontend architecture** where multiple independently deployable apps (micro-frontends) are orchestrated by a **host shell**.

---

## 🚀 Project Overview

This project is a **modular e-commerce administration dashboard** split into multiple micro-frontends:

- 🏠 **Host Shell** – Main container that loads micro-frontends dynamically  
- 📦 **Product Management Micro App** – Manage product listing, add/edit products  
- 🛒 **Order Management Micro App** – View and manage customer orders  
- 📊 **Analytics Micro App** – Dashboard with key performance indicators  

Each micro-frontend is developed with **React and TypeScript** and configured using **Webpack Module Federation** to enable **independent deployment** and **lazy loading**.

The backend is a simple **Node.js + Express API** serving product and order data.

---

## 🧠 Architecture

micro-frontend-ecommerce-admin/
│
├── host-shell/                  # Host container
├── product-microfrontend/       # Product module
├── order-microfrontend/         # Order module
├── analytics-microfrontend/     # Analytics module
├── backend/                     # Express backend APIs
└── README.md


🧱 Micro-Frontend Design
Component	Purpose
Host Shell	Navigation, layout, loading micro-frontends
Product Management MF	Create, edit, view products
Order Management MF	View and update order status
Analytics MF	KPI insights, charts, summaries
Backend API	REST endpoints for products & orders
🛠 Technology Stack
Frontend

🧪 React + TypeScript

📦 Webpack Module Federation

🎨 CSS Modules / Styled Components

🚏 Client-side routing

Backend

🚀 Node.js + Express

📡 RESTful APIs

🗄 JSON / In-memory data storage
(Can be upgraded to a database later)

📦 Features
🧩 Host Shell

Sidebar navigation

Dashboard layout

Loads micro apps on demand

📦 Product Management

Add new products

Update existing products

Delete products

Responsive product list UI

🛒 Order Management

View all orders

Update order status (pending, shipped, delivered)

Search and filter orders

📊 Analytics Dashboard

Display key statistics (Orders, Sales, Products)

Chart placeholders for future integrations

⚡ Getting Started
Clone the Repository
git clone https://github.com/Silentcodr/micro-frontend-ecommerce-admin.git
cd micro-frontend-ecommerce-admin

Install Dependencies

Run the following commands inside each folder:

cd host-shell
npm install

cd ../product-microfrontend
npm install

cd ../order-microfrontend
npm install

cd ../analytics-microfrontend
npm install

cd ../backend
npm install

Run the Backend
cd backend
npm start


Backend will start at:

http://localhost:5000

Run the Frontend Modules

Start each micro-frontend in separate terminals:

cd host-shell
npm start

cd product-microfrontend
npm start

cd order-microfrontend
npm start

cd analytics-microfrontend
npm start

Default Ports

Host Shell → http://localhost:3000

Product App → http://localhost:3001

Order App → http://localhost:3002

Analytics App → http://localhost:3003

🧪 Testing

Add unit and integration tests following the structure in each micro-frontend.

npm test

📌 Notes

This project uses Webpack Module Federation to share components and dependencies across micro-frontends.

The architecture supports scalability and independent deployments.

📌 Future Enhancements

Add real analytics charts (Chart.js / Recharts)

User authentication & role management (Admin, Editor)

Backend database integration (MongoDB / SQL)

CI/CD pipeline using GitHub Actions

🤝 Contributing

Contributions are welcome!
Fork the repository → Create a branch → Submit a Pull Request.

📫 Contact

Connect with me via GitHub or email:
📧 sudhansanthoshraj007@gmail.com
