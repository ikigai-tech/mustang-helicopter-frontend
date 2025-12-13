export function initSlider(track, nextBtn, prevBtn, scrollbar, thumb) {
  const slides = Array.from(track.children);
  let currentIndex = 0;
  let slideWidth = slides[0].getBoundingClientRect().width + 20;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let thumbDragging = false;
  let thumbStartX = 0;
  let thumbStartLeft = 0;

  const visibleSlides = () => Math.floor(track.parentElement.offsetWidth / slideWidth);

  const clampTranslate = () => {
    const maxTranslate = 0;
    const minTranslate = -(track.scrollWidth - track.parentElement.offsetWidth);
    if (currentTranslate > maxTranslate) currentTranslate = maxTranslate;
    if (currentTranslate < minTranslate) currentTranslate = minTranslate;
  };

  const updateSlider = () => {
    currentTranslate = -currentIndex * slideWidth;
    clampTranslate();
    prevTranslate = currentTranslate;
    track.style.transform = `translateX(${currentTranslate}px)`;
    updateThumb();
  };

  const updateThumb = () => {
    const containerWidth = track.parentElement.offsetWidth;
    const trackWidth = track.scrollWidth;
    const maxScroll = trackWidth - containerWidth;
    const scrollPercent = (-currentTranslate / maxScroll);
    const scrollbarWidth = scrollbar.clientWidth - thumb.clientWidth;
    thumb.style.left = `${scrollPercent * scrollbarWidth}px`;
  };

  const getPositionX = e => e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;

  const dragStart = e => { isDragging = true; startPos = getPositionX(e); track.classList.add('dragging'); };
  const dragMove = e => {
    if (!isDragging) return;
    const diff = getPositionX(e) - startPos;
    currentTranslate = prevTranslate + diff;
    clampTranslate();
    track.style.transform = `translateX(${currentTranslate}px)`;
    updateThumb();
  };
  const dragEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('dragging');
    currentIndex = Math.round(-currentTranslate / slideWidth);
    currentIndex = Math.max(0, Math.min(currentIndex, slides.length - visibleSlides()));
    updateSlider();
  };

  nextBtn.addEventListener('click', () => { if (currentIndex < slides.length - visibleSlides()) { currentIndex++; updateSlider(); } });
  prevBtn.addEventListener('click', () => { if (currentIndex > 0) { currentIndex--; updateSlider(); } });

  track.addEventListener('mousedown', dragStart);
  track.addEventListener('touchstart', dragStart);
  track.addEventListener('mouseup', dragEnd);
  track.addEventListener('mouseleave', dragEnd);
  track.addEventListener('touchend', dragEnd);
  track.addEventListener('mousemove', dragMove);
  track.addEventListener('touchmove', dragMove);

  thumb.addEventListener('mousedown', e => {
    thumbDragging = true;
    thumbStartX = e.clientX;
    thumbStartLeft = parseInt(window.getComputedStyle(thumb).left);
  });

  document.addEventListener('mousemove', e => {
    if (!thumbDragging) return;
    const dx = e.clientX - thumbStartX;
    const scrollbarWidth = scrollbar.clientWidth - thumb.clientWidth;
    let newLeft = Math.min(Math.max(thumbStartLeft + dx, 0), scrollbarWidth);
    thumb.style.left = `${newLeft}px`;
    const percent = newLeft / scrollbarWidth;
    const containerWidth = track.parentElement.offsetWidth;
    const trackWidth = track.scrollWidth;
    currentTranslate = -percent * (trackWidth - containerWidth);
    prevTranslate = currentTranslate;
    track.style.transform = `translateX(${currentTranslate}px)`;
  });

  document.addEventListener('mouseup', () => { thumbDragging = false; });
  window.addEventListener('resize', () => { slideWidth = slides[0].getBoundingClientRect().width + 20; updateSlider(); });

  updateSlider();
}
