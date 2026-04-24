import { selectedUser, addMessage } from "./chat.js";
import { currentUser } from "./script.js";

let socket = null;

export function connectSocket() {
    socket = new WebSocket(`ws://localhost:8000/ws/${currentUser}`);

    socket.onopen = () => {
        console.log("WebSocket connected:", currentUser);
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.sender === selectedUser) {
            addMessage(data.message, "recv");
        }
    };

    socket.onerror = () => {
        console.log("WebSocket error");
    };
}

export function sendMessage(msg) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(msg));
    } else {
        console.log("Not Ready");
    }
}