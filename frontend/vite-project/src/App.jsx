
import Header from   "./layout/header.jsx";
import Footer from  "./layout/footer.jsx";
import Login from   "./layout/login.jsx";
import SignUp from "./layout/signup.jsx";
import {Routes,Route} from "react-router-dom";
import Layout from "./layout/layout.jsx";
import Tasks from "./layout/usertasks.jsx";
import CreateTask from "./layout/createtask.jsx";
import TaskDetails from "./layout/taskdetails.jsx";
import UpdateTask from "./layout/updatetask.jsx";


function App()
{  
  const userid=localStorage.getItem("userId");
  return(
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Login/>}/>
      <Route path="login" element={<Login/>}/>
    <Route path="signup" element={<SignUp/>}/>
    <Route path="tasks" element={<Tasks/>}/>
    <Route path="createtasks" element={<CreateTask/>}/>
    <Route path="tasks/:id" element={<TaskDetails/>}/>
    <Route path="tasks/:id/edit" element={<UpdateTask/>}/>

      </Route>
    </Routes>

  );

}
export default App;