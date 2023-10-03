// login-view.jsx
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

    console.log("Data to be sent to server: ", data);

    fetch("https://primemovies-39075872fbeb.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Login failed. Please check your credentials.");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Response data: ", data);

        // Update UI or store tokens as needed
        const { user, token } = data;
        onLoggedIn(user, token);
      })
      .catch((error) => {
        console.error("Error:", error.message);
        setLoginMessage("Login error. Please try again.");
      });
  };

  console.log("Rendering login view...");

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
