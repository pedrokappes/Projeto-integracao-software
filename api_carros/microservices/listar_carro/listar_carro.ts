import express from "express";
import amqp from "amqplib";
import { Carro } from "../../model/carro_model";
import { PrismaClient } from "@prisma/client";



const app = express();
const port = 6001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/listar", async (req, res) => {

    const prisma = new PrismaClient();

    const carros = await prisma.carro.findMany();
    
    return res.status(200).json({
        message: "Lista de carros",
        data:carros
    })
})

app.listen(port, () => {
    console.log(`Servidor de listar de carros na porta ${port}`);
});

