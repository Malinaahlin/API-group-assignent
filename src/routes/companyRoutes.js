const express = require("express");
const router = express.Router();
const {
  getAllCompanies,
  getCompanyById,
  createNewCompany,
  updateCompanyById,
  deleteCompanyById,
} = require("../controllers/companyControllers");

// GET - /api/v1/companies
router.get("/", getAllCompanies);

// GET - /api/v1/companies/:companyId
router.get("/:companyId", getCompanyById);

// POST - /api/v1/companies
router.post("/", createNewCompany);

// PUT - /api/v1/companies/:companyId
router.put("/:companyId", updateCompanyById);

// DELETE - /api/v1/companies/:companyId
router.delete("/:companyId", deleteCompanyById);

module.exports = router;
