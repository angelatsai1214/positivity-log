const Entries = require('../models/Entries.js')

const getEntries = async (req, res) => {
    // console.log("Get Entry:")
    let entries = []
    try{
        entries = await Entries.find().sort( { 'date': -1 } )
        // console.log(entries)
    }catch(err){
        return res.status(400).json({success:false})
    }
    
    res.status(200).json({success:true, payload: entries})
}

const createEntry = async (req, res) => {
    // console.log("Create Entry:")
    const {items} = req.body;
    const date = new Date().toLocaleDateString();

    try{
        const found = await Entries.find({ date: date} )
        // console.log(found)
        if( found.length === 0 ){
            await Entries.create({date, items})
        }else{
            return res.status(200).json({ success: true, message: `Already have an entry for the date: ${date}`})
        }
        
    }catch(err){
        // console.log(err)
        return res.status(400).json({success:false})
    }
    
    res.status(201).json( { success: true })
}

const updateEntry = async (req, res) => {
    // console.log("Update Entry:")
    const {id} = req.params
    const { items: newBody} = req.body
    
    try{
        const entry = await Entries.findByIdAndUpdate({_id: id}, {items: newBody})
        // console.log(entry)
    }catch(err){
        res.status(400).json({success: false})
    }
    res.status(200).json({success: true, message: `Updated item with id: ${id}`})
} 

const deleteEntry = async (req, res) => {
    const {id} = req.params;
    // console.log(id);
    try{
        await Entries.findByIdAndDelete(id)
    }catch{
        return res.status(400).json({success: false})
    }
    res.status(200).json({success: true, message: `Removed item with id: ${id}`});

}

module.exports = {
    getEntries, 
    createEntry,
    updateEntry,
    deleteEntry
}