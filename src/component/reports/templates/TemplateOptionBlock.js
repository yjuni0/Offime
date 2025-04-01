
function TemplateOptionBlock({value, onChange, type}) {
    return (
        <>
            <input type={`${type}`} disabled={true}/>
            <input
                type="text"
                placeholder="옵션 입력"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </>
    )
}

export default TemplateOptionBlock;