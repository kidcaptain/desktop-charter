/*
  Warnings:

  - Added the required column `montant` to the `Sanction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sanction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "employeId" INTEGER NOT NULL,
    "dateUpdate" DATETIME NOT NULL,
    "montant" INTEGER NOT NULL
);
INSERT INTO "new_Sanction" ("dateUpdate", "description", "employeId", "id", "label") SELECT "dateUpdate", "description", "employeId", "id", "label" FROM "Sanction";
DROP TABLE "Sanction";
ALTER TABLE "new_Sanction" RENAME TO "Sanction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
