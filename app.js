(() => {
  const mobilePhones = document.querySelector('.mobile-phones');
  const desktopPhones = document.querySelector('.desktop-phones');

  if (mobilePhones && desktopPhones) {
    desktopPhones.querySelectorAll('.phone-wrap').forEach((phone) => {
      mobilePhones.appendChild(phone.cloneNode(true));
    });
  }

  const resizePhoneContent = () => {
    document.querySelectorAll('.phone-screen').forEach((screen) => {
      const content = screen.querySelector('.screen-content');
      if (!content) return;
      const scale = screen.clientWidth / 390;
      content.style.transform = `scale(${scale})`;
    });
  };

  const resizeObserver = new ResizeObserver(resizePhoneContent);
  document.querySelectorAll('.phone-screen').forEach((screen) => resizeObserver.observe(screen));
  window.addEventListener('resize', resizePhoneContent, { passive: true });
  resizePhoneContent();

  const formatNumber = (value) => value.toLocaleString('en-US');
  const animateCount = (element) => {
    const target = Number(element.dataset.target || 0);
    const startedAt = performance.now();
    const duration = 2200;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      element.textContent = formatNumber(Math.round(target * easeOutCubic(progress)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.count-up').forEach((count, index) => {
        window.setTimeout(() => animateCount(count), index * 200);
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: .3 });
  document.querySelectorAll('.season-points').forEach((section) => countObserver.observe(section));

  const menu = document.querySelector('.menu-overlay');
  const toggleMenu = (open) => {
    if (!menu) return;
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) menu.querySelector('.close-menu')?.focus();
  };

  document.addEventListener('click', (event) => {
    const target = event.target.closest('.menu-button, .profile-button, .close-menu, .menu-overlay a, .sign-in');
    if (!target) return;
    if (target.matches('.menu-button, .profile-button')) toggleMenu(true);
    if (target.matches('.close-menu, .menu-overlay a, .sign-in')) toggleMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') toggleMenu(false);
  });
})();
