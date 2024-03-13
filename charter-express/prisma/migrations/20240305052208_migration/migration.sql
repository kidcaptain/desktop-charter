/*
  Warnings:

  - You are about to alter the column `datePaiement` on the `Poste` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Voyage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dateDepart" DATETIME NOT NULL,
    "dateArrivee" DATETIME NOT NULL,
    "placeDisponible" INTEGER NOT NULL,
    "typeVoyage" TEXT NOT NULL,
    "prixVoyage" DECIMAL NOT NULL,
    "busId" TEXT NOT NULL,
    "trajetId" INTEGER NOT NULL,
    "agenceId" INTEGER NOT NULL,
    "ready" TEXT NOT NULL DEFAULT 'non'
);
INSERT INTO "new_Voyage" ("agenceId", "busId", "dateArrivee", "dateDepart", "id", "placeDisponible", "prixVoyage", "trajetId", "typeVoyage") SELECT "agenceId", "busId", "dateArrivee", "dateDepart", "id", "placeDisponible", "prixVoyage", "trajetId", "typeVoyage" FROM "Voyage";
DROP TABLE "Voyage";
ALTER TABLE "new_Voyage" RENAME TO "Voyage";
CREATE TABLE "new_Poste" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "salaire" INTEGER NOT NULL,
    "datePaiement" DATETIME NOT NULL
);
INSERT INTO "new_Poste" ("datePaiement", "id", "salaire", "titre") SELECT "datePaiement", "id", "salaire", "titre" FROM "Poste";
DROP TABLE "Poste";
ALTER TABLE "new_Poste" RENAME TO "Poste";
CREATE TABLE "new_Agence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "numeroTelephone" TEXT NOT NULL,
    "chef" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Agence" ("adresse", "id", "nom", "numeroTelephone") SELECT "adresse", "id", "nom", "numeroTelephone" FROM "Agence";
DROP TABLE "Agence";
ALTER TABLE "new_Agence" RENAME TO "Agence";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
