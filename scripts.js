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

    // Image modal (for dresscode.html)
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');

    if (modal && modalImg) {
        // Add click to all carousel images
        document.querySelectorAll('.carousel-track img').forEach(img => {
            img.addEventListener('click', () => {
                modal.classList.add('active');
                modalImg.src = img.src;
            });
        });

        // Close modal on X button
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        // Close modal on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
});
