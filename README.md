# Projeto de Estacionamento
Integração de Sistemas de Software

1# API (Documentada com SWAGGER) -  Feita em Python utilizando Flask com banco SQLite e é responsável pelo CRUD de clientes; roda nas portas de localhost 5000, 5002, 5003, 5004, 5005 e 5006 ao utilizar o comando "python app.py". Os objetos são enviados para o RabbitMQ (usamos o Docker para executar) ao rodar a requisição "enviar clientes" (hospedado na porta 5006).

2# API (Documentada com SWAGGER via http://localhost:6001/docs/#/ ) - Feita em TypeScript utilizando Node.js, express, npx, prisma com banco de dados em SQLite; Esta API consome o que foi enviado para o RabbitMQ é responsável por gerenciar os carros no estacionamento e também disponibilizar os serviços relacionados com código fipe (consulta de dados externos) e vagas (verificação de vagas e realizar cálculos de pagamento). Inicializada utilizando o script "npm run start". Os cálculos relacionados com entrada e saída dos veículos em cada vaga são enviados para a mensageria "Apache Kafka".

3# Programa feito em C# para consumir as mensagens vindas do Kafka relacionadas aos cálculos de horário de entrada/saída e pagamentos. Inicializado via "dotnet watch run".

Integrantes: 

Matheus Souza - RGM: 12948128
Maicon Businari - RGM: 13359444
Pedro Kappes - RGM: 12904937
