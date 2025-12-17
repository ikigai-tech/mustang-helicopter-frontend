document.addEventListener("DOMContentLoaded", () => {
  // Ensure the page starts at the top
  window.scrollTo(0, 0);

  gsap.registerPlugin(ScrollTrigger, Draggable);

  /** -------------------------------
   * 1️⃣ Hero Section Preload + Scroll Animation
   ----------------------------------*/
  const heroImages = [
    "./assets/images/hero-section/landscape-shot-beautiful-valley-surrounded-by-huge-mountains-with-snowy-peaks.png",
    "./assets/images/hero-section/clouds11-first.png",
    "./assets/images/hero-section/clouds11-secound.png",
    "./assets/images/hero-section/freepik__enhance__12911_3.png"
  ];

  let loadedCount = 0;

  const onImageLoaded = () => {
    loadedCount++;
    if (loadedCount === heroImages.length) {
      const overlay = document.getElementById("loading-overlay");
      if (overlay) overlay.style.display = "none";
      initHeroScrollAnimation();
      // Refresh ScrollTrigger after everything is ready
      ScrollTrigger.refresh();
    }
  };

  heroImages.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = onImageLoaded;
    img.onerror = onImageLoaded;
  });

  function initHeroScrollAnimation() {
    ScrollTrigger.matchMedia({

      // Only desktop & tablet above 768px
      "(min-width: 1025px)": function () {

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
            end: () => "+=" + window.innerHeight * 1.6,
            scrub: true,
            pin: true,
          }
        });

        tl.fromTo(bgImage, { scale: 1 }, { scale: 0.8, y: "15%", x: "-10%", ease: "none" }, 0)
          .fromTo(scrollContent, { y: "90%" }, { y: "35%", opacity: 1, ease: "none" }, 0);

        if (cloudsRight.length) {
          let yValue = window.innerWidth > 1600 ? 450 : 350;
          let xValue = window.innerWidth > 1600 ? 300 : 200;
          tl.fromTo(cloudsRight, { x: 0, y: 0 }, { x: xValue, y: yValue, ease: "none", stagger: 0.1 }, 0);
        }

        if (cloudsLeft.length) {
          let yValue = window.innerWidth > 1600 ? 450 : 350;
          let xValue = window.innerWidth > 1600 ? -300 : -200;
          tl.fromTo(cloudsLeft, { x: 0, y: 0 }, { x: xValue, y: yValue, ease: "none" }, 0);
        }

        if (heroCtaBlock) {
          let yValue = window.innerWidth > 1600 ? -400 : -250;
          tl.fromTo(heroCtaBlock, { y: 0, opacity: 0 }, { y: yValue, opacity: 1, ease: "none" }, 0);
        }

        if (heroSidebar) {
          tl.fromTo(heroSidebar, { opacity: 1 }, { opacity: 0, ease: "none" }, 0);
        }

        if (heroSectionSocialIcons) {
          let yValue = window.innerWidth > 1600 ? 0 : -100;
          tl.fromTo(
            heroSectionSocialIcons,
            { opacity: 0, zIndex: 0, y: 0 },
            { opacity: 1, zIndex: 50, y: yValue, ease: "none" },
            0
          );
        }

        if (heroSectionHeading) {
          let yValue = window.innerWidth > 1600 ? 0 : -100;
          tl.fromTo(heroSectionHeading, { y: 0 }, { y: yValue, ease: "none" }, 0);
        }
      }

    });
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

});
