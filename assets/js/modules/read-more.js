export function initReadMore(btn, content, options = {}) {
  if (!btn || !content) return;

  const {
    collapsedHeight = 180,
    moreText = "READ FULL MESSAGE",
    lessText = "READ LESS MESSAGE",
    readFullDetail = "READ FULL DETAIL",
    readLessDetail = "READ LESS DETAIL",
  } = options;

  const textContent = btn.querySelector("[data-readmore-content]");
  const textEl = btn.querySelector("[data-readmore-text]");
  let expanded = false;

  // Initial state
  content.style.maxHeight = `${collapsedHeight}px`;
  content.style.overflow = "hidden";
  content.style.transition = "max-height 0.5s ease";
  content.classList.remove("expanded");
  btn.setAttribute("aria-expanded", "false");

  btn.addEventListener("click", () => {
    expanded = !expanded;

    if (expanded) {
      // EXPAND
      content.style.overflow = "hidden";
      content.style.maxHeight = `${content.scrollHeight}px`;
      content.classList.add("expanded");

      // 🔑 CLEAN UP AFTER ANIMATION
      content.addEventListener(
        "transitionend",
        function handler(e) {
          if (e.propertyName === "max-height") {
            content.style.maxHeight = "none"; // ← THIS FIXES IT
            content.style.overflow = "visible";
            content.removeEventListener("transitionend", handler);
          }
        }
      );
    } else {
      // COLLAPSE
      content.style.overflow = "hidden";
      content.style.maxHeight = `180px`;
      content.classList.remove("expanded");
    }

    btn.setAttribute("aria-expanded", expanded);
    btn.classList.toggle("expanded", expanded);

    if (textEl) {
      textEl.textContent = expanded ? lessText : moreText;
    }
    if (textContent) {
      textContent.textContent = expanded ? readLessDetail : readFullDetail;
    }
  });
}
