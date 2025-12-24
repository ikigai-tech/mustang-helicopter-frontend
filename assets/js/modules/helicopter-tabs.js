// helicopter-tabs.js

export function initHelicopterTabs() {
  const helicopterButtons = document.querySelectorAll('button[data-tab]');
  const tabPanes = document.querySelectorAll('.tab-pane');

  if (!helicopterButtons.length || !tabPanes.length) return;

  // Function to show a specific tab
  function showTab(tab) {
    tabPanes.forEach(pane => {
      pane.classList.add('hidden');
      if (pane.id === tab) pane.classList.remove('hidden');
    });
  }

  // Add click events to helicopter buttons
  helicopterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      showTab(tab);
    });
  });

  // Show default tab
  showTab('cockpit');
}
