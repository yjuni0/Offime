import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../../../css/member.css';

function Management() {
    const [member, setMember] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const fetchMember = async () => {
        try {
            const response = await axios.get('http://localhost:8080/member');
            setMember(
                Array.isArray(response.data)
                    ? response.data
                    : response.data || []
            );
        } catch (error) {
            // console.error('직원 데이터를 불러오는 중 오류 발생:', error);
            setMember([]);
        }
    };

    useEffect(() => {
        fetchMember();
    }, []);

    const filteredMembers = member.filter(
        (member) =>
            member.name.toLowerCase().includes(search.toLowerCase()) ||
            member.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleMemberClick = (id) => {
        navigate(`/member/${id}`);
    };

    return (
        <section className="sec">
            <div className="inner">
                <div className="item">
                    <p className="fs_lg">구성원</p>

                    <div className="input-spacing">
                        <input
                            type="text"
                            className="input-form"
                            placeholder="직원 검색 (이름)"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="divider-line"></div>
                    </div>

                    <div className="member_list">
                        <table>
                            <tbody>
                                {filteredMembers.map((member) => (
                                    <tr key={member.id}>
                                        <td
                                            className="member_bar"
                                            onClick={() =>
                                                handleMemberClick(member.id)
                                            }
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
                                                        {member.team ||
                                                            '미배정'}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Management;
