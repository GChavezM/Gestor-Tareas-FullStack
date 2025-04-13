# Gestor Tareas FullStack

Proyecto Final correspondiente al módulo de Fundamentos de Desarrollo FullStack de la Maestría FullStack Development de la Universidad Católica Boliviana San Pablo.

Este proyecto cuenta con tanto utiliza las siguientes tecnologías:

- Backend: Node.Js, Express, Sequelize
- Frontend: React, Tailwind
- Base de Datos: PostgreSQL

## Backend

Para poder iniciar el proyecto de backend se necesita realizar los siguientes pasos:

1. Dirígete a la carpeta del proyecto backend
   ```bash
   cd backend/
   ```
2. Instala las dependencias
   ```bash
   npm install
   ```
3. Crea un archivo .env con las siguientes variables:

   ```env
   # Server port
   PORT=3000

   # JWT Params
   JWT_SECRET=8374cff35b5444797722849a2e7a8a1fa2db560abff6b499bf64693bb7b32f61
   JWT_EXPIRATION=1h

   FRONTEND_ENDPOINT=http://localhost:3500

   # Development Database
   DB_USERNAME=DB_USERNAME
   DB_PASSWORD=DB_PASSWORD
   DB_NAME=DB_NAME
   DB_HOST=DB_HOST
   DB_SSL=false # poner en true si se desea probar el acceso a la base de prod

   # Production Database
   PROD_DB_USERNAME=PROD_DB_USERNAME_RENDER
   PROD_DB_PASSWORD=PROD_DB_PASSWORD_RENDER
   PROD_DB_NAME=PROD_DB_NAME_RENDER
   PROD_DB_HOST=PROD_DB_HOST_RENDER
   ```

4. Inicia el servidor
   ```bash
   npm start
   ```

## Frontend

Para poder iniciar el proyecto de frontend se necesita realizar los siguientes pasos:

1. Dirígete a la carpeta del proyecto frontend
   ```bash
   cd frontend/
   ```
2. Instala las dependencias
   ```bash
   npm install
   ```
3. Crea un archivo .env con las siguientes variables:

   ```env
   # Server port
   PORT=3000

   REACT_APP_BACKEND_ENDPOINT=http://localhost:3000
   ```

4. Inicia el servidor
   ```bash
   npm start
   ```

## Base de Datos

Para poder realizar las migraciones de las tablas con `sequelize-cli`, es necesario realizar los siguientes pasos:

1. Dirígete a la carpeta del proyecto backend
   ```bash
   cd backend/
   ```
2. Realiza las migraciones
   ```bash
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   ```
