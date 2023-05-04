/*
Comandos para inciar projeto
npm init -> enter até o final

Extenções
Prisma

Dependencias
npm i express
npm i axios

Dependencias desenvolvedor
npm i tsx -D
npm i prisma -D
npm i typescript -D
npm i @types/express -D


npm install swagger-jsdoc swagger-ui-express


Comando prisma

Informa o banco de dados
npx prisma init --datasource-provider sqlite

Criar/Atualizar as tabelas
npx prisma migrate dev --name init

Inciar o prisma
npx prisma studio


A fazer

1-verificar swagger para as rotas novas -> matheus
2-Tipo data na entrada e saida de veiculos
3-Codigo de status
*/

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../swaggerOptions';
import express from "express";
import { router } from "./router/carros_router"
const app = express();
const port = 3000; 

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);

app.listen(port, ()=> {
    console.log(`O servidor de CARROS esta rodando na porta ${port}`);
});