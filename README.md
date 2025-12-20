# Cotizador-Esscala - Prueba Técnica

Este repositorio contiene la solución a la prueba técnica. El proyecto se ha estructurado como un Monorepo para facilitar la cohesión entre el Frontend y el Backend.

## 🚀 Demo

Puedes probar la aplicación desplegada en los siguientes enlaces:

- **Frontend (Vercel):** [https://cotizador-locales-three.vercel.app](https://cotizador-locales-three.vercel.app)
- **Backend API (Render):** [https://cotizador-locales-api.onrender.com/api/](https://cotizador-locales-api.onrender.com/api/)
- **Documentación API:** [https://cotizador-locales-api.onrender.com/api/docs/](https://cotizador-locales-api.onrender.com/api/docs/)

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
├── server/         # API Backend (Node) -> Desplegado en Render
└── README.md       # Documentación de prueba técnica.
```

## ⚙️ Instrucciones de Instalación y Ejecución

El proyecto está configurado para iniciarse con comandos simples desde la raíz.

### Prerrequisitos
- Node.js (v18 o superior)
- MongoDB (Local o Atlas)

### 1. Clonar el repositorio

```bash
git clone https://github.com/miralriodev/cotizador-locales.git
cd cotizador-locales
```

### 2. Configurar Variables de Entorno

Es necesario crear los archivos `.env` en cada carpeta basándose en los ejemplos proporcionados (`.env.example`).

**Backend (`server/.env`):**
```env
PORT=3001
DATABASE_URL=mongodb+srv://... (Tu conexión a Mongo)
JWT_SECRET=tu_secreto
```

**Frontend (`frontend/.env`):**
```env
# URL de tu backend local
VITE_API_URL=http://localhost:3001/api
```

### 3. Instalación Automática

Ejecuta este comando en la raíz para instalar las dependencias de ambos proyectos (Frontend y Backend) automáticamente:

```bash
npm run setup
```

### 4. Ejecución (Modo Desarrollo)

Para levantar ambos servicios simultáneamente (Frontend en puerto 5173 y Backend en 3001):

```bash
npm start
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver la app.

## 📡 Endpoints Disponibles

La API RESTful expone los siguientes recursos principales. Puedes ver la documentación interactiva y probarlos en `/api/docs`.

### 📍 Locales

| Método | Endpoint | Descripción | Ejemplo de Uso |
|---|---|---|---|
| GET | `/api/locales` | Obtiene todos los locales. Admite filtros por query. | `/api/locales?pabellon=A` |
| GET | `/api/locales/:codigo` | Obtiene detalle de un local por Código. | `/api/locales/A-101` |

### 📝 Cotizaciones

| Método | Endpoint | Descripción | Body Requerido |
|---|---|---|---|
| POST | `/api/cotizaciones` | Crea una nueva cotización y calcula totales. | `{ "local_codigo": "A-101", "duracion_meses": 12, "prospecto_email": "cliente@test.com" }` |

## 💡 Decisiones Técnicas Importantes

- **Monorepo:** Se eligió esta estructura para centralizar la gestión del código y facilitar la revisión técnica completa en un solo repositorio.
- **Validaciones de Negocio en Frontend:** Se implementaron reglas en el cliente (ej: impedir cotizar locales con estado "Ocupado") para mejorar la UX y reducir carga innecesaria al servidor.
- **Containerización (Docker):** El backend está configurado con Docker para garantizar que funcione idénticamente en el entorno local y en producción (Render), evitando problemas de "en mi máquina funciona".
- **Typescript:** Utilizado en todo el stack para garantizar la integridad de los datos y prevenir errores de tipado.

## 🔮 Mejoras Futuras

Con más tiempo, estas serían las siguientes implementaciones:

- **Testing Unitario:** Implementar pruebas con Jest tanto para los componentes de React como para los servicios del Backend.
- **Autenticación Admin:** Agregar un sistema de Login para administradores que permita cambiar el estado de los locales.
- **Envío de Correos:** Integrar un servicio  para enviar el resumen de la cotización al email del cliente real.

---
Desarrollado por Hugo Miralrio
