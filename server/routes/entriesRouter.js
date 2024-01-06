const express = require('express');
const router = express.Router();

const {
    getEntries, 
    getOneEntry,
    createEntry,
    updateEntry,
    deleteEntry
} = require('../controllers/entriesController.js')

router.get( '/', getEntries)

router.get('/:id', getOneEntry)

router.post('/create', createEntry)

router.put('/modify/:id', updateEntry)

router.delete('/delete/:id', deleteEntry)

module.exports = router;