const express = require('express');
const router = express.Router();

const {
    getEntries, 
    createEntry,
    updateEntry,
    deleteEntry
} = require('../controllers/entriesController.js')

router.get( '/', getEntries)

router.post('/create', createEntry)

router.put('/modify/:id', updateEntry)

router.delete('/delete/:id', deleteEntry)

module.exports = router;