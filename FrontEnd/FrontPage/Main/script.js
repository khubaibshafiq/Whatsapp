import { loadContacts } from "./contacts.js";
import { connectSocket } from "./socket.js";

export let currentUser = localStorage.getItem("username");

if (!currentUser) {
    window.location.href = "../login/index.html";
}

document.querySelector(".name-head").innerText = currentUser.toUpperCase();

connectSocket();
loadContacts();


window.openAddModal = function () {
    const modal = document.getElementById("addContactModal");
    modal.style.display = "flex"; 
};

window.closeModal = function () {
    document.getElementById("addContactModal").style.display = "none";
    document.getElementById("contactNameInput").value = "";
};

window.addContact = function () {
    const name = document.getElementById("contactNameInput").value.trim();

    if (!name) {
        alert("Enter Name!");
        return;
    }

    if (name === currentUser) {
        alert("Cannot Add");
        return;
    }

    fetch("http://localhost:8000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username:     currentUser,
            contact_name: name
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        closeModal();
        loadContacts();    
    })
    .catch(() => alert("Contact Not Found! "));
};
