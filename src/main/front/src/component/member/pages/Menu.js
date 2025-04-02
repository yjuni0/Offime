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
        {
            name: '구성원',
            path: '/member',
            isDropdown: true,
            subMenu: [
                { name: '직원 관리', path: '/member-management' },
                { name: '가입 승인', path: '/signUpApproval' },
            ],
        },
    ];

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
                                                        '/image/member/profile_no_image.jpg'
                                                    }
                                                    alt="프로필"
                                                />
                                            </div>
                                            <div className="member_details">
                                                <span className="member_name">
                                                    {member.name}
                                                </span>
                                                <span className="member_team">
                                                    {member.team || '미배정'}
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
