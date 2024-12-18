const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// 게시물 작성
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = new Post({ title, content });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 게시물 목록 조회
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 게시물 검색
router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const posts = await Post.find({ title: new RegExp(query, 'i') });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
