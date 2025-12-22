// fixed-buttons.js
export function initFixedButtons() {
  const buttons = document.querySelector('.fixed-buttons');
  const endSection = document.querySelector('#practical-info');

  if (!buttons || !endSection) return;

  const buttonsHeight = buttons.offsetHeight;

  const onScroll = () => {
    const scrollY = window.pageYOffset;

    const stopAt =
      endSection.getBoundingClientRect().bottom +
      window.pageYOffset -
      buttonsHeight -
      700;

    if (scrollY >= stopAt) {
      buttons.classList.add('is-static');
    } else {
      buttons.classList.remove('is-static');
    }
  };

  window.addEventListener('scroll', onScroll);
  onScroll();
}
