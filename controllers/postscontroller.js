const Express = require('express');
const router = Express.Router();
const validateSession = require('../middleware/validate-session');
const { PostsModel } = require('../models');

router.get('/practice', (req, res) => {
    res.send('This is a test route.')
});

// Post new post (requires sign in) <CREATE>
router.post('/create', validateSession, async (req, res) => {
    const { gamerTag, playersNeeded, micRequired, type, comments, userId } = req.body;
    const postEntry = {
        gamerTag,
        playersNeeded,
        micRequired,
        type,
        comments,
        userId: req.user.id
    }
    try {
        const newPost = await PostsModel.create(postEntry, userId);
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json({ msg: `On no! Server error: ${err}` })
    }
});

// get all post entries <READ>

router.get('/all', validateSession, async (req, res) => {
    try {
        const allPosts = await PostsModel.findAll();
        res.status(200).json(allPosts);
    } catch (err) {
        res.status(500).json({
            msg: `Oh no! Failed to find posts. Error: ${err}`
        })
    }
});

// get my posts
router.get('/mine', validateSession, async (req, res) => {
    try {
        const id = req.user.id
        const myPosts = await PostsModel.findAll({
            where: { userId: id }
        });
        res.status(200).json(myPosts);
    } catch (err) {
        res.status(500).json({
            msg: `Oh no! Failed to find posts. Error: ${err}`
        })
    }
});


//Edit
router.put('/update/:postsId', validateSession, async (req, res) => {
    try {
        const { id } = req.user
        const { postsId } = req.params
        const { gamerTag, playersNeeded, micRequired, type, comments } = req.body;


        const updatePost = await PostsModel.update({
            gamerTag,
            playersNeeded,
            micRequired,
            type,
            comments
        }, {
            where: { userId: id, id: postsId }
        });
        res.status(200).json({
            msg: 'post updated!',
            updatePost: updatePost == 0 ? `none` : updatePost
        });
    } catch (err) {
        res.status(500).json({ msg: `Error: ${err}` })
    }
});


router.delete('/delete/:postsId', validateSession, async (req, res) => {
    const { id } = req.user
    const { postsId } = req.params
    try {
        const deletePost = await PostsModel.destroy({
            where: { userId: id, id: postsId }
        })
        res.status(200).json({
            message: 'Post successfully deleted',
            deletedPost: deletePost == 0 ? `none` : deletePost
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to delete log: ${err}`
        })
    }
})

//!admin post delete
router.delete('/delete/admin/:postsId', validateSession, async (req, res) => {
    
    const { postsId } = req.params
    if (req.user.role === 'admin') {
        try {
            const deletePost = await PostsModel.destroy({
                where: { id: postsId }
            })
            res.status(200).json({
                message: 'Post successfully deleted',
                deletedPost: deletePost == 0 ? `none` : deletePost
            })
        } catch (err) {
            res.status(500).json({
                message: `Failed to delete log: ${err}`
            })
        }
    } else {
        res.status(401).json({
            message: `Unauthorized`
        })
    }
})



module.exports = router;