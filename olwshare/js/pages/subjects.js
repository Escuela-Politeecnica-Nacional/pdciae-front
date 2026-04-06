// ============================================
//  OlwShare — js/pages/subjects.js
//  Listado de Materias / Explorar Documentos
// ============================================

import { requireAuth } from '../api/config.js';
import { getSubjects } from '../api/subjects.js';
import { toast } from '../components/toast.js';
import { showLoader, hideLoader } from '../components/loader.js';

requireAuth();

const gridEl = document.getElementById('subjects-grid');

async function loadSubjects() {
  showLoader();
  try {
    const subjects = await getSubjects();
    renderSubjects(subjects);
  } catch (err) {
    toast.error('Error al cargar materias.');
  } finally {
    hideLoader();
  }
}

function renderSubjects(subjects) {
  if (!gridEl) return;
  if (!subjects || subjects.length === 0) {
    gridEl.innerHTML = `<div class="empty-state"><span class="icon material-symbols-outlined">menu_book</span><h3>No hay materias disponibles</h3></div>`;
    return;
  }

  gridEl.innerHTML = subjects.map(s => `
    <div class="card cursor-pointer hover:scale-[1.02] transition-transform"
         onclick="window.location.href='/pages/student/subject-detail.html?id=${s._id}'">
      <div class="flex items-center gap-3 mb-2">
        <span class="material-symbols-outlined text-primary">${s.icon || 'menu_book'}</span>
        <h3 class="font-bold text-on-surface">${s.name}</h3>
      </div>
      <p class="text-sm text-on-surface-variant">${s.description || ''}</p>
      <span class="badge badge-primary mt-3">${s.documentCount ?? 0} documentos</span>
    </div>
  `).join('');
}

loadSubjects();
