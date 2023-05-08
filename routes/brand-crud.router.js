const { Router } = require('express');
const router = Router();
const Brand = require("../models/Brand");
const Tire = require("../models/Tire");



router.post('/create', async (req, res) => {
    const {id, name, country} = req.body;
    const item = new Brand({id, name, country});

    try {

        if (await Brand.findOne({ name })) {
            return res.status(400).json({ message: 'Brand is already registered' });
        }
        await item.save();
        return res.status(201).json({ message: 'Brand was created!' });
    } catch (e) {
        console.log(e);
    }
})

router.get('/get-items', async (req, res) => {
    try{
        const items = await Brand.find();

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

module.exports = router;
