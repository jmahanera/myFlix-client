import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");


  const handleSubmit = (event) => {
  event.preventDefault();

  const data = {
    access: username,
    secret: password
  };

  console.log("Login request data: ", data);

  fetch("https://primemovies-39075872fbeb.herokuapp.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((response) => {
      console.log("Response status: ", response.status);
      return response.json();
    })
    .then((data) => {
      console.log("Response data: ", data);
      // Rest of code for handling the response
    })
    .catch((error) => {
      console.error('Error:', error);
      setLoginMessage('Login error. Please try again.');
    });
};


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {loginMessage && <p>{loginMessage}</p>}
    </div>
  );
};
