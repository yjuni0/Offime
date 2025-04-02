<<<<<<< HEAD
import { use, useState } from "react";

=======
>>>>>>> 4b2c3ec93060f2f4fdf9c609a163c566cb3b1a9f
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
        </div>
      )}
      {response.status === "대기" && (
        <div
          className="bg_pk item"
          style={{ marginTop: "20px", color: "black" }}
        >
          <p>대기 중...</p>
        </div>
      )}
    </>
  );
};
export default RequestStatus;
