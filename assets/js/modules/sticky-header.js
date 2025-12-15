// modules/sticky-header.js
export function initStickyHeader(header, offset = 100) {
  if (!header) return;

  let lastScrollY = window.scrollY;

  function updateHeader() {
    const currentScroll = window.scrollY;

    if (currentScroll === 0) {
      // At top
      header.classList.remove("sticky-header");
      header.style.transform = "translateY(0)";
    } else if (currentScroll > lastScrollY && currentScroll > offset) {
      // Scrolling down
      header.classList.remove("sticky-header");
      header.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up or mid-page
      header.classList.add("sticky-header");
      header.style.transform = "translateY(0)";
    }

    lastScrollY = currentScroll;
  }

  // Init
  updateHeader();
  window.addEventListener("scroll", updateHeader);
}
