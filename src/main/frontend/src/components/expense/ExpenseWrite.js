import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackPage from "../BackPage";
import "./ExpenseUpdate.css";

const formatAmount = (amount) => {
  if (!amount) return "";
  return amount.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    amounts: [{ amount: "" }],
    totalAmount: 0,
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [files, setFiles] = useState([]);

  // Fetch expense data to update
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
            Authorization: `Bearer ${token}`,
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
            amounts: data.amounts || [{ amount: "" }],
          });
        } else {
          throw new Error("Failed to fetch expense data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchExpenseData();
  }, [id, navigate]);

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
    setExpense({ ...expense, expenseDate: e.target.value });
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
    const totalAmount = calculateTotalAmount();

    const expenseDto = {
      title: expense.title,
      content: expense.content,
      category: expense.category,
      expenseDate: expense.expenseDate,
      amount: totalAmount,
    };

    formData.append("expenseDTO", JSON.stringify(expenseDto));

    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("images", file);
      });
    }

    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("No access token found");
      return;
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
          onChange={handleChangeDate}
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
        <input
          className="expense-update-hidden-input"
          type="file"
          multiple
          onChange={handleFileChange}
          accept="image/*"
        />

        {previewImages && previewImages.length > 0 && (
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

        <label className="expense-update-label">금액</label>
        {expense.amounts.map((amountItem, index) => (
          <div className="expense-update-amount-container" key={index}>
            <input
              className="expense-update-input"
              name="amount"
              type="text"
              value={amountItem.amount || ""}
              onChange={(e) => handleChange(e, index)}
              required
            />
            {expense.amounts.length > 1 && (
              <button
                className="expense-update-remove-button"
                type="button"
                onClick={() => handleRemoveAmount(index)}
              >
                삭제
              </button>
            )}
          </div>
        ))}
        <button
          className="expense-update-add-button"
          type="button"
          onClick={handleAddAmount}
        >
          금액 추가
        </button>

        <label className="expense-update-label">전체 합계</label>
        <input
          className="expense-update-input"
          name="totalAmount"
          type="text"
          value={formatAmount(String(calculateTotalAmount()))}
          disabled
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
