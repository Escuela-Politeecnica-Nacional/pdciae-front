// ============================================
//  OlwShare — js/api/users.js
//  Gestión de usuarios y perfiles
// ============================================

import { apiFetch } from './config.js';

/**
 * Obtener perfil del usuario autenticado
 * GET /api/users/me
 */
export async function getMyProfile() {
  return apiFetch('/users/me');
}

/**
 * Actualizar datos personales del usuario autenticado
 * PUT /api/users/me
 * @param {{ name?, lastName? }} profileData
 */
export async function updateMyProfile(profileData) {
  return apiFetch('/users/me', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
}

/**
 * Cambiar contraseña
 * PUT /api/users/me/password
 * @param {{ currentPassword?, newPassword }} data
 */
export async function changePassword(data) {
  return apiFetch('/users/me/password', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// ── Admin: Gestión de Cuentas ──────────────

/**
 * Listar todos los usuarios (admin)
 * GET /api/users?role=student|tutor|admin&page=1&limit=20
 */
export async function getAllUsers(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/users?${query}`);
}

/**
 * Obtener un usuario por ID (admin)
 * GET /api/users/:id
 */
export async function getUserById(id) {
  return apiFetch(`/users/${id}`);
}

/**
 * Actualizar usuario por ID (admin)
 * PUT /api/users/:id
 */
export async function updateUser(id, data) {
  return apiFetch(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * Activar / desactivar cuenta de usuario (admin)
 * PATCH /api/users/:id/status
 * @param {string} id
 * @param {boolean} active
 */
export async function setUserStatus(id, active) {
  return apiFetch(`/users/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ active }),
  });
}

/**
 * Crear administrador (admin)
 * POST /api/users/admin
 */
export async function createAdmin(adminData) {
  return apiFetch('/users/admin', {
    method: 'POST',
    body: JSON.stringify(adminData),
  });
}
