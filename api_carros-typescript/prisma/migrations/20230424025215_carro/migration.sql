/*
  Warnings:

  - You are about to alter the column `idCliente` on the `Carro` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Carro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "placa" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "idCliente" INTEGER NOT NULL
);
INSERT INTO "new_Carro" ("id", "idCliente", "modelo", "placa") SELECT "id", "idCliente", "modelo", "placa" FROM "Carro";
DROP TABLE "Carro";
ALTER TABLE "new_Carro" RENAME TO "Carro";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
