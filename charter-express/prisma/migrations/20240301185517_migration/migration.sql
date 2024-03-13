/*
  Warnings:

  - Added the required column `idMotif` to the `Avance` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Avance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "montant" INTEGER NOT NULL,
    "motif" TEXT NOT NULL,
    "remboursement" TEXT NOT NULL,
    "employeId" INTEGER NOT NULL,
    "dateUpdate" DATETIME NOT NULL,
    "idMotif" TEXT NOT NULL
);
INSERT INTO "new_Avance" ("dateUpdate", "employeId", "id", "montant", "motif", "remboursement") SELECT "dateUpdate", "employeId", "id", "montant", "motif", "remboursement" FROM "Avance";
DROP TABLE "Avance";
ALTER TABLE "new_Avance" RENAME TO "Avance";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
