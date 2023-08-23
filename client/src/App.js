import Todos from "./todos.js";
import Login from "./login.js";
import Register from "./register.js";
import Layout from "./layout.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {


    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                <Route index element={<Todos />} />
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
