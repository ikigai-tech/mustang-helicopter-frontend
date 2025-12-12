
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const appWrapper = document.getElementById("app-wrapper");

  // Loader dots animation
  const dots = document.querySelector(".dots");
  let dotCount = 0;
  const dotInterval = setInterval(() => {
    dotCount = (dotCount + 1) % 4;
    dots.textContent = '.'.repeat(dotCount);
  }, 500);

  // Wait for all <img> inside app-wrapper
  const images = appWrapper.querySelectorAll("img");
  const imagePromises = Array.from(images).map(img => {
    return new Promise(resolve => {
      if (img.complete) resolve();
      else img.onload = img.onerror = resolve;
    });
  });

  Promise.all(imagePromises).then(() => {
    clearInterval(dotInterval);

    // Fade out loader and show content
    gsap.to(loader, { opacity: 0, duration: 0.8, onComplete: () => loader.style.display = "none" });
    gsap.to(appWrapper, { opacity: 1, duration: 1, pointerEvents: "auto" });

    // Optional: start animations here
    console.log("All images loaded, content visible!");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".custom-cursor");
  const carouselSection = document.querySelector(".imagecarousel-section");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  carouselSection.addEventListener("mouseenter", () => {
    cursor.style.opacity = 1; // show custom cursor
  });

  carouselSection.addEventListener("mouseleave", () => {
    cursor.style.opacity = 0; // hide custom cursor
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const serviceTabs = document.querySelectorAll('.service-tab');
  const serviceContents = document.querySelectorAll('.service-content');
  if (!serviceTabs.length || !serviceContents.length) return;
  serviceTabs.forEach(tabButton => {
    tabButton.addEventListener('click', () => {
      const targetId = tabButton.dataset.tab;
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;
      serviceTabs.forEach(btn => btn.classList.remove('active'));
      tabButton.classList.add('active');
      serviceContents.forEach(section => section.classList.add('hidden'));
      targetSection.classList.remove('hidden');
    });
  });
  const firstTab = serviceTabs[0];
  if (firstTab) firstTab.click();
});

document.addEventListener("DOMContentLoaded", () => {

  const track = document.querySelector('.tourism-slider-track');
  const slides = Array.from(track.children);
  const nextBtn = document.querySelector('.tourism-slide-btn.next');
  const prevBtn = document.querySelector('.tourism-slide-btn.prev');

  // New scrollbar elements
  const scrollbar = document.querySelector('.tourism-slider-scrollbar');
  const thumb = document.querySelector('.tourism-slider-scrollbar-thumb');

  let currentIndex = 0;
  let slideWidth = slides[0].getBoundingClientRect().width + 20;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;

  // Thumb drag
  let thumbDragging = false;
  let thumbStartX = 0;
  let thumbStartLeft = 0;

  // Update slider width on resize
  window.addEventListener('resize', () => {
    slideWidth = slides[0].getBoundingClientRect().width + 20;
    updateSlider();
  });

  // Navigation buttons
  nextBtn.addEventListener('click', () => {
    if (currentIndex < slides.length - visibleSlides()) {
      currentIndex++;
      updateSlider();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  // Drag & Swipe
  track.addEventListener('mousedown', dragStart);
  track.addEventListener('touchstart', dragStart);
  track.addEventListener('mouseup', dragEnd);
  track.addEventListener('mouseleave', dragEnd);
  track.addEventListener('touchend', dragEnd);
  track.addEventListener('mousemove', dragMove);
  track.addEventListener('touchmove', dragMove);

  function dragStart(e) {
    isDragging = true;
    startPos = getPositionX(e);
    track.classList.add('dragging');
  }

  function dragMove(e) {
    if (!isDragging) return;
    const currentPosition = getPositionX(e);
    const diff = currentPosition - startPos;
    currentTranslate = prevTranslate + diff;
    clampTranslate();
    track.style.transform = `translateX(${currentTranslate}px)`;
    updateThumb();
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('dragging');

    // Snap to nearest slide
    currentIndex = Math.round(-currentTranslate / slideWidth);
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > slides.length - visibleSlides()) currentIndex = slides.length - visibleSlides();

    updateSlider();
  }

  function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }

  function clampTranslate() {
    const maxTranslate = 0;
    const minTranslate = -(track.scrollWidth - track.parentElement.offsetWidth);
    if (currentTranslate > maxTranslate) currentTranslate = maxTranslate;
    if (currentTranslate < minTranslate) currentTranslate = minTranslate;
  }

  function visibleSlides() {
    return Math.floor(track.parentElement.offsetWidth / slideWidth);
  }

  function updateSlider() {
    currentTranslate = -currentIndex * slideWidth;
    clampTranslate();
    prevTranslate = currentTranslate;
    track.style.transform = `translateX(${currentTranslate}px)`;
    updateThumb();
  }

  // ---- SCROLLBAR LOGIC ---- //

  function updateThumb() {
    const containerWidth = track.parentElement.offsetWidth;
    const trackWidth = track.scrollWidth;
    const maxScroll = trackWidth - containerWidth;

    const scrollPercent = (-currentTranslate / maxScroll);
    const scrollbarWidth = scrollbar.clientWidth - thumb.clientWidth;

    thumb.style.left = `${scrollPercent * scrollbarWidth}px`;
  }

  thumb.addEventListener('mousedown', (e) => {
    thumbDragging = true;
    thumbStartX = e.clientX;
    thumbStartLeft = parseInt(window.getComputedStyle(thumb).left);
  });

  document.addEventListener('mousemove', (e) => {
    if (!thumbDragging) return;

    const dx = e.clientX - thumbStartX;
    const scrollbarWidth = scrollbar.clientWidth - thumb.clientWidth;

    let newLeft = thumbStartLeft + dx;
    if (newLeft < 0) newLeft = 0;
    if (newLeft > scrollbarWidth) newLeft = scrollbarWidth;

    thumb.style.left = `${newLeft}px`;

    const percent = newLeft / scrollbarWidth;

    const containerWidth = track.parentElement.offsetWidth;
    const trackWidth = track.scrollWidth;

    const maxScroll = trackWidth - containerWidth;

    currentTranslate = -percent * maxScroll;
    prevTranslate = currentTranslate;

    track.style.transform = `translateX(${currentTranslate}px)`;
  });

  document.addEventListener('mouseup', () => {
    thumbDragging = false;
  });

  // Initialize
  updateSlider();

});



document.addEventListener("DOMContentLoaded", () => {
  const mapObj = document.getElementById("mapObj");

  mapObj.addEventListener("load", () => {
    const svg = mapObj.contentDocument.querySelector("svg");

    svg.querySelectorAll("path").forEach(region => {
      region.addEventListener("click", () => {
        alert(region.id);
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const nextBtn = document.getElementById('testimonial-next');
  const prevBtn = document.getElementById('testimonial-prev');
  const indexDisplay = document.querySelector('.testimonial-index');
  let currentSlide = 0;
  const totalSlides = testimonialSlides.length;

  function showTestimonial(index) {
    testimonialSlides.forEach((slide, i) => {
      slide.dataset.active = i === index ? "true" : "false";
    });
    indexDisplay.textContent = `${index + 1}/${totalSlides}`;

    // Disable buttons at edges
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === totalSlides - 1;
  }

  nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      showTestimonial(currentSlide);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      showTestimonial(currentSlide);
    }
  });

  // Initialize first slide
  showTestimonial(currentSlide);
});



