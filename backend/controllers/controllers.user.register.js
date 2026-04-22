const user_register=require("../services/services.user.register");

async function register(req,res)
{
    try {
        const valid_register= await user_register(req.body);
        //console.log(req.body);

        if(valid_register)
        {
          res.status(201).json({message:"success"});
          //no content to send
          //no modification is done

        }
        else 
        {
         // console.log("hii")
          res.status(500).json({message:"database failure"});
          //database error
        }
    } catch (error) {
        res.status(500).json({message:"internal error"});
        
    }
}
module.exports={register};