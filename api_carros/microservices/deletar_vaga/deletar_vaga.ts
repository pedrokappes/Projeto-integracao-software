import express from "express";
import amqp from "amqplib";
import { Carro } from "../../model/carro_model";
import { PrismaClient } from "@prisma/client";



const app = express();
const port = 6009;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.delete("/deletar/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    const prisma = new PrismaClient();


    await prisma.vaga.delete({
        where: {
            id: id
        }
    })

    return res.status(200).json({
        message: "Vaga de carro foi deletada",
    })
})

app.listen(port, () => {
    console.log(`Servidor de deletar vagas está na porta ${port}`);
});

