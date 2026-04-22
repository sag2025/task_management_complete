const taskobj=require("../models/tasks");

async function gettaskService(userid)
{
     const result=await taskobj.getAllTasks(userid);
     console.log(result);
     console.log(typeof result);
     return result;
}

module.exports=gettaskService;