const toggle = document.querySelector('.nav-toggle');
const navCollapse = document.querySelector('.sidenav-collapse');
const navLinks = document.querySelectorAll('.sidenav-links a');
const sections = document.querySelectorAll('.resume-section[id]');

toggle.addEventListener('click', () => {
  const open = navCollapse.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navCollapse.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

const setActive = () => {
  const fromTop = window.scrollY + 120;
  let current = sections[0]?.id;

  sections.forEach((section) => {
    if (section.offsetTop <= fromTop) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', setActive, { passive: true });
setActive();
