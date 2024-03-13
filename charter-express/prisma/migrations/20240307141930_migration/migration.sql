/*
  Warnings:

  - You are about to drop the column `anneeFabrication` on the `Bus` table. All the data in the column will be lost.
  - You are about to drop the column `placesDisponible` on the `Bus` table. All the data in the column will be lost.
  - You are about to drop the column `placesTotal` on the `Bus` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Piece" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "datePeremption" DATETIME NOT NULL,
    "busId" INTEGER NOT NULL,
    "dateUpdate" DATETIME NOT NULL
);

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
    "ready" TEXT NOT NULL DEFAULT 'non',
    "employeId" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Voyage" ("agenceId", "busId", "dateArrivee", "dateDepart", "id", "placeDisponible", "prixVoyage", "ready", "trajetId", "typeVoyage") SELECT "agenceId", "busId", "dateArrivee", "dateDepart", "id", "placeDisponible", "prixVoyage", "ready", "trajetId", "typeVoyage" FROM "Voyage";
DROP TABLE "Voyage";
ALTER TABLE "new_Voyage" RENAME TO "Voyage";
CREATE TABLE "new_Bus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employeId" INTEGER NOT NULL DEFAULT 0,
    "marque" TEXT NOT NULL,
    "modele" TEXT NOT NULL,
    "typeBus" TEXT NOT NULL,
    "capacite" INTEGER NOT NULL,
    "panneVehicule" TEXT NOT NULL,
    "horsService" TEXT NOT NULL DEFAULT 'non'
);
INSERT INTO "new_Bus" ("capacite", "employeId", "horsService", "id", "marque", "modele", "panneVehicule", "typeBus") SELECT "capacite", "employeId", "horsService", "id", "marque", "modele", "panneVehicule", "typeBus" FROM "Bus";
DROP TABLE "Bus";
ALTER TABLE "new_Bus" RENAME TO "Bus";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
