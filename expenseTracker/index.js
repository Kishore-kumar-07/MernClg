const mongoose = require("mongoose")

const express = require("express")

const bodyParser = require("body-parser")

const {expense} = require("./schema.js"); 

const cors = require("cors")

const app = express()

app.use(bodyParser.json())

const port = process.env.PORT ||  8000;

var dbLinker ="mongodb+srv://Kishore:bk_sensei@mern.d6qyuyj.mongodb.net/ExpenseTrackerDB?retryWrites=true&w=majority&appName=Mern"



connectToDb =async ()=>{
    await mongoose.connect(dbLinker);
    app.listen( port,()=> {
   console.log(`Running on port ${port}.... `)
 })
 }  


app.post("/add",async (request,response)=>{
    
 try {await 
    expense.create(
    {
    "amt":request.body.amt,
    "category":request.body.category,
    "type":request.body.type
})
   response.status(200).json({
     "status":"added"
   })}
   catch(err){
    response.status(500).json({
        "status":"sefug"
    })
   }

})


app.get('/get',async (request,response)=>{
  const exData =await expense.find();
  console.log(exData)
  response.status(200).json({
    "status":exData
  })
})

app.delete("/delete/:id",async (request,response)=>{
try
   { const exId = await expense.findById(request.params.id);
    if(exId){
        await expense.findByIdAndDelete(exId);
        response.status(200).json({
            "status":"deleted Successfully"
        })
    }
    else{
        response.status(404).json({
            "status":"element Not Found"
        })
    }
      }
      catch(err){
        response.status(500).json({
            "Stadgtus":err

        })
      }
})


app.patch("/update/:id",async (request,response)=>{
   try{
     const exId = await expense.findById(request.params.id)
     if(exId){
        await expense.findByIdAndUpdate(exId,{
            "amt":60000,
            "category":"work",
            "date":"2004"
        })
        response.status(200).json({
            "status":"Success"
        })
     }
     else{
        response.statusCode(404).json({
            "status":"element Not Found"
        })
     }
    }catch(err){
        response.status(500).json({
            "status":"update Unsucessful"
        })
    }
})

connectToDb();
