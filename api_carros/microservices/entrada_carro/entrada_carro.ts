import express from "express";
import swaggerUi from "swagger-ui-express";
import { PrismaClient } from "@prisma/client";
import { swaggerSpec } from "../../swaggerOptions";

const app = express();
const port = 6010;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /entradaVeiculo:
 *   post:
 *     summary: Registra a entrada de um veículo em uma vaga.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carroId:
 *                 type: integer
 *               horaEntrada:
 *                 type: integer
 *               horaSaida:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Entrada de veículo registrada com sucesso.
 *       400:
 *         description: A vaga já possui um veículo.
 *       404:
 *         description: ID do carro ou da vaga não encontrado.
 */
app.post("/entradaVeiculo", async (req, res) => {
  const prisma = new PrismaClient();
  const entrada = req.body;

  const carro = await prisma.carro.findUnique({
    where: {
      id: entrada.carroId,
    },
  });
  if (!carro) {
    return res.status(404).json({
      message: "Verifique o id do carro",
    });
  }

  let vaga = await prisma.vaga.findUnique({
    where: {
      id: entrada.id,
    },
  });

  if (!vaga) {
    return res.status(404).json({
      message: "Verifique o id da vaga",
    });
  }
  if (vaga?.carroId !== 0) {
    return res.status(400).json({
      message: "Vaga já possui um carro",
    });
  }

  vaga = await prisma.vaga.update({
    where: {
      id: vaga.id,
    },
    data: {
      vazia: false,
      carroId: carro.id,
      horaEntrada: entrada.horaEntrada,
      horaSaida: entrada.horaSaida,
    },
  });

  if (vaga?.carroId !== 0) {
    return res.status(201).json({
      message: "Entrada dada com sucesso",
      data: vaga,
    });
  }

  return res.status(404).json({
    message: "Erro ao dar entrada de veiculo",
  });
});

app.listen(port, () => {
  console.log(`Servidor de entradas de veiculos na porta ${port}`);
});
