import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", {
        email,
        password,
      });

      const { token } = response.data;
      if (!token) {
        setError("Token is missing.");
        return;
      }

      localStorage.setItem("access_token", token);

      try {
        // jwtDecode 오류 처리 추가
        const decodedToken = jwtDecode(token);
        const { sub: decodedEmail, role } = decodedToken;

        localStorage.setItem("email", decodedEmail);
        localStorage.setItem("role", role);

        setError("");

        navigate("/list");
      } catch (decodeError) {
        console.error("Token decoding error:", decodeError);
        setError("Invalid token format.");
      }
    } catch (err) {
      console.log("로그인 실패:", err);
      setError("Invalid credentials!");
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <LoginContainer>
      <Form onSubmit={handleLogin}>
        <h2>Login</h2>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SignupLink onClick={handleSignupRedirect}>
          Don't have an account? Sign up
        </SignupLink>
      </Form>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  margin: 10px 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const SignupLink = styled.p`
  color: #007bff;
  text-align: center;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default Login;
