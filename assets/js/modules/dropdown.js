// ======== Dropdown Module ========
export function initDropdown(header, dropdownItems) {
  let openDropdownItem = null;

  const openDropdown = (dropdownItem) => {
    const dropdown = dropdownItem.querySelector(".dropdown-menu");
    const trigger = dropdownItem.querySelector("button");
    if (!dropdown || !trigger) return;

    // Close any previously open dropdown
    if (openDropdownItem && openDropdownItem !== dropdownItem) {
      closeDropdown(openDropdownItem);
    }

    dropdown.style.opacity = "1";
    dropdown.style.visibility = "visible";
    header.classList.add("dropdown-active");
    trigger.setAttribute("aria-expanded", "true");
    openDropdownItem = dropdownItem;
  };

  const closeDropdown = (dropdownItem) => {
    const dropdown = dropdownItem.querySelector(".dropdown-menu");
    const trigger = dropdownItem.querySelector("button");
    if (!dropdown || !trigger) return;

    dropdown.style.opacity = "0";
    dropdown.style.visibility = "hidden";
    header.classList.remove("dropdown-active");
    trigger.setAttribute("aria-expanded", "false");

    if (openDropdownItem === dropdownItem) openDropdownItem = null;
  };

  dropdownItems.forEach(dropdownItem => {
    const trigger = dropdownItem.querySelector("button");
    const dropdown = dropdownItem.querySelector(".dropdown-menu");

    // Hover to open
    dropdownItem.addEventListener("mouseenter", () => openDropdown(dropdownItem));

    // Keyboard support
    trigger.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openDropdownItem === dropdownItem ? closeDropdown(dropdownItem) : openDropdown(dropdownItem);
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        openDropdown(dropdownItem);
        dropdown.querySelector("a")?.focus();
      }
    });

    dropdown.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        closeDropdown(dropdownItem);
        trigger.focus();
      }
    });
  });

  // Close when leaving the header
  header.addEventListener("mouseleave", () => {
    if (openDropdownItem) closeDropdown(openDropdownItem);
  });

  // Close when clicking outside
  document.addEventListener("click", e => {
    if (!openDropdownItem) return;
    const dropdown = openDropdownItem.querySelector(".dropdown-menu");
    const trigger = openDropdownItem.querySelector("button");
    if (!dropdown.contains(e.target) && !trigger.contains(e.target)) {
      closeDropdown(openDropdownItem);
    }
  });
}
