const Entries = require('../models/Entries.js')

const express = require('express');
const router = express.Router();

router.get( '/', async (req, res) => {
    let entries = []
    try{
        entries = await Entries.find().sort( { 'date': -1 } )
    }catch(err){
        return res.status(400).json({success:false})
    }
    
    res.status(200).json({success:true, payload: entries})
})

router.post('/create', async (req, res) => {
    const {items} = req.body;
    const date = new Date().toLocaleDateString();

    try{
        const found = await Entries.find({ date: date} )
        if( found.length === 0 ){
            await Entries.create({date, items})
        }else{
            return res.status(200).json({ success: true, message: `Already have an entry for the date: ${date}`})
        }
        
    }catch(err){
        return res.status(400).json({success:false})
    }
    
    res.status(201).json( { success: true })
})

router.put('/modify/:id', async (req, res) => {
    const {id} = req.params
    const { items: newBody} = req.body
    
    try{
        await Entries.findByIdAndUpdate({_id: id}, {items: newBody})
    }catch(err){
        res.status(400).json({success: false})
    }
    res.status(200).json({success: true, message: `Updated item with id: ${id}`})
} )

router.delete('/delete/:id', async (req, res) => {
    const {id} = req.params;
    // console.log(id);
    try{
        await Entries.findByIdAndDelete(id)
    }catch{
        return res.status(400).json({success: false})
    }
    res.status(200).json({success: true, message: `Removed item with id: ${id}`});

})

module.exports = router;