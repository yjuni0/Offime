const VacationApplyButton = ({ handleApply }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "0px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <button
        className="btn btn-pm fs_md mb_md"
        style={{
          width: "15rem",
          padding: "1rem 2rem",
          bottom: "20px",
          position: "fixed",
        }}
        onClick={handleApply}
      >
        신청하기
      </button>
    </div>
  );
};
export default VacationApplyButton;
