from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from sqlalchemy import text
from Database.Database import db_dependent
from typing import Dict

router = APIRouter()

users = {}

@router.websocket("/ws/{username}")
async def websocket_endpoint(websocket: WebSocket, username: str, db: db_dependent):
    await websocket.accept()

    users[username] = websocket
    print(f"{username} connected")

    try:
        while True:
            data = await websocket.receive_json()

            target = data.get("target")
            message = data.get("message")

            query = text("""
                INSERT INTO \"Messages\" (sender, receiver, message_text)
                VALUES (:sender, :receiver, :msg)
            """)
            db.execute(query, {
                "sender": username,
                "receiver": target,
                "msg": message
            })
            db.commit()

            if target in users:
                await users[target].send_json({
                    "sender": username,
                    "message": message
                })

    except WebSocketDisconnect:
        del users[username]
        print(f"{username} disconnected")