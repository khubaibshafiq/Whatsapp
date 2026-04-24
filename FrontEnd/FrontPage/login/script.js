document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        if (response.ok) {
            localStorage.setItem("ID", response.ID) 
            localStorage.setItem("username", username)
            window.location.href = "../Main/index.html";
        } else {
            alert("Error: " + result.detail);
        }
    } 
    catch (err) {
        alert("Backend Error");
    }
});