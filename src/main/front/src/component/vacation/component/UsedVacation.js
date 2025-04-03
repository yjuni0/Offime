import { useEffect, useState } from "react";
import { getLatestVacation } from "../api/apiVacation";
import VacationList from "../pages/VacationList";
const UsedVacation = () => {
  const [res, setRes] = useState([]);

  useEffect(() => {
    const getUsedVacation = async () => {
      try {
        const response = await getLatestVacation();
        console.log("휴가 리스트:", response);

        if (Array.isArray(response)) {
          setRes(response);
        } else {
          console.warn("예상치 못한 응답 형식:", response);
          setRes([]);
        }
      } catch (error) {
        console.error("휴가 정보를 불러오는 중 오류 발생:", error);
      }
    };

    getUsedVacation();
  }, []);

  return <VacationList res={res} />;
};

export default UsedVacation;
