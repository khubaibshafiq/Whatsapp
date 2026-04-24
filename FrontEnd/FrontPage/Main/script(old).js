loadContacts();
const username = localStorage.getItem("username");
let selectedUser = null;

function loadContacts() {
    if (!username){
        window.location.href = "../login/index.html"
    }
    document.querySelector(".name-head").innerText = username.toUpperCase();

    fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username })
    })
    .then(res => res.json())
    .then(data => {

        let chatBox = document.querySelector(".chat_list");

        if (!data || data.length == 0){
            // chatBox.innerHTML += "<p style='padding:10px;'>No contacts yet</p>";
            return alert("Add to Contact! ")
        }

        let html = "";

        data.forEach(user => {
            console.log(user)
            html += `
                <div class="chat-box" onclick="openChat('${user.contact_name}')">
                    <img src="https://ui-avatars.com/api/?name=User&background=556b2f&color=fff" alt="Profile" class="profile-pic">
                    <div class="chat-details">
                        <h3 class="user-name">${user.contact_name.toUpperCase()}</h3>
                        <p class="last-message">Click to start chat</p>
                    </div>
                </div>
            `;
        });

        chatBox.innerHTML = html;
    });
}

const btn = document.querySelector(".add_btn");

btn.addEventListener("click", () => {
    document.getElementById("addContactModal").style.display = "flex";
});

function closeModal() {
    document.getElementById("addContactModal").style.display = "none";
}

function addContact() {
    const contactName = document.getElementById("contactNameInput").value;
    const username = localStorage.getItem("username");

    if (!contactName) {
        alert("Enter a name!");
        return;
    }

    fetch("http://localhost:8000/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            contact_name: contactName
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        document.getElementById("contactNameInput").value = "";
        closeModal();
        loadContacts(); 
    })
    .catch(err => console.log(err));
}


//Add fucntion for when I click on the chat it show the chat messages and name 
function openChat(name) {
    selectedUser = name;
    document.getElementById("emptyState").style.display = "none";

    document.getElementById("chatArea").style.display = "flex";

    document.getElementById("chatName").innerText = name;

    const initials = name.split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();

    document.getElementById("chatAvatar").innerText = initials;

    document.getElementById("chatStatus").innerText = "online";

    document.getElementById("messagesArea").innerHTML = "";

    loadMessages();
}
let socket = null;

function connectSocket() {
    socket = new WebSocket(`ws://localhost:8000/ws/${username}`);

    socket.onopen = () => {
        console.log("Connected");
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.sender === selectedUser) {
            addMessage(data.message, "recv");
        }
    };

    socket.onclose = () => {
        console.log("Disconnected");
    };
}
connectSocket();

//Loading of messages
function loadMessages() {
    fetch("http://localhost:8000/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user1: username,
            user2: selectedUser
        })
    })
    .then(res => res.json())
    .then(data => {

        if (!data) return;

        data.forEach(msg => {
            if (msg.sender === currentUser) {
                addMessage(msg.message_text, "send");
            } else {
                addMessage(msg.message_text, "recv");
            }
        });
    })
    .catch(err => console.log(err));
}

function sendMsg() {
    const input = document.getElementById("msgInput");
    const message = input.value.trim();

    if (!message || !selectedUser) return;

    addMessage(message, "send");

    socket.send(JSON.stringify({
        target: selectedUser,
        message: message
    }));

    input.value = "";
}


function addMessage(text, type) {
    const div = document.createElement("div");

    div.classList.add("bubble", type);

    div.innerHTML = `
        ${text}
        <div class="btime">${getTime()}</div>
    `;

    document.getElementById("messagesArea").appendChild(div);
}

function getTime() {
    const now = new Date();
    return now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");
}
