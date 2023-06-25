import express from "express";
import amqp from "amqplib";
import { Carro } from "../../model/carro_model";
import { PrismaClient } from "@prisma/client";
import axios from 'axios';



const app = express();
const port = 6004;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/consultaFipe/:id", async (req, res) => {

    const prisma = new PrismaClient();
    const id = parseInt(req.params.id);
    
    const carro = await prisma.carro.findUnique(
        {
            where: {
                id: id
            }
        }
    )

    if(!carro){
        return res.status(200).json({
            message: "Carro não encontrado",
        })
    }

    await axios.get(`https://brasilapi.com.br/api/fipe/preco/v1/${carro.codigoFipe}`)
    .then( (sucesso) => {
        return res.status(200).json({
            Fipe: sucesso.data[1]
        })
    })
    .catch( () => {
        return res.status(400).json({
            message: "Verifique o se está correto o codigo da fipe."
        })
    })
})

app.listen(port, () => {
    console.log(`Servidor de consulta fipe de carros na porta ${port}`);
});

