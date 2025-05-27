import * as XLSX from 'https://cdn.sheetjs.com/xlsx-0.18.7/package/xlsx.mjs';

const API_URL = 'http://localhost:3000/api';
let encuestasData = [];
let encuestasPorPagina = 6;
let paginaActual = 1;

function formatearFechaBonita(fechaISO, incluirHora = false) {
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const fecha = new Date(fechaISO);
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = meses[fecha.getMonth()];
  const anio = fecha.getFullYear();

  let resultado = `${dia}-${mes}-${anio}`;

  if (incluirHora) {
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    resultado += ` ${hora}:${minutos}`;
  }

  return resultado;
}

function renderizarEncuestas() {
  const resultadosDiv = document.getElementById('resultados');
  const inicio = (paginaActual - 1) * encuestasPorPagina;
  const fin = inicio + encuestasPorPagina;
  const encuestasPagina = encuestasData.slice(inicio, fin);

  if (encuestasPagina.length === 0) {
    resultadosDiv.innerHTML = "<p>No hay encuestas registradas aún.</p>";
    return;
  }

  const html = encuestasPagina.map(e => `
    <div class="form-group">
      <strong>${e.nombre}</strong> (${e.email}, ${e.telefono})<br>
      Fecha: ${formatearFechaBonita(e.fecha)}<br>
      ⭐ Satisfacción: ${e.pregunta1}<br>
      ⭐ Actitud: ${e.pregunta2}<br>
      ⭐ Imagen: ${e.pregunta3}<br>
      ⭐ Juegos: ${e.pregunta4}<br>
      ⭐ ¿Recomienda?: ${e.pregunta5}<br>
      <em>📝 ${e.observaciones || 'Sin comentarios'}</em><br>
      <small>📅 Registro: ${formatearFechaBonita(e.created_at, true)}</small>
    </div>
  `).join('');

  const totalPaginas = Math.ceil(encuestasData.length / encuestasPorPagina);
  const paginacion = `
  <div class="pagination">
    <button class="btn-page" id="anterior" ${paginaActual === 1 ? 'disabled' : ''}>← Anterior</button>
    <span class="page-info">Página ${paginaActual} de ${totalPaginas}</span>
    <button class="btn-page" id="siguiente" ${paginaActual === totalPaginas ? 'disabled' : ''}>Siguiente →</button>
  </div>
`;


  resultadosDiv.innerHTML = html + paginacion;

  document.getElementById('anterior')?.addEventListener('click', () => {
    paginaActual--;
    renderizarEncuestas();
  });

  document.getElementById('siguiente')?.addEventListener('click', () => {
    paginaActual++;
    renderizarEncuestas();
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  const resultadosDiv = document.getElementById('resultados');
  const mensaje = document.getElementById('mensaje');

  if (!token) {
    mensaje.innerText = "⚠️ No tienes sesión iniciada. Serás redirigido...";
    mensaje.style.display = 'block';
    mensaje.style.background = '#fff3cd';
    mensaje.style.color = '#856404';
    mensaje.style.border = '1px solid #ffeeba';

    setTimeout(() => {
      window.location.href = './login.html';
    }, 2000);
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
    encuestasData = encuestas;
    renderizarEncuestas();
  } catch (err) {
    console.error(err);
    resultadosDiv.innerHTML = `<p>Error al cargar encuestas: ${err.message}</p>`;
  }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = './login.html';
});

document.getElementById('descargarExcel').addEventListener('click', () => {
  if (encuestasData.length === 0) return;

  const datosFormateados = encuestasData.map(e => ({
    'Nombre': e.nombre,
    'Email': e.email,
    'Teléfono': e.telefono,
    'Fecha del Evento': formatearFechaBonita(e.fecha),
    'Satisfacción': e.pregunta1,
    'Actitud': e.pregunta2,
    'Imagen': e.pregunta3,
    'Juegos': e.pregunta4,
    '¿Recomienda?': e.pregunta5,
    'Observaciones': e.observaciones || 'Sin comentarios',
    'Fecha de Registro': formatearFechaBonita(e.created_at, true)
  }));

  const worksheet = XLSX.utils.json_to_sheet(datosFormateados);

  worksheet['!cols'] = [
    { wch: 18 }, { wch: 25 }, { wch: 15 }, { wch: 18 },
    { wch: 6 }, { wch: 6 }, { wch: 6 }, { wch: 6 },
    { wch: 6 }, { wch: 30 }, { wch: 22 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Encuestas");

  const range = XLSX.utils.decode_range(worksheet['!ref']);

  for (let C = range.s.c; C <= range.e.c; ++C) {
    const address = XLSX.utils.encode_cell({ r: 0, c: C });
    if (!worksheet[address]) continue;
    worksheet[address].s = {
      font: { bold: true },
      fill: { patternType: "solid", fgColor: { rgb: "E0E0E0" } }
    };
  }

  for (let R = 1; R <= range.e.r; ++R) {
    const cellAddress = XLSX.utils.encode_cell({ r: R, c: 9 });
    if (worksheet[cellAddress]) {
      if (!worksheet[cellAddress].s) worksheet[cellAddress].s = {};
      worksheet[cellAddress].s.alignment = { wrapText: true, vertical: "top" };
    }
  }

  worksheet['!freeze'] = { xSplit: 0, ySplit: 1 };
  XLSX.writeFile(workbook, "encuestas.xlsx");
});
