const { users, accountType, userRoles } = require("../constants/users");
const { NotFoundError, UnauthorizedError } = require("../utils/errors");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");
const { account_types } = require("../data/account_types");
const { selectProps } = require("../utils/helpers");

// GET - /api/v1/workshops
exports.getAllWorkshops = async (req, res) => {
  // lägg till if-sats för city
  const city = req.query.city;
  const limit = req.query?.limit || 10;
  const offset = req.query?.offset || 0;

  if (!city) {
    const workshops = await sequelize.query(
      `SELECT w.name, w.description, w.address, c.name AS city, w.telephone, w.opening_hours
    FROM workshop w
    LEFT JOIN city c ON c.city_id = w.fk_city_id
    ORDER BY w.name ASC LIMIT $limit OFFSET $offset`,

      {
        bind: { limit: limit, offset: offset },
        type: QueryTypes.SELECT,
      }
    );

    if (!workshops) throw new NotFoundError("Cannot find any workshops");

    return res.json(workshops);
  }

  const workshops = await sequelize.query(
    `SELECT w.name, w.description, w.address, c.name AS city, w.telephone, w.opening_hours
  FROM workshop w
  LEFT JOIN city c ON c.city_id = w.fk_city_id
  WHERE c.name  = $city
  ORDER BY w.name ASC LIMIT $limit OFFSET $offset`,

    {
      bind: { city: city, limit: limit, offset: offset },
      type: QueryTypes.SELECT,
    }
  );

  if (!workshops) throw new NotFoundError("Cannot find any workshops");

  return res.json(workshops);

  //Lägg till errorhantering
};

// GET - /api/v1/workshops/:workshopId
exports.getWorkshopById = async (req, res) => {
  const workshopId = req.params.workshopId;

  const workshops = await sequelize.query(
    `SELECT w.name AS workshop, c.name AS city, r.content AS review, r.rating, u.username 
    FROM workshop w
    LEFT JOIN review r
    ON r.fk_workshop_id = w.workshop_id
    LEFT JOIN user u 
    ON u.user_id = r.fk_user_id 
    LEFT JOIN city c 
    ON c.city_id = w.fk_city_id 
    WHERE w.workshop_id = $workshopId;`,

    {
      bind: { workshopId: workshopId },
      type: QueryTypes.SELECT,
    }
  );

  if (!workshops) throw new NotFoundError("That workshop does not exist");

  const workshopReviews = workshops.map(
    selectProps("review", "rating", "username")
  );

  const workshopName = workshops[1].workshop;

  const response = {
    workshop: workshopName,
    reviews: workshopReviews,
  };

  return res.json(response);
};

// POST - /api/v1/workshops
exports.createNewWorkshop = async (req, res) => {
  //const workshop
  return res.send("createNewWorkshop has been called");

  // Headers ska in
};

// PUT - /api/v1/workshops/:workshopId
exports.updateWorkshopById = async (req, res) => {
  return res.send("updateWorkshopById has been called");
};

// DELETE - /api/v1/workshops/:workshopId
exports.deleteWorkshopById = async (req, res) => {
  return res.send("deleteWorkshopById has been called");
};
