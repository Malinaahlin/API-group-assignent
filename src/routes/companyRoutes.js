const express = require("express");
const router = express.Router();
const { userRoles } = require("../constants/users");
const {
  getAllCompanies,
  getCompanyById,
  createNewCompany,
  updateCompanyById,
  deleteCompanyById,
} = require("../controllers/companyControllers");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authenticationMiddleware");

// GET - /api/v1/companies
router.get("/", getAllCompanies);

// GET - /api/v1/companies/:companyId
router.get("/:companyId", getCompanyById);

// POST - /api/v1/companies
router.post(
  "/",
  isAuthenticated,
  authorizeRoles(userRoles.ADMIN || userRoles.OWNER),
  createNewCompany
);

// PUT - /api/v1/companies/:companyId
router.put(
  "/:companyId",
  isAuthenticated,
  authorizeRoles(userRoles.ADMIN || userRoles.OWNER),
  updateCompanyById
);

// DELETE - /api/v1/companies/:companyId
router.delete(
  "/:companyId",
  isAuthenticated,
  authorizeRoles(userRoles.ADMIN || userRoles.OWNER),
  deleteCompanyById
);

module.exports = router;
