// GET - /api/v1/cities
exports.getAllCities = async (req, res) => {
  return res.send("getAllCities has been called");
};

// GET - /api/v1/cities/:cityId
exports.getCityById = async (req, res) => {
  return res.send("getCityById has been called");
};

// POST - /api/v1/cities
exports.createNewCity = async (req, res) => {
  return res.send("createNewCity has been called");
};

// PUT - /api/v1/cities/:cityId
exports.updateCityById = async (req, res) => {
  return res.send("updateCityById has been called");
};

// DELETE - /api/v1/cities/:cityId
exports.deleteCityById = async (req, res) => {
  return res.send("deleteCityById has been called");
};
