export function initLoader(loader, appWrapper) {
  const dots = loader.querySelector(".dots");
  let dotCount = 0;

  const dotInterval = setInterval(() => {
    if (dots) dots.textContent = '.'.repeat((dotCount = (dotCount + 1) % 4));
  }, 500);

  const images = appWrapper.querySelectorAll("img");
  const imagePromises = Array.from(images).map(img => {
    return new Promise(resolve => img.complete ? resolve() : img.onload = img.onerror = resolve);
  });

  Promise.all(imagePromises).then(() => {
    clearInterval(dotInterval);
    gsap.to(loader, { opacity: 0, duration: 0.8, onComplete: () => loader.style.display = "none" });
    gsap.to(appWrapper, { opacity: 1, duration: 1, pointerEvents: "auto" });
  });
}
