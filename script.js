document.getElementById('hero-year').textContent = new Date().getFullYear();

const CORPORATE_YEARS = 3;
document.querySelectorAll('.corporate-years').forEach(el => {
  el.textContent = `${CORPORATE_YEARS}+`;
});

/* ─── Tech stack (from API) ─── */
const techInner = document.querySelector('.tech-marquee-inner');
fetch('https://arnoldmavhunga.github.io/api/tech-stack/names.json')
  .then(res => res.ok ? res.json() : Promise.reject(res.status))
  .then(names => {
    // render twice for a seamless loop
    const pills = [...names, ...names].map(name => {
      const pill = document.createElement('span');
      pill.className = 'tech-pill';
      pill.textContent = name;
      return pill;
    });
    techInner.replaceChildren(...pills);
  })
  .catch(() => {
    document.querySelector('.tech-marquee-section').hidden = true;
  });

/* ─── Experience durations ─── */
document.querySelectorAll('.exp-date-block[data-start]').forEach(block => {
  const [sy, sm] = block.dataset.start.split('-').map(Number);
  const end = block.dataset.end;
  const [ey, em] = end ? end.split('-').map(Number) : [new Date().getFullYear(), new Date().getMonth() + 1];
  const totalMonths = (ey - sy) * 12 + (em - sm) + 1;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const label = years && months ? `${years} yr ${months} mo` : years ? `${years} yr${years > 1 ? 's' : ''}` : `${months} mo`;
  block.querySelector('.exp-duration').textContent = label;
});

/* ─── Nav: scroll state & mobile toggle ─── */
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.nav-hamburger');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

hamburger?.addEventListener('click', () => {
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.nav-links a, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ─── Smooth scroll ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = target.getBoundingClientRect().top + window.scrollY - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});

/* ─── Reveal on scroll ─── */
const io = new IntersectionObserver(
  entries => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.classList.add('visible');
        io.unobserve(el.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ─── Staggered children for grids ─── */
document.querySelectorAll('.works-grid, .blog-grid').forEach(grid => {
  Array.from(grid.children).forEach((card, i) => {
    card.style.setProperty('--delay', `${i * 0.1}s`);
  });
});

/* ─── Cursor arrow button tilt ─── */
document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - .5) * 8;
    const y = ((e.clientY - rect.top)  / rect.height - .5) * 8;
    card.style.transform = `perspective(600px) rotateX(${-y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ─── Active nav link highlight ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const linkObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.style.opacity = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.fontWeight = '600';
      navLinks.forEach(l => {
        if (l !== active) l.style.fontWeight = '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => linkObserver.observe(s));
