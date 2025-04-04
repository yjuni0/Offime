const VacationActionButton = ({ isAdmin, onCancel, onApprove, onReject }) => {
  if (isAdmin) {
    return (
      <div
        className="mt_md item"
        style={{
          width: "470px",
          height: "500px",
          position: "fixed",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          className="btn btn-pm fs_md mb_md"
          style={{
            width: "13rem",
            padding: "1rem 2rem",
            borderRadius: "30px",
            position: "absolute",
            left: "0px",
          }}
          onClick={onApprove}
        >
          승인
        </button>
        <button
          className="btn btn-e fs_md mb_md"
          style={{
            width: "13rem",
            padding: "1rem 2rem",
            borderRadius: "30px",
            position: "absolute",
            right: "0",
          }}
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
