export function initServiceTabs(serviceTabs, serviceContents, options = {}) {
  if (!serviceTabs.length || !serviceContents.length) return;

  const {
    activeClass = 'active-tab',
    hiddenClass = 'hidden',
    autoInit = true
  } = options;

  serviceTabs.forEach(tabButton => {
    tabButton.addEventListener('click', () => {
      const targetId = tabButton.dataset.tab;
      if (!targetId) return;

      // Find matching content INSIDE provided contents
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

      // Mobile: keep active tab centered in slider
      tabButton.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    });
  });

  // Auto-activate first tab only once
  if (autoInit) {
    const activeTab = Array.from(serviceTabs).find(tab =>
      tab.classList.contains(activeClass)
    );
    (activeTab || serviceTabs[0])?.click();
  }
}



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

    tabs[index].click(); // reuse your existing tab logic
  };

  prevBtn.addEventListener('click', () => goToIndex(getActiveIndex() - 1));
  nextBtn.addEventListener('click', () => goToIndex(getActiveIndex() + 1));
}
