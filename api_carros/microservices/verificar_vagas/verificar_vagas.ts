import express from "express";
import amqp from "amqplib";
import { Carro } from "../../model/carro_model";
import { PrismaClient } from "@prisma/client";



const app = express();
const port = 6008;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/vagasDisponivel", async (req, res) => {

    const prisma = new PrismaClient();

    const vagas = await prisma.vaga.count({
        where: {
            vazia: true
        }
    })
    
    return res.status(200).json({
        message: "Lista vagas disponiveis de carros",
        data: vagas
    })
})

app.listen(port, () => {
    console.log(`Servidor de vagas disponiveis está na porta ${port}`);
});

