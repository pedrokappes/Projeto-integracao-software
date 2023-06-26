import express from "express";
import swaggerUi from "swagger-ui-express";
import { PrismaClient } from "@prisma/client";
import { swaggerSpec } from "../../swaggerOptions";

const app = express();
const port = 6002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Exclui um carro pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do carro a ser excluído.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Carro excluído com sucesso.
 *       400:
 *         description: Erro ao excluir o carro.
 */
app.delete("/delete/:id", async (req, res) => {
  const prisma = new PrismaClient();
  const id = parseInt(req.params.id);

  try {
    await prisma.carro.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      message: "Carro excluído",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Erro ao excluir o carro",
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor de deletar de carros na porta ${port}`);
});
