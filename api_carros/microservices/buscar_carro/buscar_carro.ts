import express from "express";
import swaggerUi from "swagger-ui-express";
import { PrismaClient } from "@prisma/client";
import { swaggerSpec } from "../../swaggerOptions";

const app = express();
const port = 6003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /buscar/{id}:
 *   get:
 *     summary: Busca um carro pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do carro a ser buscado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Carro encontrado.
 *       404:
 *         description: Carro não encontrado.
 */
app.get("/buscar/:id", async (req, res) => {
  const prisma = new PrismaClient();
  const id = parseInt(req.params.id);

  const carro = await prisma.carro.findUnique({
    where: {
      id: id,
    },
  });

  if (!carro) {
    return res.status(404).json({
      message: "Carro não encontrado",
    });
  }

  return res.status(200).json({
    message: "Carro buscado",
    data: carro,
  });
});

app.listen(port, () => {
  console.log(`Servidor de buscar de carros na porta ${port}`);
});
