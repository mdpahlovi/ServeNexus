# ServeNexus

A service listing platform that allows users to view, create, update, and delete services. Built with nodejs/express backend and nextjs frontend, both written in TypeScript.

## 🔗 Live URLs

- **Frontend:** [https://serve-nexus.vercel.app](https://serve-nexus.vercel.app)
- **Backend:** [https://servenexus.onrender.com](https://servenexus.onrender.com)

---

## 🛠️ Tech Stack

| Layer    | Technologies                                |
| -------- | ------------------------------------------- |
| Backend  | TypeScript, Node.js, Express, MongoDB       |
| Frontend | TypeScript, Next.js, TailwindCSS, Shadcn UI |

---

## ⚙️ Installation Steps

> **Prerequisites:** Node.js 18+, MongoDB (local or Atlas)

### Clone the repository

```bash
git clone https://github.com/mdpahlovi/ServeNexus.git
cd ServeNexus
```

### Backend Setup

```bash
cd backend
npm install
# Create .env file (see Environment Variables section)
npm run dev
# Server runs on http://localhost:5000
```

### Frontend Setup

```bash
cd frontend
npm install
# Create .env file (see Environment Variables section)
npm run dev
# App runs on http://localhost:3000
```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

```env
# Server
NODE_ENV=development
PORT=5000

# Cors
CORS_ORIGIN=http://localhost:3000

# Database
DATABASE_URL=mongodb+srv://mdpahlovi:wQRSk6V8zKhEcsBU@default.3gyfbhl.mongodb.net/ServeNexus?appName=Default
```

### Frontend (`frontend/.env`)

```env
SERVER_URL=http://localhost:5000
```

---

## 📁 Project Structure

```text
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── features/
│   │   │   └── services/
│   │   ├── middleware/
│   │   ├── utils/
│   │   ├── app.ts
│   │   ├── routes.ts
│   │   └── server.ts
│   └── package.json
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   ├── schema/
│   ├── types/
│   └── package.json
└── README.md
```

---

## 📡 API Endpoints

| Method   | Endpoint             | Description                  |
| -------- | -------------------- | ---------------------------- |
| `POST`   | /api/v1/services     | Create a new service listing |
| `GET`    | /api/v1/services     | Get all service listings     |
| `GET`    | /api/v1/services/:id | Get a single service by ID   |
| `PUT`    | /api/v1/services/:id | Update a service by ID       |
| `DELETE` | /api/v1/services/:id | Delete a service by ID       |
