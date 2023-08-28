import Header from "./header.js";
import {Outlet} from "react-router-dom";

function Layout () {
    return (
        <div className="App">
          <Header />
          <div className="Outlet">
            <Outlet />
          </div>     
        </div>
    );
}

export default Layout;