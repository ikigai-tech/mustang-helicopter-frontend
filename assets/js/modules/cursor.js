export function initCursor(cursor, carouselSection) {
  // Only run on screens wider than 768px
  if (window.innerWidth < 768) return;

  document.addEventListener("mousemove", e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  carouselSection.addEventListener("mouseenter", () => cursor.style.opacity = 1);
  carouselSection.addEventListener("mouseleave", () => cursor.style.opacity = 0);

  // Optional: handle window resize to remove cursor on small screens
  window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
      cursor.style.opacity = 0;
    }
  });
}
