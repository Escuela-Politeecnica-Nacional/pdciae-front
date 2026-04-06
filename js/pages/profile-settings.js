// ============================================
//  OlwShare — js/pages/profile-settings.js
//  Lógica de Configuración de Perfil
// ============================================

import { getMyProfile, updateMyProfile, changePassword } from '../api/users.js';
import { requireAuth, getUser, setUser } from '../api/config.js';
import { toast } from '../components/toast.js';
import { showLoader, hideLoader } from '../components/loader.js';

requireAuth();

// Cargar datos actuales del perfil en los campos
async function loadProfile() {
  showLoader();
  try {
    const user = await getMyProfile();
    setUser(user); // actualizar caché local

    const nameEl     = document.getElementById('nombre_input');
    const lastNameEl = document.getElementById('apellido_input');
    const emailEl    = document.getElementById('email_input');

    if (nameEl)     nameEl.value     = user.name     || '';
    if (lastNameEl) lastNameEl.value = user.lastName  || '';
    if (emailEl)    emailEl.value    = user.email     || '';
  } catch (err) {
    toast.error('Error al cargar el perfil.');
  } finally {
    hideLoader();
  }
}

// Guardar datos personales
const updateProfileBtn = document.getElementById('btn-update-profile');
updateProfileBtn?.addEventListener('click', async () => {
  const name     = document.getElementById('nombre_input')?.value.trim();
  const lastName = document.getElementById('apellido_input')?.value.trim();

  if (!name) { toast.warning('El nombre no puede estar vacío.'); return; }

  showLoader();
  try {
    const updated = await updateMyProfile({ name, lastName });
    setUser(updated);
    toast.success('Datos personales actualizados correctamente.');
  } catch (err) {
    toast.error(err.message || 'No se pudo actualizar el perfil.');
  } finally {
    hideLoader();
  }
});

// Cambiar contraseña
const changePassBtn = document.getElementById('btn-change-password');
changePassBtn?.addEventListener('click', async () => {
  const newPassword = document.getElementById('new_password')?.value;

  if (!newPassword) { toast.warning('Ingresa una nueva contraseña.'); return; }
  if (newPassword.length < 8) { toast.warning('La contraseña debe tener al menos 8 caracteres.'); return; }

  showLoader();
  try {
    await changePassword({ newPassword });
    document.getElementById('new_password').value = '';
    toast.success('Contraseña actualizada correctamente.');
  } catch (err) {
    toast.error(err.message || 'No se pudo actualizar la contraseña.');
  } finally {
    hideLoader();
  }
});

// Inicializar
loadProfile();
