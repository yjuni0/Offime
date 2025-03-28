import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackPage from "../BackPage";
import "./ExpenseWrite.css";

const formatAmount = (amount) => {
  if (!amount) return "";
  return amount.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ExpenseWrite = () => {
  const navigate = useNavigate();
  const [previewImages, setPreviewImages] = useState([]); // 빈 배열로 초기화
  const [files, setFiles] = useState([]); // 빈 배열로 초기화
  const [expense, setExpense] = useState({
    title: "",
    content: "",
    category: "",
    date: "",
    photoUrls: [], // 빈 배열로 초기화
    amounts: [{ amount: "" }],
    totalAmount: 0,
  });

  const handleChange = (e, index) => {
    const { value } = e.target;
    const formattedValue = formatAmount(value);
    const newAmounts = [...expense.amounts];
    newAmounts[index] = { amount: formattedValue };
    setExpense({ ...expense, amounts: newAmounts });
  };

  const handleCategoryChange = (category, e) => {
    e.preventDefault();
    setExpense({ ...expense, category });
  };

  const handleAddAmount = () => {
    setExpense({
      ...expense,
      amounts: [...expense.amounts, { amount: "" }],
    });
  };

  const handleRemoveAmount = (index) => {
    const newAmounts = expense.amounts.filter((_, i) => i !== index);
    setExpense({ ...expense, amounts: newAmounts });
  };

  const calculateTotalAmount = () => {
    const total = expense.amounts.reduce(
      (total, item) => total + (Number(item.amount.replace(/,/g, "")) || 0),
      0
    );
    return total > 0 ? total : 0;
  };

  const handleChangeDate = (e) => {
    setExpense({ ...expense, date: e.target.value });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = previewImages.filter((_, i) => i !== index);
    const updatedFiles = files.filter((_, i) => i !== index);
    setPreviewImages(updatedImages);
    setFiles(updatedFiles);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prevImages) =>
      Array.isArray(prevImages) ? [...prevImages, ...imageUrls] : [...imageUrls]
    );
    setFiles((prevFiles) =>
      Array.isArray(prevFiles)
        ? [...prevFiles, ...selectedFiles]
        : [...selectedFiles]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const totalAmount = calculateTotalAmount();

    // 날짜 값 확인
    const expenseDto = {
      title: expense.title,
      content: expense.content,
      category: expense.category,
      expenseDate: expense.date,
      amount: totalAmount,
    };

    formData.append("expenseDTO", JSON.stringify(expenseDto));

    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append("images", file); // 파일 추가
      });
    }

    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/expenses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // 백엔드에서 반환된 photoUrls 배열을 업데이트
        setExpense({ ...expense, photoUrls: data.photoUrls });
        navigate("/expenseList"); // 리스트 페이지로 이동
      } else {
        const errorDetails = await response.text();
        console.error("Failed to create expense", errorDetails);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="expense-write-container">
      <BackPage />
      <h2 className="expense-write-title">경비 관리</h2>
      <form className="expense-write-form" onSubmit={handleSubmit}>
        <label className="expense-write-label">날짜</label>
        <input
          className="expense-write-input"
          type="date"
          value={expense.date}
          onChange={handleChangeDate}
          required
        />

        <label className="expense-write-label">제목</label>
        <input
          className="expense-write-input"
          name="title"
          value={expense.title}
          onChange={(e) => setExpense({ ...expense, title: e.target.value })}
          required
        />

        <label className="expense-write-label">카테고리</label>
        <div className="expense-write-category-buttons">
          {["식비", "교통", "숙박", "경조사", "기타"].map((category) => (
            <button
              key={category}
              type="button"
              className={`expense-write-category-button ${
                expense.category === category ? "selected" : ""
              }`}
              onClick={(e) => handleCategoryChange(category, e)}
            >
              {category}
            </button>
          ))}
        </div>

        <label className="expense-write-label">사진 URL</label>
        <label className="expense-write-file-input-wrapper" htmlFor="fileInput">
          +
        </label>
        <input
          className="expense-write-hidden-input"
          type="file"
          multiple
          onChange={handleFileChange}
          id="fileInput"
          accept="image/*"
        />
        {previewImages && previewImages.length > 0 && (
          <div className="expense-write-image-preview-container">
            {previewImages.map((src, index) => (
              <div key={index} className="expense-write-image-preview-item">
                <img
                  className="expense-write-preview-image"
                  src={src}
                  alt={`미리보기 ${index + 1}`}
                />
                <button
                  className="expense-write-remove-image-button"
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}

        <label className="expense-write-label">금액</label>
        {expense.amounts.map((amountItem, index) => (
          <div className="expense-write-amount-container" key={index}>
            <input
              className="expense-write-input"
              name="amount"
              type="text"
              value={amountItem.amount || ""}
              onChange={(e) => handleChange(e, index)}
              required
            />
            {expense.amounts.length > 1 && (
              <button
                className="expense-write-remove-button"
                type="button"
                onClick={() => handleRemoveAmount(index)}
              >
                삭제
              </button>
            )}
          </div>
        ))}
        <button
          className="expense-write-add-button"
          type="button"
          onClick={handleAddAmount}
        >
          금액 추가
        </button>

        <label className="expense-write-label">전체 합계</label>
        <input
          className="expense-write-input"
          name="totalAmount"
          type="text"
          value={formatAmount(String(calculateTotalAmount()))}
          disabled
        />

        <label className="expense-write-label">내용</label>
        <input
          className="expense-write-input"
          name="content"
          value={expense.content}
          onChange={(e) => setExpense({ ...expense, content: e.target.value })}
          required
        />

        <button className="expense-write-submit-button" type="submit">
          작성
        </button>
      </form>
    </div>
  );
};

export default ExpenseWrite;
