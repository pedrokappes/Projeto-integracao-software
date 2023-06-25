import express from "express";
import amqp from "amqplib";
import { Carro } from "../../model/carro_model";
import { PrismaClient } from "@prisma/client";



const app = express();
const port = 6007;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/cadastarVagas", async (req, res) => {

    const prisma = new PrismaClient();

    const vaga = await prisma.vaga.create({
        data: {
            vazia: true,
            carroId: 0,
            horaEntrada: 0,
            horaSaida: 0
        }
    })

    return res.status(200).json({
        message: "Vaga cadastrada",
        data:vaga
    })
})

app.listen(port, () => {
    console.log(`Servidor de cadastrar vagas de carros na porta ${port}`);
});

