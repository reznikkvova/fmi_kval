const { Router } = require('express');
const router = Router();
const Brand = require("../models/Brand");
const Tire = require("../models/Tire");
const Cart = require("../models/Cart");

router.post('/add', async (req, res) => {
    const { userId, productId, price} = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            cart.products.push({ productId, quantity: 1, price: price });
            cart = await cart.save();
            return res.status(201).send(cart);
        } else {
            //no cart for user, create new cart
            const newCart = await Cart.create({
                userId,
                products: [{ productId, quantity: 1, price: price }]
            });

            return res.status(201).send(newCart);
        }
    } catch (e) {
        console.log(e);
    }
})

router.get('/get-items', async (req, res) => {
    try{
        const userId = req.query.userId;

        const cart = await Cart.findOne({userId});
        if(cart) {

            const items = await Tire.find({'id': {
                    "$in": cart.products.map(product => product.productId)
                }})

            return res.status(200).json({
                success: true,
                cart: cart,
                items: items
            });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'server error' });
    }
});

router.get('/get-items-count', async (req, res) => {
    try{
        const userId = req.query.userId;

        const cart = await Cart.findOne({userId});


        return res.status(200).json({
            success: true,
            count: cart !== null && cart !== undefined ? cart.products.length : 0,
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'server error' });
    }
});

router.post('/update', async (req, res) => {
    try{

        const {userId, productId, quantity} = req.body;

        let cart = await Cart.findOne({userId});
        cart.products[cart.products.findIndex(item => item.productId == productId)].quantity = quantity;

        cart = await cart.save();

        res.status(200).json({ message: 'The item was successfully updated' });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'server error' });
    }
});

router.post('/delete', async (req, res) => {
    try{

        const {userId, productId } = req.body;

        let cart = await Cart.findOne({userId});
        const index = cart.products.findIndex(item => item.productId == productId);
        cart.products.splice(index, 1);

        cart = await cart.save();

        res.status(200).json({ message: 'The item was successfully deleted' });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'server error' });
    }
});

router.post('/delete-all', async (req, res) => {
    try{

        const {userId} = req.body;

        let cart = await Cart.findOne({userId});

        cart.products = [];

        cart = await cart.save();

        res.status(200).json({ message: 'The cart was successfully cleared' });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'server error' });
    }
});


module.exports = router;
