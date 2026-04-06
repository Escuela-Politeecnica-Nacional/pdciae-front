// ============================================
//  OlwShare — js/pages/admin-dashboard.js
//  Panel principal de Administración
// ============================================

import { requireRole } from '../api/config.js';
import { getAllUsers } from '../api/users.js';
import { getMaterials } from '../api/materials.js';
import { toast } from '../components/toast.js';
import { showLoader, hideLoader } from '../components/loader.js';

requireRole('admin');

async function loadStats() {
  showLoader();
  try {
    const [usersData, materialsData] = await Promise.all([
      getAllUsers({ limit: 1 }),
      getMaterials({ limit: 1 }),
    ]);

    // Actualizar contadores en el HTML si existen
    const statUsers     = document.getElementById('stat-users');
    const statMaterials = document.getElementById('stat-materials');

    if (statUsers)     statUsers.textContent     = usersData.total     ?? '--';
    if (statMaterials) statMaterials.textContent = materialsData.total ?? '--';

  } catch (err) {
    toast.error('Error al cargar estadísticas.');
  } finally {
    hideLoader();
  }
}

loadStats();
