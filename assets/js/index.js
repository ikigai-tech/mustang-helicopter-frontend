// main.js
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".app-header");
  // Loader
  const loader = document.getElementById("loader");
  const appWrapper = document.getElementById("app-wrapper");
  if (loader && appWrapper) {
    import('./modules/loader.js').then(module => module.initLoader(loader, appWrapper));
  }

  // Dropdown navigation
  window.addEventListener('load', () => {
    const dropdownItem = document.querySelector(".nav-item-has-dropdown");
    if (header && dropdownItem) {
      import('./modules/dropdown.js').then(module => module.initDropdown(header, dropdownItem));
    }
  });


  // Custom cursor
  const cursor = document.querySelector(".custom-cursor");
  const carouselSection = document.querySelector(".imagecarousel-section");
  if (cursor && carouselSection) {
    import('./modules/cursor.js').then(module => module.initCursor(cursor, carouselSection));
  }

  // Header dropdown service tabs
  const serviceTabs = document.querySelectorAll('.servicesNav-tab-button');
  const serviceContents = document.querySelectorAll('.servicesNav-tab-pane');
  if (serviceTabs.length && serviceContents.length) {
    import('./modules/service-tabs.js').then(module => module.initServiceTabs(serviceTabs, serviceContents));
  }

  // Tourism slider
  const track = document.querySelector('.tourism-slider-track');
  const nextBtn = document.querySelector('.tourism-slide-btn.next');
  const prevBtn = document.querySelector('.tourism-slide-btn.prev');
  const scrollbar = document.querySelector('.tourism-slider-scrollbar');
  const thumb = document.querySelector('.tourism-slider-scrollbar-thumb');
  if (track && nextBtn && prevBtn && scrollbar && thumb) {
    import('./modules/tourism-slider.js').then(module => module.initSlider(track, nextBtn, prevBtn, scrollbar, thumb));
  }

  // Map
  const mapObj = document.getElementById("mapObj");
  if (mapObj) {
    import('./modules/map.js').then(module => module.initMap(mapObj));
  }

  // Testimonials
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const nextBtnTestimonial = document.getElementById('testimonial-next');
  const prevBtnTestimonial = document.getElementById('testimonial-prev');
  const indexDisplay = document.querySelector('.testimonial-index');
  if (testimonialSlides.length && nextBtnTestimonial && prevBtnTestimonial && indexDisplay) {
    import('./modules/testimonials.js').then(module => module.initTestimonials(testimonialSlides, nextBtnTestimonial, prevBtnTestimonial, indexDisplay));
  }


  // Select header and hero section
  const heroSection = document.querySelector(".hero-section");
  if (header && heroSection) {
    // Function to get the visual bottom of hero section
    const getHeroBottom = () => {
      const rect = heroSection.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const heroHeight = rect.height;
      return scrollTop + rect.top + heroHeight * 0.6; // trigger at 70% of hero
    };


    let lastScrollY = window.scrollY;

    // Scroll event listener
    window.addEventListener("scroll", () => {
      const currentScroll = window.scrollY;
      const heroBottom = getHeroBottom();

      if (currentScroll === 0) {
        // At top -> show header
        header.style.transform = "translateY(0)";
        header.classList.remove("sticky-header");
      } else if (currentScroll < heroBottom) {
        // Inside hero section -> hide header
        header.style.transform = "translateY(-100%)";
        header.classList.remove("sticky-header");
      } else {
        // After hero section -> show sticky header
        header.style.transform = "translateY(0)";
        header.classList.add("sticky-header");
      }

      lastScrollY = currentScroll;
    });

    // Optional: recalc hero bottom on resize
    window.addEventListener("resize", () => {
      // Nothing needed here since getHeroBottom() calculates dynamically
    });
  }


});
