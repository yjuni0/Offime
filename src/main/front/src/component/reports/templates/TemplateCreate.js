import {useState} from "react";
import axios from "axios";
import {DragDropContext, Draggable, Droppable} from "@hello-pangea/dnd";
import TemplateQuestionBlock from "./TemplateQuestionBlock";

function TemplateCreate() {


    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState(1);
    const [color, setColor] = useState(1);
    const [accessMemberIdList, setAccessMemberIdList] = useState([]);
    const [memberId, setMemberId] = useState("");
    const [questionList, setQuestionList] = useState([]);

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
            console.log(data);
            console.log(response);
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
        <div id={"container"}>
            <div id={"device"}>
                <main id={"main"}>
                    <section className={"sec"}>
                        <div className={"inner"}>
                            <h2 className={"title-md txt-a-c mt_md"}>TemplateCreate</h2>
                            <form onSubmit={create}>
                                <div>
                                    <input
                                        className={"input-txt mlr-a mt_sm"}
                                        type={"text"}
                                        id={"title"}
                                        placeholder={"제목"}
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}/>
                                </div>
                                <div>
                                    <input
                                        className={"input-txt mlr-a mt_sm"}
                                        type={"number"}
                                        id={"icon"}
                                        placeholder={"아이콘"}
                                        value={icon}
                                        onChange={(e) => setIcon(e.target.value)}/>
                                </div>
                                <div>
                                    <input
                                        className={"input-txt mlr-a mt_sm"}
                                        type={"number"}
                                        id={"color"}
                                        placeholder={"색깔"}
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}/>
                                </div>
                                <div>
                                    <input
                                        className={"input-txt mlr-a mt_sm"}
                                        type={"number"}
                                        placeholder={"넣을 멤버 아이디"}
                                        value={memberId}
                                        onChange={(e) => setMemberId(e.target.value)}
                                    />
                                    <input type="button" value="넣기" onClick={() => addMemberId(memberId)}/>
                                </div>
                                <div className={"mt_sm"}>
                                <DragDropContext onDragEnd={handleDragEnd}>
                                    <Droppable droppableId="questions">
                                        {(provided) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                {questionList.map((q, questionIndex) => (
                                                    <Draggable key={q.id} draggableId={q.id} index={questionIndex}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                style={{...provided.draggableProps.style}}>
                                                                <hr {...provided.dragHandleProps}
                                                                    style={{
                                                                        cursor: "grab",
                                                                        border: "4px solid white"
                                                                    }}/>
                                                                <TemplateQuestionBlock question={q}
                                                                                       questionIndex={questionIndex}
                                                                                       updateQuestion={(i, newQ) => {
                                                                                           const updated = [...questionList];
                                                                                           updated[i] = newQ;
                                                                                           setQuestionList(updated);
                                                                                       }}/>
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
                                <div>
                                    <button className={"btn btn-pm"} type="button" onClick={questionAdd}>질문 추가</button>
                                </div>
                                <input className={"submit"} type="submit" value="템플릿 생성"/>
                            </form>
                        </div>
                    </section>
                </main>
            </div>
        </div>


    )
}

export default TemplateCreate;