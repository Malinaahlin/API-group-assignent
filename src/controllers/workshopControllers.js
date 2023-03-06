const { users, accountType, userRoles } = require("../constants/users");
const { NotFoundError, UnauthorizedError } = require("../utils/errors");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");
const { account_types } = require("../data/account_types");

// GET - /api/v1/workshops
exports.getAllWorkshops = async (req, res) => {
  return res.send("getAllWorkshops has been called");
};

// GET - /api/v1/workshops/:workshopId
exports.getWorkshopById = async (req, res) => {
  // return res.send("getWorkshopById has been called");

  const workshopId = req.params.workshopId;

  const [workshop, metadata] = await sequelize.query(
    `SELECT w.name, r.content
    FROM workshop w
    LEFT JOIN review r
    ON r.fk_workshop_id = $workshopId;`,
    // SKA VI HA MED USER MED SÅ MAN SER AUTHOR?
    {
      bind: { workshopId },
      type: QueryTypes.SELECT,
    }
  );

  if (!workshop) throw new NotFoundError("That workshop does not exist");

  return res.json(workshop);
};

// POST - /api/v1/workshops
exports.createNewWorkshop = async (req, res) => {
  return res.send("createNewWorkshop has been called");
};

// PUT - /api/v1/workshops/:workshopId
exports.updateWorkshopById = async (req, res) => {
  return res.send("updateWorkshopById has been called");
};

// DELETE - /api/v1/workshops/:workshopId
exports.deleteWorkshopById = async (req, res) => {
  return res.send("deleteWorkshopById has been called");
};
