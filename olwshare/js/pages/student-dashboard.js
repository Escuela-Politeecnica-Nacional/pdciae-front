// ============================================
//  OlwShare — js/pages/student-dashboard.js
//  Dashboard del Estudiante
// ============================================

import { requireRole, getUser } from '../api/config.js';
import { toast } from '../components/toast.js';
import { showLoader, hideLoader } from '../components/loader.js';

requireRole('student');

// Inyectar nombre del usuario en el saludo
const user = getUser();
const greetingEl = document.getElementById('greeting-name');
if (greetingEl && user) {
  greetingEl.textContent = user.name;
}

// TODO: Cargar próximas sesiones del estudiante
// import { getSessions } from '../api/sessions.js';
// const sessions = await getSessions();
// renderSessions(sessions);
