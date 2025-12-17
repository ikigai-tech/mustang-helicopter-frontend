export function initMap(mapObj) {
  if (mapObj.contentDocument) {
    setupMap(mapObj);
  }

  mapObj.addEventListener("load", () => {
    setupMap(mapObj);
  });
}

function setupMap(mapObj) {
  const svgDoc = mapObj.contentDocument;
  if (!svgDoc) return;

  const svg = svgDoc.querySelector("svg");
  if (!svg) return;

  const regionsToHighlight = ["EBC", "Mustang", "Simikot", "Gokyo", "Gosaikunda", "Damodar Kunda"];
  const defaultRegion = "EBC";

  // Set cursor only for highlighted regions
  svg.querySelectorAll("g[id], path[id]").forEach(region => {
    if (regionsToHighlight.includes(region.id)) {
      region.style.cursor = "pointer";
    } else {
      region.style.cursor = "default";
    }
  });

  // Click listener on SVG
  svg.addEventListener("click", e => {
    const clickedRegion = e.target.closest("g[id], path[id]");
    if (!clickedRegion) return;
    if (!regionsToHighlight.includes(clickedRegion.id)) return; // ignore non-highlighted
    handleRegionClick(clickedRegion, svg, regionsToHighlight);
  });

  // Open default region
  const defaultEl = svg.querySelector(`#${defaultRegion}`);
  if (defaultEl) handleRegionClick(defaultEl, svg, regionsToHighlight);
}

function handleRegionClick(region, svg, regionsToHighlight) {
  console.log("Clicked:", region.id);

  // Reset all paths/groups
  svg.querySelectorAll("g, path").forEach(el => {
    el.style.transform = "";
    el.style.fill = "";
  });

  // Remove previous tooltips
  svg.querySelectorAll(".dynamic-label, .dynamic-box").forEach(el => el.remove());

  // Hide all cards
  document.querySelectorAll(".destinations-card").forEach(card => card.classList.add("hidden"));

  // Show the card for this region
  const card = document.getElementById(`${region.id}-card`);
  if (card) card.classList.remove("hidden");

  // Determine scale
  let scale = 1.5; // default for path
  if (region.id === "Mustang" || region.id === "Simikot") scale = 2.5;

  // If group, scale bigger
  if (region.tagName === "g") {
    scale *= 1.5;
  }

  // Apply transform
  const bbox = region.getBBox();
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  region.style.transformOrigin = `${cx}px ${cy}px`;
  region.style.transform = `scale(${scale})`;

  // Fill adjacent regions
  const adjacentMap = {
    "EBC": ["solukhumbu"],
    "Simikot": ["humla"],
    "Mustang": ["mustang"],
    "Gokyo": ["solukhumbu"],
    "Gosaikunda": ["rasuwa"],
    "Damodar Kunda": ["mustang"]
  };

  const adjacent = adjacentMap[region.id];
  if (adjacent) {
    adjacent.forEach(id => {
      const el = svg.querySelector(`#${id}`);
      if (el) el.style.fill = "#7A7979";
    });
  }

  // Tooltip
  const offsetY = 10;
  const paddingX = 6;
  const paddingY = 4;

  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.classList.add("dynamic-label");
  text.setAttribute("fill", "#fff");
  text.setAttribute("font-size", "12");
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("dominant-baseline", "middle");
  text.textContent = region.id;
  svg.appendChild(text);

  const textBBox = text.getBBox();
  const rectWidth = textBBox.width + paddingX * 2;
  const rectHeight = textBBox.height + paddingY * 2;

  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.classList.add("dynamic-box");
  rect.setAttribute("x", bbox.x + bbox.width / 2 - rectWidth / 2);
  rect.setAttribute("y", bbox.y - rectHeight - offsetY);
  rect.setAttribute("width", rectWidth);
  rect.setAttribute("height", rectHeight);
  rect.setAttribute("fill", "#FF7510");
  rect.setAttribute("rx", 3);
  rect.setAttribute("ry", 3);

  svg.insertBefore(rect, text);
  text.setAttribute("x", bbox.x + bbox.width / 2);
  text.setAttribute("y", bbox.y - rectHeight / 2 - offsetY);
}
