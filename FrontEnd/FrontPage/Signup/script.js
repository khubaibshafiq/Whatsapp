document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch("http://localhost:8000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        if (response.ok) {
            alert("Account created! Please log in.");
            window.location.href = "../login/index.html";
        } else {
            alert("Signup failed: " + result.detail);
        }
    } catch (err) {
        alert("Backend not reachable.");
    }
});