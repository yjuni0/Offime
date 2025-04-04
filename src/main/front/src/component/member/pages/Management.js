import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../css/member.css';

function Management() {
    const { id } = useParams();
    const [members, setMembers] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredMembers, setFilteredMembers] = useState([]);
    const navigate = useNavigate();

    const fetchMembers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/member');
            const fetchedMembers = Array.isArray(response.data)
                ? response.data
                : response.data || [];
            setMembers(fetchedMembers);
            setFilteredMembers(fetchedMembers);
            console.log('data', response.data);
        } catch (error) {
            console.error('직원 데이터를 불러오는 중 오류 발생:', error);
            setMembers([]);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    useEffect(() => {
        const filtered = members.filter((member) => {
            const nameMatch = member.name
                ? member.name.toLowerCase().includes(search.toLowerCase())
                : false;
            return nameMatch;
        });
        setFilteredMembers(filtered);
    }, [search, members]);

    const handleMemberClick = (id) => {
        navigate(`/member/${id}`);
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
                                                            member.profileImageUrl
                                                                ? `${process.env.PUBLIC_URL}${member.profileImageUrl}`
                                                                : '/image/member/profile_no_image.jpg'
                                                        }
                                                        alt="프로필"
                                                    />
                                                </div>
                                                <div className="member_details">
                                                    <span className="member_name">
                                                        {member.name}
                                                    </span>
                                                    <span className="member_team">
                                                        {getTeamStatus(
                                                            member.team
                                                        )}{' '}
                                                        &nbsp;
                                                        {member.workStatus}
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
