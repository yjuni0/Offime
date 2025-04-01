import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function TemplateList() {


    const [templateList, setTemplateList] = useState([]);

    const getTemplateList = async () => {
        await axios.get("http://localhost:8080/reports/templateSelectList")
            .then(res => setTemplateList(res.data));
    }

    const deleteTemplate = async (templateId) => {
        await axios.delete(`http://localhost:8080/templates/delete/${templateId}`).then(() => getTemplateList());
    }

    const navigate = useNavigate();

    useEffect(() => {
        getTemplateList();
    }, []);

    return (
        <section className={"sec"}>
            <div className={"inner"}>
                <div className={"item"}>
                    <img style={{cursor: "pointer", width: "1.5rem", display: "inline"}}
                         src={"/image/backArrow.png"}
                         onClick={() => navigate(`/`)}/>
                </div>
                <input className={"input-txt mlr-a"} type="text" placeholder={"템플릿명"}></input>


                {templateList.map(template => (
                    <div className={"item bg_pm mt_md"} key={template.id}>
                        <p className={"txt-a-l"}>{template.title}</p>
                        <p className={"txt-a-r"}>{template.icon}</p>
                        <p className={"txt-a-r"}>{template.color}</p>
                        <button onClick={() => deleteTemplate(template.id)}>삭제</button>
                    </div>
                ))}

            </div>
        </section>
    )


}

export default TemplateList