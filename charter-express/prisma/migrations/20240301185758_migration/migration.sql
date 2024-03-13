/*
  Warnings:

  - You are about to drop the column `idMotif` on the `Avance` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Depense" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "agenceId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "montant" DECIMAL NOT NULL,
    "date" DATETIME NOT NULL,
    "typeDepense" TEXT NOT NULL,
    "idTypeDepense" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Depense" ("agenceId", "date", "description", "id", "montant", "typeDepense") SELECT "agenceId", "date", "description", "id", "montant", "typeDepense" FROM "Depense";
DROP TABLE "Depense";
ALTER TABLE "new_Depense" RENAME TO "Depense";
CREATE TABLE "new_Avance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "montant" INTEGER NOT NULL,
    "motif" TEXT NOT NULL,
    "remboursement" TEXT NOT NULL,
    "employeId" INTEGER NOT NULL,
    "dateUpdate" DATETIME NOT NULL
);
INSERT INTO "new_Avance" ("dateUpdate", "employeId", "id", "montant", "motif", "remboursement") SELECT "dateUpdate", "employeId", "id", "montant", "motif", "remboursement" FROM "Avance";
DROP TABLE "Avance";
ALTER TABLE "new_Avance" RENAME TO "Avance";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
