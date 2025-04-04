import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import LeaveBtn from '../button/LeaveBtn';

function MemberDetail() {
    const { id } = useParams();
    const [member, setMember] = useState({});
    const [role, setRole] = useState('');
    const [team, setTeam] = useState('');
    const [userRole, setUserRole] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [loggedInUserId, setLoggedInUserId] = useState('');

    useEffect(() => {
        fetchMemberData();
        fetchUserRole();
        fetchLoggedInUserId();
    }, []);

    const fetchLoggedInUserId = () => {
        const storedId = localStorage.getItem('id');
        setLoggedInUserId(storedId || '');
    };

    const fetchUserRole = () => {
        const storedRole = localStorage.getItem('role');
        setUserRole(storedRole || 'USER');
    };

    const fetchMemberData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/member/${id}`
            );
            console.log('직원 데이터:', response.data);
            setMember(response.data);
            setRole(response.data.role);
            setTeam(response.data.team || '');
            setProfileImageUrl(response.data.profileImageUrl);
        } catch (error) {
            console.error('Error fetching member data:', error);
        }
    };

    const handleRoleChange = async (e) => {
        const newRole = e.target.value;
        setRole(newRole);

        try {
            await axios.put(`http://localhost:8080/member/${id}/role`, {
                role: newRole,
            });
            alert('직급이 변경되었습니다.');
        } catch (error) {
            console.error('Error updating role:', error);
            alert('직급 변경에 실패했습니다.');
        }
    };

    const handleTeamChange = async (e) => {
        const newTeam = e.target.value;
        setTeam(newTeam);

        try {
            await axios.put(`http://localhost:8080/member/${id}/team`, {
                team: newTeam,
            });
            alert('부서가 변경되었습니다.');
        } catch (error) {
            console.error('Error updating team:', error);
            alert('부서 변경에 실패했습니다.');
        }
    };

    const getTeamStatus = (teamCode) => {
        switch (teamCode) {
            case 'A':
                return '미배정';
            case 'B':
                return '경영팀';
            case 'C':
                return '인사팀';
            case 'D':
                return '업무팀';
            default:
                return '미배정';
        }
    };

    const handleImageUpload = async (e) => {
        if (loggedInUserId !== id) {
            alert('다른 사용자의 프로필 이미지는 수정할 수 없습니다.');
            return;
        }

        const formData = new FormData();
        const file = e.target.files[0];

        if (!file) {
            alert('파일을 선택하세요.');
            return;
        }

        formData.append('files', file);

        try {
            const response = await axios.post(
                `http://localhost:8080/member/${id}/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            setProfileImageUrl(
                `http://localhost:8080${response.data[0].filePath}`
            );
            alert('이미지가 성공적으로 업로드되었습니다.');

            fetchMemberData();
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('이미지 업로드에 실패했습니다.');
        }
    };

    return (
        <section className="sec">
            <div className="inner">
                <div className="item">
                    <div className="member_info">
                        <div
                            className="profile_picture"
                            onClick={() =>
                                loggedInUserId === id &&
                                document.getElementById('imageUpload').click()
                            }
                        >
                            <img
                                src={
                                    profileImageUrl ||
                                    '/image/member/profile_no_image.jpg'
                                }
                                alt="프로필"
                            />
                            <input
                                id="imageUpload"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleImageUpload}
                            />
                        </div>
                        <div className="member_details">
                            <span className="member_name">{member.name}</span>
                            <span className="member_team">
                                {getTeamStatus(member.team)} &nbsp;
                                {member.workStatus}
                            </span>
                        </div>
                    </div>
                    <div className="rounded-box">
                        <div className="section">
                            <h3 className="section-title">재직정보</h3>
                            <p>
                                <strong>직급</strong> <br />
                                {userRole === 'USER' ? (
                                    <span>
                                        {role === 'USER' ? '직원' : '리더'}
                                    </span>
                                ) : (
                                    <select
                                        value={role}
                                        onChange={handleRoleChange}
                                        className="input-form"
                                    >
                                        <option value="ADMIN">리더</option>
                                        <option value="USER">직원</option>
                                    </select>
                                )}
                            </p>
                            <br />
                            <p>
                                <strong>사번</strong> <br /> {member.id}
                            </p>
                            <br />
                            <p>
                                <strong>부서</strong> <br />
                                {userRole === 'USER' ? (
                                    <span>{getTeamStatus(team)}</span>
                                ) : (
                                    <select
                                        value={team}
                                        onChange={handleTeamChange}
                                        className="input-form"
                                    >
                                        <option value="">부서 선택</option>
                                        <option value="A">미배정</option>
                                        <option value="B">경영팀</option>
                                        <option value="C">인사팀</option>
                                        <option value="D">업무팀</option>
                                    </select>
                                )}
                            </p>
                        </div>
                        <div className="divider-line"></div>
                        <p>
                            <strong>근무 상태</strong>
                            <br />
                            {member.workStatus}
                        </p>
                        <div className="divider-line"></div>

                        <div className="section">
                            <h3 className="section-title">개인정보</h3>
                            <p>
                                <strong>이메일</strong>
                                <br /> {member.email}
                            </p>
                            <br />
                            <p>
                                <strong>휴대폰 번호</strong>
                                <br /> {member.phone}
                            </p>
                            <br />
                            <p>
                                <Link to="/changePassword">비밀번호 변경</Link>
                            </p>
                        </div>
                        {(loggedInUserId === id || userRole === 'ADMIN') && (
                            <LeaveBtn />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MemberDetail;
