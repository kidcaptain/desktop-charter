/*
  Warnings:

  - You are about to drop the `FicheSuivieVehicule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FicheSuivieVehicule";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Charge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "employeId" INTEGER NOT NULL,
    "montant" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Poste" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "salaire" INTEGER NOT NULL,
    "datePaiement" TEXT NOT NULL
);
INSERT INTO "new_Poste" ("datePaiement", "id", "salaire", "titre") SELECT "datePaiement", "id", "salaire", "titre" FROM "Poste";
DROP TABLE "Poste";
ALTER TABLE "new_Poste" RENAME TO "Poste";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
