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
        <div id={"container"}>
            <div id={"device"}>
                <main id={"main"}>
                    <section className={"sec"}>
                        <div className={"inner"}>
                            <div className={"item"}>
                                <p className={"txt-a-r fs_lg"} onClick={() => navigate("/")} style={{cursor: "pointer"}}>X</p>
                            </div>
                            <input className={"input-txt mlr-a"} type="text" placeholder={"템플릿명"}></input>


                                {templateList.map(template => (
                                        <div className={"item bg_pm mt_md"} key={template.id}
                                            onClick={() => navigate(`/reports/create/${template.id}`)}
                                            style={{cursor: "pointer"}}>
                                            <p className={"txt-a-l"}>{template.title}</p>
                                            <p className={"txt-a-r"}>{template.icon}</p>
                                            <p className={"txt-a-r"}>{template.color}</p>
                                        </div>
                                ))}

                        </div>
                    </section>
                </main>
            </div>
        </div>

    )
}

export default ReportCreateTemplateSelect;