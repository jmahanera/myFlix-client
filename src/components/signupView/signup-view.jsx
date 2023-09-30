import React, { useState } from 'react';

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleSubmit = () => {};

  return (
  <form onSubmit={handleSubmit}>
  <label>
  Username:
  <input
  type="text"
  placeholder="Username"
  value={props.username}
  onChange={(e) => props.setUsername(e.target.value)}
  required
/>

<input
  type="password"
  placeholder="Password"
  value={props.password}
  onChange={(e) => props.setPassword(e.target.value)}
  required
/>

<input
  type="email"
  placeholder="Email"
  value={props.email}
  onChange={(e) => props.setEmail(e.target.value)}
  required
/>

<input
  type="text"
  placeholder="Birth Date"
  value={props.birthDate}
  onChange={(e) => props.setBirthday(e.target.value)}
  required
/>
      </label>
      <label>
  BirthDate:
  <input
    type="date"
    value={birthDate}
    onChange={(e) => {
      const formattedDate = e.target.value; 
      setBirthDate(formattedDate);
    }}
    required
  />
</label>
      <button type="submit">Submit</button>
    </form>
  );
};