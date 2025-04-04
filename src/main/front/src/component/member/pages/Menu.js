import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { HttpHeadersContext } from '../../context/HttpHeadersProvider';
import { useNavigate } from 'react-router-dom';
import useAuthMemberInfo from '../api/useAuthMemberInfo';
import LogoutBtn from '../button/LogoutBtn';

import '../../../css/member.css';

function Menu() {
    const { member } = useAuthMemberInfo();
    const navigate = useNavigate();

    const handleMemberClick = (id) => {
        navigate(`/member/${id}`);
    };

    const menuItems = [
        { name: '출퇴근 현황', path: '/attendance' },
        { name: '스케줄', path: '/schedule' },
        { name: '휴가', path: '/vacation' },
        { name: '비용처리', path: '/expenses' },
        { name: '구성원', path: '/member' },
    ];

    if (member.role === 'ADMIN') {
        menuItems.push({ name: '가입 승인', path: '/member/signUpStatus' });
    }

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

    return (
        <section className="sec">
            <div className="inner">
                <div className="item">
                    <div className="member_list">
                        <p className="fs_lg">메뉴</p>
                        <table>
                            <tbody>
                                <tr key={member.id}>
                                    <td
                                        className="member_bar"
                                        onClick={() =>
                                            handleMemberClick(member.id)
                                        }
                                        style={{
                                            border: '1px solid #ccc',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <div className="member_info">
                                            <div className="profile_picture">
                                                <img
                                                    src={
                                                        member.profileImageUrl
                                                            ? `${process.env.PUBLIC_URL}${member.profileImageUrl}` // public 폴더 기준으로 접근
                                                            : '/image/member/profile_no_image.jpg' // 기본 이미지 경로
                                                    }
                                                    alt="프로필"
                                                />
                                            </div>
                                            <div className="member_details">
                                                <span className="member_name">
                                                    {member.name}
                                                </span>
                                                <span className="member_team">
                                                    {getTeamStatus(member.team)}{' '}
                                                    {member.workStatus}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="divider-line"></div>

                    <div className="menu-list">
                        <table className="menu-table">
                            <tbody>
                                {menuItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <a href={item.path}>{item.name}</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <LogoutBtn />
                </div>
            </div>
        </section>
    );
}

export default Menu;
