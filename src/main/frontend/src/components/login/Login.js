import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // JWT 디코딩을 위한 라이브러리

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 백엔드에 로그인 요청
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      // 서버 응답에서 토큰 받기
      const { token } = response.data;
      if (!token) {
        setError("Token is missing.");
        return;
      }

      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("access_token", token);

      // JWT 디코딩하여 사용자 정보 확인

      const decodedToken = jwtDecode(token);
      const { sub: decodedUsername, role } = decodedToken;

      // 사용자 정보와 권한을 로컬 스토리지에 저장
      localStorage.setItem("username", decodedUsername);
      localStorage.setItem("role", role); // role 값 저장

      setError(""); // 로그인 성공 후 오류 메시지 초기화

      navigate("/list");
    } catch (err) {
      console.log("로그인 실패:", err); // 여기서 에러만 로그로 출력하고, 토큰 정보는 출력하지 않음
      setError("Invalid credentials!"); // 로그인 실패 시 오류 메시지
    }
  };

  const handleSignupRedirect = () => {
    // 회원가입 페이지로 리디렉션
    navigate("/signup");
  };

  return (
    <LoginContainer>
      <Form onSubmit={handleLogin}>
        <h2>Login</h2>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
