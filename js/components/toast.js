// ============================================
//  OlwShare — js/components/toast.js
//  Sistema de notificaciones toast
// ============================================

// Asegurar contenedor en el DOM
function getContainer() {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  return container;
}

/**
 * Mostrar un toast
 * @param {string} message
 * @param {'success'|'error'|'warning'|'info'} type
 * @param {number} duration - milisegundos (default: 4000)
 */
export function showToast(message, type = 'info', duration = 4000) {
  const icons = {
    success: 'check_circle',
    error:   'error',
    warning: 'warning',
    info:    'info',
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined" style="font-size:18px">${icons[type] || 'info'}</span>
    <span>${message}</span>
  `;

  const container = getContainer();
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'none';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

export const toast = {
  success: (msg) => showToast(msg, 'success'),
  error:   (msg) => showToast(msg, 'error'),
  warning: (msg) => showToast(msg, 'warning'),
  info:    (msg) => showToast(msg, 'info'),
};
