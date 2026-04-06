// ============================================
//  OlwShare — js/api/documents.js
// ============================================

import { apiFetch } from './config.js';

/** GET /api/documents?subjectId=...&page=1 */
export async function getDocuments(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/documents?${query}`);
}

/** GET /api/documents/:id */
export async function getDocumentById(id) {
  return apiFetch(`/documents/${id}`);
}
