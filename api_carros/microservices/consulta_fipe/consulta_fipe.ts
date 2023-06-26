import express from "express";
import swaggerUi from "swagger-ui-express";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { swaggerSpec } from "../../swaggerOptions";

const app = express();
const port = 6004;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /consultaFipe/{id}:
 *   get:
 *     summary: Consulta o preço de um carro na tabela FIPE pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do carro a ser consultado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Preço do carro na tabela FIPE.
 *       400:
 *         description: Erro ao consultar o preço na tabela FIPE.
 *       404:
 *         description: Carro não encontrado.
 */
app.get("/consultaFipe/:id", async (req, res) => {
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

  await axios
    .get(`https://brasilapi.com.br/api/fipe/preco/v1/${carro.codigoFipe}`)
    .then((response) => {
      return res.status(200).json({
        Fipe: response.data[1],
      });
    })
    .catch(() => {
      return res.status(400).json({
        message: "Erro ao consultar o preço na tabela FIPE",
      });
    });
});

app.listen(port, () => {
  console.log(`Servidor de consulta fipe de carros na porta ${port}`);
});
