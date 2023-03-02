// GET - /api/v1/workshops
exports.getAllWorkshops = async (req, res) => {
  return res.send("getAllWorkshops has been called");
};

// GET - /api/v1/workshops/:workshopId
exports.getWorkshopById = async (req, res) => {
  return res.send("getWorkshopById has been called");
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
