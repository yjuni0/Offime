import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

      const { token, email: userEmail, role } = response.data;

      if (!token || !userEmail || !role) {
        setError("Token, email, or role is missing.");
        return;
      }

      // 토큰과 이메일, role을 로컬 스토리지에 저장
      localStorage.setItem("access_token", token); // 토큰 저장
      localStorage.setItem("email", userEmail); // 이메일 저장
      localStorage.setItem("role", role); // role 저장

      setError(""); // 에러 초기화
      navigate("/list"); // 로그인 성공 후 이동
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
