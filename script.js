function showInfo(show) {
  document.getElementById('info-message').style.display = show ? 'block' : 'none';
}

function setTiersVisible(visible) {
  document.querySelectorAll('.hide-when-not-popup').forEach(el => {
    el.style.display = visible ? '' : 'none';
  });
}

document.querySelectorAll('.popup-trigger').forEach(el => {
  el.addEventListener('click', function(e) {
    e.stopPropagation();
    const profileDiv = el.closest('.profile');
    const name = el.textContent.trim();
    const popupText = profileDiv.getAttribute('data-popup-text') || '';
    const popupImg = profileDiv.getAttribute('data-popup-img') || '';
    const tiers = Array.from(profileDiv.querySelectorAll('.tiers'))
      .map(tier => {
        const clone = tier.cloneNode(true);
        clone.classList.remove('hide-when-not-popup');
        return clone.outerHTML;
      }).join('');
    // FAZE_gBR_24 popup szöveg szivárványos box-shadow
    const popupTextDiv = name === "FAZE_gBR_24"
      ? `<div id="rainbow-shadow" style="text-align:center;margin-bottom:12px;">${popupText}</div>`
      : `<div style="text-align:center;margin-bottom:12px;">${popupText}</div>`;
    document.getElementById('popup-content').innerHTML =
      `<h2>${name}</h2>
       <img src="${popupImg}" alt="${name}" style="max-width:120px;display:block;margin:12px auto 8px;">
       ${popupTextDiv}
       <div class="tiers-grid">${tiers}</div>`;
    document.getElementById('popup').classList.add('show');
    document.querySelectorAll('.info-inline').forEach(span => span.classList.add('hide'));
    setTiersVisible(false);
  });
});

function closePopup() {
  document.getElementById('popup').classList.remove('show');
  document.querySelectorAll('.info-inline').forEach(span => span.classList.remove('hide'));
  setTiersVisible(false);
}

window.addEventListener('keydown', function(e) {
  if (e.key === "Escape") closePopup();
});
window.addEventListener('click', function(e) {
  const popup = document.getElementById('popup');
  if (popup.classList.contains('show') && !popup.contains(e.target) && !e.target.classList.contains('popup-trigger')) {
    closePopup();
  }
});
