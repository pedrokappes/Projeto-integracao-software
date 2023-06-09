-- CreateTable
CREATE TABLE "Carro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "placa" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "codigoFipe" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Vaga" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vazia" BOOLEAN NOT NULL,
    "carroId" INTEGER NOT NULL,
    "horaEntrada" REAL NOT NULL,
    "horaSaida" REAL NOT NULL
);
