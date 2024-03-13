const Sequelize = require("sequelize");

const sequelizeConnection = new Sequelize({
  dialect: "sqlite",
  storage: "C:/Users/YVAN/Desktop/Nestjs/charter-express/prisma/dev.db",
  define: {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
});

const auth = async () => {
  try {
    await sequelizeConnection.authenticate();
    console.log("  connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
};
auth();

module.exports = sequelizeConnection;
