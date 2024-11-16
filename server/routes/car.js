const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middlewares/auth');
const Car = require('../models/Car');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', authMiddleware, upload.array('images', 10), async (req, res) => {
    const { title, description, tags } = req.body;
    const images = req.files.map(file => file.path);

    try {
        const car = new Car({
            title,
            description,
            tags: tags.split(','),
            images,
            userId: req.userId,
        });
        await car.save();
        res.status(201).json(car);
    } catch (err) {
        res.status(400).json({ error: 'Error creating car' });
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const cars = await Car.find({ userId: req.userId });
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/search', authMiddleware, async (req, res) => {
    const { keyword } = req.query;
    try {
        const cars = await Car.find({
            userId: req.userId,
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { tags: { $regex: keyword, $options: 'i' } },
            ],
        });
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
