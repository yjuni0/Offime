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
                         onClick={() => navigate(-1)}/>
                </div>
                <input className={"input-txt mlr-a"} type="text" placeholder={"템플릿명"}></input>


                {templateList.map(template => (
                    <div className={`item mt_md ${template.color === 1 ? "bg_pm" :
                        template.color === 2 ? "bg_pl" :
                            template.color === 3 ? "bg_pk" :
                                template.color === 4 ? "bg_p02" :
                                    template.color === 5 ? "bg_p03" :
                                        template.color === 6 ? "bg_p04" :
                                            template.color === 7 ? "bg_p05" :
                                                template.color === 8 ? "bg_e" : ""}`} key={template.id}>
                        <img src={`/image/reportIcon/icon${template.icon}.png`}  style={{width: "1.5rem", height: "1.5rem"}}/>
                        <p className={"txt-a-l"}>{template.title}</p>
                        <button onClick={() => deleteTemplate(template.id)}>삭제</button>
                    </div>
                ))}

            </div>
        </section>
    )


}

export default TemplateList