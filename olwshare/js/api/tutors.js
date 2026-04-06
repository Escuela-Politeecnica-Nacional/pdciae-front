// ============================================
//  OlwShare — js/api/tutors.js
// ============================================

import { apiFetch } from './config.js';

/**
 * Buscar tutores con filtros
 * GET /api/tutors?subject=...&name=...&page=1&limit=10
 */
export async function getTutors(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/tutors?${query}`);
}

/**
 * Obtener perfil de un tutor por ID
 * GET /api/tutors/:id
 */
export async function getTutorById(id) {
  return apiFetch(`/tutors/${id}`);
}
