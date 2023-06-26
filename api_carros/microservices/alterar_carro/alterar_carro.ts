import express from "express";
import swaggerUi from "swagger-ui-express";
import { PrismaClient } from "@prisma/client";
import { swaggerSpec } from "../../swaggerOptions";
import { Carro } from "../../model/carro_model";

const app = express();
const port = 6005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /alterar/{id}:
 *   put:
 *     summary: Altera os dados de um carro pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do carro a ser alterado.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Carro'
 *     responses:
 *       200:
 *         description: Carro atualizado com sucesso.
 *       400:
 *         description: Erro ao atualizar o carro.
 *       404:
 *         description: Carro não encontrado.
 */
app.put("/alterar/:id", async (req, res) => {
  const prisma = new PrismaClient();
  const id = parseInt(req.params.id);
  let carro: Carro = req.body;

  const carroAtualizado = await prisma.carro.update({
    where: {
      id: id,
    },
    data: {
      placa: carro.placa,
      modelo: carro.modelo,
      codigoFipe: carro.codigoFipe,
    },
  });

  if (!carroAtualizado) {
    return res.status(404).json({
      message: "Carro não encontrado",
    });
  }

  return res.status(200).json({
    message: "Carro atualizado",
    data: carroAtualizado,
  });
});

app.listen(port, () => {
  console.log(`Servidor de alterar de carros na porta ${port}`);
});
