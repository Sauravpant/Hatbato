<h1 align="center" id="title">Hatbato – A Peer-to-Peer Marketplace</h1>

<p id="description">Hatbato is a full-stack peer-to-peer marketplace platform where users can buy and sell products with ease. It supports product posting category browsing and advanced location-based filtering powered by PostgreSQL + PostGIS allowing users to find items within specific distances from their location<br><br>The platform integrates AI content moderation using the Gemini API to ensure product listings and reviews remain safe and free of offensive content. It also includes a dedicated admin dashboard for managing users products and reviews.<br><br>Built entirely with TypeScript Hatbato features a modern stack: React + TanStack Query on the frontend and Node.js + Express + PostgreSQL on the backend with smooth deployment on Vercel and Railway.</p>

<h2> Demo</h2>

[https://hatbato.vercel.app](https://hatbato.vercel.app)

  
  
<h2>Features</h2>

Here're some of the project's best features:

*   Post browse and manage products
*   Search & filter products by categories minimum price maximum price Product Condition and so on
*   Advanced location-based filtering (filter products within a radius from your location) using PostgreSQL + PostGIS
*   AI Content Checker using Gemini API → filters offensive words in product listings and reviews before saving to DB
*   Admin dashboard and analytics for product user category review orders and ratings moderation

  
  
<h2>Built with</h2>

Technologies used in the project:

*   Frontend - React.js + TypeScript + TailwindCSS
*   Backend - Node.js + Express.js + TypeScript + PostgreSQL + Prisma ORM
*   Authentication - JWT
*   Deployments - Vercel (Frontend) + Railway (Backend)
*   Containerization - Docker

  <h2>Folder Structure</h2>

  ```text
Hatbato/
├── client/                
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── store/
│   │   ├── types/
│   │   ├── App.css
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env
│   ├── .gitignore
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── server/                 # Node.js/TypeScript backend
│   ├── node_modules/
│   ├── prisma/
│   ├── public/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── app.ts
│   │   ├── contents.ts
│   │   └── index.ts
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
├── .gitignore            
├── README.md              
└── package.json          
```

<h2>🛡License:</h2>

This project is licensed under the MIT
