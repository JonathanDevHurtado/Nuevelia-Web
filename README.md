<div align="center">

# 🚀 Nuvelia

**Tu gestor de vida personal con asistente de IA**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

</div>

---

## ✨ Características

- 📊 **Dashboard** — Vista general de tu productividad y finanzas
- ✅ **Gestor de Tareas** — Organiza con prioridades y fechas límite
- 📅 **Agenda** — Calendario de eventos con recordatorios
- 💰 **Finanzas** — Control de ingresos y gastos con gráficas
- 🛒 **Compras** — Listas de compras inteligentes
- 🎯 **Hábitos** — Seguimiento de rutinas diarias con rachas
- 🤖 **Asistente IA** — Chat con inteligencia artificial para consultas
- 🌙 **Modo Oscuro** — Tema claro y oscuro
- 📱 **Diseño Responsivo** — Optimizado para móvil y escritorio
- 📥 **Exportar Excel** — Descarga tus datos en formato profesional

---

## 🛠️ Tecnologías

| Categoría | Tecnologías |
|-----------|-------------|
| Frontend | React 19, Vite 8, Tailwind CSS 3 |
| Backend | Express.js, SQLite |
| IA | OpenAI / DeepSeek API |
| Autenticación | JWT (JSON Web Tokens) |

---

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/JonathanDevHurtado/Nuevelia-Web.git
cd Nuevelia-Web

# Instalar dependencias del frontend
npm install

# Instalar dependencias del backend
cd server
npm install
cd ..

# Configurar variables de entorno
cp server/.env.example server/.env
# Editar server/.env con tus credenciales
```

### Ejecutar

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
npm run dev
```

Abrir [http://localhost:5173](http://localhost:5173)

---

## 📁 Estructura del Proyecto

```
Nuevelia-Web/
├── public/           # Archivos estáticos
│   └── images/       # Imágenes del proyecto
├── server/           # Backend Express
│   ├── routes/       # Rutas API
│   ├── middleware/    # Middleware auth
│   └── db.js         # Base de datos SQLite
├── src/
│   ├── components/   # Componentes React
│   ├── context/      # Context providers
│   ├── pages/        # Páginas de la app
│   └── api/          # Cliente API
└── package.json
```

---

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Jonathan Dev Hurtado**
- GitHub: [@JonathanDevHurtado](https://github.com/JonathanDevHurtado)
- Full-Stack & Mobile Developer

---

<div align="center">

Hecho con ❤️ en Colombia 🇨🇴

</div>
