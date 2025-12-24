document.addEventListener("DOMContentLoaded", () => {

  // ======== Header & Loader ========
  const header = document.querySelector(".app-header");
  const loader = document.getElementById("loader");
  const appWrapper = document.getElementById("app-wrapper");

  if (loader && appWrapper) {
    import('./modules/loader.js')
      .then(module => module.initLoader(loader, appWrapper))
      .catch(err => console.warn("Loader module failed:", err));
  }

  if (header) {
    import('./modules/sticky-header.js')
      .then(module => module.initStickyHeader(header))
      .catch(err => console.warn("Sticky header module failed:", err));
  }

  // ======== Dropdown Navigation ========
  window.addEventListener('load', () => {
    import('./modules/dropdown.js')
      .then(module => {
        const dropdownItems = document.querySelectorAll(".nav-item-has-dropdown");
        module.initDropdown(header, dropdownItems);
      })
      .catch(err => console.warn("Dropdown module failed:", err));
  });

  // ======== Custom Cursor ========
  const cursor = document.querySelector(".custom-cursor");
  const carouselSection = document.querySelector(".imagecarousel-section");

  if (cursor && carouselSection) {
    import('./modules/cursor.js')
      .then(module => module.initCursor(cursor, carouselSection))
      .catch(err => console.warn("Cursor module failed:", err));
  }

  // ======== Service Tabs ========
  import('./modules/service-tabs.js').then(module => {
    try {
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
        module.initServiceTabNavigation();
      }
    } catch (err) {
      console.warn("Service tabs initialization failed:", err);
    }
  });

  // ======== Section Navigation (Smooth Scroll + Scroll Spy) ========
  import('./modules/section-navigation.js')
    .then(module => module.initSectionNavigation())
    .catch(err => console.warn("Section navigation failed:", err));

  // ======== Tourism Slider ========
  document.querySelectorAll('.custonSlider-block').forEach(block => {
    const track = block.querySelector('.tourism-slider-track');
    const nextBtn = block.querySelector('.tourism-slide-btn.next');
    const prevBtn = block.querySelector('.tourism-slide-btn.prev');
    const scrollbar = block.querySelector('.tourism-slider-scrollbar');
    const thumb = block.querySelector('.tourism-slider-scrollbar-thumb');

    if (track && nextBtn && prevBtn && scrollbar && thumb) {
      import('./modules/tourism-slider.js')
        .then(module => module.initSlider(track, nextBtn, prevBtn, scrollbar, thumb))
        .catch(err => console.warn("Tourism slider module failed:", err));
    }
  });

  // ======== Map ========
  const mapObj = document.getElementById("mapObj");
  if (mapObj) {
    import('./modules/map.js')
      .then(module => module.initMap(mapObj))
      .catch(err => console.warn("Map module failed:", err));
  }

  // ======== Testimonials ========
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const nextBtnTestimonial = document.getElementById('testimonial-next');
  const prevBtnTestimonial = document.getElementById('testimonial-prev');
  const indexDisplay = document.querySelector('.testimonial-index');

  if (testimonialSlides.length && nextBtnTestimonial && prevBtnTestimonial && indexDisplay) {
    import('./modules/testimonials.js')
      .then(module => module.initTestimonials(testimonialSlides, nextBtnTestimonial, prevBtnTestimonial, indexDisplay))
      .catch(err => console.warn("Testimonials module failed:", err));
  }

  // ======== Read More ========
  const readMoreBtn = document.getElementById("readMoreBtn");
  const readMoreContent = document.getElementById("readMoreContent");

  if (readMoreBtn && readMoreContent) {
    import('./modules/read-more.js')
      .then(module => module.initReadMore(readMoreBtn, readMoreContent, {
        collapsedHeight: "180px",
        expandedHeight: "1000px",
      }))
      .catch(err => console.warn("Read more module failed:", err));
  }

  // ======== Mobile Navigation ========
  const hamburger = document.querySelector(".hamburger-icon");
  const navCloseIcon = document.querySelector(".navClose-icon");
  const primaryNavigation = document.querySelector(".mobile-navigation");

  if (hamburger && navCloseIcon && primaryNavigation) {
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

    // Mobile nav accordion
    import('./modules/mobile-nav-accordion.js')
      .then(module => module.initMobileNavAccordion(primaryNavigation))
      .catch(err => console.warn("Mobile nav accordion failed:", err));
  }

  // ======== Team Tabs ========
  import('./modules/team-tabs.js')
    .then(module => module.initTeamTabs({
      tabSelector: ".team-tab",
      panelSelector: ".team-panel",
      indicatorSelector: "#tab-indicator"
    }))
    .catch(err => console.warn("Team tabs module failed:", err));


  // ======== Fixed Bottom Buttons ========
  import('./modules/fixed-buttons.js')
    .then(module => module.initFixedButtons())
    .catch(err => console.warn("Fixed buttons module failed:", err));


  // ======== Counters ========
  import('./modules/counter.js')
    .then(module => module.initCounters())
    .catch(err => console.warn("Counter module failed:", err));

  // ======== helicopter tabs ========
  import('./modules/helicopter-tabs.js')
    .then(module => module.initHelicopterTabs())
    .catch(err => console.warn("Helicopter tabs module failed:", err));


});

