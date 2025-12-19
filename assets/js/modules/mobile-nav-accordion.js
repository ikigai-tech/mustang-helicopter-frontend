export function initMobileNavAccordion(container) {
  if (!container) return;

  container.addEventListener("click", e => {
    const toggle = e.target.closest(".mnav-toggle");
    if (!toggle) return;

    e.preventDefault();

    const item = toggle.closest(".mnav-item");
    const submenu = item.querySelector(":scope > .mnav-submenu");
    if (!submenu) return;

    const siblings = item.parentElement.children;
    const isOpen = !submenu.classList.contains("hidden");

    // Close siblings at same level
    [...siblings].forEach(sibling => {
      if (sibling !== item) {
        sibling.classList.remove("mnav-open");
        sibling.classList.toggle("hidden", !isOpen);

        sibling
          .querySelectorAll(":scope > .mnav-submenu")
          .forEach(sm => sm.classList.add("hidden"));
      }
    });

    // Toggle current item
    item.classList.toggle("mnav-open", !isOpen);
    submenu.classList.toggle("hidden");
    if (!submenu.classList.contains("hidden")) {
      submenu.classList.add("flex");
    } else {
      submenu.classList.remove("flex");
    }
  });
}
