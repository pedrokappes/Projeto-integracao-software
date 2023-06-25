import express from "express";
import amqp from "amqplib";
import { Carro } from "../../model/carro_model";
import { PrismaClient } from "@prisma/client";



const app = express();
const port = 6006;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/listar", async (req, res) => {

    const prisma = new PrismaClient();

    const carros = await prisma.vaga.findMany();
    
    return res.status(200).json({
        message: "Lista vagas de carros",
        data: carros
    })
})

app.listen(port, () => {
    console.log(`Servidor de listar vagas de carros na porta ${port}`);
});

