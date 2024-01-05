const express = require('express')
const app = express()
const mongoose = require('mongoose')

const entriesRouter = require('./routes/entriesRouter.js')

const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then( () => {
    console.log("Connected to MongoDB database!")
})

app.use(express.json())

app.use('/entries', entriesRouter)



app.listen(5005, () => {
    console.log('Server is listening at port 5005')
})


// app.get('/api/products', (req, res) =>{
//     const newProducts = products.map((product) => {
//         const { id, name, image } = product
//         return {id, name, image}
//     })
//     res.json(newProducts)
// })


// app.get('/api/products/:productID', (req, res) =>{
//     const {productID} = req.params
//     const product = products.find((product) => product.id === Number(productID))
//     if(!product){
//         res.status(404).send("<h3>Product not found</h3>")
//     }
//     else{
//         res.status(200).json(product)
//     }
// })








