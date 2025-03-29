import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Management() {
    const [member, setMember] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const fetchMember = async () => {
        try {
            const response = await axios.get('http://localhost:8080/member');
            setMember(
                Array.isArray(response.data.content)
                    ? response.data.content
                    : response.data.member || []
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
                    <input
                        type="text"
                        className="input-txt input-max"
                        placeholder="직원 검색 (이름)"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <table>
                        <tbody>
                            {filteredMembers.map((member) => (
                                <tr key={member.id}>
                                    <td
                                        className="btn btn-pm-f btn-max"
                                        onClick={() =>
                                            handleMemberClick(member.id)
                                        }
                                    >
                                        {member.name}
                                        {member.team || '미배정'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default Management;
