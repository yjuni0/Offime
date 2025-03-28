import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { HttpHeadersContext } from '../../context/HttpHeadersProvider';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { auth, setAuth } = useContext(AuthContext);
    const { headers, setHeaders } = useContext(HttpHeadersContext);

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
                navigate('/main');
            } else {
                alert('로그인 실패: ' + response.data.message);
            }
        } catch (error) {
            if (error.response?.status === 401) {
                alert('비활성화 된 직원입니다.');
            } else if (
                error.response.data.message == '가입 승인 대기중입니다.'
            ) {
                alert('가입 승인 대기중입니다.');
            } else {
                alert(
                    error.response?.data?.error ||
                        error.response?.data ||
                        '로그인 실패'
                );
            }
            console.error('로그인 오류:', error);
        }
    };

    useEffect(() => {
        if (auth) {
            navigate('/main');
        }
    }, []);

    return (
        <form onSubmit={login} className="txt-a-c">
            <div className="mt_xlg">
                <input
                    type="email"
                    className=""
                    placeholder="이메일을 입력하세요"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mt_xlg pb_lg">
                <input
                    type="password"
                    className=""
                    placeholder="비밀번호를 입력하세요"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="mlr-a btn btn-pm btn-md">
                이메일로 로그인
            </button>
            <Link to={'/signUp'} className="mlr-a btn btn-pm btn-md">
                회원가입
            </Link>
        </form>
    );
}

export default LoginForm;
