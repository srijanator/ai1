const backend = 'http://localhost:5000/api';

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch(`${backend}/auth/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user._id);
      window.location.href = 'dashboard.html';
    } else {
      alert(data.message || 'Login failed');
    }
  });
}

const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      age: Number(document.getElementById('age').value),
      gender: document.getElementById('gender').value,
      occupation: document.getElementById('occupation').value,
      income: Number(document.getElementById('income').value),
      caste: document.getElementById('caste').value,
      disability: document.getElementById('disability').value === "true",
      location: document.getElementById('location').value
    };

    const res = await fetch(`${backend}/auth/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    });

    if (res.ok) {
      alert("Signup successful!");
      window.location.href = 'login.html';
    } else {
      alert("Signup failed");
    }
  });
}

const schemeDiv = document.getElementById('schemes');
if (schemeDiv) {
  const userId = localStorage.getItem('userId');
  fetch(`${backend}/schemes/recommend/${userId}`)
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        schemeDiv.innerHTML = "<p>No schemes found for you currently.</p>";
        return;
      }

      schemeDiv.innerHTML = data.map(scheme => `
        <div class="scheme">
          <h3>${scheme.name}</h3>
          <p>${scheme.description}</p>
        </div>
      `).join('');
    })
    .catch(() => {
      schemeDiv.innerHTML = "<p>Error loading schemes</p>";
    });
}
