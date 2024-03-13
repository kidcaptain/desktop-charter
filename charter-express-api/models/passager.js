
const sequelize = require("../db/db");
const DataTypes = require("sequelize")

const Passagers = sequelize.define('Passager', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numCNI: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateNaissance: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    agenceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },

})

module.exports = Passagers;