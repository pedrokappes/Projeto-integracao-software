-- CreateTable
CREATE TABLE "Carro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "placa" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "clienteId" INTEGER NOT NULL
);
