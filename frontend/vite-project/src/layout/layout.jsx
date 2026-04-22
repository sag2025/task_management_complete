import {Outlet} from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

function Layout()
{
  return(
    <>
      <Header/>

      <main style={{ flex: 1 }}>
        <Outlet/>
      </main>

      <Footer/>
    </>
  );
}

export default Layout;