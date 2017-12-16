const mongoose=require('mongoose');

const StoreSchema=mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        address:{
            type:String
        },
        phone:Number
      
    }
);

const Store=mongoose.model('Store',StoreSchema);

module.exports={Store};