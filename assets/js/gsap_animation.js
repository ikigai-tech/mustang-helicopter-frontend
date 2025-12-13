document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, Draggable);

  /** -------------------------------
   * 1️⃣ Hero Section Preload + Scroll Animation
   ----------------------------------*/
  const heroImages = [
    "/assets/images/hero-section/landscape-shot-beautiful-valley-surrounded-by-huge-mountains-with-snowy-peaks.png",
    "/assets/images/hero-section/clouds11-first.png",
    "/assets/images/hero-section/clouds11-secound.png",
    "/assets/images/hero-section/freepik__enhance__12911_3.png"
  ];

  let loadedCount = 0;

  const onImageLoaded = () => {
    loadedCount++;
    if (loadedCount === heroImages.length) {
      const overlay = document.getElementById("loading-overlay");
      if (overlay) overlay.style.display = "none";
      initHeroScrollAnimation();
    }
  };

  heroImages.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = onImageLoaded;
    img.onerror = onImageLoaded;
  });

  function initHeroScrollAnimation() {
    const heroSection = document.querySelector(".hero-section");
    const bgImage = document.querySelector(".hero-bg-mountains img");
    const scrollContent = document.querySelector(".scroll-content");
    const cloudsRight = document.querySelectorAll(".clouds-right");
    const cloudsLeft = document.querySelectorAll(".clouds-left");
    const heroCtaBlock = document.querySelector(".hero-cta-block");
    const heroSidebar = document.querySelector(".hero-sidebar");
    const heroSectionSocialIcons = document.querySelector(".heroSection-socialIcons");
    const heroSectionHeading = document.querySelector(".heroSection-heading");



    if (!heroSection || !bgImage || !scrollContent) return;

    bgImage.style.transformOrigin = "top center";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: () => "+=" + window.innerHeight * 1.6, // match 160vh
        scrub: true,
        pin: true,
      }
    });

    // Hero animations
    tl.fromTo(bgImage, { scale: 1 }, { scale: 0.8, y: "15%", x: "-10%", ease: "none" }, 0)
      .fromTo(scrollContent, { y: "90%" }, { y: "35%", opacity: 1, ease: "none" }, 0);

    if (cloudsRight.length) {
      let yValue = window.innerWidth > 1600 ? 450 : 350;
      let xValue = window.innerWidth > 1600 ? 300 : 200;
      tl.fromTo(cloudsRight, { y: 0, x: 0 }, { y: yValue, x: xValue, ease: "none", stagger: 0.1 }, 0);
    }

    if (cloudsLeft.length) {
      let yValue = window.innerWidth > 1600 ? 450 : 350;
      let xValue = window.innerWidth > 1600 ? -300 : -200;
      tl.fromTo(cloudsLeft, { y: 0, x: 0 }, { y: yValue, x: xValue, ease: "none" }, 0);
    }

    if (heroCtaBlock) {
      let yValue = window.innerWidth > 1600 ? -400 : -250;
      tl.fromTo(heroCtaBlock, { y: 0, opacity: 0 }, { y: yValue, opacity: 1, ease: "none" }, 0);
    }

    if (heroSidebar) tl.fromTo(heroSidebar, { opacity: 1 }, { opacity: 0, ease: "none" }, 0);

    if (heroSectionSocialIcons) {
      let yValue = window.innerWidth > 1600 ? 0 : -100;
      tl.fromTo(heroSectionSocialIcons, { opacity: 0, zIndex: 0, y: 0 }, { opacity: 1, zIndex: 50, y: yValue, ease: "none" }, 0);
    }

    if (heroSectionHeading) {
      let yValue = window.innerWidth > 1600 ? 0 : -100;
      tl.fromTo(heroSectionHeading, { y: 0 }, { y: yValue, ease: "none" }, 0);
    }

  }

  /** -------------------------------
 * 2️⃣ Carousel / Draggable Setup
 ----------------------------------*/
  const track = document.querySelector(".carousel-track");
  const items = gsap.utils.toArray(".carousel-item");
  const gap = 40;

  if (track && items.length) {
    // Calculate the width of all items including gaps
    let trackWidth = 0;
    items.forEach(item => {
      trackWidth += item.offsetWidth + gap;
    });

    // Duplicate the items 3x for seamless infinite drag
    track.innerHTML += track.innerHTML + track.innerHTML;

    // Create Draggable instance
    Draggable.create(track, {
      type: "x",
      inertia: true,
      cursor: "grab", // or "none" if you want no cursor
      onDrag: updateWrap,
      onThrowUpdate: updateWrap,
    });

    // Function to wrap the track infinitely
    function updateWrap() {
      gsap.set(track, {
        x: this.x % trackWidth
      });
    }
  }


  /** -------------------------------
   * 3️⃣ Footer Slide Animation
   ----------------------------------*/
  const footerUpperContent = document.querySelector(".footer-upper-content");
  const footerUpperPart = document.querySelector(".footer-upper-part");

  if (footerUpperContent && footerUpperPart) {
    // Set initial state
    gsap.set(footerUpperContent, { opacity: 0, y: 200 });

    // Responsive animations
    const mm = gsap.matchMedia();

    mm.add(
      {
        // Define screen sizes
        is4K: "(min-width: 1400px)",
        isDesktop: "(min-width: 1025px) and (max-width: 1400px)",
        isTablet: "(min-width: 768px) and (max-width: 1024px)",
        isMobile: "(max-width: 767px)"
      },
      (context) => {
        let yEnd = -80; // default for desktop

        if (context.conditions.isTablet) {
          yEnd = -30;
        } else if (context.conditions.isMobile) {
          yEnd = -10;
        } else if (context.conditions.isDesktop) {
          yEnd = -50;
        }

        gsap.to(footerUpperContent, {
          y: yEnd,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerUpperPart,
            start: "bottom top",
            toggleActions: "play none none none",
            markers: false
          }
        });
      }
    );
  }

});
