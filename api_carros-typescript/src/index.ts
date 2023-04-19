/*
Comandos para inciar projeto
npm init -> enter até o final

Extenções
Prisma

Dependencias
npm i express

Dependencias desemvolvedor
npm i tsx -D
npm i prisma -D
npm i typescript -D
npm i @types/express -D

Comando prisma

Informa o banco de dados
npx prisma init --datasource-provider sqlite

Criar/Atualizar as tabelas
npx prisma migrate dev --name init

Inciar o prisma
npx prisma studio
*/

import express from "express";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(port, ()=> {
    console.log(`O servidor de PRODUTO foi subido na porta ${port}`);
});