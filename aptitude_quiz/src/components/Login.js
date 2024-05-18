import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [userError, setUserError] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3001/check_user', {
            email,
            password
        });
        if(response.data.success){
          props.prop(true)
        }else{
          setUserError("Invalid user !!!!");
        }
    } catch (error) {
        console.error('Error:', error);
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <span className='errorMsg'>{userError}</span>
      <label htmlFor="email">
        Email 
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label htmlFor="rememberMe">
        Remember me &nbsp;
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        />
      </label>
      <button type="submit">Login</button>
      <p>
        Not registered yet ? <Link to="/Register">Register here</Link>
      </p>
    </form>
  );
};

export default Login;