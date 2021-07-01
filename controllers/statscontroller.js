
const Express = require('express');
const router = Express.Router();
const validateSession = require('../middleware/validate-session');
const { StatsModel } = require('../models');


router.get('/practice', (req, res) => {
    res.send('This is a test route.')
});

// Post new post (requires sign in) <CREATE>
router.post('/create', validateSession, async (req, res) => {
    const { gamerTag, gamesPlayed, gamesWon, kdRatio, userId } = req.body;
    const statsEntry = {
        gamerTag,
        gamesPlayed,
        gamesWon,
        kdRatio,
        userId: req.user.id
    }
    try {
        const newStats = await StatsModel.create(statsEntry, userId);
        res.status(200).json(newStats);
    } catch (err) {
        res.status(500).json({ msg: `On no! Server error: ${err}` })
    }
});

// get my stats <READ>
router.get('/mine', validateSession, async (req, res) => {
    try {
        const  id  = req.user.id
        const myStats = await StatsModel.findAll({
            where: {userId: id}
        });
        res.status(200).json(myStats);
    } catch (err) {
        res.status(500).json({
            msg: `Oh no! Failed to find posts. Error: ${err}`
        })
    }
});





//Edit
router.put('/update', validateSession, async (req, res) => {
    try {
        const {id} = req.user
        // const { statsId } = req.params
        const { gamerTag, gamesPlayed, gamesWon, kdRatio } = req.body;

        const updateStats = await StatsModel.update({
            gamerTag,
            gamesPlayed,
            gamesWon,
            kdRatio
        }, {
            where: { userId: id }
        });
        res.status(200).json({
            msg: 'stats updated!',
            updateStats: updateStats == 0 ? `none` : updateStats
        });
    } catch (err) {
        res.status(500).json({ msg: `Error: ${err}` })
    }
});







module.exports = router;