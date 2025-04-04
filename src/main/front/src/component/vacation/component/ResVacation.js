import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import VacationPage from "../pages/VacationPage";

const ResVacation = () => {
  const [res, setRes] = useState(null);
  const navigate = useNavigate();
  const memberId = localStorage.getItem("id");

  useEffect(() => {
    if (!memberId) {
      console.warn("memberId가 존재하지 않습니다.");
      navigate("/home"); // ✅ memberId가 없으면 바로 홈으로 이동
      return;
    }
    const getLeaveDays = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/member/${memberId}`
        );
        console.log("멤버 정보 :", response.data);
        setRes(response.data);
      } catch (error) {
        console.error("휴가 상세 정보를 가져오는 중 오류 발생:", error);
        navigate("/home"); // ✅ API 요청 실패 시 홈으로 이동
      }
    };

    getLeaveDays();
  }, []);

  return <VacationPage res={res} />;
};

export default ResVacation;
