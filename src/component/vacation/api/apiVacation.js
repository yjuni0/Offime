import { axiosPrivate } from "../../axios/axios";

export const fetchVacationDetail = async (vacationId) => {
  try {
    const res = await axiosPrivate.get(`/vacation/${vacationId}`);
    return res.data;
  } catch (error) {
    console.error("휴가 상세 정보를 가져오는 중 오류 발생:", error);
    throw error; // 호출하는 곳에서 처리할 수 있도록 예외 던지기
  }
};

export const cancelVacation = async (vacationId) => {
  try {
    await axiosPrivate.delete(`/vacation/${vacationId}`);
    console.log("휴가가 취소되었습니다.");
  } catch (error) {
    console.error("휴가 취소 중 오류 발생:", error);
  }
};

export const approveVacation = async (vacationId) => {
  try {
    await axiosPrivate.post(`/vacation/${vacationId}/approve`);
    console.log("휴가가 승인되었습니다.");
  } catch (error) {
    if (error.status === 400) {
      alert("해당 멤버의 잔여 휴가가 부족합니다.");
    }
    console.error("휴가 승인 중 오류 발생:", error);
  }
};

export const rejectVacation = async (vacationId) => {
  try {
    await axiosPrivate.post(`/vacation/${vacationId}/reject`);
    console.log("휴가가 반려되었습니다.");
  } catch (error) {
    console.error("휴가 반려 중 오류 발생:", error);
  }
};
