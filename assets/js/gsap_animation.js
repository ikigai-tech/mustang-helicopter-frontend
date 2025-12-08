document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

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
      if (overlay) overlay.style.display = "none"; // hide overlay safely
      initScrollAnimation();
    }
  };

  heroImages.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = onImageLoaded;
    img.onerror = onImageLoaded;
  });

  function initScrollAnimation() {
    const heroSection = document.querySelector(".hero-section");
    const bgImage = document.querySelector(".hero-bg-mountains img");
    const scrollContent = document.querySelector(".scroll-content");
    const cloudsRight = document.querySelectorAll(".clouds-right");
    const cloudsLeft = document.querySelector(".clouds-left");
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
        end: () => "+=" + heroSection.offsetHeight,
        scrub: true,
        pin: true,
      }
    });

    tl.fromTo(bgImage, { scale: 1 }, { scale: 0.8, y: "15%", x: "-10%", ease: "none" }, 0)
      .fromTo(scrollContent, { y: "90%" }, { y: "35%", opacity: 1, ease: "none" }, 0);

    if (cloudsRight.length)
      tl.fromTo(cloudsRight, { y: 0, x: 0 }, { y: 350, x: 200, ease: "none", stagger: 0.1 }, 0);

    if (cloudsLeft) tl.fromTo(cloudsLeft, { y: 0, x: 0 }, { y: 350, x: -200, ease: "none" }, 0);
    if (heroCtaBlock) {
      let yValue = window.innerWidth > 1600 ? -400 : -250;
      tl.fromTo(
        heroCtaBlock,
        { y: 0, opacity: 0 },
        { y: yValue, opacity: 1, ease: "none" },
        0
      );
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
});
