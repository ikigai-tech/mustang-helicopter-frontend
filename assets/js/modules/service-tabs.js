export function initServiceTabs(serviceTabs, serviceContents) {
  serviceTabs.forEach(tabButton => {
    tabButton.addEventListener('click', () => {
      const targetId = tabButton.dataset.tab;
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;
      serviceTabs.forEach(btn => btn.classList.remove('active-tab'));
      tabButton.classList.add('active-tab');
      serviceContents.forEach(section => section.classList.add('hidden'));
      targetSection.classList.remove('hidden');
    });
  });
  serviceTabs[0]?.click();
}
