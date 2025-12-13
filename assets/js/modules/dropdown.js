export function initDropdown(header, dropdownItem) {
  const dropdownTrigger = dropdownItem.querySelector("a");
  const dropdown = dropdownItem.querySelector(".servicesNav-dropdown");
  let dropdownOpen = false;

  const openDropdown = () => {
    if (!dropdown) return;
    dropdown.style.opacity = "1";
    dropdown.style.visibility = "visible";
    header.classList.add("dropdown-active");
    dropdownTrigger.setAttribute("aria-expanded", "true");
    dropdownOpen = true;
  };

  const closeDropdown = () => {
    if (!dropdown) return;
    dropdown.style.opacity = "0";
    dropdown.style.visibility = "hidden";
    header.classList.remove("dropdown-active");
    dropdownTrigger.setAttribute("aria-expanded", "false");
    dropdownOpen = false;
  };

  dropdownItem.addEventListener("mouseenter", openDropdown);

  document.querySelectorAll(".nav-items > li").forEach(navItem => {
    navItem.addEventListener("mouseenter", () => {
      if (!dropdownOpen) return;
      if (!navItem.classList.contains("nav-item-has-dropdown")) return;
      if (navItem !== dropdownItem) {
        closeDropdown();
        const newDropdown = navItem.querySelector(".servicesNav-dropdown");
        if (newDropdown) {
          newDropdown.style.opacity = "1";
          newDropdown.style.visibility = "visible";
        }
      }
    });
  });

  header.addEventListener("mouseleave", closeDropdown);

  if (dropdownTrigger && dropdown) {
    dropdownTrigger.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); dropdownOpen ? closeDropdown() : openDropdown(); }
      if (e.key === "ArrowDown") { e.preventDefault(); openDropdown(); dropdown.querySelector("a")?.focus(); }
    });

    dropdown.addEventListener("keydown", e => {
      if (e.key === "Escape") { closeDropdown(); dropdownTrigger.focus(); }
    });

    document.addEventListener("click", e => {
      if (!dropdown.contains(e.target) && !dropdownTrigger.contains(e.target)) closeDropdown();
    });
  }
}
