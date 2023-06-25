import express from "express";
import amqp from "amqplib";
import { Carro } from "../../model/carro_model";
import { PrismaClient } from "@prisma/client";



const app = express();
const port = 6000;
const mensagemRecebida: string[] = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 app.get("/clientes", (req, res)=>{
    const listaDeMensagens = mensagemRecebida.map(string => JSON.parse(string.replace(/'/g, '"')));

    return res.status(200).json({
        data: listaDeMensagens
    })
 })

app.post("/cadastrar", async (req, res) => {

    const prisma = new PrismaClient();
    let carro: Carro = req.body;

    // Configurando nome da fila e Ull
    const fila = "clientes_queue";
    const rabbitURL = "amqp://localhost";


    try {
        const connection = await amqp.connect(rabbitURL);
        const channel = await connection.createChannel();

        await channel.assertQueue(fila, {
            autoDelete: false,
            exclusive: false,
            durable: false,
            arguments: null,
        })

        await channel.consume(fila, (message) => {

            if (message !== null) {
                mensagemRecebida.push(message.content.toString());
                channel.ack(message);
            }
        })

    } catch (error) {
        console.log(error);
    }
    const listaDeMensagens = mensagemRecebida.map(string => JSON.parse(string.replace(/'/g, '"')));

    const encontrado = listaDeMensagens.find(mensagem => mensagem.id == carro.clienteId);
    if (!encontrado) {
        return res.status(200).json({
            message: "Cliente não encontrado"
        })
    }

     carro = await prisma.carro.create({
        data: {
            placa: carro.placa,
            modelo: carro.modelo,
            clienteId: carro.clienteId,
            codigoFipe: carro.codigoFipe
        }
    })
    return res.status(200).json({
        message: "Carro cadastrado",
        lista: carro
    });

})

app.listen(port, () => {
    console.log(`Servidor de cadastro de carros na porta ${port}`);
});

