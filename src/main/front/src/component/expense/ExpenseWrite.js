import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackPage from "../BackPage";

import "../../css/common.css";
import "../../css/reset.css";
import "../../css/expense.css";
const formatAmount = (amount) => {
  if (!amount) return "";
  return amount.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ExpenseWrite = () => {
  const navigate = useNavigate();
  const [previewImages, setPreviewImages] = useState([]); // 빈 배열로 초기화
  const [files, setFiles] = useState([]); // 빈 배열로 초기화
  const [expense, setExpense] = useState({

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
    <>
      <BackPage />
      <main id="main" className="경비관리 상세">
        <section className="sec ">
          <form className="inner" onSubmit={handleSubmit}>
            <div className="bg_n0 item bg_pm mt_md mb_md">
              <p className="fs_lg ">제목</p>
              <input
                className="input input-txt fs_md mb_md"
                name="title"
                value={expense.title}
                onChange={(e) =>
                  setExpense({ ...expense, title: e.target.value })
                }
                required
              />

              <p className="fs_lg">사진</p>
              <label
                className="btn btn-md btn-pm fs_md mb_md txt-a-c "
                htmlFor="fileInput"
              >
                +
              </label>
              <input
                className="display_none"
                type="file"
                multiple
                onChange={handleFileChange}
                id="fileInput"
                accept="image/*"
              />
              {previewImages && previewImages.length > 0 && (
                <div className="">
                  {previewImages.map((src, index) => (
                    <div key={index} className="item">
                      <img
                        className="item"
                        src={src}
                        alt={`미리보기 ${index + 1}`}
                      />
                      <button
                        className=""
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <p className="fs_lg">금액</p>
              {expense.amounts.map((amountItem, index) => (
                <div className="flex " key={index}>
                  <input
                    className="input input-txt fs_md mb_md"
                    name="amount"
                    type="text"
                    value={amountItem.amount || ""}
                    onChange={(e) => handleChange(e, index)}
                    required
                  />
                  {expense.amounts.length > 1 && (
                    <button
                      className="btn btn-sm btn-p05 fs_sm mb_md ml_md "
                      type="button"
                      onClick={() => handleRemoveAmount(index)}
                    >
                      삭제
                    </button>
                  )}
                </div>
              ))}
              <button
                className="btn btn-md btn-pm fs_md mb_md"
                type="button"
                onClick={handleAddAmount}
              >
                금액란 추가
              </button>

              <p className="fs_lg">전체 금액</p>
              <input
                className="input fs_md mb_md"
                name="totalAmount"
                type="text"
                value={formatAmount(String(calculateTotalAmount()))}
                disabled
              />

              <p className="fs_lg">날짜</p>
              <input
                className="input input-txt fs_md mb_md"
                type="date"
                value={expense.date}
                onChange={handleChangeDate}
                required
              />

              <p className="fs_lg">유형</p>
              <div className="flex space-around">
                {["식비", "교통", "숙박", "경조사", "기타"].map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`expense-button mb_md ${
                      expense.category === category ? "selected" : ""
                    }`}
                    onClick={(e) => handleCategoryChange(category, e)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <p className="fs_lg">내용</p>
              <input
                className="input input-txt fs_md mb_md"
                name="content"
                value={expense.content}
                onChange={(e) =>
                  setExpense({ ...expense, content: e.target.value })
                }
                required
              />
            </div>
            <button
              className="btn btn-max btn-pm fs_lg mb_md mt_md"
              type="submit"
            >
              작성
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default ExpenseWrite;
