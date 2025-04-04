import {useState} from "react";
import axios from "axios";
import {DragDropContext, Draggable, Droppable} from "@hello-pangea/dnd";
import TemplateQuestionBlock from "./TemplateQuestionBlock";
import {useNavigate} from "react-router-dom";

function TemplateCreate() {


    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState(1);
    const [color, setColor] = useState(1);
    const [accessMemberIdList, setAccessMemberIdList] = useState([]);
    const [memberId, setMemberId] = useState("");
    const [questionList, setQuestionList] = useState([]);

    const navigate = useNavigate();

    // useEffect(() => {
    //     console.log(questionList)
    // }, [questionList]);

    const create = async (e) => {
        e.preventDefault();

        const orderedQuestionList = questionList.map((q, index) => ({
            ...q, order: index + 1
        }));

        console.log(orderedQuestionList);

        const data = {title, icon, color, accessMemberIdList, questionList: orderedQuestionList};

        try {
            const response = await axios.post("http://localhost:8080/templates/create", data);
            navigate(-1);
        } catch (error) {
            console.error(error);
        }
    }

    const addMemberId = (memberId) => {
        setAccessMemberIdList((prev) => {
            if (prev.includes(memberId)) {
                return prev;
            } else
                return [...prev, memberId]
        })
    }

    const questionAdd = () => {
        const newId = `q${Date.now()}`
        const newQuestion = {id: newId, type: "TEXT", content: "", optionList: []};
        setQuestionList((prev) => [...prev, newQuestion]);
    }

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(questionList);
        const [moved] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, moved);

        setQuestionList(items);
    };

    return (
                    <section className={"sec"}>
                        <div className={"inner"}>
                            <div className={"item"}>
                                <img
                                    onClick={() => navigate(-1)}
                                    src={"/image/reportIcon/backArrow.png"}
                                    className={"backArrowIcon"}
                                />

                                <div style={{textAlign: "center", marginBottom: "24px"}}>
                                    <h3
                                        className={"templateTitleBox"}
                                    >
                                        새 템플릿 작성
                                    </h3>
                                </div>

                                <form onSubmit={create}>
                                    <div>
                                        <input
                                            className={"templateTitleInput"}
                                            type="text"
                                            id="title"
                                            placeholder="제목"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                                            onBlur={(e) => e.target.style.borderColor = "#ccc"}
                                        />
                                    </div>

                                    <div className={"btn btn-max iconSelector"}>
                                        <div style={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(5, 1fr)",
                                            gap: "0.5rem",
                                            width: "50%"
                                        }}>
                                            <img src={`/image/reportIcon/icon1.png`} onClick={() => setIcon(1)} style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                cursor: "pointer",
                                                opacity: icon === 1 ? 1 : 0.5
                                            }}/>
                                            <img src={`/image/reportIcon/icon2.png`} onClick={() => setIcon(2)} style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                cursor: "pointer",
                                                opacity: icon === 2 ? 1 : 0.5
                                            }}/>
                                            <img src={`/image/reportIcon/icon3.png`} onClick={() => setIcon(3)} style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                cursor: "pointer",
                                                opacity: icon === 3 ? 1 : 0.5
                                            }}/>
                                            <img src={`/image/reportIcon/icon4.png`} onClick={() => setIcon(4)} style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                cursor: "pointer",
                                                opacity: icon === 4 ? 1 : 0.5
                                            }}/>
                                            <img src={`/image/reportIcon/icon5.png`} onClick={() => setIcon(5)} style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                cursor: "pointer",
                                                opacity: icon === 5 ? 1 : 0.5
                                            }}/>
                                            <img src={`/image/reportIcon/icon6.png`} onClick={() => setIcon(6)} style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                cursor: "pointer",
                                                opacity: icon === 6 ? 1 : 0.5
                                            }}/>
                                            <img src={`/image/reportIcon/icon7.png`} onClick={() => setIcon(7)} style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                cursor: "pointer",
                                                opacity: icon === 7 ? 1 : 0.5
                                            }}/>
                                            <img src={`/image/reportIcon/icon8.png`} onClick={() => setIcon(8)} style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                cursor: "pointer",
                                                opacity: icon === 8 ? 1 : 0.5
                                            }}/>
                                            <img src={`/image/reportIcon/icon9.png`} onClick={() => setIcon(9)} style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                cursor: "pointer",
                                                opacity: icon === 9 ? 1 : 0.5
                                            }}/>
                                            <img src={`/image/reportIcon/icon10.png`} onClick={() => setIcon(10)}
                                                 style={{
                                                     width: "1.5rem",
                                                     height: "1.5rem",
                                                     cursor: "pointer",
                                                     opacity: icon === 10 ? 1 : 0.5
                                                 }}/>
                                        </div>
                                        <div className={"colorSelector"}>
                                            <div className={"btn btn-sm"} onClick={() => setColor(1)} style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                cursor: "pointer",
                                                opacity: color === 1 ? 1 : 0.5,
                                                backgroundColor: "#f6ebe7"
                                            }}/>
                                            <div className={"btn btn-sm"} onClick={() => setColor(2)} style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                cursor: "pointer",
                                                opacity: color === 2 ? 1 : 0.5,
                                                backgroundColor: "#eae8f9"
                                            }}/>
                                            <div className={"btn btn-sm"} onClick={() => setColor(3)} style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                cursor: "pointer",
                                                opacity: color === 3 ? 1 : 0.5,
                                                backgroundColor: "#f8f1d7"
                                            }}/>
                                            <div className={"btn btn-sm"} onClick={() => setColor(4)} style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                cursor: "pointer",
                                                opacity: color === 4 ? 1 : 0.5,
                                                backgroundColor: "#e0f7f3"
                                            }}/>
                                            <div className={"btn btn-sm"} onClick={() => setColor(5)} style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                cursor: "pointer",
                                                opacity: color === 5 ? 1 : 0.5,
                                                backgroundColor: "#d9eaf7"
                                            }}/>
                                            <div className={"btn btn-sm"} onClick={() => setColor(6)} style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                cursor: "pointer",
                                                opacity: color === 6 ? 1 : 0.5,
                                                backgroundColor: "#fce4ec"
                                            }}/>
                                            <div className={"btn btn-sm"} onClick={() => setColor(7)} style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                cursor: "pointer",
                                                opacity: color === 7 ? 1 : 0.5,
                                                backgroundColor: "#f3e5f5"
                                            }}/>
                                            <div className={"btn btn-sm"} onClick={() => setColor(8)} style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                cursor: "pointer",
                                                opacity: color === 8 ? 1 : 0.5,
                                                backgroundColor: "#ececec"
                                            }}/>
                                        </div>
                                    </div>
                                    <div className={"mt_sm item"}>
                                        <DragDropContext onDragEnd={handleDragEnd}>
                                            <Droppable droppableId="questions">
                                                {(provided) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                    >
                                                        {questionList.map((q, questionIndex) => (
                                                            <Draggable key={q.id} draggableId={q.id}
                                                                       index={questionIndex}>
                                                                {(provided) => (
                                                                    <div
                                                                        className={"draggableItem"}
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                    >
                                                                        <div className={"dragHandle"}
                                                                            {...provided.dragHandleProps}
                                                                        >
                                                                            <hr/>
                                                                            <hr/>
                                                                            <hr/>
                                                                        </div>
                                                                        <TemplateQuestionBlock
                                                                            question={q}
                                                                            questionIndex={questionIndex}
                                                                            updateQuestion={(i, newQ) => {
                                                                                const updated = [...questionList];
                                                                                updated[i] = newQ;
                                                                                setQuestionList(updated);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </DragDropContext>
                                    </div>

                                    <div className={"mlr-a"}
                                         style={{display: "flex", justifyContent: "center", marginBottom: "24px"}}>
                                        <button
                                            className={"addQuestionButton btn-pm btn"}
                                            type="button"
                                            onClick={questionAdd}
                                        >
                                            질문 추가
                                        </button>
                                    </div>

                                    <input
                                        className={"submitButton"}
                                        type="submit"
                                        value="템플릿 생성"
                                        onMouseOver={(e) => e.target.style.backgroundColor = "#2563eb"}
                                        onMouseOut={(e) => e.target.style.backgroundColor = "#3b82f6"}
                                    />

                                </form>
                            </div>
                        </div>
                    </section>

    )
}

export default TemplateCreate;