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

  import('./modules/service-tabs.js').then(module => {
    // Header dropdown tabs
    module.initServiceTabs(
      document.querySelectorAll('.servicesNav-tab-button'),
      document.querySelectorAll('.servicesNav-tab-pane')
    );

    // Page service section tabs (mobile slider)
    module.initServiceTabs(
      document.querySelectorAll('.service-tab'),
      document.querySelectorAll('.service-content')
    );

    // Initialize Prev/Next buttons for mobile slider
    if (module.initServiceTabNavigation) {
      module.initServiceTabNavigation(); // uses default selectors inside function
    }
  });



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

  // Read More
  const readMoreBtn = document.getElementById("readMoreBtn");
  const readMoreContent = document.getElementById("readMoreContent");

  if (readMoreBtn && readMoreContent) {
    import('./modules/read-more.js')
      .then(module =>
        module.initReadMore(readMoreBtn, readMoreContent, {
          collapsedHeight: "180px",
          expandedHeight: "1000px",
        })
      );
  }

  // Sticky header
  if (header) {
    import('./modules/sticky-header.js')
      .then(module => module.initStickyHeader(header));
  }

  const hamburger = document.querySelector(".hamburger-icon");
  const navCloseIcon = document.querySelector(".navClose-icon");
  const primaryNavigation = document.querySelector(".primary-navigation");

  // Open mobile menu
  hamburger.addEventListener("click", () => {
    primaryNavigation.classList.add("mobile-menu-active");
    hamburger.classList.add("hidden");
    navCloseIcon.classList.remove("hidden");

    document.body.style.overflow = "hidden";
  });

  // Close mobile menu
  navCloseIcon.addEventListener("click", () => {
    primaryNavigation.classList.remove("mobile-menu-active");
    hamburger.classList.remove("hidden");
    navCloseIcon.classList.add("hidden");
    document.body.style.overflow = "auto";
  });





  const tabs = document.querySelectorAll(".team-tab");
  const panels = document.querySelectorAll(".team-panel");
  const indicator = document.getElementById("tab-indicator");

  function activateTab(tab) {
    tabs.forEach(t => t.classList.remove("tab-active"));
    panels.forEach(p => p.classList.add("hidden"));

    tab.classList.add("tab-active");
    const target = tab.getAttribute("data-tab");
    document.getElementById(target).classList.remove("hidden");

    // Move indicator
    const rect = tab.getBoundingClientRect();
    const parentRect = tab.parentElement.getBoundingClientRect();
    indicator.style.width = `${rect.width}px`;
    indicator.style.left = `${rect.left - parentRect.left}px`;
  }

  tabs.forEach(tab => tab.addEventListener("click", () => activateTab(tab)));

  // Activate first tab by default
  if (tabs.length) activateTab(tabs[0]);

});
