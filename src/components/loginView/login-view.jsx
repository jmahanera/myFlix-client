import React, { useState } from "react";

// LoginView component for rendering the login form
export const LoginView = ({ onLoggedIn }) => {
  // State to manage the username, password, and login message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare data to be sent to the server
    const data = {
      username: username,
      password: password
    };

    console.log("Data to be sent to server: ", data);

    // Send a POST request to the login endpoint
    fetch("https://primemovies-39075872fbeb.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((res) => {
        console.log("Response: ", res);
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
        setLoginMessage("Login failed. Please check your credentials.");
      });
  };

  console.log("Rendering login view...");

  return (
    <div>
      {/* Login form */}
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

      {/* Display login message if available */}
      {loginMessage && <p>{loginMessage}</p>}
    </div>
  );
};
