import Item from '../models/itemModel.js';

export const createItem = async (req, res) =>{
    try {
        const newItem= await Item.create(req.body);
        res.status(201).json(newItem);        
        console.log('item', newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error('Error creating item:', error);
    }
}

export const getItem = async (req, res) =>{
    try {
        const newItem= await Item.create(req.body);
        res.status(201).json(newItem);        
        console.log('item', newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error('Error creating item:', error);
    }
}


