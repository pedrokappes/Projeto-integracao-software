import express from "express";
import { PrismaClient } from "@prisma/client";



const app = express();
const port = 6003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/buscar/:id", async (req, res) => {

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

    return res.status(200).json({
        message: "Carro buscado",
        data: carro
    })
})

app.listen(port, () => {
    console.log(`Servidor de buscar de carros na porta ${port}`);
});

