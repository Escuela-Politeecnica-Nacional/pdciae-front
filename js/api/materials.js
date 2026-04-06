// ============================================
//  OlwShare — js/api/materials.js
// ============================================

import { apiFetch } from './config.js';

/** GET /api/materials?page=1&limit=20 */
export async function getMaterials(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/materials?${query}`);
}

/** GET /api/materials/:id */
export async function getMaterialById(id) {
  return apiFetch(`/materials/${id}`);
}

/** POST /api/materials */
export async function createMaterial(data) {
  return apiFetch('/materials', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/** PUT /api/materials/:id */
export async function updateMaterial(id, data) {
  return apiFetch(`/materials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/** DELETE /api/materials/:id */
export async function deleteMaterial(id) {
  return apiFetch(`/materials/${id}`, { method: 'DELETE' });
}
