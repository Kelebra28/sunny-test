// main.js
import { enviarEncuesta } from './api.js';

document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.star');
    const form = document.getElementById('encuestaForm');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');

    // Limitar fecha máxima a hace 6 meses
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 6);
    const formattedDate = currentDate.toISOString().split('T')[0];
    const dateInput = form.querySelector('input[type="date"]');
    dateInput.setAttribute('max', formattedDate);

    // Estrellas
    stars.forEach(star => {
        star.addEventListener('click', function () {
            const rating = this.dataset.value;
            const container = this.parentElement;
            const hiddenInput = container.querySelector('input[type="hidden"]');

            container.querySelectorAll('.star').forEach(s => s.classList.remove('active'));

            for (let i = 0; i < rating; i++) {
                container.querySelectorAll('.star')[i].classList.add('active');
            }

            hiddenInput.value = rating;
        });
    });

    // Enviar formulario
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = {
            nombre: form.querySelector('input[type="text"]').value,
            email: form.querySelector('input[type="email"]').value,
            telefono: form.querySelector('input[type="tel"]').value,
            fecha: form.querySelector('input[type="date"]').value,
            pregunta1: form.querySelector('input[name="pregunta1"]').value,
            pregunta2: form.querySelector('input[name="pregunta2"]').value,
            pregunta3: form.querySelector('input[name="pregunta3"]').value,
            pregunta4: form.querySelector('input[name="pregunta4"]').value,
            pregunta5: form.querySelector('input[name="pregunta5"]').value,
            observaciones: form.querySelector('textarea').value
        };

        try {
            const response = await enviarEncuesta(formData);
            console.log("✅ Respuesta del servidor:", response);
            modal.style.display = 'flex';
            form.reset();
            document.querySelectorAll('.star').forEach(star => star.classList.remove('active'));
        } catch (error) {
            console.error("❌ Error al enviar datos:", error);
            alert("Hubo un error al enviar tu encuesta. Intenta de nuevo.");
        }
    });

    // Modal
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
