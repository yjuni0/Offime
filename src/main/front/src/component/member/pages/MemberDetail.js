import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LeaveBtn from '../button/LeaveBtn';

function MemberDetail() {
    const { id } = useParams();
    const [member, setMember] = useState({});
    const [role, setRole] = useState('');
    const [team, setTeam] = useState('');
    const [userRole, setUserRole] = useState(''); // 로그인한 사용자의 권한
    const [profileImageUrl, setProfileImageUrl] = useState(''); // 프로필 이미지 URL 상태 추가
    const [loggedInUserId, setLoggedInUserId] = useState(''); // 로그인한 사용자의 ID

    useEffect(() => {
        fetchMemberData();
        fetchUserRole();
        fetchLoggedInUserId(); // 로그인한 사용자의 ID 가져오기
    }, []);

    // 로그인한 사용자의 ID 정보 가져오기
    const fetchLoggedInUserId = () => {
        const storedId = localStorage.getItem('id');
        setLoggedInUserId(storedId || '');
    };

    // 로그인한 사용자의 권한 정보 가져오기
    const fetchUserRole = () => {
        const storedRole = localStorage.getItem('role');
        setUserRole(storedRole || 'USER');
    };

    // 회원 정보 가져오기
    const fetchMemberData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/member/${id}`
            );
            setMember(response.data);
            setRole(response.data.role);
            setTeam(response.data.team || '');
            // 프로필 이미지 URL을 가져옵니다
            setProfileImageUrl(response.data.profileImageUrl); // API에서 받은 프로필 이미지 URL을 설정
            console.log('직원 데이터', response.data);
        } catch (error) {
            console.error('Error fetching member data:', error);
        }
    };

    // 직급 변경 처리
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

    // 팀 변경 처리
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

    // 이미지 업로드 처리
    const handleImageUpload = async (e) => {
        // 로그인한 사용자가 자신의 프로필 이미지만 수정할 수 있게 제한
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
                `http://localhost:8080/member/${id}/upload`, // 경로에 member ID 포함
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', // 자동으로 처리되지만 명시적으로 해도 문제는 없다.
                    },
                }
            );
            // 업로드 후 프로필 이미지 URL 업데이트
            setProfileImageUrl(
                `http://localhost:8080${response.data[0].filePath}`
            );
            alert('이미지가 성공적으로 업로드되었습니다.');

            // 새로고침을 위해 회원 정보 재호출
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
                            {/* 프로필 이미지 URL이 있을 경우 해당 이미지 표시, 없으면 기본 이미지 표시 */}
                            <img
                                src={
                                    profileImageUrl
                                        ? profileImageUrl
                                        : '/image/member/profile_no_image.jpg'
                                }
                                alt="프로필"
                            />
                            {/* 파일 입력을 숨겨서 클릭 시 파일 선택창을 띄운다 */}
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
                        </div>
                        <LeaveBtn />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MemberDetail;
