import {useState} from 'react';

const BackendPort = process.env.PORT || 3001;


const API_BASE = `http://localhost:${BackendPort}`;

function Register() {

    const [newUser, setNewUser] = useState("");
    const [newPassword, setNewPassword] = useState("");

    async function register(ev) {
      ev.preventDefault();
       const response = await fetch(API_BASE + '/register', {
        method: 'POST',
        body: JSON.stringify({newUser, newPassword}),
        headers: {'Content-type': 'application/json'}
      });
      if(response.status !== 200) {
        alert('Registration failed.');
      } else {
        alert('Registration successful');
      }
    }

    return (
      <div className="login-form-div">
        <form className="login-form" onSubmit={register}>
          <p>Username</p>
          <input
            type="text"
            placeholder="Type your username"
            className = "form-input"
            value={newUser}
            onChange={e => setNewUser(e.target.value)}
          />
          <p>Password</p>
          <input
            type="password"
            placeholder="Type your password"
            className = "form-input"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <button
          className="submit-form-button"
          >
          Register
          </button>
        </form>
      </div>
    );
  }
  
  export default Register;