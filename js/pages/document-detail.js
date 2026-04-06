// ============================================
//  OlwShare — js/pages/document-detail.js
//  Detalle de un Documento
// ============================================

import { requireAuth } from '../api/config.js';
import { getDocumentById } from '../api/documents.js';
import { toast } from '../components/toast.js';
import { showLoader, hideLoader } from '../components/loader.js';

requireAuth();

const params = new URLSearchParams(window.location.search);
const docId  = params.get('id');

if (!docId) {
  toast.error('No se especificó ningún documento.');
  setTimeout(() => history.back(), 1500);
}

async function loadDocument() {
  showLoader();
  try {
    const doc = await getDocumentById(docId);
    populatePage(doc);
  } catch (err) {
    toast.error('Error al cargar el documento.');
  } finally {
    hideLoader();
  }
}

function populatePage(doc) {
  const titleEl   = document.getElementById('doc-title');
  const subjectEl = document.getElementById('doc-subject');
  const descEl    = document.getElementById('doc-description');
  const authorEl  = document.getElementById('doc-author');
  const dateEl    = document.getElementById('doc-date');
  const priceEl   = document.getElementById('doc-price');

  if (titleEl)   titleEl.textContent   = doc.title   || 'Sin título';
  if (subjectEl) subjectEl.textContent = doc.subject?.name || '';
  if (descEl)    descEl.textContent    = doc.description   || '';
  if (authorEl)  authorEl.textContent  = `${doc.author?.name || ''} ${doc.author?.lastName || ''}`;
  if (dateEl)    dateEl.textContent    = new Date(doc.createdAt).toLocaleDateString('es-ES');
  if (priceEl)   priceEl.textContent   = doc.price ? `$${doc.price}` : 'Gratis';
}

const downloadBtn = document.getElementById('btn-download');
downloadBtn?.addEventListener('click', () => {
  toast.info('Función de descarga próximamente disponible.');
});

if (docId) loadDocument();
