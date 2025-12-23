export function initCounters(selector = '.counter') {
  const counters = document.querySelectorAll(selector);
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = +counter.dataset.target;
      const duration = 4000; // total animation duration in ms
      let start = null;

      const step = timestamp => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const current = Math.min(Math.floor((progress / duration) * target), target);
        counter.innerText = current + '+';
        if (progress < duration) {
          requestAnimationFrame(step);
        } else {
          counter.innerText = target + '+';
        }
      };

      requestAnimationFrame(step);
      obs.unobserve(counter);
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => observer.observe(counter));
}
