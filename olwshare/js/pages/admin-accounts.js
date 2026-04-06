// ============================================
//  OlwShare — js/pages/admin-accounts.js
//  Gestión de Cuentas (Admin)
//
//  Estructura de tabla esperada en el HTML:
//  Nombre | Apellido | ID | Email | Estado
// ============================================

import { requireRole } from '../api/config.js';
import { getAllUsers, setUserStatus } from '../api/users.js';
import { toast } from '../components/toast.js';
import { showLoader, hideLoader } from '../components/loader.js';

requireRole('admin');

let currentPage = 1;
const LIMIT = 15;

// IDs que deben estar en accounts.html:
//   <tbody id="accounts-table-body">
//   <input  id="search-user">          ← barra de búsqueda del topbar
//   <button id="btn-create-admin">     ← "Crear Cuenta de Administrador"
//   <button id="btn-export">           ← "Exportar Lista" (opcional)
const tableBody   = document.getElementById('accounts-table-body');
const searchInput = document.getElementById('search-user');
const createBtn   = document.getElementById('btn-create-admin');

// ── Cargar usuarios ────────────────────────
async function loadUsers() {
  showLoader();
  try {
    const params = { page: currentPage, limit: LIMIT };
    if (searchInput?.value.trim()) params.search = searchInput.value.trim();

    const { users, total } = await getAllUsers(params);
    renderTable(users, total);

  } catch (err) {
    toast.error('Error al cargar usuarios.');
  } finally {
    hideLoader();
  }
}

// ── Renderizar filas ───────────────────────
// Columnas: Nombre | Apellido | ID | Email | Estado
function renderTable(users, total) {
  if (!tableBody) return;

  if (!users || users.length === 0) {
    tableBody.innerHTML = `
      <tr class="group">
        <td class="px-8 py-16 text-center" colspan="5">
          <div class="flex flex-col items-center justify-center space-y-3 opacity-40">
            <span class="material-symbols-outlined text-6xl">person_search</span>
            <p class="text-lg font-headline font-semibold">No se encontraron usuarios</p>
            <p class="text-sm font-body">Intenta con otro término de búsqueda.</p>
          </div>
        </td>
      </tr>`;
    return;
  }

  // Contador secuencial visible en pantalla (no el _id de Mongo)
  const offset = (currentPage - 1) * LIMIT;

  tableBody.innerHTML = users.map((u, i) => `
    <tr class="hover:bg-surface-container-low transition-colors duration-200" data-id="${u._id}">
      <td class="px-8 py-6">
        <a class="text-on-surface font-semibold font-headline hover:text-primary transition-colors cursor-pointer btn-detail"
           data-id="${u._id}">
          ${u.name}
        </a>
      </td>
      <td class="px-8 py-6 text-on-surface-variant font-body">${u.lastName || '—'}</td>
      <td class="px-8 py-6 text-on-surface-variant font-body">${offset + i + 1}</td>
      <td class="px-8 py-6 text-on-surface-variant font-body">${u.email}</td>
      <td class="px-8 py-6 text-right">
        <span class="inline-flex items-center gap-1.5 font-medium ${u.active ? 'text-secondary' : 'text-error'}">
          <span class="w-2 h-2 rounded-full ${u.active ? 'bg-secondary' : 'bg-error'}"></span>
          ${u.active ? 'Activo' : 'Inactivo'}
        </span>
      </td>
    </tr>
  `).join('');

  // Click en nombre → detalle de cuenta
  tableBody.querySelectorAll('.btn-detail').forEach(el => {
    el.addEventListener('click', () => {
      window.location.href = `/pages/admin/account-detail.html?id=${el.dataset.id}`;
    });
  });
}

// ── Botón Crear Admin ──────────────────────
createBtn?.addEventListener('click', () => {
  window.location.href = '/pages/admin/create-admin.html';
});

// ── Búsqueda en tiempo real ────────────────
searchInput?.addEventListener('input', debounce(() => {
  currentPage = 1;
  loadUsers();
}, 400));

function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

loadUsers();
