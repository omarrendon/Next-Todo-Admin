# Development

Pasos para levantar la app en desarrollo

1.- Levantar la base de datos

`docker compose up -d`

2.- Renombrar el .env.template a .env

3.- Remplazar las variables de entorno

4.- Ejecutar el commando `npm install`

5.- Ejecutar el comando `npm run dev`

6.- Ejecutar los comandos siguinete de Prisma

`npx prisma migrate dev`
`npx prisma generate`

7.- Seed para crear [la base de datos local](localhost:3000/api/seed)

## NOTA: Usuario por defecto

**user:** test1@google.com
**password:** 123456

- Prisma commads

`npx prisma init`
`npx prisma migrate dev`
`npx prisma generate`
