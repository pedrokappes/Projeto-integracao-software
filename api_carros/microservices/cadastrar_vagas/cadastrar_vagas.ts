import express from "express";
import swaggerUi from "swagger-ui-express";
import { PrismaClient } from "@prisma/client";
import { swaggerSpec } from "../../swaggerOptions";

const app = express();
const port = 6007;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /cadastrarVagas:
 *   get:
 *     summary: Cadastra uma nova vaga de carro.
 *     responses:
 *       200:
 *         description: Vaga cadastrada com sucesso.
 */
app.get("/cadastrarVagas", async (req, res) => {
  const prisma = new PrismaClient();

  const vaga = await prisma.vaga.create({
    data: {
      vazia: true,
      carroId: 0,
      horaEntrada: 0,
      horaSaida: 0,
    },
  });

  return res.status(200).json({
    message: "Vaga cadastrada",
    data: vaga,
  });
});

app.listen(port, () => {
  console.log(`Servidor de cadastrar vagas de carros na porta ${port}`);
});
