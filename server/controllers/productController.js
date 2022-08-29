const mongoose = require("mongoose");


const Product = require("../models/productModel");
// const product = require("../models/productModel");
const {sendRes} = require("../helpers/sendRes"); 
const { makeFilterObject } = require("../helpers/makeFilterObject");


module.exports.createNewProduct = async (req,res) =>{
    try{
        const{name,price,images,category,color,size} = req.body;
        const newProduct = await Product.create({
        name,
        price,
        category,
        color,
        size,
        images,
    });
    sendRes(res,newProduct,201);
    }catch(err){
        sendRes(res,err,400,true);
    }
}

module.exports.getAllProducts = async (req,res) =>{
const filterObject = makeFilterObject(req.query);
    try{
        // const{name,price,images,category,color,size} = req.params;
        const product = await Product.find(filterObject);
    sendRes(res,product,200);
    }catch(err){
        sendRes(res,err,400,true);
    }}


    module.exports.deleteProduct = async (req,res) =>{
        const {id} = req.body;
        const del = makeFilterObject(id);
        try{
            const product = await Product.deleteOne(del);
            sendRes(res,product,200);
        }catch(err){
            sendRes(res,err,400,true);
        }}

module.exports.getProductById = async (req,res) => {
    const {id} = req.params;
    try{
        const product = await Product.find(id);
        if(!product) throw new Error ("id dose not exsit")
        sendRes(res,product,200);
    }catch(err){
        sendRes(res,err,400,true);
    }
}


module.exports.deleteProductById = async (req,res) => {
    const {id} = req.params;
    try{
         await Product.findByIdAndDelete({id});
        sendRes(res,{},204); // {} empty object allow as to delete by id witout using nall
    }catch(err){
        sendRes(res,err,400,true);
    }
};

module.exports.checkValidId = (req,res,next)=>{   //middelware for checking id inside get and delete route
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        const error = {message:"invalid id"};
        sendRes(res,error,400,true);
        return
    }
    next()
};

module.exports.updateProduct =  async (req,res) => {
    const {id} = req.params;
    // delete body["id"]
    try{
        const product =await Product.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
    });
    // const products = await Product.find({category:"Jewellery"}) // if we want to change to all category the price or somthing else 
    // products.forEach(pr =>{
    //     pr.price = 1;
    //     pr= pr.save({
    //         runValidators:true,
    //     })
    // })
        sendRes(res,product,200);
    }catch(err){
        sendRes(res,err,400,true);
    }
}; 









