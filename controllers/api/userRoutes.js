const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
    // Creating a new instance of user
    try {
        const userData = await User.create({
          username: req.body.username,
          password: req.body.password,
        });
    
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.username = userData.username;
          req.session.logged_in = true;
    
          res.status(200).json(userData);
        });
      } catch (err) {
        res.status(400).json(err);
      }
});

router.post("/login", async (req, res) => {
    // User login
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
    
        if (!userData) {
          res
            .status(400)
            .json({ message: 'WRONG USERNAME OR PW...TRY AGAIN!!1!' });
          return;
        }
    
        const validPassword = await userData.checkPassword(req.body.password);
    
        if (!validPassword) {
          res
            .status(400)
            .json({ message: 'WRONG PASSWORD OR USERNAME...TRY AGAIN!!1!' });
          return;
        }
    
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          
          res.json({ user: userData, message: 'LOGGED IN, GREAT JOB!' });
        });
    
      } catch (err) {
        res.status(400).json(err);
      }
});

router.post("/logout", async (req, res) => {
    // User logout
    if (req.session.logged_in) {
        req.session.destroy(() => {
          res.status(204).end();
        });
      } else {
        res.status(404).end();
      }
});

module.exports = router;