// dashboard.js

const API_URL = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  const resultadosDiv = document.getElementById('resultados');

  if (!token) {
    alert("⚠️ No tienes sesión iniciada. Te redirigimos al login.");
    window.location.href = './login.html';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/encuesta/todas`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('No autorizado o error en el servidor');

    const encuestas = await response.json();

    if (encuestas.length === 0) {
      resultadosDiv.innerHTML = "<p>No hay encuestas registradas aún.</p>";
      return;
    }

    const html = encuestas.map(e => `
      <div class="form-group">
        <strong>${e.nombre}</strong> (${e.email}, ${e.telefono})<br>
        Fecha: ${e.fecha}<br>
        ⭐ Satisfacción: ${e.pregunta1}<br>
        ⭐ Actitud: ${e.pregunta2}<br>
        ⭐ Imagen: ${e.pregunta3}<br>
        ⭐ Juegos: ${e.pregunta4}<br>
        ⭐ ¿Recomienda?: ${e.pregunta5}<br>
        <em>📝 ${e.observaciones || 'Sin comentarios'}</em>
      </div>
    `).join('');

    resultadosDiv.innerHTML = html;
  } catch (err) {
    console.error(err);
    resultadosDiv.innerHTML = `<p>Error al cargar encuestas: ${err.message}</p>`;
  }
});

function logout() {
  localStorage.removeItem('token');
  window.location.href = './login.html';
}

document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = './login.html';
  });