const router = require("express").Router();
const { response } = require("express");
const { Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { 
                user_id: req.session.user_id,
            },
        });

        const posts = postData.map((post) => post.get({ plain: true }))

        res.render('all-posts-admin', {
            layout: 'dashboard',
            posts,
        });
    } catch (err) {
        res.redirect('login');
    }
});

// for new post form
router.get("/new", withAuth, (req, res) => {
    res.render('newpost', {
        layout: 'dashboard',
    });
});

// To be able to find posts by primary key and render the edit post on the dashboard
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id);
  
      if (postData) {
        const post = postData.get({ plain: true });
  
        res.render('edit-posts', {
          layout: 'dashboard',
          post,
        });
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.redirect('login');
    }
  });

module.exports = router;