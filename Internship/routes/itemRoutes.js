import express from 'express';
import mongoose from 'mongoose'; 
import Item from '../models/item.model.js';

const router = express.Router();

// GET: Retrieve all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST: Create a new item
router.post('/', async (req, res) => {
    const { name, quantity, price } = req.body;
    const newItem = new Item({ name, quantity, price });

    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT: Update an existing item by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, quantity, price } = req.body;

    try {
       
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        
        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { name, quantity, price },
            { new: true }
        );
        
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
