import { EventSourcePolyfill } from "event-source-polyfill";
import { useEffect, useState } from "react";

function useSseEffect() {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("CL_access_token");

  const BASE_URL = "http://localhost:8080";

  useEffect(() => {
    let timeoutId;
    const eventSource = new EventSourcePolyfill(`${BASE_URL}/subscribe`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        console.log("연결 끊김 감지! SSE 재연결 시도...");
        eventSource.close();
        window.location.reload(); // 또는 새로운 SSE 연결
      }, 35000); // 35초 동안 메시지가 없으면 재연결 시도
    };

    eventSource.addEventListener("message", (event) => {
      setMessages((prev) => [...prev, event.data]);
      resetTimeout(); // 메시지를 받을 때마다 타임아웃 초기화
    });

    eventSource.onerror = () => {
      console.log("SSE 오류 발생, 연결 종료");
      eventSource.close();
    };

    resetTimeout(); // 초기 타임아웃 설정

    return () => {
      eventSource.close();
      clearTimeout(timeoutId);
    };
  }, [token]);

  return (
    <div className="App">
      <h1>Server-Sent Events</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
export default useSseEffect;
