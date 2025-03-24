
function OptionBlock({value, onChange}) {
    return (
        <>
            <input
                type="text"
                placeholder="옵션 입력"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </>
    )
}

export default OptionBlock;