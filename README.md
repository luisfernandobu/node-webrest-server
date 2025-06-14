# Dev
1. Crear archivo <i>.env</i> en base a <i>.env.template</i>
2. Configurar las variables de entorno necesarias
3. Instalar dependencias: ```npm install``` | ```npm i```
4. Levantar base de datos de desarrollo con el comando ```docker compose up -d```
5. Ejecutar migraciones de base de datos con el comando ```npx prisma migrate dev```
6. Levantar la aplicación con el comando ```npm run dev```
