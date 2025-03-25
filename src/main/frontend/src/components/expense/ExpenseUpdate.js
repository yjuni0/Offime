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

  useEffect(() => {
    const fetchExpenseData = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
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

        if (response.ok) {
          const data = await response.json();
          setExpense({
            title: data.title,
            content: data.content,
            category: data.category,
            expenseDate: data.expenseDate,
            photoUrls: data.imageUrls,
            totalAmount: data.amount || 0, // 서버에서 amount로 내려옴.
          });

          if (data.imageUrls && data.imageUrls.length > 0) {
            setPreviewImages(data.imageUrls); // 서버에서 내려오는 url을 그대로 사용
          }
        } else {
          throw new Error("Failed to fetch expense data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
    setPreviewImages((prevImages) => [...prevImages, ...imageUrls]);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    // expenseDTO를 한 번만 추가
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

    files.forEach((file) => {
      formData.append("images", file);
    });

    // 토큰 처리
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`, // 토큰 추가
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Expense updated successfully", data);
        navigate(`/expenses/${id}`);
      } else {
        const errorDetails = await response.text();
        console.error("Failed to update expense", errorDetails);
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
              <img
                key={index}
                className="expense-update-preview-image"
                src={src}
                alt={`미리보기 ${index + 1}`}
              />
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
