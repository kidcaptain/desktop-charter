-- CreateTable
CREATE TABLE "Passagers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "dateNaissance" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "numCNI" TEXT NOT NULL,
    "agenceId" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employeId" INTEGER NOT NULL DEFAULT 0,
    "marque" TEXT NOT NULL,
    "modele" TEXT NOT NULL,
    "typeBus" TEXT NOT NULL,
    "capacite" INTEGER NOT NULL,
    "panneVehicule" TEXT NOT NULL DEFAULT '',
    "horsService" TEXT NOT NULL DEFAULT 'non'
);
INSERT INTO "new_Bus" ("capacite", "employeId", "horsService", "id", "marque", "modele", "panneVehicule", "typeBus") SELECT "capacite", "employeId", "horsService", "id", "marque", "modele", "panneVehicule", "typeBus" FROM "Bus";
DROP TABLE "Bus";
ALTER TABLE "new_Bus" RENAME TO "Bus";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Passagers_numCNI_key" ON "Passagers"("numCNI");
