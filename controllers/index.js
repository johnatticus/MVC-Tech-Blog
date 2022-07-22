const router = require("express").Router();

// finish the required routes
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');


router.use("/", homeRoutes);
// finish the other needed routes with router.use()
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;