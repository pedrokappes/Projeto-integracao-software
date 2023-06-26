import express from "express";
import { PrismaClient } from "@prisma/client";
import { Vaga } from "../../model/vaga_model";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../../swaggerOptions";

const app = express();
const port = 6011;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /saidaVeiculos/{id}/{saida}:
 *   get:
 *     summary: Registra a saída de um veículo de uma vaga.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da vaga.
 *         required: true
 *         type: integer
 *       - name: saida
 *         in: path
 *         description: Hora de saída do veículo.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Veículo saiu da vaga com sucesso.
 *       404:
 *         description: ID da vaga não encontrado ou não há nenhum carro na vaga.
 */
app.get("/saidaVeiculos/:id/:saida", async (req, res) => {
  const prisma = new PrismaClient();
  const id = parseInt(req.params.id);
  const saida = parseInt(req.params.saida);

  let vaga = await prisma.vaga.findUnique({
    where: {
      id: id
    }
  });

  if (!vaga) {
    return res.status(404).json({
      message: "Verifique o id da vaga"
    });
  }
  
  if (vaga.carroId == 0) {
    return res.status(404).json({
      message: "Não há nenhum carro nessa vaga"
    });
  }
  
  vaga.horaSaida = parseFloat(req.params.saida);
  const valorPagar = (saida - vaga.horaEntrada) * 12;

  const vagaVazia: Vaga = {
    id: vaga.id,
    vazia: true,
    carroId: 0,
    horaEntrada: 0,
    horaSaida: 0
  };

  vaga = await prisma.vaga.update({
    where: {
      id: vaga.id
    },
    data: {
      vazia: vagaVazia.vazia,
      carroId: vagaVazia.carroId,
      horaEntrada: vagaVazia.horaEntrada,
      horaSaida: vagaVazia.horaSaida
    }
  });

  return res.status(200).json({
    message: "Veiculo saiu",
    data: vaga,
    apagar: valorPagar
  });
});

app.listen(port, () => {
  console.log(`Servidor de Saida de veiculos na porta ${port}`);
});
