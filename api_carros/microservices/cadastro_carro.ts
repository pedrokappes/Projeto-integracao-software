import express from "express";
import amqp from "amqplib";


const app = express();
const port = 6000;

app.use(express.json());
app.use(express.urlencoded({ external: true }));

app.post("/carro", async (req, res) => {

    const mensagemRecebida: string[] = [];
    // Configurando nome da fila e Ull
    const fila = "clientes_queue";
    const rabbitURL = "amqp://localhost";


    try {
        const connection = await amqp.connect(rabbitURL);
        const channel = await connection.createChannel();

        await channel.assertQueue(fila, {
            autoDelete: false,
            exclusive: false,
            durable: false,
            arguments: null,
        })

        await channel.consume(fila, (message) => {

            if (message !== null) {
                mensagemRecebida.push(message.content.toString());
                channel.ack(message);
            }
        })
       
    } catch (error) {
        console.log(error);
    }
    const listaDeMensagens = mensagemRecebida.map(string => JSON.parse(string.replace(/'/g, '"')));

    const encontrado =  listaDeMensagens.find( mensagem => mensagem.id == 7);

    return res.status(200).json({
        encontrado: encontrado
    })
})

app.listen(port, () => {
    console.log(`Servidor de cadastro de carros na porta ${port}`);
});

