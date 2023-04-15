const router = require("express").Router();
const userRoutes = require("./userRroutes");
const thoughtRoutes = require("./thoughtRoutes");

router.use("/user", userRoutes);
router.use("/thought", thoughtRoutes);

module.exports = router;
