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
