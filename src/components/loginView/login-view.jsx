import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  // Rest of the component logic


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
      .then((response) => response.json()) // Changes response to a JSON object
      .then((data) => {
        if (data.user) {
          onLoggedIn(data.user, data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
        } else {
          alert("Incorrect username and/or password, or user doesn't exist");
        }
      })
  }
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
