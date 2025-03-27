import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackPage from "../BackPage";
import "./ExpenseUpdate.css";

const formatAmount = (amount) => {
  if (!amount) return "";
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ExpenseUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expense, setExpense] = useState({
    title: "",
    content: "",
    category: "",
    expenseDate: "",
    photoUrls: [],
    totalAmount: 0,
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenseData = async () => {
      const accessToken = localStorage.getItem("access_token");
      console.log("토큰 확인:", accessToken); // ✅ 토큰 로그 확인

      if (!accessToken) {
        console.error("No access token found. Redirecting to login.");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`/api/expenses/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log("응답 상태:", response.status); // ✅ 응답 상태 확인

        if (response.status === 401 || response.status === 403) {
          console.error("Unauthorized. Redirecting to login...");
          navigate("/login");
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setExpense({
            title: data.title,
            content: data.content,
            category: data.category,
            expenseDate: data.expenseDate,
            photoUrls: data.imageUrls,
            totalAmount: data.amount || 0,
          });

          if (data.imageUrls) {
            setPreviewImages(data.imageUrls);
          }
          setLoading(false);
        } else {
          throw new Error("Failed to fetch expense data");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("데이터를 가져오는 데 실패했습니다.");
        setLoading(false);
      }
    };
    fetchExpenseData();
  }, [id, navigate]);

  const handleCategoryChange = (category, e) => {
    e.preventDefault();
    setExpense({ ...expense, category });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));

    setPreviewImages((prevImages) => [...prevImages, ...imageUrls]); // 기존 이미지에 새 이미지 추가
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // 기존 파일에 새 파일 추가
  };

  const handleRemoveImage = (index) => {
    const updatedImages = previewImages.filter((_, i) => i !== index);
    const updatedFiles = files.filter((_, i) => i !== index);
    setPreviewImages(updatedImages);
    setFiles(updatedFiles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("No access token found. Redirecting to login.");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append(
      "expenseDTO",
      JSON.stringify({
        title: expense.title,
        content: expense.content,
        category: expense.category,
        expenseDate: expense.expenseDate,
        amount: expense.totalAmount,
      })
    );

    // 기존 이미지를 포함한 새로운 이미지 파일들 추가
    files.forEach((file) => {
      formData.append("images", file);
    });

    // 삭제된 이미지 목록을 서버로 전달
    const deletedImages = expense.photoUrls.filter(
      (url) => !previewImages.includes(url) // 기존 이미지 중 삭제된 이미지 찾기
    );

    // 삭제된 이미지가 있다면 이를 서버에 전달
    if (deletedImages.length > 0) {
      formData.append("deletedImages", JSON.stringify(deletedImages));
    }

    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        navigate(`/detail/${id}`); // 수정된 후 상세 페이지로 이동
      } else {
        console.error("Failed to update expense", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="expense-update-container">
      <BackPage />
      <h2 className="expense-update-title">비용 항목 수정</h2>
      <form className="expense-update-form" onSubmit={handleSubmit}>
        <label className="expense-update-label">날짜</label>
        <input
          className="expense-update-input"
          type="date"
          value={expense.expenseDate}
          onChange={(e) =>
            setExpense({ ...expense, expenseDate: e.target.value })
          }
          required
        />

        <label className="expense-update-label">제목</label>
        <input
          className="expense-update-input"
          name="title"
          value={expense.title}
          onChange={(e) => setExpense({ ...expense, title: e.target.value })}
          required
        />

        <label className="expense-update-label">카테고리</label>
        <div className="expense-update-category-buttons">
          {["식비", "교통", "숙박", "경조사", "기타"].map((category) => (
            <button
              key={category}
              type="button"
              className={`expense-update-category-button ${
                expense.category === category ? "selected" : ""
              }`}
              onClick={(e) => handleCategoryChange(category, e)}
            >
              {category}
            </button>
          ))}
        </div>

        <label className="expense-update-label">사진</label>
        <div className="expense-update-file-input-wrapper">
          <label htmlFor="fileInput">파일 선택</label>
          <input
            id="fileInput"
            className="expense-update-hidden-input"
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        {previewImages.length > 0 && (
          <div className="expense-update-image-preview-container">
            {previewImages.map((src, index) => (
              <div key={index} className="expense-update-image-preview-item">
                <img
                  className="expense-update-preview-image"
                  src={src}
                  alt={`미리보기 ${index + 1}`}
                  onError={
                    (e) => (e.target.src = "/path/to/your/default-image.jpg") // 이미지 오류시 기본 이미지로 변경
                  }
                />
                <button
                  className="expense-update-remove-image-button"
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}

        <label className="expense-update-label">전체 금액</label>
        <input
          className="expense-update-input"
          name="totalAmount"
          type="text"
          value={formatAmount(String(expense.totalAmount))}
          onChange={(e) =>
            setExpense({
              ...expense,
              totalAmount: e.target.value.replace(/[^0-9]/g, ""),
            })
          }
          required
        />

        <label className="expense-update-label">내용</label>
        <input
          className="expense-update-input"
          name="content"
          value={expense.content}
          onChange={(e) => setExpense({ ...expense, content: e.target.value })}
          required
        />

        <button className="expense-update-submit-button" type="submit">
          수정
        </button>
      </form>
    </div>
  );
};

export default ExpenseUpdate;
