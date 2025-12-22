// section-navigation.js
export function initSectionNavigation() {
  const sectionNavSection = document.querySelector('.page-section-navigation');
  const sectionNavLinks = document.querySelectorAll('.secoundary-navigation-bar a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  if (!sectionNavSection || !sectionNavLinks.length || !sections.length) return;

  // Smooth Scroll
  sectionNavLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Function to update active link based on scroll
  const updateActiveLink = () => {
    let current = sections[0].id; // default to first section

    // Loop through sections to find the current one in viewport
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 160; // adjust for sticky header
      const sectionBottom = sectionTop + section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        current = section.getAttribute('id');
      }
    });

    // Update active class
    sectionNavLinks.forEach(link => {
      link.classList.remove('active-section');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active-section');
      }
    });

    // Add shadow only when nav touches top
    const navTop = sectionNavSection.getBoundingClientRect().top;
    if (navTop <= 0) {
      sectionNavSection.classList.add('shadow-md');
    } else {
      sectionNavSection.classList.remove('shadow-md');
    }
  };

  // Run on scroll
  window.addEventListener('scroll', updateActiveLink);

  // Run once on page load
  updateActiveLink();
};
