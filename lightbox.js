/* =========================================================
   ART LIGHTBOX
   Click a piece in the Art Gallery to see it bigger with its
   description. Reads data-title, data-meta and data-desc from
   each .play-item in index.html.
   ========================================================= */
(function () {
  const items = Array.from(document.querySelectorAll('.play-item'));
  const lb = document.getElementById('lightbox');
  if (!lb || !items.length) return;

  const lbImg   = lb.querySelector('.lb-image');
  const lbMeta  = lb.querySelector('.lb-meta');
  const lbTitle = lb.querySelector('.lb-title');
  const lbDesc  = lb.querySelector('.lb-desc');
  const lbCount = lb.querySelector('.lb-count');
  const closeBtn = lb.querySelector('.lb-close');

  let current = 0;
  let lastFocused = null;

  function show(i) {
    current = (i + items.length) % items.length; // loops at both ends
    const item = items[current];
    const img = item.querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbMeta.textContent  = item.dataset.meta || '';
    lbTitle.textContent = item.dataset.title || img.alt;
    lbDesc.textContent  = item.dataset.desc || '';
    lbCount.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(items.length).padStart(2, '0');
  }

  function open(i) {
    lastFocused = document.activeElement;
    show(i);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden'; // page behind stays put
    closeBtn.focus();
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  items.forEach(function (item, i) {
    // Only open on a real click, not at the end of dragging the strip
    let downX = 0;
    let downY = 0;
    item.addEventListener('pointerdown', function (e) { downX = e.clientX; downY = e.clientY; });
    item.addEventListener('click', function (e) {
      if (Math.abs(e.clientX - downX) > 5 || Math.abs(e.clientY - downY) > 5) return;
      open(i);
    });

    // Keyboard: Tab to a piece, press Enter or Space
    item.tabIndex = 0;
    item.setAttribute('role', 'button');
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });

  closeBtn.addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
  lb.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });

  // Clicking the dark background closes it
  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target.classList.contains('lb-content')) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
})();
