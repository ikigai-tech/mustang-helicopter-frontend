export function initTestimonials(slides, nextBtn, prevBtn, indexDisplay) {
  let currentSlide = 0;
  const totalSlides = slides.length;

  const showTestimonial = index => {
    slides.forEach((slide, i) => slide.dataset.active = i === index ? "true" : "false");
    indexDisplay.textContent = `${index + 1}/${totalSlides}`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === totalSlides - 1;
  };

  nextBtn.addEventListener('click', () => { if (currentSlide < totalSlides - 1) showTestimonial(++currentSlide); });
  prevBtn.addEventListener('click', () => { if (currentSlide > 0) showTestimonial(--currentSlide); });

  showTestimonial(currentSlide);
}
