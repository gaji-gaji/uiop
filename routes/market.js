const express = require('express');
const multer = require('multer');
const MarketPost = require('../models/MarketPost');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// 마켓 게시물 목록 조회
router.get('/', async (req, res) => {
    try {
        const posts = await MarketPost.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 마켓 게시물 등록
router.post('/', upload.single('image'), async (req, res) => {
    const { title, price, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const newPost = new MarketPost({ title, price, description, image });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
