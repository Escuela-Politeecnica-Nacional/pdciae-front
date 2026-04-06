// ============================================
//  OlwShare — js/pages/admin-materials.js
//  Gestión de Materiales con Costo (Admin)
// ============================================

import { requireRole } from '../api/config.js';
import { getMaterials, deleteMaterial } from '../api/materials.js';
import { toast } from '../components/toast.js';
import { showLoader, hideLoader } from '../components/loader.js';

requireRole('admin');

const tableBody = document.getElementById('materials-table-body');
const addBtn    = document.getElementById('btn-add-material');

addBtn?.addEventListener('click', () => {
  window.location.href = '/pages/admin/material-detail.html';
});

async function loadMaterials() {
  showLoader();
  try {
    const { materials } = await getMaterials();
    renderTable(materials);
  } catch (err) {
    toast.error('Error al cargar materiales.');
  } finally {
    hideLoader();
  }
}

function renderTable(materials) {
  if (!tableBody) return;
  if (!materials || materials.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" class="text-center py-8 text-slate-400">No hay materiales registrados.</td></tr>`;
    return;
  }

  tableBody.innerHTML = materials.map(m => `
    <tr>
      <td>${m.title}</td>
      <td>${m.subject?.name || '--'}</td>
      <td>$${m.price ?? '0'}</td>
      <td><span class="badge ${m.active ? 'badge-success' : 'badge-error'}">${m.active ? 'Activo' : 'Inactivo'}</span></td>
      <td class="flex gap-2">
        <button class="btn btn-sm btn-secondary btn-edit" data-id="${m._id}">Editar</button>
        <button class="btn btn-sm btn-danger btn-delete" data-id="${m._id}">Eliminar</button>
      </td>
    </tr>
  `).join('');

  tableBody.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.href = `/pages/admin/material-detail.html?id=${btn.dataset.id}`;
    });
  });

  tableBody.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('¿Eliminar este material?')) return;
      showLoader();
      try {
        await deleteMaterial(btn.dataset.id);
        toast.success('Material eliminado.');
        loadMaterials();
      } catch (err) {
        toast.error(err.message || 'Error al eliminar.');
      } finally {
        hideLoader();
      }
    });
  });
}

loadMaterials();
