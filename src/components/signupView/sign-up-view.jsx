import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"; // Import Button from react-bootstrap

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fullName, setFullName] = useState(""); // New state to store the full name

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Split the full name into first name and last name
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    const data = {
      username: username,
      password: password,
      email: email,
      birthdate: birthdate,
      firstName: firstName,
      lastName: lastName,
    };

    fetch("https://primemovies-39075872fbeb.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setIsSubmitting(false);
        if (response.ok) {
          alert("Signup successful");
          window.location.reload();
        } else {
          alert("Signup failed");
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error("Error signing up:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* New input field for full name */}
      <Form.Group controlId="formFullName">
        <Form.Label>Full Name:</Form.Label>
        <Form.Control
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={3}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBirthdate">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
        />
      </Form.Group>

      {/* Use Button component from react-bootstrap */}
      <Button variant="primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};
