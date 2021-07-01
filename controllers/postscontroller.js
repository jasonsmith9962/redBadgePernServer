const Express = require('express');
const router = Express.Router();
const validateSession = require('../middleware/validate-session');
const { PostsModel } = require('../models');
const middleware = require('../middleware')

router.get('/practice', (req, res) => {
    res.send('This is a test route.')
});

// Post new post (requires sign in) <CREATE>
router.post('/create', middleware.validateSession, async (req, res) => {
    const { gamerTag, playersNeeded, micRequired, type, comments } = req.body;
    // const { id } = req.user;
    const postEntry = {
        gamerTag,
        playersNeeded,
        micRequired,
        type,
        comments
    }
    try {
        const newPost = await PostsModel.create(postEntry);
        res.status(200).json(newPost);
    } catch (err) {
            res.status(500).json({ msg: `On no! Server error: ${err}` })
        }
});

// get all post entries <READ>

router.get('/all', async (req, res) => {
    try {
        const allPosts = await PostsModel.findAll();
        res.status(200).json(allPosts);
    } catch (err) {
        res.status(500).json({
            msg: `Oh no! Failed to find posts. Error: ${err}`
        })
    }
});


//Edit
router.put('/:gamerTag', validateSession, async (req, res) => {
    try {
        const { gamerTag, playersNeeded, micRequired, type, comments } = req.body;

        const updatedPost = await PostsModel.update({
            gamerTag,
            playersNeeded,
            micRequired,
            type,
            comments  
        }, {
            where: { gamerTag: req.params.gamerTag }
        });
        res.status(200).json({
            msg: 'post updated!',
            updatedPost
        });
    } catch (err) {
        res.status(500).json({ msg: `Error: ${err}` })
    }
});


router.delete('/:gamerTag', validateSession, async(req, res)=>{
    try{
        const locatedPost = await PostsModel.destroy({
            where: {gamerTag: req.params.gamerTag}
        })
        res.status(200).json({
            message: 'Post successfully deleted',
            deletedPost: locatedPost
            })
    } catch(err) {
        res.status(500).json({
            message: `Failed to delete log: ${err}`
        })
    }
})




module.exports = router;