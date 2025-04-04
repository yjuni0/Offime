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

    const getColorClass = (colorId) => {
        return `templateColor${colorId}`;
    };


    useEffect(() => {
        getTemplateList();
    }, []);

    return (
        <section className={"sec"}>
            <div className={"inner"}>
                <div className={"item"}>
                    <img style={{cursor: "pointer", width: "1.5rem", display: "inline"}}
                         src={"/image/reportIcon/backArrow.png"}
                         onClick={() => navigate(-1)}/>
                </div>
                <div className="templateList">
                    {templateList.map((template) => (
                        <div
                            key={template.id}
                            className={`templateItem ${getColorClass(template.color)}`}
                        >
                            <div className="templateLeft">
                                <img
                                    src={`/image/reportIcon/icon${template.icon}.png`}
                                    alt="템플릿 아이콘"
                                    className="templateIcon"
                                />
                                <p className="templateTitle">{template.title}</p>
                            </div>
                            <img
                                src={"/image/reportIcon/recyclebin.png"}
                                alt="delete"
                                className="templateDeleteIcon"
                                onClick={() => {
                                    if (window.confirm("정말 삭제하시겠습니까?")) {
                                        deleteTemplate(template.id);
                                    }
                                }}
                            />
                        </div>

                    ))}
                </div>
            </div>
        </section>
    )


}

export default TemplateList