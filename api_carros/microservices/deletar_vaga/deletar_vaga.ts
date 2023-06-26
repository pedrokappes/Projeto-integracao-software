import express from "express";
import swaggerUi from "swagger-ui-express";
import { PrismaClient } from "@prisma/client";
import { swaggerSpec } from "../../swaggerOptions";

const app = express();
const port = 6009;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /deletar/{id}:
 *   delete:
 *     summary: Deleta uma vaga de carro pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vaga de carro deletada com sucesso.
 */
app.delete("/deletar/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const prisma = new PrismaClient();

  await prisma.vaga.delete({
    where: {
      id: id,
    },
  });

  return res.status(200).json({
    message: "Vaga de carro foi deletada",
  });
});

app.listen(port, () => {
  console.log(`Servidor de deletar vagas está na porta ${port}`);
});
