// ============================================
//  OlwShare — js/pages/register.js
//  Lógica de la página de Registro
// ============================================

import { register } from '../api/auth.js';
import { redirectByRole } from '../api/config.js';
import { toast } from '../components/toast.js';
import { showLoader, hideLoader } from '../components/loader.js';

const form    = document.getElementById('register-form');
const errorEl = document.getElementById('form-error');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearErrors();

  const name     = document.getElementById('name')?.value.trim();
  const lastName = document.getElementById('lastName')?.value.trim();
  const email    = document.getElementById('email')?.value.trim();
  const password = document.getElementById('password')?.value;
  const role     = document.getElementById('role')?.value || 'student';

  if (!name || !email || !password) {
    showError('Por favor, completa todos los campos obligatorios.');
    return;
  }

  if (password.length < 8) {
    showError('La contraseña debe tener al menos 8 caracteres.');
    return;
  }

  showLoader();
  try {
    const { user } = await register({ name, lastName, email, password, role });
    toast.success(`Cuenta creada. ¡Bienvenido, ${user.name}!`);
    setTimeout(() => redirectByRole(user.role), 600);
  } catch (err) {
    showError(err.message || 'No se pudo crear la cuenta. Inténtalo de nuevo.');
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
  if (errorEl) errorEl.classList.add('hidden');
}
