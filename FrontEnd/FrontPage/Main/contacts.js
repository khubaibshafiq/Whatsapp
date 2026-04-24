import { openChat } from "./chat.js";
import { currentUser } from "./script.js";

window.openChat = openChat;

export function loadContacts() {
    fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: currentUser })
    })
    .then(res => res.json())
    .then(data => {
        const chatBox = document.querySelector(".chat_list");

        let html = `
            <div class="list-header">
                <input
                    class="search"
                    type="text"
                    placeholder=" Search contacts..."
                    id="searchInput"
                    oninput="filterContacts()"
                >
                <button
                    class="add_btn"
                    onclick="openAddModal()"
                    title="Add Contact"
                >+</button>
            </div>
        `;

        if (!data || data.length === 0) {
            html += `<p class="no-contacts">Add Contact. </p>`;
        } else {
            data.forEach(user => {
                const name = user.contact_name;
                html += `
                    <div class="chat-box" onclick="openChat('${name}')">
                        <img
                            src=https://ui-avatars.com/api/?name=User&background=556b2f&color=fff"
                            alt="Profile"
                            class="profile-pic"
                        >
                        <div class="chat-details">
                            <h3 class="user-name">${name}</h3>
                            <p class="last-message">Click to start chat</p>
                        </div>
                    </div>
                `;
            });
        }

        chatBox.innerHTML = html;
    })
    .catch(() => {
        console.log("Contact Not Found!");
    });
}