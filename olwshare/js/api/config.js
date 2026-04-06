// ============================================
//  OlwShare — js/api/config.js
//  Configuración central de la API
// ============================================

// ── URL Base ──────────────────────────────
// Cambia solo esta variable para apuntar al backend real
export const BASE_URL = 'http://localhost:3000/api';

// ── Claves en localStorage ─────────────────
const TOKEN_KEY = 'olwshare_token';
const ROLE_KEY  = 'olwshare_role';
const USER_KEY  = 'olwshare_user';

// ── Helpers de Token ──────────────────────
export function getToken()       { return localStorage.getItem(TOKEN_KEY); }
export function setToken(token)  { localStorage.setItem(TOKEN_KEY, token); }
export function removeToken()    { localStorage.removeItem(TOKEN_KEY); }

export function getRole()        { return localStorage.getItem(ROLE_KEY); }
export function setRole(role)    { localStorage.setItem(ROLE_KEY, role); }

export function getUser()        {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}
export function setUser(user)    { localStorage.setItem(USER_KEY, JSON.stringify(user)); }

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isLoggedIn()     { return !!getToken(); }

// ── Headers estándar con JWT ───────────────
export function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  };
}

// ── Fetch wrapper con manejo de errores ────
export async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: authHeaders(),
    ...options,
  };

  const response = await fetch(url, config);

  // 401 → sesión expirada
  if (response.status === 401) {
    clearSession();
    window.location.href = '/pages/public/login.html';
    return;
  }

  const data = await response.json();

  if (!response.ok) {
    // El backend debe devolver { message: "..." } en errores
    throw new Error(data.message || `Error ${response.status}`);
  }

  return data;
}

// ── Guards de Rol ──────────────────────────
// Uso: requireRole('admin') al inicio de cada página de admin
export function requireRole(role) {
  if (!isLoggedIn()) {
    window.location.href = '/pages/public/login.html';
    return false;
  }
  const userRole = getRole();
  if (userRole !== role) {
    // Redirigir según rol actual
    redirectByRole(userRole);
    return false;
  }
  return true;
}

export function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = '/pages/public/login.html';
    return false;
  }
  return true;
}

export function redirectByRole(role) {
  const routes = {
    student: '/pages/student/dashboard.html',
    tutor:   '/pages/tutor/profile.html',
    admin:   '/pages/admin/dashboard.html',
  };
  window.location.href = routes[role] || '/pages/public/login.html';
}
