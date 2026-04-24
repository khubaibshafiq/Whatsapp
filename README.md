# 🚀 FastSocket Chat 

A high-performance, real-time messaging application inspired by WhatsApp. This project leverages **FastAPI** and **WebSockets** for instantaneous communication, with **PostgreSQL** as the reliable backbone for storing contacts and message history.

## 🌟 Key Features
- **Real-time Messaging:** Instant message delivery using WebSocket protocols.
- **Persistent Storage:** Every message and contact is saved securely in a PostgreSQL database.
- **Contact Management:** Simple and efficient way to save and manage user contacts.
- **Dockerized Architecture:** Entire stack (App + Database) is containerized for one-command deployment.
- **Environment Security:** Sensitive data like database credentials are managed via `.env` files.

## 🛠 Tech Stack
- **Backend Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Real-time Engine:** [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- **Server:** Uvicorn
- **Containerization:** Docker & Docker Compose

## 📂 Project Structure
```text
├── Backend/
│   ├── main.py          # FastAPI application & WebSocket logic
│   ├── database.py      # SQLAlchemy/Database connection
│   └── models.py        # PostgreSQL Data Models
├── .env                 # Environment variables (Secrets)
├── .gitignore           # Files to ignore in Git
├── docker-compose.yml   # Multi-container orchestration
├── Dockerfile           # Backend container definition
└── README.md
