// api.js
const API_URL = 'https://lasercreativo.com/api';

export async function enviarEncuesta(data) {
  const response = await fetch(`${API_URL}/encuesta`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Error ${response.status}: ${text}`);
  }

  return await response.json();
}
