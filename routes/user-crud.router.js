const { Router } = require('express');
const router = Router();
const User = require("../models/User");
const Tire = require("../models/Tire");


router.put('/update/:id', async (req, res) => {
    try {
        const update = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });

        res.status(200).json({ message: 'The user was successfully updated' });
    } catch (e) {
        console.log(e);
    }
})

router.get('/get-user', async (req, res) => {
    try{
        const userId = req.query.userId;

        const user = await User.findOne({_id: userId});

        return res.status(200).json({
            success: true,
            user: user
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'server error' });
    }
});


module.exports = router;
