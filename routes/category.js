/// routes/category.js
const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth');

// Create a new category
router.post('/', auth, async (req, res) => {
    const { name, description } = req.body;
    try {
        const category = new Category({
            name,
            description
        });
        const savedCategory = await category.save();
        res.json(savedCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ msg: 'Category not found' });
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a category
router.put('/:id', auth, async (req, res) => {
    const { name, description } = req.body;
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ msg: 'Category not found' });

        category.name = name || category.name;
        category.description = description || category.description;

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a category
router.delete('/:id', auth, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ msg: 'Category not found' });

        await category.remove();
        res.json({ msg: 'Category removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

