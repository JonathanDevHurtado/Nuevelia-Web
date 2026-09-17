<div align="center">

<img src="public/logo.png" alt="Nuvelia Logo" width="200">

# Nuvelia

### Gestor de vida personal potenciado por Inteligencia Artificial

[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS_3-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express)](https://expressjs.com)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-00C853?style=for-the-badge)](LICENSE)

<br>

**Nuvelia** centraliza tareas, agenda, finanzas, compras, hábitos y un asistente de IA en una única interfaz moderna, rápida y con modo oscuro.

[Ver demo](#-demo) · [Instalación](#-instalación-rápida) · [Contribuir](#-contribuir)

</div>

---

## Características

| Módulo | Descripción |
|--------|-------------|
| **Dashboard** | Vista global de productividad, finanzas y rachas en tiempo real |
| **Tareas** | Crear, priorizar, fechas límite y seguimiento de estado |
| **Agenda** | Calendario de eventos con recordatorios y vista de lista |
| **Finanzas** | Registro de ingresos/gastos, gráficas mensuales y balance |
| **Compras** | Listas inteligentes con categorías y tiendas |
| **Hábitos** | Tracker semanal con rachas y porcentaje de cumplimiento |
| **Asistente IA** | Chat contextual con OpenAI / DeepSeek para consultas personalizadas |
| **Exportar Excel** | Descarga completa de todos los módulos en `.xlsx` formateado |
| **Modo Oscuro** | Tema claro y oscuro con transiciones suaves |
| **Responsive** | Interfaz optimizada para móvil, tablet y escritorio |
| **Auth** | Registro e inicio de sesión con JWT |

---

## Stack Tecnológico

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                          │
│  React 19 · Vite 8 · Tailwind CSS 3 · Lucide Icons │
├─────────────────────────────────────────────────────┤
│                    BACKEND                           │
│  Express.js · JWT · SQLite3                         │
├─────────────────────────────────────────────────────┤
│                      IA                             │
│  OpenAI API · DeepSeek API                          │
└─────────────────────────────────────────────────────┘
```

---

## Instalación Rápida

### Requisitos

- **Node.js** 18 o superior
- **npm** o yarn

### 1. Clonar

```bash
git clone https://github.com/JonathanDevHurtado/Nuevelia-Web.git
cd Nuevelia-Web
```

### 2. Frontend

```bash
npm install
```

### 3. Backend

```bash
cd server
npm install
cp .env.example .env   # Configurar variables de entorno
cd ..
```

### 4. Variables de Entorno

Edita `server/.env`:

```env
PORT=4000
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=tu-secreto-seguro-aqui
DATABASE_URL=./data/database.sqlite
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-3.5-turbo
```

### 5. Ejecutar

```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
npm run dev
```

Abre **http://localhost:5173**

---

## Estructura del Proyecto

```
Nuevelia-Web/
├── public/
│   ├── images/              # Imágenes de la aplicación
│   ├── logo.png             # Logo principal
│   └── auth-bg.png          # Fondo de autenticación
├── server/
│   ├── routes/
│   │   ├── auth.js          # Registro y login
│   │   ├── data.js          # CRUD de datos del usuario
│   │   ├── user.js          # Perfil de usuario
│   │   └── ai.js            # Integración con IA
│   ├── middleware/
│   │   └── auth.js          # Verificación JWT
│   ├── db.js                # Conexión SQLite
│   ├── index.js             # Servidor Express
│   └── .env.example         # Plantilla de variables
├── src/
│   ├── components/
│   │   ├── layout/          # Layout, Sidebar, Topbar, BottomNav
│   │   └── ui/              # DashboardCards, ChatAssistant, etc.
│   ├── context/
│   │   ├── AuthContext.jsx   # Autenticación
│   │   ├── DataContext.jsx   # Datos y lógica de negocio
│   │   └── ThemeContext.jsx  # Modo oscuro/claro
│   ├── pages/               # Todas las vistas de la app
│   ├── api/client.js        # Cliente HTTP con JWT
│   ├── App.jsx              # Router principal
│   └── main.jsx             # Entry point
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Módulos

<details>
<summary><b>Dashboard</b></summary>

Vista central con tarjetas de resumen para cada módulo. Muestra estadísticas en tiempo real, gráficas de finanzas y progreso de hábitos.

</details>

<details>
<summary><b>Gestor de Tareas</b></summary>

- Crear, editar y eliminar tareas
- Prioridades: Alta, Media, Baja
- Fechas límite y horas
- Filtros por estado y prioridad

</details>

<details>
<summary><b>Finanzas</b></summary>

- Registro de ingresos y gastos
- Categorías personalizadas
- Gráficas mensuales con Chart.js
- Balance automático

</details>

<details>
<summary><b>Hábitos</b></summary>

- Tracker semanal (Lun-Dom)
- Rachas de cumplimiento
- Porcentaje de adherencia
- Creación de hábitos personalizados

</details>

<details>
<summary><b>Asistente IA</b></summary>

- Chat contextual con OpenAI / DeepSeek
- Consultas sobre tus datos
- Sugerencias personalizadas
- Historial de conversaciones

</details>

---

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/auth/register` | Registrar usuario |
| `POST` | `/api/auth/login` | Iniciar sesión |
| `GET` | `/api/data/all` | Obtener todos los datos |
| `POST` | `/api/data/tareas` | Crear tarea |
| `POST` | `/api/data/eventos` | Crear evento |
| `POST` | `/api/data/transacciones` | Crear transacción |
| `POST` | `/api/data/compras` | Crear compra |
| `POST` | `/api/data/habitos` | Crear hábito |
| `POST` | `/api/ai/chat` | Chat con IA |

---

## Contribuir

1. **Fork** el repositorio
2. Crear una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m "feat: agregar nueva funcionalidad"`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abrir un **Pull Request**

---

## Licencia

Distribuido bajo la licencia **MIT**. Ver [`LICENSE`](LICENSE) para más información.

---

## Autor

**Jonathan Dev Hurtado**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github)](https://github.com/JonathanDevHurtado)
[![Email](https://img.shields.io/badge/Email-0078F2?style=for-the-badge&logo=protonmail&logoColor=white)](mailto:JonathanHurtadoDev@proton.me)

> Full-Stack & Mobile Developer
