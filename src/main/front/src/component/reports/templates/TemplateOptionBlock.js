function TemplateOptionBlock({ value, onChange, type }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px'
        }}>
            <input
                type={type}
                disabled
                style={{
                    width: '20px',
                    height: '20px',
                    cursor: 'not-allowed'
                }}
            />
            <input
                type="text"
                placeholder="옵션 입력"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    flex: 1,
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#ccc'}
            />
        </div>
    );
}

export default TemplateOptionBlock;
