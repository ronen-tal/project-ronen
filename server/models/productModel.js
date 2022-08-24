const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'you must enter a product name'],
            // trim: true, no need to put trim on name can do faluts 
            minlength: [1, 'please provide non empty name'],
            maxlength: [50, "name can't be longer than 20"],
            unique: true,
        },

        price: {
            type: Number,
            required: [true, 'you must enter a product price'],
            min: 1,
        },

        category: {
            type: String,
            enum: {
            values: ['Lehenga Choli', 'Jewellery', 'Saree','Sherwanis', 'general'],
            message:
                    "category must be: 'Lehenga Choli', 'Jewellery', 'Saree','Sherwanis', 'general'",
            },
            default: 'general',
        },

        color:{
            type: String,
            enum: {
                values: ['red', 'blue', 'aque','brown', 'coral pink','camo green','gray','light blue','light purpel'],
                message:
                "category must be: 'red', 'blue', 'aque','brown', 'coral pink','camo green','gray','light blue','light purpel'",
                },
                default: 'general',
        },

        size:{
            type: String,
            enum: ['small', 'medium', 'large'],
            default: 'medium',
        },
        images:{
            type: [String],
            // required: true, beacuse we have defult we dont need required
            default: ["https://i.pinimg.com/originals/96/af/7b/96af7babdccc560c51f6837524472408.jpg"],

        }
    },
);
    
    const Product = mongoose.model('products', productSchema);
    module.exports = Product;