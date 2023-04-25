/*
Comandos para inciar projeto
npm init -> enter até o final

Extenções
Prisma

Dependencias
npm i express
npm i axios

Dependencias desemvolvedor
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

prioridades:
1- Calcular preco -> Maicon
2- Verificar vagas -> Maicon
3- Api externa, achar placa de carro ou cep -> Pedro
4- Tratamento de erros nas requisições e alteração nas mensagens (atualmente só retorna cód 200) -> SE POSSÍVEL
*/

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../swaggerOptions';
import express, { Router } from "express";
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