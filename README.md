# Tarea - Capa de Presentación

Este proyecto utiliza **React + Vite** para el frontend y servicios backend en Spring Boot. La aplicación está dockerizada para facilitar su despliegue y ejecución.

## Requisitos previos

- Tener instalado [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/).

## Estructura del Proyecto

El proyecto está compuesto por los siguientes servicios:

- **Frontend**: Aplicación React + Vite para la interfaz de usuario.
- **Backend - Micro-Cursos**: Servicio en Spring Boot para la gestión de cursos.
- **Backend - Micro-Estudiantes**: Servicio en Spring Boot para la gestión de estudiantes.
- **Bases de Datos**: Dos contenedores de MySQL para los microservicios.
## Funcionalidades principales

### Frontend
- **Gestión de Estudiantes**:
  - Crear, editar, eliminar y buscar estudiantes.
  - Validaciones en el formulario de entrada.
- **Gestión de Cursos**:
  - Crear, editar, eliminar y buscar cursos.
  - Listas presentadas en formato de tabla.
- **Relación Curso-Estudiante**:
  - Asignar estudiantes a cursos.
  - Visualizar relaciones en tabla.
  - Editar y eliminar relaciones.

### Backend
- **Microservicio de Cursos**:
  - CRUD completo para cursos.
  - Endpoints adicionales para buscar por créditos o fecha de creación.
- **Microservicio de Estudiantes**:
  - CRUD completo para estudiantes.
  - Validaciones en datos como email y fecha de nacimiento.

### Docker Compose
El archivo `docker-compose.yml` configura los siguientes servicios:
- **Frontend**: Contenedor basado en Nginx.
- **Backend Micro-Cursos**: Servicio Spring Boot conectado a MySQL.
- **Backend Micro-Estudiantes**: Servicio Spring Boot conectado a MySQL.
- **Bases de datos MySQL**: Dos instancias de MySQL para los microservicios.

### Despliegue

## Configuración inicial

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/SDDrouet/Tarea-capa-presentacion.git
   cd Tarea-capa-presentacion
2. **Construcción y ejecución del proyecto: Ejecuta el siguiente comando desde la raíz del proyecto**:
   ```bash
   docker-compose up --build
## Frontend
**El frontend estará disponible en**:
   ```bash
   http://localhost:3000

