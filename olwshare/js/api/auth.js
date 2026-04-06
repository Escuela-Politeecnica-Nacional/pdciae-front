// ============================================
//  OlwShare — js/api/auth.js
//  Autenticación: login, registro, logout
// ============================================

import { apiFetch, setToken, setRole, setUser, clearSession, redirectByRole } from './config.js';

/**
 * Iniciar sesión
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user, token, role}>}
 *
 * Espera del backend:
 * POST /api/auth/login → { token: "...", user: { _id, name, email, role } }
 */
export async function login(email, password) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  setToken(data.token);
  setRole(data.user.role);
  setUser(data.user);

  return data;
}

/**
 * Registrar nuevo usuario
 * @param {object} userData - { name, lastName, email, password, role }
 * @returns {Promise<{user, token}>}
 *
 * Espera del backend:
 * POST /api/auth/register → { token: "...", user: { _id, name, email, role } }
 */
export async function register(userData) {
  const data = await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

  setToken(data.token);
  setRole(data.user.role);
  setUser(data.user);

  return data;
}

/**
 * Cerrar sesión
 */
export function logout() {
  clearSession();
  window.location.href = '/pages/public/login.html';
}
