# Development

Pasos para levantar la app en desarrollo

1.- Levantar la base de datos

`docker compose up -d`

2.- Renombrar el .env.template a .env

3.- Remplazar las variables de entorno

4.- Seed para crear [la base de datos local](localhost:3000/api/seed)

- Prisma commads

`npx prisma init`
`npx prisma migrate dev`
`npx prisma generate`