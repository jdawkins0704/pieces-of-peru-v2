const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

function activateTab(targetId) {
  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => {
    const isActive = tab.dataset.target === targetId;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  panels.forEach((panel) => {
    const isActive = panel.id === targetId;
    panel.classList.toggle('is-active', isActive);
    panel.hidden = !isActive;
  });
}

if (tabs.length && panels.length) {
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activateTab(tab.dataset.target));
  });

  const firstTab = document.querySelector('.tab.is-active') || tabs[0];
  if (firstTab?.dataset.target) {
    activateTab(firstTab.dataset.target);
  }
}

const switchButtons = document.querySelectorAll('.switch-btn');
const body = document.body;

if (switchButtons.length) {
  switchButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const brand = button.dataset.brand;

      body.classList.remove('brand-jalea', 'brand-brasas');

      if (brand === 'jalea') {
        body.classList.add('brand-jalea');
      } else if (brand === 'brasas') {
        body.classList.add('brand-brasas');
      }

      switchButtons.forEach((btn) => {
        btn.classList.toggle('is-active', btn === button);
        btn.setAttribute('aria-pressed', String(btn === button));
      });
    });
  });
}

const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach((el) => observer.observe(el));
}