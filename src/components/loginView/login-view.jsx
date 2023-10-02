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

    fetch("https://primemovies-39075872fbeb.herokuapp.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
   .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
         if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch(error => {
   console.error("Error:", error);
   setLoginMessage("An error occurred during login. Check console");
})
    .catch(error => {
      console.error("Error:", error);
      setLoginMessage("An error occurred during login.");
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
