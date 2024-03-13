-- CreateTable
CREATE TABLE "Passager" (
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

-- CreateTable
CREATE TABLE "Employe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "dateNaissance" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL DEFAULT 'nothing',
    "genre" TEXT NOT NULL,
    "numCNI" TEXT NOT NULL,
    "dateEmbauche" DATETIME NOT NULL,
    "posteId" INTEGER NOT NULL,
    "agenceId" INTEGER NOT NULL,
    "matricule" TEXT NOT NULL DEFAULT '',
    "natureContrat" TEXT NOT NULL DEFAULT '',
    "anciennete" INTEGER NOT NULL DEFAULT 0,
    "imageCNIRecto" TEXT NOT NULL DEFAULT '',
    "imageCNIVerso" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Voyage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dateDepart" DATETIME NOT NULL,
    "dateArrivee" DATETIME NOT NULL,
    "placeDisponible" INTEGER NOT NULL,
    "typeVoyage" TEXT NOT NULL,
    "prixVoyage" DECIMAL NOT NULL,
    "busId" TEXT NOT NULL,
    "trajetId" INTEGER NOT NULL,
    "agenceId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Trajet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lieuDepart" TEXT NOT NULL,
    "lieuArrivee" TEXT NOT NULL,
    "heureDepart" TEXT NOT NULL,
    "heureArrivee" TEXT NOT NULL,
    "distance" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Reservation" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "passagerId" INTEGER NOT NULL,
    "voyageId" INTEGER NOT NULL,
    "dateReservation" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statutReservation" TEXT NOT NULL,
    "agenceId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Bus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employeId" INTEGER NOT NULL,
    "marque" TEXT NOT NULL,
    "modele" TEXT NOT NULL,
    "typeBus" TEXT NOT NULL,
    "anneeFabrication" TEXT NOT NULL,
    "capacite" INTEGER NOT NULL,
    "placesDisponible" INTEGER NOT NULL,
    "placesTotal" INTEGER NOT NULL,
    "panneVehicule" TEXT NOT NULL,
    "horsService" TEXT NOT NULL DEFAULT 'non'
);

-- CreateTable
CREATE TABLE "Agence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "numeroTelephone" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Poste" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "salaire" INTEGER NOT NULL,
    "datePaiement" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Salaire" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "posteId" INTEGER NOT NULL,
    "montant" INTEGER NOT NULL,
    "datePaiement" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "voyageId" INTEGER NOT NULL,
    "numeroSiege" INTEGER NOT NULL,
    "prixTicket" INTEGER NOT NULL,
    "typeTicket" TEXT NOT NULL,
    "statusTicket" TEXT NOT NULL,
    "dateCreation" DATETIME NOT NULL,
    "passagerId" INTEGER NOT NULL,
    "employeId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "TrackingVehicule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vehiculeId" INTEGER NOT NULL,
    "lattitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "dateHeureSuivi" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Depense" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "agenceId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "montant" DECIMAL NOT NULL,
    "date" DATETIME NOT NULL,
    "typeDepense" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomUtilisateur" TEXT NOT NULL,
    "motDePasse" TEXT NOT NULL,
    "dateCreationCompte" DATETIME NOT NULL,
    "dateDerniereConnexion" DATETIME NOT NULL,
    "blocke" TEXT NOT NULL DEFAULT 'non',
    "numCNI" TEXT NOT NULL DEFAULT '',
    "employeId" INTEGER NOT NULL,
    "isConnected" TEXT NOT NULL,
    "droitsAccesId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "DroitsAcces" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "TypeDroits" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Conge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombreJour" INTEGER NOT NULL,
    "dateDepart" DATETIME NOT NULL,
    "motif" TEXT NOT NULL,
    "employeId" INTEGER NOT NULL,
    "dateUpdate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Sanction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "employeId" INTEGER NOT NULL,
    "dateUpdate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Avance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "montant" INTEGER NOT NULL,
    "motif" TEXT NOT NULL,
    "remboursement" TEXT NOT NULL,
    "employeId" INTEGER NOT NULL,
    "dateUpdate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Prime" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "montant" INTEGER NOT NULL,
    "justificatif" TEXT NOT NULL,
    "employeId" INTEGER NOT NULL,
    "dateUpdate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Recette" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "typeService" TEXT NOT NULL,
    "typePaiement" TEXT NOT NULL,
    "montant" INTEGER NOT NULL,
    "dateTransaction" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "agenceId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "LigneFicheRecette" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "busId" INTEGER NOT NULL,
    "voyageId" INTEGER NOT NULL,
    "montant" INTEGER NOT NULL,
    "signature" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "agenceId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "FicheSuivieVehicule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "immatriculation" TEXT NOT NULL,
    "typeVehicule" TEXT NOT NULL,
    "kilometrageInitial" INTEGER NOT NULL,
    "dateAchat" DATETIME NOT NULL,
    "dateMiseService" DATETIME NOT NULL,
    "busId" INTEGER NOT NULL,
    "dateRevision" DATETIME NOT NULL,
    "detailRevision" TEXT NOT NULL,
    "vidange" TEXT NOT NULL,
    "reperationEffectuees" TEXT NOT NULL,
    "anomalies" TEXT NOT NULL,
    "carburant" TEXT NOT NULL,
    "pannes" TEXT NOT NULL,
    "vandalisme" TEXT NOT NULL,
    "accident" TEXT NOT NULL,
    "assurance" TEXT NOT NULL,
    "contratEntretien" TEXT NOT NULL,
    "garanties" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Facture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "src" TEXT NOT NULL,
    "agenceId" INTEGER NOT NULL,
    "nom" TEXT NOT NULL,
    "ext" TEXT NOT NULL,
    "montant" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Passager_numCNI_key" ON "Passager"("numCNI");

-- CreateIndex
CREATE UNIQUE INDEX "Employe_numCNI_key" ON "Employe"("numCNI");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_motDePasse_key" ON "Utilisateur"("motDePasse");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_employeId_key" ON "Utilisateur"("employeId");

-- CreateIndex
CREATE UNIQUE INDEX "DroitsAcces_TypeDroits_key" ON "DroitsAcces"("TypeDroits");
