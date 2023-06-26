import express from "express";
import kafka from "kafka-node";
import { PrismaClient } from "@prisma/client";
import { Vaga } from "../../model/vaga_model";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json';

const app = express();
const port = 6011;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * @swagger
 * /saidaVeiculos/{id}/{saida}:
 *   get:
 *     summary: Realiza a saída de um veículo da vaga.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da vaga.
 *       - in: path
 *         name: saida
 *         schema:
 *           type: integer
 *         required: true
 *         description: Hora de saída do veículo.
 *     responses:
 *       200:
 *         description: Veículo saiu com sucesso.
 *       404:
 *         description: Vaga não encontrada ou não há nenhum carro na vaga.
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

  const kafkaClient = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
  const producer = new kafka.Producer(kafkaClient);

  producer.on("ready", async () => {
    const payloads = [
      {
        topic: "carro_topic",
        messages: valorPagar.toString()
      }
    ];

    producer.send(payloads, (err, data) => {
      if (err) {
        console.log("Erro ao enviar mensagem para o Kafka:", err);
      } else {
        console.log("Mensagem enviada para o Kafka:", data);
        producer.close();
      }
    });
  });

  producer.on("error", (err) => {
    console.log("Erro no produtor do Kafka:", err);
  });

  return res.status(200).json({
    message: "Veiculo saiu",
    date: vaga,
    apagar: valorPagar
  });
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Servidor de Saida de veiculos na porta ${port}`);
});
