export function initReadMore(btn, content, options = {}) {
  if (!btn || !content) return;

  const {
    collapsedHeight = 200,
    moreText = "READ FULL MESSAGE",
    lessText = "READ LESS MESSAGE",
  } = options;

  const textEl = btn.querySelector("[data-readmore-text]");
  let expanded = false;

  // Initial state
  content.style.maxHeight = `${collapsedHeight}px`;
  content.style.overflow = "hidden";
  content.style.transition = "max-height 0.5s ease";
  btn.setAttribute("aria-expanded", "false");

  btn.addEventListener("click", () => {
    expanded = !expanded;

    if (expanded) {
      // Expand
      content.style.maxHeight = `${content.scrollHeight}px`;
    } else {
      // Collapse
      // Force reflow to enable transition
      content.style.maxHeight = `180px`;
    }

    btn.setAttribute("aria-expanded", expanded);
    btn.classList.toggle("expanded", expanded);

    if (textEl) {
      textEl.textContent = expanded ? lessText : moreText;
    }
  });
}
