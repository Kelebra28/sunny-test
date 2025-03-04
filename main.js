
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.dataset.value;
            const container = this.parentElement;
            const hiddenInput = container.querySelector('input[type="hidden"]');
            
            container.querySelectorAll('.star').forEach(s => {
                s.classList.remove('active');
            });
            
            for(let i = 0; i < rating; i++) {
                container.querySelectorAll('.star')[i].classList.add('active');
            }
            
            hiddenInput.value = rating;
        });
    });

    const form = document.getElementById('encuestaForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            alert('¡Gracias por completar la encuesta!');
            this.reset();
            document.querySelectorAll('.star').forEach(star => {
                star.classList.remove('active');
            });
        }, 200);
    });
});