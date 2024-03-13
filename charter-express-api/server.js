const express = require("express");
const dotenv = require("dotenv");
const prisma = require("./db/db.prisma");
const { QueryTypes } = require("sequelize");
const sequelize = require("./db/db");
dotenv.config();

const app = express();

async function main() {
  setInterval(() => {
    // Passagers
    sequelize
      .query("SELECT * FROM `Passager`", { type: QueryTypes.SELECT })
      .then(async (data) => {
        let tab = [];
        tab = data;
        tab.map(async (r) => {
          const date = new Date(r.dateNaissance).toISOString();

          const existingPassager = await prisma.passager.findMany({
            where: {
              nom: r.nom,
              prenom: r.prenom,
              adresse: r.adresse,
              dateNaissance: date,
              genre: r.genre,
              telephone: r.telephone,
              email: r.email,
              numCNI: r.numCNI,
              agenceId: parseInt(r.agenceId),
            },
          });
          if (existingPassager.length == 0) {
            const passagerNum = await prisma.passager.findUnique({
              where: { numCNI: r.numCNI },
            });
            if (!passagerNum) {
              const passager = await prisma.passager.create({
                data: {
                  nom: r.nom,
                  prenom: r.prenom,
                  adresse: r.adresse,
                  dateNaissance: date,
                  genre: r.genre,
                  telephone: r.telephone,
                  email: r.email,
                  numCNI: r.numCNI,
                  agenceId: parseInt(r.agenceId),
                },
              });
              console.log(passager);
            }
          }
        });
      })
      .catch((err) => {
        console.log(
          err.message || "Some error occured while retrieving tutorials."
        );
      });
    // Employés
    sequelize
      .query("SELECT * FROM `Employe`", { type: QueryTypes.SELECT })
      .then(async (data) => {
        let tab = [];
        tab = data;
        tab.map(async (r) => {
          const dateNaissance = new Date(r.dateNaissance).toISOString();
          const dateEmbauche = new Date(r.dateEmbauche).toISOString();

          const existingEmploye = await prisma.employe.findMany({
            where: {
              nom: r.nom,
              prenom: r.prenom,
              adresse: r.adresse,
              dateNaissance: dateNaissance,
              genre: r.genre,
              telephone: r.telephone,
              email: r.email,
              numCNI: r.numCNI,
              dateEmbauche: dateEmbauche,
              agenceId: parseInt(r.agenceId),
              posteId: parseInt(r.posteId),
            },
          });
          if (existingEmploye.length == 0) {
            const employeNum = await prisma.employe.findUnique({
              where: { numCNI: r.numCNI },
            });
            if (!employeNum) {
              const employe = await prisma.employe.create({
                data: {
                  nom: r.nom,
                  prenom: r.prenom,
                  adresse: r.adresse,
                  dateNaissance: dateNaissance,
                  genre: r.genre,
                  telephone: r.telephone,
                  email: r.email,
                  numCNI: r.numCNI,
                  dateEmbauche: dateEmbauche,
                  agenceId: parseInt(r.agenceId),
                  posteId: parseInt(r.posteId),
                },
              });
              console.log(employe);
            }
          }
        });
      })
      .catch((err) => {
        console.log(
          err.message || "Some error occured while retrieving tutorials."
        );
      });
    // Voyages
    sequelize
      .query("SELECT * FROM `Voyage`", { type: QueryTypes.SELECT })
      .then(async (data) => {
        let tab = [];
        tab = data;
        tab.map(async (r) => {
          const dateDepart = new Date(r.dateDepart).toISOString();
          const dateArrivee = new Date(r.dateArrivee).toISOString();

          const existingTrajet = await prisma.voyage.findMany({
            where: {
              agenceId: r.agenceId,
              dateDepart: dateDepart,
              dateArrivee: dateArrivee,
              placeDisponible: parseInt(r.placeDisponible),
              typeVoyage: r.typeVoyage,
              prixVoyage: parseInt(r.prixVoyage),
              busId: r.busId,
              trajetId: parseInt(r.trajetId),
              ready: r.ready,
              employeId: parseInt(r.employeId),
            },
          });

          if (existingTrajet.length == 0) {
            const voyage = await prisma.voyage.create({
              data: {
                agenceId: r.agenceId,
                dateDepart: dateDepart,
                dateArrivee: dateArrivee,
                placeDisponible: parseInt(r.placeDisponible),
                typeVoyage: r.typeVoyage,
                prixVoyage: parseInt(r.prixVoyage),
                busId: r.busId,
                trajetId: parseInt(r.trajetId),
                ready: r.ready,
                employeId: parseInt(r.employeId),
              },
            });
            console.log(voyage);
          }
        });
      })
      .catch((err) => {
        console.log(
          err.message || "Some error occured while retrieving tutorials."
        );
      });
    sequelize
      .query("SELECT * FROM `Trajet`", { type: QueryTypes.SELECT })
      .then(async (data) => {
        let tab = [];
        tab = data;
        tab.map(async (r) => {
          const existingTrajet = await prisma.trajet.findMany({
            where: {
              lieuArrivee: r.lieuArrivee,
              lieuDepart: r.lieuDepart,
              heureDepart: r.heureDepart,
              heureArrivee: r.heureArrivee,
              distance: parseInt(r.distance),
            },
          });

          if (existingTrajet.length == 0) {
            console.log(existingTrajet);
            const trajet = await prisma.trajet.create({
              data: {
                lieuArrivee: r.lieuArrivee,
                lieuDepart: r.lieuDepart,
                heureDepart: r.heureDepart,
                heureArrivee: r.heureArrivee,
                distance: parseInt(r.distance),
              },
            });
            console.log(trajet);
          }
        });
      })
      .catch((err) => {
        console.log(
          err.message || "Some error occured while retrieving tutorials."
        );
      });
    sequelize
      .query("SELECT * FROM `Reservation`", { type: QueryTypes.SELECT })
      .then(async (data) => {
        let tab = [];
        tab = data;
        tab.map(async (r) => {
          const dateReservation = new Date(r.dateReservation).toISOString();
          const exist = await prisma.reservation.findMany({
            where: {
              passagerId: parseInt(r.passagerId),
              voyageId: parseInt(r.voyageId),
              dateReservation: dateReservation,
              statutReservation: r.statutReservation,
              agenceId: parseInt(r.agenceId),
              avance: parseInt(r.avance),
              dateConfirmation: r.dateConfirmation,
            },
          });

          if (exist.length == 0) {
            console.log(exist);
            const reservation = await prisma.reservation.create({
              data: {
                passagerId: parseInt(r.passagerId),
                voyageId: parseInt(r.voyageId),
                dateReservation: dateReservation,
                statutReservation: r.statutReservation,
                agenceId: parseInt(r.agenceId),
                avance: parseInt(r.avance),
              },
            });
            console.log(reservation);
          }
        });
      })
      .catch((err) => {
        console.log(
          err.message || "Some error occured while retrieving tutorials."
        );
      });
    sequelize
      .query("SELECT * FROM `Bus`", { type: QueryTypes.SELECT })
      .then(async (data) => {
        let tab = [];
        tab = data;
        tab.map(async (r) => {
          const exist = await prisma.bus.findMany({
            where: {
              marque: r.marque,
              modele: r.modele,
              typeBus: r.typeBus,
              capacite: parseInt(r.capacite),
              panneVehicule: r.panneVehicule,
            },
          });

          if (exist.length == 0) {
            console.log(exist);
            const bus = await prisma.bus.create({
              data: {
                marque: r.marque,
                modele: r.modele,
                typeBus: r.typeBus,
                capacite: parseInt(r.capacite),
                panneVehicule: r.panneVehicule,
              },
            });
            console.log(bus);
          }
        });
      })
      .catch((err) => {
        console.log(
          err.message || "Some error occured while retrieving tutorials."
        );
      });
    sequelize
      .query("SELECT * FROM `Agence`", { type: QueryTypes.SELECT })
      .then(async (data) => {
        let tab = [];
        tab = data;
        tab.map(async (r) => {
          const exist = await prisma.agence.findMany({
            where: {
              nom: r.nom,
              adresse: r.adresse,
              numeroTelephone: r.numeroTelephone,
              chef: r.chef,
            },
          });

          if (exist.length == 0) {
            console.log(exist);
            const agence = await prisma.agence.create({
              data: {
                nom: r.nom,
                adresse: r.adresse,
                numeroTelephone: r.numeroTelephone,
                chef: r.chef,
              },
            });
            console.log(agence);
          }
        });
      })
      .catch((err) => {
        console.log(
          err.message || "Some error occured while retrieving tutorials."
        );
      });
    sequelize
      .query("SELECT * FROM `Poste`", { type: QueryTypes.SELECT })
      .then(async (data) => {
        let tab = [];
        tab = data;
        tab.map(async (r) => {
          const datePaiement = new Date(r.datePaiement).toISOString();
          const exist = await prisma.poste.findMany({
            where: {
              titre: r.titre,
              salaire: parseInt(r.salaire),
              datePaiement: datePaiement,
            },
          });

          if (exist.length == 0) {
            console.log(exist);
            const poste = await prisma.poste.create({
              data: {
                titre: r.titre,
                salaire: parseInt(r.salaire),
                datePaiement: datePaiement,
              },
            });
            console.log(poste);
          }
        });
      })
      .catch((err) => {
        console.log(
          err.message || "Some error occured while retrieving tutorials."
        );
      });
    sequelize
      .query("SELECT * FROM `Ticket`", { type: QueryTypes.SELECT })
      .then(async (data) => {
        let tab = [];
        tab = data;
        tab.map(async (r) => {
          const dateCreation = new Date(r.dateCreation).toISOString();
          const exist = await prisma.ticket.findMany({
            where: {
              numeroSiege: parseInt(r.numeroSiege),
              prixTicket: parseInt(r.prixTicket),
              voyageId: parseInt(r.voyageId),
              typeTicket: r.typeTicket,
              statusTicket: r.statusTicket,
              dateCreation: dateCreation,
              passagerId: parseInt(r.passagerId),
              employeId: parseInt(r.employeId),
            },
          });

          if (exist.length == 0) {
            console.log(exist);
            const ticket = await prisma.ticket.create({
              data: {
                numeroSiege: parseInt(r.numeroSiege),
                prixTicket: parseInt(r.prixTicket),
                voyageId: parseInt(r.voyageId),
                typeTicket: r.typeTicket,
                statusTicket: r.statusTicket,
                dateCreation: dateCreation,
                passagerId: parseInt(r.passagerId),
                employeId: parseInt(r.employeId),
              },
            });
            console.log(ticket);
          }
        });
      })
      .catch((err) => {
        console.log(
          err.message || "Some error occured while retrieving tutorials."
        );
      });
    sequelize
      .query("SELECT * FROM `Depense`", { type: QueryTypes.SELECT })
      .then(async (data) => {
        let tab = [];
        tab = data;
        tab.map(async (r) => {
          const date = new Date(r.date).toISOString();
          const exist = await prisma.depense.findMany({
            where: {
              agenceId: parseInt(r.agenceId),
              description: r.description,
              montant: parseInt(r.montant),
              date: date,
              typeDepense: r.typeDepense,
              idTypeDepense: r.idTypeDepense,
            },
          });

          if (exist.length == 0) {
            console.log(exist);
            const depense = await prisma.depense.create({
              data: {
                agenceId: parseInt(r.agenceId),
                description: r.description,
                montant: parseInt(r.montant),
                date: date,
                typeDepense: r.typeDepense,
                idTypeDepense: r.idTypeDepense,
              },
            });
            console.log(depense);
          }
        });
      })
      .catch((err) => {
        console.log(
          err.message || "Some error occured while retrieving tutorials."
        );
      });
    sequelize
      .query("SELECT * FROM `Conge`", { type: QueryTypes.SELECT })
      .then(async (data) => {
        let tab = [];
        tab = data;
        tab.map(async (r) => {
          const dateDepart = new Date(r.dateDepart).toISOString();
          const dateUpdate = new Date(r.dateUpdate).toISOString();
          const exist = await prisma.conge.findMany({
            where: {
              nombreJour: parseInt(r.nombreJour),
              dateDepart: dateDepart,
              motif: r.motif,
              dateUpdate: dateUpdate,
              employeId: parseInt(r.employeId),
            },
          });

          if (exist.length == 0) {
            console.log(exist);
            const conge = await prisma.conge.create({
              data: {
                nombreJour: parseInt(r.nombreJour),
                dateDepart: dateDepart,
                motif: r.motif,
                dateUpdate: dateUpdate,
                employeId: parseInt(r.employeId),
              },
            });
            console.log(conge);
          }
        });
      })
      .catch((err) => {
        console.log(
          err.message || "Some error occured while retrieving tutorials."
        );
      });
    sequelize
      .query("SELECT * FROM `Sanction`", { type: QueryTypes.SELECT })
      .then(async (data) => {
        let tab = [];
        tab = data;
        tab.map(async (r) => {
          const dateUpdate = new Date(r.dateUpdate).toISOString();
          const exist = await prisma.sanction.findMany({
            where: {
              label: r.label,
              description: r.description,
              dateUpdate: dateUpdate,
              employeId: parseInt(r.employeId),
              montant: parseInt(r.montant),
            },
          });

          if (exist.length == 0) {
            console.log(exist);
            const sanction = await prisma.sanction.create({
              data: {
                label: r.label,
                description: r.description,
                dateUpdate: dateUpdate,
                employeId: parseInt(r.employeId),
                montant: parseInt(r.montant),
              },
            });
            console.log(sanction);
          }
        });
      })
      .catch((err) => {
        console.log(
          err.message || "Some error occured while retrieving tutorials."
        );
      });
    sequelize
      .query("SELECT * FROM `Avance`", { type: QueryTypes.SELECT })
      .then(async (data) => {
        let tab = [];
        tab = data;
        tab.map(async (r) => {
          const dateUpdate = new Date(r.dateUpdate).toISOString();
          const exist = await prisma.avance.findMany({
            where: {
              montant: parseInt(r.montant),
              motif: r.motif,
              remboursement: r.remboursement,
              dateUpdate: dateUpdate,
              employeId: parseInt(r.employeId),
            },
          });

          if (exist.length == 0) {
            console.log(exist);
            const avance = await prisma.avance.create({
              data: {
                montant: parseInt(r.montant),
                motif: r.motif,
                remboursement: r.remboursement,
                dateUpdate: dateUpdate,
                employeId: parseInt(r.employeId),
              },
            });
            console.log(avance);
          }
        });
      })
      .catch((err) => {
        console.log(
          err.message || "Some error occured while retrieving tutorials."
        );
      });
    sequelize
      .query("SELECT * FROM `Prime`", { type: QueryTypes.SELECT })
      .then(async (data) => {
        let tab = [];
        tab = data;
        tab.map(async (r) => {
          const dateUpdate = new Date(r.dateUpdate).toISOString();
          const exist = await prisma.prime.findMany({
            where: {
              montant: parseInt(r.montant),
              justificatif: r.justificatif,
              dateUpdate: dateUpdate,
              employeId: parseInt(r.employeId),
            },
          });

          if (exist.length == 0) {
            console.log(exist);
            const prime = await prisma.prime.create({
              data: {
                montant: parseInt(r.montant),
                justificatif: r.justificatif,
                dateUpdate: dateUpdate,
                employeId: parseInt(r.employeId),
              },
            });
            console.log(prime);
          }
        });
      })
      .catch((err) => {
        console.log(
          err.message || "Some error occured while retrieving tutorials."
        );
      });
    sequelize
      .query("SELECT * FROM `Recette`", { type: QueryTypes.SELECT })
      .then(async (data) => {
        let tab = [];
        tab = data;
        tab.map(async (r) => {
          const dateTransaction = new Date(r.dateTransaction).toISOString();
          const exist = await prisma.recette.findMany({
            where: {
              nom: r.nom,
              typeService: r.typeService,
              typePaiement: r.typePaiement,
              montant: parseInt(r.montant),
              dateTransaction: dateTransaction,
              note: r.note,
              agenceId: parseInt(r.agenceId),
            },
          });

          if (exist.length == 0) {
            console.log(exist);
            const recette = await prisma.recette.create({
              data: {
                nom: r.nom,
                typeService: r.typeService,
                typePaiement: r.typePaiement,
                montant: parseInt(r.montant),
                dateTransaction: dateTransaction,
                note: r.note,
                agenceId: parseInt(r.agenceId),
              },
            });
            console.log(recette);
          }
        });
      })
      .catch((err) => {
        console.log(
          err.message || "Some error occured while retrieving tutorials."
        );
      });
    sequelize
      .query("SELECT * FROM `LigneFicheRecette`", { type: QueryTypes.SELECT })
      .then(async (data) => {
        let tab = [];
        tab = data;
        tab.map(async (r) => {
          const date = new Date(r.date).toISOString();
          const exist = await prisma.ligneFicheRecette.findMany({
            where: {
              busId: parseInt(r.busId),
              voyageId: parseInt(r.voyageId),
              montant: parseInt(r.montant),
              signature: r.signature,
              date: date,
              agenceId: parseInt(r.agenceId),
            },
          });

          if (exist.length == 0) {
            console.log(exist);
            const ligneFicheRecette = await prisma.ligneFicheRecette.create({
              data: {
                busId: parseInt(r.busId),
                voyageId: parseInt(r.voyageId),
                montant: parseInt(r.montant),
                signature: r.signature,
                date: date,
                agenceId: parseInt(r.agenceId),
              },
            });
            console.log(ligneFicheRecette);
          }
        });
      })
      .catch((err) => {
        console.log(
          err.message || "Some error occured while retrieving tutorials."
        );
      });
    sequelize
      .query("SELECT * FROM `Facture`", { type: QueryTypes.SELECT })
      .then(async (data) => {
        let tab = [];
        tab = data;
        tab.map(async (r) => {
          const exist = await prisma.facture.findMany({
            where: {
              src: r.src,
              agenceId: parseInt(r.agenceId),
              montant: parseInt(r.montant),
              nom: r.nom,
              ext: r.ext,
            },
          });

          if (exist.length == 0) {
            console.log(exist);
            const facture = await prisma.facture.create({
              data: {
                src: r.src,
                agenceId: parseInt(r.agenceId),
                montant: parseInt(r.montant),
                nom: r.nom,
                ext: r.ext,
              },
            });
            console.log(facture);
          }
        });
      })
      .catch((err) => {
        console.log(
          err.message || "Some error occured while retrieving tutorials."
        );
      });
    sequelize
      .query("SELECT * FROM `Piece`", { type: QueryTypes.SELECT })
      .then(async (data) => {
        let tab = [];
        tab = data;
        tab.map(async (r) => {
          const datePeremption = new Date(r.datePeremption).toISOString();
          const dateUpdate = new Date(r.dateUpdate).toISOString();
          const exist = await prisma.piece.findMany({
            where: {
              nom: r.nom,
              datePeremption: datePeremption,
              dateUpdate: dateUpdate,
              busId: parseInt(r.busId),
            },
          });

          if (exist.length == 0) {
            console.log(exist);
            const piece = await prisma.piece.create({
              data: {
                nom: r.nom,
                datePeremption: datePeremption,
                dateUpdate: dateUpdate,
                busId: parseInt(r.busId),
              },
            });
            console.log(piece);
          }
        });
      })
      .catch((err) => {
        console.log(
          err.message || "Some error occured while retrieving tutorials."
        );
      });
  }, 18000000);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

app.use(express.json());

app.get("/users", async (req, res) => {});

app.listen(3001, () => {
  console.log("server running");
});
