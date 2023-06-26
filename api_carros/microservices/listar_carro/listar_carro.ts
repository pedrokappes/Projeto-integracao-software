import express from "express";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../../swaggerOptions';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { Carro } from "../../model/carro_model";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 6001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/**
 * @swagger
 * /listar:
 *   get:
 *     summary: Retorna todos os carros cadastrados.
 *     responses:
 *       200:
 *         description: Lista de carros.
 */

app.get("/listar", async (req, res) => {
  const prisma = new PrismaClient();
  const carros = await prisma.carro.findMany();
  return res.status(200).json({
    message: "Lista de carros",
    data: carros,
  });
});

app.listen(port, () => {
  console.log(`Servidor de listar de carros na porta ${port}`);
});
