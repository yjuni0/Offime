import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../css/member.css'; // 기존 CSS 파일을 불러옵니다.

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('CL_access_token');

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setErrorMessage('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
            alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await axios.put(
                'http://localhost:8080/member/changePassword',
                {
                    currentPassword,
                    newPassword,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccessMessage('비밀번호가 성공적으로 변경되었습니다.');
            setErrorMessage('');

            // 성공 시 알림 표시 후 마이페이지로 리디렉션
            alert('비밀번호가 성공적으로 변경되었습니다.');
            const userId = localStorage.getItem('id'); // 로그인된 사용자의 ID를 가져옵니다.
            navigate(`/member/${userId}`); // 해당 사용자의 마이페이지로 이동
        } catch (error) {
            setErrorMessage('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
            alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="rounded-box">
            <section className="sec">
                <div className="inner">
                    <h3 className="section-title">비밀번호 변경</h3>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="item">
                            <label>현재 비밀번호</label>
                            <input
                                type="password"
                                className="input-form"
                                placeholder="현재 비밀번호를 입력하세요"
                                required
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                            />
                        </div>

                        <div className="item">
                            <label>새 비밀번호</label>
                            <input
                                type="password"
                                className="input-form"
                                placeholder="새 비밀번호를 입력하세요"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div className="item">
                            <label>새 비밀번호 확인</label>
                            <input
                                type="password"
                                className="input-form"
                                placeholder="새 비밀번호를 확인하세요"
                                required
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            onClick={handleChangePassword}
                            className="button-spacing"
                        >
                            비밀번호 변경
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default ChangePassword;
