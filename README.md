# KdevFull - Sistema de Gestión de Proyectos y Tareas

Sistema completo de gestión de proyectos y tareas desarrollado con **Spring Boot 3** en el backend y **Next.js 13+** en el frontend.

## 🏗️ Arquitectura del Proyecto

```
kdevfull/
├── kdevfull_back/          # Backend API (Spring Boot 3)
│   ├── src/
│   ├── docker-compose.yml
│   ├── Dockerfile
│   └── pom.xml
├── kdevfull_front/         # Frontend (Next.js 13+)
│   ├── src/
│   ├── package.json
│   └── next.config.js
└── README.md
```

## 🚀 Inicio Rápido

### Prerrequisitos

- **Docker** y **Docker Compose** (para el backend)
- **Node.js 18+** y **npm** (para el frontend)
- **Git**

### 1. Clonar el Repositorio

```bash
git clone https://github.com/AdamGard/prueba_kdevfull.git
cd kdevfull
```

### 2. Levantar el Backend

El backend utiliza Docker Compose para orquestar la aplicación Spring Boot y la base de datos PostgreSQL.

```bash
cd kdevfull_back
docker-compose up -d
```

Esto iniciará:
- **PostgreSQL** en el puerto `5433`
- **API Spring Boot** en el puerto `8080`
- **Swagger UI** disponible en: http://localhost:8080/kdevfull/swagger

### 3. Levantar el Frontend

```bash
cd ../kdevfull_front
npm install
npm run dev
```

El frontend estará disponible en: http://localhost:3000

## 🔐 Credenciales Preconfiguradas

### Usuario Administrador
- **Usuario:** `administrador`
- **Contraseña:** `77777`
- **Rol:** `ADMIN`

### Usuario Estándar
- **Usuario:** `usuario`
- **Contraseña:** `77777`
- **Rol:** `USER`
