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
│   └── main.py
    └── chat.py
    └── Contact.py
    └── Login.py
    └── Signup.py
    └── Message.py
    └── Websocket.py          
├── Database
    ├──Schema
      └── Contacts.py
      └── Messages.py
      └── Users.py
    └── Database.py
├── Frontend
    ├── Login
      └── index.html
      └── style.css
      └── script.js
    ├── Main
      └── index.html
      └── style.css
      └── script.js
      └── chat.js
      └── contacts.js
      └── socket.js
    ├── Signup
      └── index.html
      └── style.css
      └── script.js
├── Model
    └── ChatRequest.py
    └── Contact.py
    └── Login.py
    └── Signup.py
├── .env                
├── .gitignore           
├── docker-compose.yml   
├── Dockerfile          
└── README.md
