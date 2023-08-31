import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "./userContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


const API_BASE = 'https://todolist-app-p9j6.onrender.com:10000';

function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);
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
            <nav>
            <input type="checkbox" id="check"/>
      <label for="check" class="checkbtn">
      <FontAwesomeIcon icon={faBars} />
      </label>
                <a className="logo" href="/">MyTodolist</a>
                <ul>
                    {username && (
                        <li>
                            <>
                                <a onClick={logout} href="/">Logout</a>
                            </>
                        </li>
                    )}
                    <li>
                        {!username && (
                            <>
                                <Link to="/login">Login</Link>
                            </>
                        )}
                    </li>
                    <li>
                        {!username && (
                            <>
                                <Link to="/register">Register</Link>
                            </>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );


}

export default Header;