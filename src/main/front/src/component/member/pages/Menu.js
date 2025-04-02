import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { HttpHeadersContext } from '../../context/HttpHeadersProvider';
import { useNavigate } from 'react-router-dom';
import useAuthMemberInfo from '../api/useAuthMemberInfo';

function Menu() {
    const { member } = useAuthMemberInfo();
    const navigate = useNavigate();

    const handleMemberClick = (id) => {
        navigate(`/member/${id}`);
    };

    return (
        <section className="sec">
            <div className="inner">
                <div className="item">
                    <table>
                        <tbody>
                            <tr key={member.id}>
                                <td
                                    className="btn btn-pm-f btn-max"
                                    onClick={() => handleMemberClick(member.id)}
                                >
                                    {member.name} (
                                    {member.team?.name || '미배정'})
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default Menu;
