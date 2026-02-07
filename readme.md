# Multilingual Blog

A full-stack blog application that supports multiple languages, built with a modern tech stack.

## 🚀 Tech Stack

### Frontend
- **React**: UI library
- **Vite**: Build tool and development server
- **TailwindCSS**: Utility-first CSS framework
- **Supabase Client**: For interacting with the backend/database

### Backend
- **Node.js & Express**: Server-side runtime and framework
- **Supabase**: Database and Authentication
- **lingo.dev**: For multilingual/translation capabilities
- **dotenv**: Environment variable management

## 🛠️ Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

## 📦 Setup & Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd multilingual-blog
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=3000
SUPABASE_URL="your_supabase_url"
SUPABASE_KEY="your_supabase_service_role_key" # or anon key depending on your server-side logic
LINGO_API_KEY="your_lingo_dev_api_key"
```

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory with the following variables:
```env
VITE_SUPABASE_URL="your_supabase_url"
VITE_SUPABASE_ANON_KEY="your_supabase_anon_key"
```

## 🏃‍♂️ Running the Project

### Start the Backend
From the `backend` directory:
```bash
# Production mode
npm start

# Development mode (with watch)
npm run dev
```
The server will run on `http://localhost:3000` (or your defined PORT).

### Start the Frontend
From the `frontend` directory:
```bash
npm run dev
```
The application will typically be accessible at `http://localhost:5173`.

## 📂 Project Structure

```
multilingual-blog/
├── backend/          # Node.js/Express backend
│   ├── routes/       # API routes
│   ├── services/     # Business logic & external services
│   └── server.js     # Entry point
├── frontend/         # React/Vite frontend
│   ├── src/          # React source code
│   └── public/       # Static assets
└── README.md         # Project documentation
```
