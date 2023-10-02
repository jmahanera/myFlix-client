
import React, { useState } from "react";
import { useDispatch } from "react-dom";

export const LoginView = ({ }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

const dispatch = useDispatch();
  

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
    .then((response) => response.json()) //changes response to a json object so it can extract the jwt
      .then((data) => {
        if (data.user) {
          dispatch(setUser({ user: data.user, token: data.token }));
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
        } else {
          alert("Incorrect username and/or password, or user doesn't exist");
        }
      })
      .catch((e) => {
        alert("Something went wrong with login");
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
