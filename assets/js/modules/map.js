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

  const regionsToHighlight = ["EBC", "Mustang", "Simikot"];
  const defaultRegion = "EBC"; // default open region

  svg.querySelectorAll("path").forEach(region => {
    region.style.cursor = "pointer";
    region.style.transition = "transform 0.3s ease";
    region.style.transformBox = "fill-box"; // important for scaling

    // Click event
    region.addEventListener("click", () => {
      handleRegionClick(region, svg);
    });

    // Open default region
    if (region.id === defaultRegion) {
      handleRegionClick(region, svg);
    }
  });
}

// Separate function to handle region click (reusable)
function handleRegionClick(region, svg) {
  console.log("Clicked:", region.id);

  // Reset all paths and remove previous dynamic labels
  svg.querySelectorAll("path").forEach(p => {
    p.style.transform = "";
    p.style.fill = ""; // Reset fill
  });
  svg.querySelectorAll(".dynamic-label").forEach(el => el.remove());
  svg.querySelectorAll(".dynamic-box").forEach(el => el.remove());

  // Hide all cards first
  document.querySelectorAll(".destinations-card").forEach(card => card.classList.add("hidden"));

  // Show the card corresponding to clicked region
  const card = document.getElementById(`${region.id}-card`);
  if (card) card.classList.remove("hidden");

  // Only create tooltip/scale for EBC, Mustang, Simikot
  const regionsToHighlight = ["EBC", "Mustang", "Simikot"];
  if (!regionsToHighlight.includes(region.id)) return;

  // Scale different regions
  let scale = 1.5;
  if (region.id === "Mustang" || region.id === "Simikot") scale = 2.5;
  region.style.transformOrigin = "center";
  region.style.transform = `scale(${scale})`;

  // Fill adjacent regions if needed
  if (region.id === "EBC") {
    const solukhumbu = svg.querySelector("#solukhumbu");
    if (solukhumbu) solukhumbu.style.fill = "#7A7979";
  } else if (region.id === "Simikot") {
    const humla = svg.querySelector("#humla");
    if (humla) humla.style.fill = "#7A7979";
  } else if (region.id === "Mustang") {
    const mustang = svg.querySelector("#mustang");
    if (mustang) mustang.style.fill = "#7A7979";
  }

  // Tooltip
  const bbox = region.getBBox();
  const offsetY = 10;
  const paddingX = 6;
  const paddingY = 4;

  // Create text
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.classList.add("dynamic-label");
  text.setAttribute("fill", "#fff");
  text.setAttribute("font-size", "12");
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("dominant-baseline", "middle");
  text.textContent = region.id;
  svg.appendChild(text);

  // Measure text
  const textBBox = text.getBBox();
  const rectWidth = textBBox.width + paddingX * 2;
  const rectHeight = textBBox.height + paddingY * 2;

  // Create rectangle behind text
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

  // Center text
  text.setAttribute("x", bbox.x + bbox.width / 2);
  text.setAttribute("y", bbox.y - rectHeight / 2 - offsetY);
}
