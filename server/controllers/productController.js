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
        const del = makeFilterObject(req.query);
        try{
            const product = await Product.deleteOne(del);
            sendRes(res,product,200);
        }catch(err){
            sendRes(res,err,400,true);
        }}

