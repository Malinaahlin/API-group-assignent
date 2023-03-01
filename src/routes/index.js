const express = require("express");
const router = express.Router();

const account_typeRoutes = require("./account_typeRoutes");
const cityRoutes = require("./cityRoutes");
const companyRoutes = require("./companyRoutes");
const reviewRoutes = require("./reviewRoutes");
const userRoutes = require("./userRoutes");
const workshopRoutes = require("./workshopRoutes");

router.use("/accounttypes", account_typeRoutes);
router.use("/cities", cityRoutes);
router.use("/companies", companyRoutes);
router.use("/reviews", reviewRoutes);
router.use("/users", userRoutes);
router.use("/workshops", workshopRoutes);

module.exports = router;
