// Load this after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // RSVP anti-theft lawgic (for rsvp.html)
    const form = document.getElementById('rsvpForm');
    const thankYou = document.getElementById('thankYou');
    if (form && thankYou) {
        thankYou.style.display = 'none';

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // EmailJS
            emailjs.sendForm(
                'service_ua7y4lc',
                'template_gxxt426',
                form,
                'tB83WTwtAL4YZR3ll'
            ).then(
                function () {
                    form.style.display = 'none';
                    thankYou.style.display = 'block';
                },
                function (error) {
                    alert('Failed to send RSVP! Please try again later.');
                }
            );
        });
    }

    // Carousel scroll (for dresscode.html)
    document.querySelectorAll('.carousel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const track = document.getElementById(btn.dataset.target);
            if (track) {
                const imgWidth = track.querySelector('img').offsetWidth + 10;
                track.scrollBy({
                    left: btn.classList.contains('next') ? imgWidth : -imgWidth,
                    behavior: 'smooth'
                });
            }
        });
    });
});
