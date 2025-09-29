// RSVP form
const form = document.getElementById('rsvpForm');
const thankYou = document.getElementById('thankYou');
if(form){
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none';
    thankYou.style.display = 'block';
  });
}

// Carousel scroll
document.querySelectorAll('.carousel-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const track = document.getElementById(btn.dataset.target);
    if(track){
      const imgWidth = track.querySelector('img').offsetWidth + 10;
      track.scrollBy({ left: btn.classList.contains('next') ? imgWidth : -imgWidth, behavior: 'smooth' });
    }
  });
});
