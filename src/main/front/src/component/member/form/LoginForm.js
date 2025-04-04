import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { HttpHeadersContext } from '../../context/HttpHeadersProvider';

import '../../../css/member.css';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { auth, setAuth } = useContext(AuthContext);
    const { setHeaders } = useContext(HttpHeadersContext);

    const login = async (e) => {
        e.preventDefault();

        const data = {
            email,
            password,
        };

        try {
            const response = await axios.post(
                'http://localhost:8080/login',
                data
            );

            if (response.status === 200 || response.status === 201) {
                alert('로그인 하셨습니다.');

                localStorage.setItem('CL_access_token', response.data.token);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('id', response.data.id);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('name', response.data.name);

                setAuth(response.data.email);
                setHeaders({ Authorization: `Bearer ${response.data.token}` });
                navigate('/home');
            } else {
                alert('로그인 실패: ' + response.data.message);
            }
        } catch (error) {
            // console.error('로그인 오류:', error);
            // console.log('에러 응답 데이터:', error.response?.data);
            if (error.response) {
                const errorMessage =
                    error.response.data?.message || '잘못된 비밀번호입니다.';
                alert(errorMessage);
            } else {
                alert('서버 오류 발생: 관리자에게 문의하세요.');
            }
        }
    };

    useEffect(() => {
        if (auth) {
            navigate('/home');
        }
    }, []);

    return (
        <form onSubmit={login} className="txt-a-c">
            <h1 className="logo-spacing">Offime</h1>

            <div className="input-spacing">
                <input
                    type="email"
                    className="input-form"
                    placeholder="이메일을 입력하세요"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="input-spacing">
                <input
                    type="password"
                    className="input-form"
                    placeholder="비밀번호를 입력하세요"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="login-container">
                <button type="submit" className="button-spacing">
                    이메일로 로그인
                </button>
            </div>
            <div className="button-container">
                <div className="divider-line"></div>

                <Link
                    to={'/signUp'}
                    className="mlr-a btn btn-pm btn-md button-spacing"
                >
                    회원가입
                </Link>
            </div>
        </form>
    );
}

export default LoginForm;
