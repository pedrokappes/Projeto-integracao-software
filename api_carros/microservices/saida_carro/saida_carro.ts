import express from "express";
import amqp from "amqplib";
import { Carro } from "../../model/carro_model";
import { PrismaClient } from "@prisma/client";
import { Vaga } from "../../model/vaga_model";



const app = express();
const port = 6011;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/saidaVeiculos/:id/:saida", async (req, res) => {

    const prisma = new PrismaClient();
    const id = parseInt(req.params.id);
    const saida = parseInt(req.params.saida);


    let vaga = await prisma.vaga.findUnique({
        where: {
            id: id
        }
    })

    if (!vaga) {
        return res.status(404).json({
            message: "Verifique o id da vaga"
        });
    }
    if (vaga.carroId == 0) {
        return res.status(404).json({
            message: "Não há nenhum carro nessa vaga"
        })
    }
    vaga.horaSaida = parseFloat(req.params.saida);
    const valorPagar = (saida - vaga.horaEntrada) * 12;

    const vagaVazia: Vaga = {
        id: vaga.id,
        vazia: true,
        carroId: 0,
        horaEntrada: 0,
        horaSaida: 0

    }

    vaga = await prisma.vaga.update(
        {
            where: {
                id: vaga.id
            },
            data: {
                vazia: vagaVazia.vazia,
                carroId: vagaVazia.carroId,
                horaEntrada: vagaVazia.horaEntrada,
                horaSaida: vagaVazia.horaSaida
            }
        }
    )
    const fila = "carro_queue";
    const rabbitURL = "amqp://localhost";

    try {
        const connection = await amqp.connect(rabbitURL);
        const channel = await connection.createChannel();

        await channel.assertQueue(fila, {
            autoDelete: false,
            exclusive: false,
            durable: false,
            arguments: null,
        });

        await channel.sendToQueue(fila, Buffer.from(valorPagar.toString()));

        await channel.close();
        await connection.close();
        
    } catch (erro) {
        console.log(erro);
    }

    return res.status(200).json({
        message: "Veiculo saiu",
        date: vaga,
        apagar: valorPagar
    })


})


app.listen(port, () => {
    console.log(`Servidor de Saida de veiculos na porta ${port}`);
});

