import express from "express";
import { PrismaClient } from "@prisma/client";



const app = express();
const port = 6002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.delete("/delete/:id", async (req, res) => {

    const prisma = new PrismaClient();
    const id = parseInt(req.params.id);

    try {
        
        await prisma.carro.delete({
            where: {
                id: id
            }
        })
        return res.status(200).json({
            messge: "Carro excluido"
        })

    } catch (error) {
        return res.status(200).json({
            messge: "Verifique o ID"
        })
    }
})

app.listen(port, () => {
    console.log(`Servidor de deletar de carros na porta ${port}`);
});

