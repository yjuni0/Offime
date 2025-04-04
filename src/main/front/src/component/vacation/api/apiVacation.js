import { useState } from "react";
import { axiosPrivate } from "../../axios/axios";

export const getLatestVacation = async () => {
  try {
    const res = await axiosPrivate.get("/vacation/latest");
    return res.data;
  } catch (error) {
    console.error(
      "최근 휴가 신청 내역 오류 발생:",
      error.response?.data?.message || "알 수 없는 오류"
    );
    throw error.response?.data || { message: "서버 오류 발생" }; // ✅ 에러 응답 반환
  }
};

export const fetchVacationList = async (page) => {
  try {
    const res = await axiosPrivate.get("/vacation", {
      params: { page: page - 1 },
    });
    return res.data;
  } catch (error) {
    console.error(
      "휴가 리스트 오류 발생:",
      error.response?.data?.message || "알 수 없는 오류"
    );
    throw error.response?.data || { message: "서버 오류 발생" }; // ✅ 에러 응답 반환
  }
};

export const fetchVacationDetail = async (vacationId) => {
  try {
    const res = await axiosPrivate.get(`/vacation/${vacationId}`);
    return res.data;
  } catch (error) {
    console.error(
      "휴가 상세 정보 오류 발생:",
      error.response?.data?.message || "알 수 없는 오류"
    );
    throw error.response?.data || { message: "서버 오류 발생" }; // ✅ 에러 응답 반환
  }
};

export const applyVacation = async (req) => {
  try {
    const res = await axiosPrivate.post("/vacation", req);
    console.log("휴가 신청 완료");
    return res.data; // ✅ 성공 응답 반환
  } catch (error) {
    console.error(
      "휴가 신청 오류 발생:",
      error.response?.data?.message || "알 수 없는 오류"
    );
    throw error.response?.data || { message: "서버 오류 발생" }; // ✅ 에러 응답 반환
  }
};

export const cancelVacation = async (vacationId) => {
  try {
    const res = await axiosPrivate.delete(`/vacation/${vacationId}`);
    console.log("휴가가 취소되었습니다.");
    return res.data;
  } catch (error) {
    console.error(
      "휴가 취소 오류 발생:",
      error.response?.data?.message || "알 수 없는 오류"
    );
    throw error.response?.data || { message: "서버 오류 발생" }; // ✅ 에러 응답 반환
  }
};

export const approveVacation = async (vacationId) => {
  try {
    const res = await axiosPrivate.post(`/vacation/${vacationId}/approve`);
    console.log("휴가가 승인되었습니다.");
    return res.data;
  } catch (error) {
    console.error(
      "휴가 승인 오류 발생:",
      error.response?.data?.message || "알 수 없는 오류"
    );
    throw error.response?.data || { message: "서버 오류 발생" }; // ✅ 에러 응답 반환
  }
};

export const rejectVacation = async (vacationId) => {
  try {
    const res = await axiosPrivate.post(`/vacation/${vacationId}/reject`);
    console.log("휴가가 반려되었습니다.");
    return res.data;
  } catch (error) {
    console.error(
      "휴가 반려 오류 발생:",
      error.response?.data?.message || "알 수 없는 오류"
    );
    throw error.response?.data || { message: "서버 오류 발생" }; // ✅ 에러 응답 반환
  }
};
