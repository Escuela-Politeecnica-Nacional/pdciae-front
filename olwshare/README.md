# OlwShare — Frontend

Plataforma educativa para conectar estudiantes con tutores y gestionar materiales académicos.

## Estructura del Proyecto

```
olwshare/
├── index.html                        ← Landing Page (pública)
│
├── pages/
│   ├── public/
│   │   ├── login.html                ← Login
│   │   └── register.html             ← Registro
│   │
│   ├── student/
│   │   ├── dashboard.html            ← Dashboard principal del estudiante
│   │   ├── dashboard-docs.html       ← Dashboard con documentos
│   │   ├── tutor-search.html         ← Buscador de tutores
│   │   ├── tutor-profile.html        ← Perfil de un tutor
│   │   ├── subjects.html             ← Listado de materias/documentos
│   │   ├── subject-detail.html       ← Documentos por materia
│   │   ├── document-detail.html      ← Detalle de un documento
│   │   └── material-detail.html      ← Detalle de material con costo
│   │
│   ├── tutor/
│   │   └── profile.html              ← Perfil del tutor (vista propia)
│   │
│   └── admin/
│       ├── dashboard.html            ← Panel de administración
│       ├── accounts.html             ← Gestión de cuentas
│       ├── account-detail.html       ← Detalle de cuenta
│       ├── materials.html            ← Gestión de materiales con costo
│       ├── create-admin.html         ← Formulario crear administrador
│       └── profile-settings.html     ← Configuración de perfil admin
│
├── css/
│   ├── base.css                      ← Reset, variables CSS, tipografía
│   ├── components.css                ← Componentes reutilizables (cards, botones, nav)
│   └── pages/
│       ├── auth.css                  ← Estilos login/register
│       ├── dashboard.css             ← Estilos dashboards
│       └── admin.css                 ← Estilos panel admin
│
├── js/
│   ├── api/
│   │   ├── config.js                 ← URL base, headers, token helper
│   │   ├── auth.js                   ← login(), register(), logout()
│   │   ├── users.js                  ← getProfile(), updateProfile()
│   │   ├── tutors.js                 ← getTutors(), getTutorById()
│   │   ├── subjects.js               ← getSubjects(), getSubjectById()
│   │   ├── documents.js              ← getDocuments(), getDocumentById()
│   │   └── materials.js              ← getMaterials(), createMaterial()
│   │
│   ├── components/
│   │   ├── navbar.js                 ← Renderizado dinámico de nav según rol
│   │   ├── toast.js                  ← Notificaciones toast
│   │   └── loader.js                 ← Spinner de carga
│   │
│   └── pages/
│       ├── login.js                  ← Lógica página login
│       ├── register.js               ← Lógica página register
│       ├── student-dashboard.js      ← Lógica dashboard estudiante
│       ├── tutor-search.js           ← Lógica buscador de tutores
│       ├── subjects.js               ← Lógica listado materias
│       ├── document-detail.js        ← Lógica detalle documento
│       ├── admin-dashboard.js        ← Lógica panel admin
│       ├── admin-accounts.js         ← Lógica gestión cuentas
│       └── profile-settings.js       ← Lógica configuración perfil
│
└── assets/
    └── icons/                        ← Íconos SVG propios si se necesitan
```

## Roles de Usuario

| Rol | Acceso |
|-----|--------|
| **Estudiante** | Dashboard, buscar tutores, ver materias/documentos, perfil |
| **Tutor** | Su perfil propio, materiales que ofrece |
| **Admin** | Panel completo: cuentas, materiales, crear admins |

## Convención de API

Todos los módulos en `js/api/` exportan funciones async que llaman al backend.
La URL base y el token JWT se manejan en `js/api/config.js`.

Ejemplo de uso:
```js
import { login } from '../api/auth.js';
const result = await login(email, password);
```

## Autenticación

- Se usa **JWT** almacenado en `localStorage` bajo la clave `olwshare_token`
- El rol del usuario se guarda en `localStorage` bajo la clave `olwshare_role`
- Cada página verifica el rol al cargar (`js/api/config.js` → `requireRole()`)

## Conexión con Backend (MongoDB)

Las funciones API están preparadas para conectar a:
```
BASE_URL = http://localhost:3000/api   (desarrollo)
BASE_URL = https://api.olwshare.com/api (producción)
```
Cambiar solo la variable `BASE_URL` en `js/api/config.js`.
