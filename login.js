const API_URL = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const errorDiv = document.getElementById('login-error');

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

            // Limpiar error si estaba visible
            errorDiv.style.display = 'none';
            errorDiv.innerText = '';

            // Guardar el token y redirigir
            localStorage.setItem('token', data.token);
            window.location.href = './dashboard.html';

        } catch (error) {
            console.error(error);

            errorDiv.style.display = 'block';
            errorDiv.innerText = `❌ ${error.message}`;
            errorDiv.style.background = '#ffcdd2';
            errorDiv.style.color = '#b71c1c';
            errorDiv.style.border = '1px solid #f44336';
        }
    });
});
