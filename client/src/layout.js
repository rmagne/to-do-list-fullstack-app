import Header from "./header.js";
import {Outlet} from "react-router-dom";

function Layout () {
    return (
        <div className="App">
          <Header />
          <Outlet />
        </div>
    );
}

export default Layout;