import { currentUser } from "./script.js";
import { sendMessage } from "./socket.js";

export let selectedUser = null;

export function openChat(name) {
    selectedUser = name;

    document.getElementById("emptyState").style.display = "none";
    document.querySelector(".chat-area").style.display  = "flex";

    document.getElementById("chatName").innerText = selectedUser;

    document.getElementById("messagesArea").innerHTML = "";

    loadMessages();
}

export function loadMessages() {
    fetch("http://localhost:8000/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user1: currentUser, user2: selectedUser })
    })
    .then(res => res.json())
    .then(data => {
        data.forEach(msg => {
            if(msg.sender == currentUser){
                addMessage(msg.message_text, "send")
            }
            else{
                addMessage(msg.message_text, "recv")
            }
        });
        scrollToBottom();
    })
    .catch(() => console.log("Message Not Load"));
}

export function addMessage(text, type) {
    const div = document.createElement("div");
    div.classList.add("bubble", type);
    div.innerText = text;
    document.getElementById("messagesArea").appendChild(div);
    scrollToBottom();
}

function scrollToBottom() {
    const area = document.getElementById("messagesArea");
    area.scrollTop = area.scrollHeight;
}

window.sendMsg = function () {
    const input   = document.getElementById("msgInput");
    const message = input.value.trim();

    if (!message) return;

    addMessage(message, "send");

    sendMessage({ target: selectedUser, message: message });

    input.value = "";
};