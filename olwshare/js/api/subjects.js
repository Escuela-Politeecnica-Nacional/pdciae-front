// ============================================
//  OlwShare — js/api/subjects.js
// ============================================

import { apiFetch } from './config.js';

/** GET /api/subjects */
export async function getSubjects() {
  return apiFetch('/subjects');
}

/** GET /api/subjects/:id */
export async function getSubjectById(id) {
  return apiFetch(`/subjects/${id}`);
}
