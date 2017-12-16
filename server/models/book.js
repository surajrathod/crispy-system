
const mongoose=require('mongoose');

const bookSchema=mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            require:true
        },
        author:{
            type:String,
            trim:true,
            require:true
        },
        pages:Number,
        price:Number,
        store:{
            type:[],
            default:null
        }
    }
)

const Book=mongoose.model('Book',bookSchema);

module.exports={Book};