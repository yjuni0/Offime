import BackArrow from "./image/backArrow.png";

const BackButton = () => {
  return (
    <button
      className="back-space"
      style={{ height: "100%", display: "flex", alignItems: "center" }}
      onClick={() => window.history.back()}
    >
      <img
        src={BackArrow}
        alt="뒤로가기"
        style={{ height: "100%", width: "auto" }}
      />
    </button>
  );
};
export default BackButton;
