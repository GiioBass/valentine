const lines = document.querySelectorAll('.line');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.5
  }
);

lines.forEach(line => observer.observe(line));

const overlay = document.getElementById('countdown-overlay');
const countdownEl = document.getElementById('countdown');

// Set target date (February 14, local time)
const targetDate = new Date();
targetDate.setMonth(1); // February (0-based)
targetDate.setDate(14);
targetDate.setHours(0, 0, 0, 0);

// If date already passed this year, use next year
if (new Date() > targetDate) {
  targetDate.setFullYear(targetDate.getFullYear() + 1);
}

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
    return;
  }

  document.body.style.overflow = 'hidden';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEl.textContent = 
    `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

updateCountdown();
setInterval(updateCountdown, 1000);
