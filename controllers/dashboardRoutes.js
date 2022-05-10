const router = require("express").Router();
const { response } = require("express");
const { Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
    // we want to go ahead and finishing the routing to get all the posts
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,

            }
        })

        const posts = postData.map((post) => post.get({ plain: true }))

        res.render('dashboard', {
            layout: 'main',
            posts,
        })
    }

    catch (err) {
        res.redirect('login');
    }

});

router.get("/new", withAuth, (req, res) => {
// for showing new posts to the user
})

router.get("/edit/:id", withAuth, async (res, req) => {
    // To be able to find posts by primary key and render the edit post on the dashboard
})

module.exports = router;