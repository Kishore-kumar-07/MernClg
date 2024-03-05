const mongoose = require("mongoose")

const schema =new mongoose.Schema(
{
    amt:{
        type:Number
    },
    category:{
        type:String
    },
    date:{
        type:String
    }


}


)


const expense = mongoose.model("expenseModal",schema);



module.exports = {expense}
