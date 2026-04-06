// ============================================
//  OlwShare — js/components/loader.js
//  Spinner de carga global
// ============================================

let overlay = null;

export function showLoader() {
  if (overlay) return;
  overlay = document.createElement('div');
  overlay.className = 'loader-overlay';
  overlay.innerHTML = `<div class="loader-spinner"></div>`;
  document.body.appendChild(overlay);
}

export function hideLoader() {
  if (overlay) {
    overlay.remove();
    overlay = null;
  }
}
