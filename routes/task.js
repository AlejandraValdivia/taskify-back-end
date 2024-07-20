const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Create a new task
router.post('/', auth, async (req, res) => {
    const { taskName, description, location, category, date, status, address, price } = req.body;
    try {
        const task = new Task({
            taskName,
            description,
            location,
            category,
            date,
            status,
            address,
            price,
            userId: req.user.id
        });
        const savedTask = await task.save();
        res.json(savedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all tasks
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find().populate('userId');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a task by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('userId');
        if (!task) return res.status(404).json({ msg: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a task
router.put('/:id', auth, async (req, res) => {
    const { taskName, description, location, category, date, status, address, price } = req.body;
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        if (task.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        task.taskName = taskName || task.taskName;
        task.description = description || task.description;
        task.location = location || task.location;
        task.category = category || task.category;
        task.date = date || task.date;
        task.status = status || task.status;
        task.address = address || task.address;
        task.price = price || task.price;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        if (task.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        await task.remove();
        res.json({ msg: 'Task removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

