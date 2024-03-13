-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservation" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "passagerId" INTEGER NOT NULL,
    "voyageId" INTEGER NOT NULL,
    "dateReservation" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statutReservation" TEXT NOT NULL,
    "agenceId" INTEGER NOT NULL,
    "Avance" INTEGER NOT NULL DEFAULT 0,
    "DateConfirmation" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Reservation" ("Id", "agenceId", "dateReservation", "passagerId", "statutReservation", "voyageId") SELECT "Id", "agenceId", "dateReservation", "passagerId", "statutReservation", "voyageId" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
