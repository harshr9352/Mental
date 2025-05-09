const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () =>{
    container.classList.add("active");
});

loginBtn.addEventListener("click", () =>{
    container.classList.remove("active");

});

// Handle sign-up form submission
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
        const response = await fetch('http://127.0.0.1:5501/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        alert(data.message);
        if (response.ok) {
            signupForm.reset();
            container.classList.remove("active"); // Switch to login form
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Handle login form submission
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('http://127.0.0.1:5501/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        alert(data.message);
        if (response.ok) {
            // You can redirect or update UI here on successful login
            console.log('User info:', data.user);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});
s