const router = require("express").Router();
const { Post, Comment, User } = require("../models");

router.get("/", async (req, res) => {
    // get all posts for the homepage
    try {
        // Get all projects and JOIN with user data
        const postData = await Post.findAll({
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        });
    
        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));
    
        // Pass serialized data and session flag into template
        res.render('posts', { 
          posts, 
          logged_in: req.session.logged_in 
        });
      } catch (err) {
        res.status(500).json(err);
      }
});

router.get("/post/:id", async (req, res) => {
    // get a single post
    try {
        const postData = await Post.findByPk(req.params.id, {
          include: [
            {
              model: User,
              attributes: ['username'],
            },
            {
              model: Comment,
              attributes: ['comment'],
              include: {
                model: User,
                attributes: ['username']
              }
              },
          ],
        });
    
        const post = postData.get({ plain: true });
    
        res.render('single-posts', {
          post,
          logged_in: req.session.logged_in
        });
      } catch (err) {
        res.status(500).json(err);
      }
});

router.get("/login", (req, res) => {
    // login
    if (req.session.logged_in) {
        res.redirect('/dashboard'); //I THINK THIS SHOULD ROUTE TO ALL-POSTS-ADMIN IF LOGGED IN???? 
        return;
      }
    
      res.render('login');
});

router.get("/signup", (req, res) => {
    // signup
    if (req.session.logged_in) {
        res.redirect('/'); //I THINK THIS SHOULD ROUTE TO ALL-POSTS-ADMIN IF LOGGED IN???? 
        return;
      }
    
      res.render('signup');
})

module.exports = router;