const { route } = require("../../../.Main/controllers/api");
const router = require("express").Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// Finish the required pathing for these variables
// const userRoutes = ;
// const postRoutes = ;
// const commentRoutes = ;

// write the rest of the router.use routes
router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);

module.exports = router;