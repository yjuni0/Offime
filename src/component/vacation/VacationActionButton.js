const VacationActionButton = ({ isAdmin, onCancel, onApprove, onReject }) => {
  if (isAdmin) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "0px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button
          className="btn btn-pm fs_md mb_md"
          style={{ width: "15rem", padding: "1rem 2rem" }}
          onClick={onApprove}
        >
          승인
        </button>
        <button
          className="btn btn-e fs_md mb_md"
          style={{ width: "15rem", padding: "1rem 2rem" }}
          onClick={onReject}
        >
          반려
        </button>
      </div>
    );
  }

  return (
    <button
      className="btn btn-max btn-e"
      style={{
        width: "460px",
        marginTop: "20px",
        position: "fixed",
        bottom: "20px", // 버튼을 화면 하단에 고정
      }}
      onClick={onCancel}
    >
      휴가 취소
    </button>
  );
};

export default VacationActionButton;
