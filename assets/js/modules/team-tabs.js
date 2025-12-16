// modules/team-tabs.js
export function initTeamTabs({
  tabSelector = ".team-tab",
  panelSelector = ".team-panel",
  activeClass = "tab-active",
  hiddenClass = "hidden",
  sliderSelector = ".teamTabButtons-slider",
  prevBtnSelector = "#teamPrevBtn",
  nextBtnSelector = "#teamNextBtn"
} = {}) {
  const tabs = Array.from(document.querySelectorAll(tabSelector));
  const panels = Array.from(document.querySelectorAll(panelSelector));
  const slider = document.querySelector(sliderSelector);
  const prevBtn = document.querySelector(prevBtnSelector);
  const nextBtn = document.querySelector(nextBtnSelector);

  if (!tabs.length || !panels.length) return;

  // Activate a tab
  function activateTab(tab) {
    tabs.forEach(t => t.classList.remove(activeClass));
    panels.forEach(p => p.classList.add(hiddenClass));

    tab.classList.add(activeClass);
    const targetId = tab.getAttribute("data-tab");
    const panel = document.getElementById(targetId);
    if (panel) panel.classList.remove(hiddenClass);

    // Scroll active tab into view (for mobile)
    if (slider) {
      tab.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }

  // Click event on each tab
  tabs.forEach(tab => tab.addEventListener("click", () => activateTab(tab)));

  // Prev/Next buttons
  function getActiveIndex() {
    return tabs.findIndex(tab => tab.classList.contains(activeClass));
  }

  function goToIndex(index) {
    if (index < 0) index = tabs.length - 1;
    if (index >= tabs.length) index = 0;
    activateTab(tabs[index]);
  }

  if (prevBtn) prevBtn.addEventListener("click", () => goToIndex(getActiveIndex() - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goToIndex(getActiveIndex() + 1));

  // Auto-activate first tab
  activateTab(tabs[0]);
}
