import axios from "axios";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

function ReportCreateTemplateSelect() {

    const [templateList, setTemplateList] = useState([]);

    const getTemplateList = async () => {
        await axios.get("http://localhost:8080/reports/templateSelectList")
            .then(res => setTemplateList(res.data));
    }

    useEffect(() => {
        getTemplateList();
    }, []);

    const navigate = useNavigate();

    return (
        <div>
            <p onClick={() => navigate("/")} style={{cursor:"pointer"}} >뒤로가기</p>
            <input type="text" placeholder={"템플릿명"}></input>
            <table>
                <tbody>
                {templateList.map(template => (
                    <tr key={template.id} onClick={() => navigate(`/reports/create/${template.id}`)} style={{cursor:"pointer"}}>
                        <td>{template.title}</td>
                        <td>{template.icon}</td>
                        <td>{template.color}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default ReportCreateTemplateSelect;