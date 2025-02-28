
document.addEventListener('DOMContentLoaded', function() {
    // Animación de estrellas
    const stars = document.querySelectorAll('.star');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.dataset.value;
            const container = this.parentElement;
            const hiddenInput = container.querySelector('input[type="hidden"]');
            
            // Reset all stars in this group
            container.querySelectorAll('.star').forEach(s => {
                s.classList.remove('active');
            });
            
            // Activate stars up to the clicked one
            for(let i = 0; i < rating; i++) {
                container.querySelectorAll('.star')[i].classList.add('active');
            }
            
            hiddenInput.value = rating;
        });
    });

    // Animación al enviar el formulario
    const form = document.getElementById('encuestaForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Animación de confirmación
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            alert('¡Gracias por completar la encuesta!');
            this.reset();
            // Resetear estrellas
            document.querySelectorAll('.star').forEach(star => {
                star.classList.remove('active');
            });
        }, 200);
    });
});