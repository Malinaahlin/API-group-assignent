// GET - /api/v1/companies
exports.getAllCompanies = async (req, res) => {
  return res.send("getAllCompanies has been called.");
};

// GET - /api/v1/companies/:companyId
exports.getCompanyById = async (req, res) => {
  return res.send("getCompanyById has been called.");
};

// POST - /api/v1/companies
exports.createNewCompany = async (req, res) => {
  return res.send("createNewCompany has been called.");
};

// PUT - /api/v1/companies/:companyId
exports.updateCompanyById = async (req, res) => {
  return res.send("updateCompanyById has been called.");
};

// DELETE - /api/v1/companies/:companyId
exports.deleteCompanyById = async (req, res) => {
  return res.send("deleteCompanyById has been called.");
};
