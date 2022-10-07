
npm i -g typescript

npm i typescript ts-node

npm i express @types/express morgan

npm i @types/morgan nodemon

npm i axios

#Install the ORM Prisma
https://www.prisma.io/docs/getting-started/quickstart

npm install prisma --save-dev

#Para criar migrar o banco e cria-lo caso não exista, também faz update do banco
npx prisma migrate dev --name init

#DATABASE_URL="mysql://root:@localhost:3306/DATABASE"


Download the App Potsman



# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="mysql://root:@localhost:3306/api-uc9-tii01"


#Lib para encriptar a senhas no banco

npm i bcrypt
