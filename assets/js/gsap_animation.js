document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, Draggable);

  /* =====================================================
   * 1️⃣ HERO SCROLL ANIMATION
   ===================================================== */
  function initHeroScrollAnimation() {
    ScrollTrigger.matchMedia({
      "(min-width: 1025px)": () => {
        const elements = {
          section: document.querySelector(".hero-section"),
          bgImage: document.querySelector(".hero-bg-mountains img"),
          scrollContent: document.querySelector(".scroll-content"),
          cloudsRight: document.querySelectorAll(".clouds-right"),
          cloudsLeft: document.querySelectorAll(".clouds-left"),
          ctaBlock: document.querySelector(".hero-cta-block"),
          sidebar: document.querySelector(".hero-sidebar"),
          socialIcons: document.querySelector(".heroSection-socialIcons"),
          heading: document.querySelector(".heroSection-heading"),
        };

        if (!elements.section || !elements.bgImage || !elements.scrollContent) return;

        elements.bgImage.style.transformOrigin = "top center";

        const isLargeScreen = window.innerWidth > 1600;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: elements.section,
            start: "top top",
            end: () => "+=" + window.innerHeight * 1.6,
            scrub: true,
            pin: true,
          },
        });

        /* Background + Content */
        tl.fromTo(
          elements.bgImage,
          { scale: 1 },
          { scale: 0.8, x: "-10%", y: "15%", ease: "none" },
          0
        ).fromTo(
          elements.scrollContent,
          { y: "90%" },
          { y: "35%", opacity: 1, ease: "none" },
          0
        );

        /* Clouds */
        if (elements.cloudsRight.length) {
          tl.fromTo(
            elements.cloudsRight,
            { x: 0, y: 0 },
            {
              x: isLargeScreen ? 300 : 200,
              y: isLargeScreen ? 450 : 350,
              stagger: 0.1,
              ease: "none",
            },
            0
          );
        }

        if (elements.cloudsLeft.length) {
          tl.fromTo(
            elements.cloudsLeft,
            { x: 0, y: 0 },
            {
              x: isLargeScreen ? -300 : -200,
              y: isLargeScreen ? 450 : 350,
              ease: "none",
            },
            0
          );
        }

        /* CTA */
        if (elements.ctaBlock) {
          tl.fromTo(
            elements.ctaBlock,
            { y: 0, opacity: 0 },
            {
              y: isLargeScreen ? -400 : -250,
              opacity: 1,
              ease: "none",
            },
            0
          );
        }

        /* Sidebar */
        if (elements.sidebar) {
          tl.fromTo(
            elements.sidebar,
            { opacity: 1 },
            { opacity: 0, ease: "none" },
            0
          );
        }

        /* Social Icons */
        if (elements.socialIcons) {
          tl.fromTo(
            elements.socialIcons,
            { opacity: 0, y: 0, zIndex: 0 },
            {
              opacity: 1,
              y: isLargeScreen ? 0 : -100,
              zIndex: 50,
              ease: "none",
            },
            0
          );
        }

        /* Heading */
        if (elements.heading) {
          tl.fromTo(
            elements.heading,
            { y: 0 },
            { y: isLargeScreen ? 0 : -100, ease: "none" },
            0
          );
        }
      },
    });
  }

  initHeroScrollAnimation();

  /* =====================================================
   * 2️⃣ CAROUSEL / DRAGGABLE
   ===================================================== */
  function initCarousel() {
    const track = document.querySelector(".carousel-track");
    const items = gsap.utils.toArray(".carousel-item");
    const gap = 40;

    if (!track || !items.length) return;

    let trackWidth = 0;
    items.forEach(item => {
      trackWidth += item.offsetWidth + gap;
    });

    // Duplicate items for infinite drag
    track.innerHTML += track.innerHTML + track.innerHTML;

    Draggable.create(track, {
      type: "x",
      inertia: true,
      cursor: "grab",
      onDrag: wrap,
      onThrowUpdate: wrap,
    });

    function wrap() {
      gsap.set(track, {
        x: this.x % trackWidth,
      });
    }
  }

  initCarousel();

  /* =====================================================
   * 3️⃣ FOOTER ANIMATION
   ===================================================== */
  function initFooterAnimation() {
    const footerTop = document.querySelector(".footer-top");
    const circle = document.querySelector(".orange-circle");
    const heading = document.querySelector(".footerTop-content h2");
    const cta = document.querySelector(".footerTop-content-cta");

    if (!footerTop || !circle || !heading || !cta) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerTop,
        start: "top 60%",
        toggleActions: "play none none none",
      },
    });

    tl.from(circle, {
      scale: 0,
      rotation: 180,
      opacity: 0,
      duration: 2.3,
      ease: "back.out(1.7)",
    });

    tl.from(
      heading,
      {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.8"
    );

    tl.from(
      cta,
      {
        x: -200,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.5"
    );
  }

  initFooterAnimation();
});
