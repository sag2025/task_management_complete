const createtaskService=require("../services/services.tasks.create");

async function create_task(req,res)
{
  try {
    
         const body =req.body;
         console.log(body);
         console.log("\n");
         const id=req.user.id;

         const result=await createtaskService(body,id);
         if(result)
         {
         return res.status(201).json({message:"successfully created ",task:result});
         }
        
         return  res.status(500).json({message:"internal error"});
         

  } catch (error) {
     console.log(error.message);
    res.status(500).json({message:"internal error"});
    
  }
}

module.exports= {create_task};