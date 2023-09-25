import React, { useState } from "react";

export const LoginView = () => {
  const [username, setUsername] = useState("");  // Declare state for username
  const [password, setPassword] = useState("");  // Declare state for password

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      access: username,
      secret: password
    };

    fetch("https://primemovies-39075872fbeb.herokuapp.com/account/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Login failed");
    }
    console.log("Login successful!");
  })
  .catch(error => {
    console.error("Error during login:", error);
  });
};

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
      </label>
      <button type="submit">
        Submit
      </button>
    </form>
  );
};
