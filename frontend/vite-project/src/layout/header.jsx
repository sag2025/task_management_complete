
import {useNavigate} from "react-router-dom";
function Header()
{ 
  const navigate=useNavigate();

  function show_login()
  {
     navigate("login")
  }

  function show_signup()
  {
     
    navigate("signup")

  }

  return(<div id="header" style={{backgroundColor:"rgba(22, 23, 39, 0.73)",width:"100%",height:150,display:"flex",flexDirection:"row",justifyContent:"space-evenly",alignItems:"center"}}>
   
   <button id="login" onClick={show_login} style={{width:100,height:75,fontSize:30,}}>login</button>
   <button id="signup" onClick={show_signup} style={{width:100,height:75,fontSize:30,}}>signup</button>
   
  </div>);
}

export default Header;