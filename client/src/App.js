import Todos from "./todos.js";
import Header from "./header.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {


    return (
        <Router>
           <Routes>
                <Route index element={
                    <div className="App">
                        <Header />
                        <Todos />
                    </div>
                } />
            </Routes>
        </Router>
    );
}

export default App;
