
const Express = require('express');
const router = Express.Router();
const validateSession = require('../middleware/validate-session');
const { StatsModel } = require('../models');


router.get('/practice', (req, res) => {
    res.send('This is a test route.')
});

// creates stats (requires sign in) <CREATE>
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
        res.status(500).json({ msg: `Server error: ${err}` })
    }
});

// get all post entries <READ>

router.get('/all', validateSession, async (req, res) => {
    try {
        const allStats = await StatsModel.findAll();
        res.status(200).json(allStats);
    } catch (err) {
        res.status(500).json({
            msg: `Failed to find stats. Error: ${err}`
        })
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
            msg: `Failed to find posts. Error: ${err}`
        })
    }
});

// get stats by statsId
router.get('/one/:id', validateSession, async (req, res) => {
    try {
        const id = req.params.id
        
        const Stats = await StatsModel.findOne({
            where: {id: id}
        });
        res.status(200).json(Stats);
    } catch (err) {
        res.status(500).json({
            msg: `Failed to find posts. Error: ${err}`
        })
    }
});





//Edit stats
router.put('/update/:statsId', validateSession, async (req, res) => {
    try {
        const {id} = req.user
        const { statsId } = req.params
        const { gamerTag, gamesPlayed, gamesWon, kdRatio } = req.body;

        const updateStats = await StatsModel.update({
            gamerTag,
            gamesPlayed,
            gamesWon,
            kdRatio
        }, {
            where: { userId: id, id: statsId }
        });
        res.status(200).json({
            msg: 'stats updated!',
            updateStats: updateStats == 0 ? `none` : updateStats
        });
    } catch (err) {
        res.status(500).json({ msg: `Error: ${err}` })
    }
});

// delete your stats
router.delete('/delete/:statsId', validateSession, async (req, res) => {
    const { id } = req.user
    const { statsId } = req.params
    try {
        const deleteStats = await StatsModel.destroy({
            where: { userId: id, id: statsId }
        })
        res.status(200).json({
            message: 'Post successfully deleted',
            deletedStats: deleteStats == 0 ? `none` : deleteStats
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to delete log: ${err}`
        })
    }
})







module.exports = router;