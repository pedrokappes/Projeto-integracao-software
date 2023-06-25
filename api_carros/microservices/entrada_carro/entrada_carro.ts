import express from "express";
import amqp from "amqplib";
import { Carro } from "../../model/carro_model";
import { PrismaClient } from "@prisma/client";
import { Vaga } from "../../model/vaga_model";



const app = express();
const port = 6010;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/entradaVeiculo", async (req, res) => {

    const prisma = new PrismaClient();
    const entrada = req.body;

    const carro = await prisma.carro.findUnique(
        {
            where: {
                id: entrada.carroId
            }
        }
    )
    if (!carro) {
        return res.status(404).json({
            message: "Verifique o id do carro"
        });
    }

    let vaga = await prisma.vaga.findUnique({
        where: {
            id: entrada.id
        }
    })

    if (!vaga) {
        return res.status(404).json({
            message: "Verifique o id da vaga"
        });
    }
    if (vaga?.carroId != 0) {
        return res.status(400).json({
            message: "Vaga ja possui um carro"
        });
    }
    console.log(vaga)

    vaga = await prisma.vaga.update(
        {
            where: {
                id: vaga.id
            },
            data: {
                vazia: false,
                carroId: carro.id,
                horaEntrada: entrada.horaEntrada,
                horaSaida: entrada.horaSaida
            }
        }
    )

    if (vaga?.carroId != 0) {
        return res.status(201).json({
            message: "Entrada dada com sucesso",
            data: vaga
        });
    }

    return res.status(404).json({
        message: "Erro ao dar entrada de veiculo"
    });



})


app.listen(port, () => {
    console.log(`Servidor de entradas de veiculos na porta ${port}`);
});

