import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <div className="nav-div">
                <Link className="logo" to="/">MyTodolist</Link>
                <nav className="navbar">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;