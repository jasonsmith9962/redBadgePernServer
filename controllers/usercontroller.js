const router = require('express').Router();
const { UserModel, PostsModel, StatsModel } = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session')


router.post('/register', async (req, res) => {
    let { emailAddress, password, role } = req.body.user;
    try {
        const User = await UserModel.create({
            emailAddress,
            password: bcrypt.hashSync(password, 13),
            role
        });

        let token = jwt.sign({ id: User.id, role: User.admin }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 168 })

        res.status(201).json({
            msg: 'User successfully registered!',
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                msg: 'Email already registered! Did you mean to login?'
            });
        } else {
            res.status(500).json({
                msg: `Oh no! Server failed to register user. err=${err}`
            })
        }
    }
});

// login user
router.post('/login', async (req, res) => {
    let { emailAddress, password } = req.body.user;
    try {
        let loginUser = await UserModel.findOne({
            where: {
                emailAddress: emailAddress,
            },
        });

        if (loginUser) {
            let passwordComparison = await bcrypt.compare(password, loginUser.password);
            if (passwordComparison) {
                let token = jwt.sign({ id: loginUser.id, role: loginUser.admin }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 12 })
                res.status(200).json({
                    user: loginUser,
                    message: "User successfully logged in!",
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    msg: 'Incorrect email or password'
                });
            }
        } else {
            res.status(401).json({
                msg: 'Incorrect email or password'
            })
        }
    } catch (err) {
        res.status(500).json({
            msg: 'Failed to log user in.'
        })
    }
});

router.delete('/delete', validateSession, async (req, res) => {
    try {
        const locatedStats = await StatsModel.destroy({
            where: { userId: req.user.id }
        })
        const locatedPosts = await PostsModel.destroy({
            where: { userId: req.user.id }
        })
        const locatedUser = await UserModel.destroy({
            where: { id: req.user.id }
        })
        res.status(200).json({
            message: 'User successfully deleted',
            deletedUser: locatedUser,
            deletedPosts: locatedPosts == 0 ? `no posts to delete` : locatedPosts,
            deletedStats: locatedStats == 0 ? `no stats to delete` : locatedStats
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to delete User: ${err}`
        })
    }
})

//!admin delete path
router.delete('/delete/admin/:userId', validateSession, async (req, res) => {
    const { userId } = req.params
    if (req.user.role === 'admin') {
        try {

            const locatedStats = await StatsModel.destroy({
                where: { userId: userId }
            })
            const locatedPosts = await PostsModel.destroy({
                where: { userId: userId }
            })
            const locatedUser = await UserModel.destroy({
                where: { id: userId }
            })
            res.status(200).json({
                message: 'User successfully deleted',
                deletedUser: locatedUser,
                deletedPosts: locatedPosts == 0 ? `no posts to delete` : locatedPosts,
                deletedStats: locatedStats == 0 ? `no stats to delete` : locatedStats
            })
        } catch (err) {
            res.status(500).json({
                message: `Failed to delete User: ${err}`
            })
        }
    } else {
        res.status(401).json({
            message: `Unauthorized`
        })
    }
})




module.exports = router;