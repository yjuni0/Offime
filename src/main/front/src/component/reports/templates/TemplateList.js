import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

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

    const getColorClass = (colorId) => {
        return `templateColor${colorId}`;
    };


    useEffect(() => {
        getTemplateList();
    }, []);

    return (
        <section className={"templateSection"}>
            <div className={"templateInner"}>
                    <img style={{cursor: "pointer", width: "1.5rem", display: "inline"}}
                         src={"/image/report/backArrow.png"}
                         onClick={() => navigate(-1)}/>
                <div className="templateList">
                    {templateList.map((template) => (
                        <div
                            key={template.id}
                            className={`templateItem ${getColorClass(template.color)}`}
                            onClick={() => navigate(`/templates/detail/${template.id}`)}
                        >
                            <div className="templateLeft">
                                <img
                                    src={`/image/report/icon${template.icon}.png`}
                                    alt="템플릿 아이콘"
                                    className="templateIcon"
                                    style={{marginTop:"0"}}
                                />
                                <p className="templateTitle">{template.title}</p>
                            </div>
                            <img
                                src={"/image/report/recyclebin.png"}
                                alt="delete"
                                className="templateDeleteIcon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (window.confirm("정말 삭제하시겠습니까?")) {
                                        deleteTemplate(template.id);
                                    }
                                }}
                            />
                        </div>

                    ))}

                </div>

            </div>
            <Link to="/templates/create" className="floatingCreateButton">
                <span className="plusIcon">＋</span>
            </Link>
        </section>
    )


}

export default TemplateList