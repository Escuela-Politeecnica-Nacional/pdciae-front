// ============================================
//  OlwShare — js/pages/login.js
//  Lógica de la página de Login
// ============================================

import { login } from '../api/auth.js';
import { isLoggedIn, getRole, redirectByRole } from '../api/config.js';
import { toast } from '../components/toast.js';
import { showLoader, hideLoader } from '../components/loader.js';

// Si ya está logueado, redirigir directamente
if (isLoggedIn()) {
  redirectByRole(getRole());
}

const form     = document.getElementById('login-form');
const emailEl  = document.getElementById('email');
const passEl   = document.getElementById('password');
const errorEl  = document.getElementById('form-error');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearErrors();

  const email    = emailEl.value.trim();
  const password = passEl.value;

  if (!email || !password) {
    showError('Por favor, completa todos los campos.');
    return;
  }

  showLoader();
  try {
    const { user } = await login(email, password);
    toast.success(`¡Bienvenido, ${user.name}!`);
    setTimeout(() => redirectByRole(user.role), 500);
  } catch (err) {
    showError(err.message || 'Credenciales incorrectas. Inténtalo de nuevo.');
  } finally {
    hideLoader();
  }
});

function showError(msg) {
  if (errorEl) {
    errorEl.textContent = msg;
    errorEl.classList.remove('hidden');
  }
}

function clearErrors() {
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
  }
}
