/* ===============================
   Service Tabs (Content Switch)
================================ */
export function initServiceTabs(serviceTabs, serviceContents, options = {}) {
  if (!serviceTabs.length || !serviceContents.length) return;

  const {
    activeClass = 'active-tab',
    hiddenClass = 'hidden',
    autoInit = true
  } = options;

  let isAutoInit = true;

  serviceTabs.forEach(tabButton => {
    tabButton.addEventListener('click', (e) => {
      const targetId = tabButton.dataset.tab;
      if (!targetId) return;

      // Find matching content
      const targetSection = Array.from(serviceContents).find(
        section => section.id === targetId
      );
      if (!targetSection) return;

      // Reset tabs
      serviceTabs.forEach(btn => btn.classList.remove(activeClass));
      tabButton.classList.add(activeClass);

      // Reset contents
      serviceContents.forEach(section =>
        section.classList.add(hiddenClass)
      );
      targetSection.classList.remove(hiddenClass);

      // ✅ Scroll ONLY on real user interaction
      if (!isAutoInit && e.isTrusted) {
        tabButton.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    });
  });

  // Auto-activate first tab (NO scroll)
  if (autoInit) {
    const activeTab = Array.from(serviceTabs).find(tab =>
      tab.classList.contains(activeClass)
    );
    (activeTab || serviceTabs[0])?.click();
    isAutoInit = false;
  }
}

/* ===============================
   Service Tab Navigation (Prev / Next)
================================ */
export function initServiceTabNavigation(
  sliderSelector = '.serviceTab-slider',
  tabSelector = '.service-tab',
  activeClass = 'active-tab'
) {
  const slider = document.querySelector(sliderSelector);
  if (!slider) return;

  const tabs = Array.from(slider.querySelectorAll(tabSelector));
  const prevBtn = slider.querySelector('#prevBtn');
  const nextBtn = slider.querySelector('#nextBtn');

  if (!tabs.length || !prevBtn || !nextBtn) return;

  const getActiveIndex = () =>
    tabs.findIndex(tab => tab.classList.contains(activeClass));

  const goToIndex = (index) => {
    if (index < 0) index = tabs.length - 1;
    if (index >= tabs.length) index = 0;

    // ✅ Triggers user-initiated click → scroll works correctly
    tabs[index].dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );
  };

  prevBtn.addEventListener('click', () =>
    goToIndex(getActiveIndex() - 1)
  );

  nextBtn.addEventListener('click', () =>
    goToIndex(getActiveIndex() + 1)
  );
}
