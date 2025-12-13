export function initMap(mapObj) {
  mapObj.addEventListener("load", () => {
    const svg = mapObj.contentDocument.querySelector("svg");
    if (!svg) return;
    svg.querySelectorAll("path").forEach(region => {
      region.addEventListener("click", () => alert(region.id));
    });
  });
}
