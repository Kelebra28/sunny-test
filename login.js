// login.js
const API_URL = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Credenciales incorrectas');
            }

            // Guardar el token en localStorage y redirigir
            localStorage.setItem('token', data.token);
            window.location.href = './dashboard.html'; // <- puedes crear esta página luego

        } catch (error) {
            alert(`❌ Error: ${error.message}`);
            console.error(error);
        }
    });
});
