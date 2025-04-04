import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function ReportCreateTemplateSelect() {
    const [templateList, setTemplateList] = useState([]);
    const navigate = useNavigate();

    const getTemplateList = async () => {
        const res = await axios.get("http://localhost:8080/reports/templateSelectList");
        setTemplateList(res.data);
    };

    useEffect(() => {
        getTemplateList();
    }, []);

    const getColorClass = (colorId) => {
        return `templateColor${colorId}`;
    };

    return (
        <section className="templateSection">
            <div className="templateInner">
                <div className="templateHeader">
                    <img
                        className="backIcon"
                        src="/image/report/backArrow.png"
                        alt="뒤로가기"
                        onClick={() => navigate(-1)}
                    />
                </div>

                <div className="templateList">
                    {templateList.map((template) => (
                        <div
                            key={template.id}
                            className={`templateItem ${getColorClass(template.color)}`}
                            onClick={() => navigate(`/reports/create/${template.id}`)}
                        >
                            <p className="templateTitle">{template.title}</p>
                            <img
                                src={`/image/report/icon${template.icon}.png`}
                                alt="템플릿 아이콘"
                                className="templateIcon"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ReportCreateTemplateSelect;
