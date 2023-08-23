import { useState } from 'react';

const API_BASE = "http://localhost:3001";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch(API_BASE + '/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-type': 'application/json' }
    });
    if (response.status !== 200) {
      alert('Login failed.');
    } else {
      alert('Login successful');
    }
  };


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