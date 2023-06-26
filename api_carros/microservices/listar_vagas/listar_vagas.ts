import express from "express";
import swaggerUi from "swagger-ui-express";
import { PrismaClient } from "@prisma/client";
import { swaggerSpec } from "../../swaggerOptions";

const app = express();
const port = 6006;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /listarvaga:
 *   get:
 *     summary: Retorna a lista de vagas de carros.
 *     responses:
 *       200:
 *         description: Lista de vagas de carros.
 */
app.get("/listarvaga", async (req, res) => {
  const prisma = new PrismaClient();

  const carros = await prisma.vaga.findMany();

  return res.status(200).json({
    message: "Lista de vagas de carros",
    data: carros,
  });
});

app.listen(port, () => {
  console.log(`Servidor de listar vagas de carros na porta ${port}`);
});
