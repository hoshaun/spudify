import React, { useState } from "react";
import axios from "axios";

import 'components/Login.scss';
import Button from "./Button";
import { useCookies } from "react-cookie";

export default function Login(props) {
  const [cookies, setCookie] = useCookies(['username'])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = function(action) {
    setError('');

    return axios.post(`/api/users/${action}`, { 
        username: username, 
        password: password
      })
      .then(res => {
        setCookie('username', res.data);
      })
      .catch(err => {
        setError(err.response.data);
      });
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      <div className="fields">
        <div className="username-field">
          <h2 className="username-label">Username: </h2>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="password-field">
          <h2 className="password-label">Password: </h2>
          <input
            placeholder="Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="error">{error}</div>
      <div className="buttons">
        <Button confirm onClick={() => handleSubmit('login')} >Login</Button>
        <Button confirm onClick={() => handleSubmit('create')} >Register</Button>
      </div>
    </div>
  );
}