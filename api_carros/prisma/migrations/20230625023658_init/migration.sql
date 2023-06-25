-- CreateTable
CREATE TABLE "Vaga" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vazia" BOOLEAN NOT NULL,
    "carroId" INTEGER NOT NULL,
    "horaEntrada" REAL NOT NULL,
    "horaSaida" REAL NOT NULL
);
