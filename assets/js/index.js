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
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll === 0) {
      // User is at the top, remove sticky
      header.classList.remove("sticky-header");
      header.style.transform = "translateY(0)";
    } else if (currentScroll > lastScrollY && currentScroll > 100) {
      // Scrolling down
      header.classList.remove("sticky-header");
      header.style.transform = "translateY(-100%)";
    } else if (currentScroll < lastScrollY) {
      // Scrolling up
      header.style.transform = "translateY(0)";
      header.classList.add("sticky-header");
    }

    lastScrollY = currentScroll;
  });


  const hamburger = document.querySelector(".hamburger-icon");
  const navCloseIcon = document.querySelector(".navClose-icon");
  const primaryNavigation = document.querySelector(".primary-navigation");

  // Open mobile menu
  hamburger.addEventListener("click", () => {
    primaryNavigation.classList.add("mobile-menu-active");
    document.body.style.overflow = "hidden";
  });

  // Close mobile menu
  navCloseIcon.addEventListener("click", () => {
    primaryNavigation.classList.remove("mobile-menu-active");
    document.body.style.overflow = "auto";
  });

});
