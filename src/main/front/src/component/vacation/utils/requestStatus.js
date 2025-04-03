import pendingImage from "../image/pending.png";
const RequestStatus = ({ response }) => {
  return (
    <>
      {response.status === "승인" && (
        <div
          className="bg_pm item"
          style={{ marginTop: "20px", color: "white" }}
        >
          <p>승인되었습니다.</p>
          <p>{response.modifiedDate}</p>
        </div>
      )}
      {response.status === "반려" && (
        <div
          className="bg_e item"
          style={{ marginTop: "20px", color: "white" }}
        >
          <p>반려되었습니다.</p>
          <p>{response.modifiedDate}</p>
        </div>
      )}
      {response.status === "대기" && (
        <div
          className="bg_pk item"
          style={{ marginTop: "20px", color: "black" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src={pendingImage} style={{ width: "30px", height: "30px" }} />
            <span style={{ color: "white" }}>대기 중...</span>
          </div>
        </div>
      )}
    </>
  );
};
export default RequestStatus;
