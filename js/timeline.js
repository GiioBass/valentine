const input = document.getElementById('milestone-input');
    const button = document.getElementById('add-milestone');
    const list = document.getElementById('milestone-list');
    let sideToggle = true; // true = right, false = left (toggling for visual balance)

    function createMilestone(text) {
      const date = new Date().toISOString().split('T')[0].replace(/-/g, '.');
      const sideClass = sideToggle ? 'justify-end right-entry' : 'justify-start left-entry';
      
      const milestone = document.createElement('div');
      milestone.className = `relative flex ${sideClass} fade-in-up`;
      
      milestone.innerHTML = `
        <div class="w-full md:w-5/12 border border-studio-grey p-6 backdrop-blur-sm bg-studio-black/40 hover:border-studio-fuchsia transition-colors group">
          <span class="font-mono text-[10px] text-studio-fuchsia mb-2 block">${date}</span>
          <h3 class="text-xl font-light mb-4">${text}</h3>
          <p class="text-sm text-studio-grey group-hover:text-studio-white transition-colors">Automatically logged project milestone via studio interface.</p>
          <div class="line-stroke"></div>
        </div>
      `;

      list.appendChild(milestone);
      
      // Trigger line animation after a short delay
      setTimeout(() => {
        milestone.classList.add('active-line');
      }, 100);

      // Scroll to bottom
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });

      sideToggle = !sideToggle;
    }

    button.addEventListener('click', () => {
      if (input.value.trim() !== '') {
        createMilestone(input.value.trim());
        input.value = '';
      }
    });

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && input.value.trim() !== '') {
        createMilestone(input.value.trim());
        input.value = '';
      }
    });

// Simple intersection observer to trigger line-stroke on scroll
    const observerOptions = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active-line');
        }
      });
    }, observerOptions);

    // Watch existing items
    document.querySelectorAll('.fade-in-up').forEach(item => {
      observer.observe(item);
    });

