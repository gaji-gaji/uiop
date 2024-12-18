const express = require('express');
const Chat = require('../models/Chat');
const router = express.Router();

// 특정 게시물의 채팅 메시지 조회
router.get('/:postId', async (req, res) => {
    try {
        const chats = await Chat.find({ postId: req.params.postId });
        res.json(chats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 채팅 메시지 전송
router.post('/', async (req, res) => {
    const { postId, sender, message } = req.body;
    try {
        const newChat = new Chat({ postId, sender, message });
        await newChat.save();
        res.status(201).json(newChat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
