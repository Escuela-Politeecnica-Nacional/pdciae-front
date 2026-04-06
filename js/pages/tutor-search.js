// ============================================
//  OlwShare — js/pages/tutor-search.js
//  Buscador de Tutores
// ============================================

import { requireAuth } from '../api/config.js';
import { getTutors } from '../api/tutors.js';
import { toast } from '../components/toast.js';
import { showLoader, hideLoader } from '../components/loader.js';

requireAuth();

const resultsEl   = document.getElementById('tutors-grid');
const searchInput = document.getElementById('search-tutor');
const filterSub   = document.getElementById('filter-subject');
const loadMoreBtn = document.getElementById('btn-load-more');

let currentPage = 1;
let allLoaded   = false;

async function loadTutors(reset = false) {
  if (reset) {
    currentPage = 1;
    allLoaded   = false;
    if (resultsEl) resultsEl.innerHTML = '';
  }

  if (allLoaded) return;

  showLoader();
  try {
    const params = {
      page:  currentPage,
      limit: 9,
    };
    if (searchInput?.value.trim())  params.name    = searchInput.value.trim();
    if (filterSub?.value)           params.subject = filterSub.value;

    const { tutors, total } = await getTutors(params);
    renderTutors(tutors, reset);

    const loaded = currentPage * 9;
    if (loaded >= total) {
      allLoaded = true;
      if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
    } else {
      if (loadMoreBtn) loadMoreBtn.classList.remove('hidden');
    }

  } catch (err) {
    toast.error('Error al cargar tutores.');
  } finally {
    hideLoader();
  }
}

function renderTutors(tutors, reset) {
  if (!resultsEl) return;

  if (reset && (!tutors || tutors.length === 0)) {
    resultsEl.innerHTML = `
      <div class="empty-state col-span-full">
        <span class="icon material-symbols-outlined">person_search</span>
        <h3>No se encontraron tutores</h3>
        <p>Intenta con otros filtros o términos de búsqueda.</p>
      </div>`;
    return;
  }

  const cards = tutors.map(t => `
    <div class="card tutor-card" data-id="${t._id}">
      <div class="flex items-center gap-3 mb-3">
        <img src="${t.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(t.name)}"
             alt="${t.name}" class="w-12 h-12 rounded-full object-cover"/>
        <div>
          <h3 class="font-bold text-on-surface">${t.name} ${t.lastName || ''}</h3>
          <p class="text-sm text-secondary font-medium">${t.speciality || ''}</p>
        </div>
      </div>
      <p class="text-sm text-on-surface-variant mb-4 line-clamp-2">${t.bio || 'Sin descripción.'}</p>
      <div class="flex items-center justify-between">
        <span class="text-sm font-bold text-primary">$${t.hourlyRate ?? '--'}/hr</span>
        <button class="btn btn-primary btn-sm btn-view-tutor" data-id="${t._id}">
          Ver perfil
        </button>
      </div>
    </div>
  `).join('');

  resultsEl.insertAdjacentHTML('beforeend', cards);

  resultsEl.querySelectorAll('.btn-view-tutor').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.href = `/pages/student/tutor-profile.html?id=${btn.dataset.id}`;
    });
  });
}

// Eventos
searchInput?.addEventListener('input', debounce(() => loadTutors(true), 450));
filterSub?.addEventListener('change', () => loadTutors(true));
loadMoreBtn?.addEventListener('click', () => { currentPage++; loadTutors(); });

function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

loadTutors(true);
