const { Router } = require('express');
const bcrypt = require('bcryptjs');
const router = Router();
const Tire = require("../models/Tire");



router.post('/create', async (req, res) => {
    const {id, brand, diameter, width, height, construction, speedIndex, countAvailable, season, image} = req.body;
    const item = new Tire({id, brand, diameter, width, height, construction, speedIndex, countAvailable, season, image});

    try {

        if (await Tire.findOne({ id })) {
            return res.status(400).json({ message: 'Item is already registered' });
        }
        await item.save();
        return res.status(201).json({ message: 'Item was created!' });
    } catch (e) {
        console.log(e);
    }
})
router.get('/get-items', async (req, res) => {
    try{
        const items = await Tire.find();

        return res.status(200).json({
            success: true,
            count: items.length,
            data: items,
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'server error' });
    }
})

router.delete('/delete/:id', async (req, res) => {
    try{
        console.log(req.params)
        const item = await Tire.findByIdAndRemove(req.params.id);

        return res.status(201).json({ message: 'Item was deleted!' });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'server error' });
    }
})



module.exports = router;
