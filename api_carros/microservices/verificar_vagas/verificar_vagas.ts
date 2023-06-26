import express from "express";
import swaggerUi from "swagger-ui-express";
import { PrismaClient } from "@prisma/client";
import { swaggerSpec } from "../../swaggerOptions";

const app = express();
const port = 6008;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /vagasDisponivel:
 *   get:
 *     summary: Retorna a quantidade de vagas disponíveis de carros.
 *     responses:
 *       200:
 *         description: Quantidade de vagas disponíveis.
 */
app.get("/vagasDisponivel", async (req, res) => {
  const prisma = new PrismaClient();

  const vagas = await prisma.vaga.count({
    where: {
      vazia: true,
    },
  });

  return res.status(200).json({
    message: "Lista de vagas disponíveis de carros",
    data: vagas,
  });
});

app.listen(port, () => {
  console.log(`Servidor de vagas disponíveis está na porta ${port}`);
});
