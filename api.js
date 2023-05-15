const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())     

// Initialization route to make sure my API can respond
app.get("/", (req,res) => {
    res.send('NODE IS ALIVE ')

}) 


//Fetching All information associated with my Products MongoDB Model
app.get("/products", async(req,res) => {
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})


// "Fetching products by ID" 
app.get("/products/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})


// (POST METHOD) "Saving a product"
app.post("/product/capture", async(req,res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }

})

// update a product
app.put("/u-products/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: 'cannot find any product with ID ${id}'})
        }
        const updatedProduct = await Product.findByIdAndUpdate(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})


//delete a product
app.delete('/products-delete/:id', async(req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: 'cannot find any product with ID ${id}'})
        }
        res.status(200).json(product);


    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})


const port = 8080
mongoose.set("strictQuery", false)
mongoose.
connect('MongoDB connection string goes here')
.then(() => {
    app.listen(port, () =>{
        console.log('operating on port 8080')
    })
    console.log('connected to MongoDB')
}).catch((error) => {
    console.log(error)
})