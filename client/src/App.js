import Welcome from "./welcome.js";
import Login from "./login.js";
import Register from "./register.js";
import Layout from "./layout.js";
import UserContextProvider from "./userContext.js";
import UserTodos from "./usertodo.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {


    return (
        <UserContextProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Welcome />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/todos" element={<UserTodos/>}/>
                    </Route>
                </Routes>
            </Router>
        </UserContextProvider>
    );
}

export default App;
