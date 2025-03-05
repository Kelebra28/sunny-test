document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star');
    const form = document.getElementById('encuestaForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');

    // Obtener la fecha actual y restar 6 meses
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 6); // Restar 6 meses

    // Formatear la fecha a 'YYYY-MM-DD'
    const formattedDate = currentDate.toISOString().split('T')[0];

    // Asignar la fecha máxima al campo de fecha
    const dateInput = form.querySelector('input[type="date"]');
    dateInput.setAttribute('max', formattedDate);

    stars.forEach(star => {
        star.addEventListener('click', function() {
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

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        modal.style.display = 'flex';

        // Capturar datos
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

        console.log("📋 Datos capturados:", formData);

        fetch('', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("✅ Respuesta del servidor:", data);
            modal.style.display = 'flex';

            setTimeout(() => {
                form.reset();
                document.querySelectorAll('.star').forEach(star => star.classList.remove('active'));
            }, 500);
        })
        .catch(error => console.error("❌ Error al enviar datos:", error));
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
