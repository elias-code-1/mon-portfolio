function animateNumber(el){
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 100;
    const startTime = performance.now();

    function update(currentTime){
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(easedProgress * target);

        el.textContent = currentValue + suffix;

        if(progress < 1){
            requestAnimationFrame(update);
        } else {
            el.textContent = target + suffix;
        }
    }

    requestAnimationFrame(update);
}

const statNumbers = document.querySelectorAll('.stat-number');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            animateNumber(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => observer.observe(el));

const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');

if(contactForm){
    contactForm.addEventListener('submit', async function(e){
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        try{
            const response = await fetch('https://formsubmit.co/ajax/jojoapedo228@gmail.com', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            if(response.ok){
                contactForm.style.display = 'none';
                contactSuccess.classList.add('show');
            } else {
                throw new Error('Erreur d\'envoi');
            }
        } catch(error){
            submitBtn.textContent = 'Envoyer';
            submitBtn.disabled = false;
            alert('Une erreur est survenue, réessaie ou contacte-moi directement par email.');
        }
    });
}
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if(hamburger && mobileMenu){
    hamburger.addEventListener('click', function(){
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}