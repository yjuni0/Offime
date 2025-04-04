import { EventSourcePolyfill } from "event-source-polyfill";
import { useEffect, useState, useRef } from "react";

function useSse() {
  const [messages, setMessages] = useState([]);
  const timeoutRef = useRef(null);
  const eventSourceRef = useRef(null);
  const token = localStorage.getItem("CL_access_token");
  const BASE_URL = "http://localhost:8080";

  useEffect(() => {
    if (!token) return; // token이 없으면 SSE 연결 안 함.

    console.log("🔄 SSE 연결 시도...");

    const connectSSE = () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      eventSourceRef.current = new EventSourcePolyfill(
        `${BASE_URL}/subscribe`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      eventSourceRef.current.addEventListener("message", (event) => {
        console.log("📩 수신된 메시지:", event.data);
        setMessages(() => [event.data]); // ✅ 기존 메시지 유지하며 추가
        resetTimeout();
      });

      eventSourceRef.current.onerror = () => {
        console.log("❌ SSE 오류 발생, 5초 후 재연결 시도...");
        eventSourceRef.current.close();
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => connectSSE(), 5000);
      };

      resetTimeout();
    };

    const resetTimeout = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        console.log("⚠️ 35초 동안 메시지 없음, SSE 재연결 시도...");
        eventSourceRef.current?.close();
        connectSSE();
      }, 35000);
    };

    connectSSE(); // 최초 연결

    return () => {
      console.log("🔌 SSE 연결 종료");
      eventSourceRef.current?.close();
      clearTimeout(timeoutRef.current);
    };
  }, [token]); // ✅ 빈 배열로 설정하여 처음 한 번만 실행되도록 변경.

  return messages;
}

export default useSse;
