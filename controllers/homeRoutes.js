const router = require("express").Router();
const { Post, Comment, User } = require("../models");

// get all posts for the homepage
router.get("/", async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        const postData = await Post.findAll({
          include: [User],
        });
    
        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));
    
        // Pass serialized data and session flag into template
        res.render('posts', { posts });
      } catch (err) {
        res.status(500).json(err);
      }
});

// get a single post
router.get("/post/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
          // order: [['id', 'ASC']],
          include: [
            User,
            {
              model: Comment,
              include: [User],
            },
            // {
            //   model: Comment,
            //   attributes: ['comment'],
            //   include: {
            //     model: User,
            //     attributes: ['username']
            //   }
              
            //   },
          ],
        });
    
        if (postData) {
          const post = postData.get({ plain: true });
    
          res.render('single-posts', { post });
        } else {
          res.status(404).end();
        }
      } catch (err) {
        res.status(500).json(err);
      }
});

// login
router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard'); //I THINK THIS SHOULD ROUTE TO ALL-POSTS-ADMIN IF LOGGED IN???? 
        return;
      }
    
      res.render('login');
});

// signup
router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/'); //I THINK THIS SHOULD ROUTE TO ALL-POSTS-ADMIN IF LOGGED IN???? 
        return;
      }
    
      res.render('signup');
})

module.exports = router;