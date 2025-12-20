# Cotizador-Esscala - Prueba Técnica

Este repositorio contiene la solución a la prueba técnica, el proyecto se ha estructurado como un Monorepo para facilitar la cohesión entre el Frontend y el Backend.

## 🚀 Demo.

Puedes probar la aplicación desplegada en los siguientes enlaces:

- **Frontend (Vercel):** [https://tu-proyecto.vercel.app](https://tu-proyecto.vercel.app)
- **Backend API (Railway):** [https://cotizador-locales-api.onrender.com/api/heath](https://cotizador-locales-api.onrender.com/api)
- **Documentación API:** [https://cotizador-locales-api.onrender.com/api/docs](https://cotizador-locales-api.onrender.com/api/docs/)

---

## 🛠 Tech Stack

### Frontend (`/frontend`)
- React 18 + Vite + TypeScript
- Tailwind CSS (Estilos)
- React Router DOM (Navegación)
- Axios (Peticiones HTTP)

### Backend (`/server`)
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- Docker (Containerización)
- Swagger (Documentación)
---

## 📂 Estructura del Proyecto

El proyecto está organizado como un monorepo simple:

```bash
/
├── frontend/       # Aplicación Frontend (React/Vite) -> Desplegado en Vercel
├── server/         # API Backend (Node) -> Desplegado en Railway
└── README.md       # Documentación de prueba tecnica.
```

## ⚙️ Instrucciones de Instalación y Ejecución

El proyecto está configurado para iniciarse con comandos simples desde la raíz.

### Prerrequisitos
- Node.js (v18 o superior)
- MongoDB (Local o Atlas)

### 1. Clonar el repositorio
```bash
git clone [https://github.com/miralriodev/cotizador-locales.git](https://github.com/miralriodev/cotizador-locales.git)
cd cotizador-locales
```

