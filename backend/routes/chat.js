import express from 'express';
import { Chat } from '../models/Chat.js';
import { authenticateToken } from '../utils/auth.js';
import { generateAIResponse } from '../utils/ai.js';

const router = express.Router();

// Middleware to verify token
router.use(authenticateToken);

// Create new chat
router.post('/create', async (req, res) => {
  try {
    const { title } = req.body;
    const chat = new Chat({
      userId: req.userId,
      title: title || 'New Chat',
      messages: [],
    });

    await chat.save();

    res.status(201).json({
      message: 'Chat created',
      chat,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all chats for user
router.get('/list', async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.userId })
      .sort({ updatedAt: -1 })
      .select('_id title createdAt updatedAt');

    res.json({ chats });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single chat
router.get('/:id', async (req, res) => {
  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId: req.userId });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.json({ chat });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete chat
router.delete('/:id', async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.json({ message: 'Chat deleted', chat });
  } catch (error) {
    console.error('Delete chat error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update chat title
router.put('/:id', async (req, res) => {
  try {
    const { title } = req.body;
    const chat = await Chat.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title },
      { new: true }
    );

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.json({ message: 'Chat updated', chat });
  } catch (error) {
    console.error('Update chat error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Send message and get AI response
router.post('/:id/message', async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Message content required' });
    }

    const chat = await Chat.findOne({ _id: req.params.id, userId: req.userId });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Add user message
    chat.messages.push({
      role: 'user',
      content,
      timestamp: new Date(),
    });

    // Generate AI response
    const aiResponse = await generateAIResponse(chat.messages);

    // Add AI message
    const aiMessage = {
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
    };

    chat.messages.push(aiMessage);

    // Auto-generate title if this is the first message
    if (chat.messages.length === 2) {
      chat.generateTitleFromFirstMessage();
    }

    await chat.save();

    res.json({
      message: 'Message sent',
      messages: chat.messages,
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Regenerate last message
router.post('/:id/regenerate/:messageId', async (req, res) => {
  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId: req.userId });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Find the message index
    const messageIndex = chat.messages.findIndex(m => m._id.toString() === req.params.messageId);
    if (messageIndex === -1 || messageIndex === 0) {
      return res.status(400).json({ message: 'Invalid message' });
    }

    // Remove the old AI response and all messages after it
    chat.messages = chat.messages.slice(0, messageIndex);

    // Generate new AI response
    const aiResponse = await generateAIResponse(chat.messages);

    const aiMessage = {
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
    };

    chat.messages.push(aiMessage);
    await chat.save();

    res.json({
      message: 'Message regenerated',
      messages: chat.messages,
    });
  } catch (error) {
    console.error('Regenerate error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
