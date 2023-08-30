import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './userContext';


const BackendPort = process.env.PORT || 3001;


const API_BASE = `http://localhost:${BackendPort}`;

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch(API_BASE + '/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-type': 'application/json' },
      credentials: 'include'
    });
    if (response.ok) {
      response.json().then(userInfo => {
      setUserInfo(userInfo);
        setRedirect(true);
      })
    } else {
      alert('wrong credentials')
    };
  };

  if (redirect) {
    return <Navigate to={'/todos'} />
  }
  return (
    <div className="login-form-div">
      <form className="login-form" onSubmit={login}>
        <p>Username</p>
        <input
          type="text"
          placeholder="Type your username"
          className="form-input"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <p>Password</p>
        <input
          type="password"
          placeholder="Type your password"
          className="form-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="submit-form-button"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;