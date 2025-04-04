import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../../../css/member.css';

function SignUpForm() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();
        const data = {
            email,
            name,
            password,
            phone,
            status: 'PENDING',
        };

        try {
            const response = await axios.post(
                'http://localhost:8080/signUp',
                data
            );
            if (response.status === 200 || response.status === 201) {
                alert('회원가입 신청이 완료되었습니다.');
                navigate('/');
            } else {
                alert('회원가입 신청 실패: ' + response.data.message);
            }
        } catch (error) {
            alert('서버와의 연결 오류');
            // console.error(error);
        }
    };

    return (
        <form onSubmit={signUp} className="signup-form">
            <div className="item">
                <label>이메일</label>
                <input
                    type="email"
                    placeholder="이메일을 입력하세요"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="item">
                <label>이름</label>
                <input
                    type="text"
                    placeholder="이름을 입력하세요"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="item">
                <label>휴대폰 번호</label>
                <input
                    type="text"
                    placeholder="휴대폰 번호를 입력하세요"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>

            <div className="item">
                <label>비밀번호</label>
                <input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button type="submit">가입 신청</button>
        </form>
    );
}

export default SignUpForm;
