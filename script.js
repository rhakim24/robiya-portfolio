// ---------- Live clocks for Boston and Tashkent ----------
function updateClocks() {
  const fmt = (zone) =>
    new Date().toLocaleTimeString("en-US", {
      timeZone: zone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  document.getElementById("clock-boston").textContent = fmt("America/New_York");
  document.getElementById("clock-tashkent").textContent = fmt("Asia/Tashkent");
}
updateClocks();
setInterval(updateClocks, 1000 * 15);

// ---------- Click and drag to scroll the Play strip ----------
const strip = document.getElementById("play-strip");
let isDown = false;
let startX = 0;
let startScroll = 0;

strip.addEventListener("mousedown", (e) => {
  isDown = true;
  strip.classList.add("dragging");
  startX = e.pageX;
  startScroll = strip.scrollLeft;
});

window.addEventListener("mouseup", () => {
  isDown = false;
  strip.classList.remove("dragging");
});

strip.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  strip.scrollLeft = startScroll - (e.pageX - startX);
});
