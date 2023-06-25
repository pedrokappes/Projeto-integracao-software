import express from "express";
import amqp from "amqplib";
import { Carro } from "../../model/carro_model";
import { PrismaClient } from "@prisma/client";



const app = express();
const port = 6005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.put("/alterar/:id", async (req, res) => {

    const prisma = new PrismaClient();
    const id = parseInt(req.params.id);
    let carro: Carro = req.body;

    
    const carroAtualizado = await prisma.carro.update(
        {
            where: {
                id: id
            },
            data: {
                placa: carro.placa,
                modelo: carro.modelo,
                codigoFipe: carro.codigoFipe
            }
        }
    )
    if(!carroAtualizado){
        return res.status(200).json({
            massage: "Favor verique ID",
        })
    }

    return res.status(200).json({
        massage: "Carro atualizado",
        data: carroAtualizado
    })
})

app.listen(port, () => {
    console.log(`Servidor de alterar de carros na porta ${port}`);
});

