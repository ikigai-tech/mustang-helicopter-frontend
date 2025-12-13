export function initCursor(cursor, carouselSection) {
  document.addEventListener("mousemove", e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  carouselSection.addEventListener("mouseenter", () => cursor.style.opacity = 1);
  carouselSection.addEventListener("mouseleave", () => cursor.style.opacity = 0);
}
