from fastapi import FastAPI
from Backend.Login import router as login_router
from Backend.Signup import router as signup_router
from Backend.Chat import router as chat_router
from Backend.Contact import router as contact_router
from fastapi.middleware.cors import CORSMiddleware
from Backend.Websocket import router as webrouter
from Backend.Messages import router as messagerouter

app = FastAPI()

app.include_router(login_router)
app.include_router(signup_router)
app.include_router(chat_router)
app.include_router(contact_router)
app.include_router(webrouter)
app.include_router(messagerouter)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)