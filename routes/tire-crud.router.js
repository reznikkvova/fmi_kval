const { Router } = require('express');
const bcrypt = require('bcryptjs');
const router = Router();
const Tire = require("../models/Tire");



router.post('/create', async (req, res) => {
    const {id, brand, diameter, width, height, construction, speedIndex, countAvailable, season, image, year, price} = req.body;
    const article = brand.slice(0, 2) + diameter + width + height + construction + speedIndex + year;

    const item = new Tire({id, brand, diameter, width, height, construction, speedIndex, countAvailable, season, image, year, price, article});

    try {

        if (await Tire.findOne({ article })) {
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
});

router.get('/get/:id', async (req, res) => {
    try{
        const result = await Tire.findById(req.params.id);

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'server error' });
    }
});

router.put('/update/:id', async (req, res) => {
    try{
        const update = await Tire.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });

        res.status(200).json({ message: 'The item was successfully updated' });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'server error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try{

        const item = await Tire.findByIdAndRemove(req.params.id);

        return res.status(201).json({ message: 'Item was deleted!' });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'server error' });
    }
})



module.exports = router;