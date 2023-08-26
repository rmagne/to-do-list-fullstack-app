import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "./userContext";


const API_BASE = "http://localhost:3001";

function Header() {
    const {setUserInfo, userInfo} = useContext(UserContext);
    useEffect(() => {
        fetch(API_BASE + '/profile', {
            credentials: 'include'
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });
    }, [setUserInfo]);

    function logout() {
        fetch(API_BASE + '/logout', {
            credentials: 'include',
            method: 'POST'
        });
        setUserInfo(null);
    };


    const username = userInfo?.username;

    return (
        <header>
            <div className="nav-div">
                <Link className="logo" to="/">MyTodolist</Link>
                <nav className="navbar">
                    {username && (
                        <>
                            <a onClick={logout} href="/">Logout</a>
                        </>
                    )}
                    {!username && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;