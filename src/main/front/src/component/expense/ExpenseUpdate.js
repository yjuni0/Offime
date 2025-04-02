import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackPage from "../BackPage";

import "../../css/common.css";
import "../../css/reset.css";
import "../../css/expense.css";

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
      const accessToken = localStorage.getItem("CL_access_token");

      if (!accessToken) {
        console.error("No access token found. Redirecting to login.");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/api/expenses/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 401 || response.status === 403) {
          console.error("Unauthorized. Redirecting to login...");
          navigate("/");
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

    setPreviewImages((prevImages) => [...prevImages, ...imageUrls]);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = previewImages.filter((_, i) => i !== index);
    const updatedFiles = files.filter((_, i) => i !== index);
    setPreviewImages(updatedImages);
    setFiles(updatedFiles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("CL_access_token");
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

    files.forEach((file) => {
      formData.append("images", file);
    });

    const deletedImages = expense.photoUrls.filter(
      (url) => !previewImages.includes(url)
    );

    if (deletedImages.length > 0) {
      formData.append("deletedImages", JSON.stringify(deletedImages));
    }

    try {
      const response = await fetch(`http://localhost:8080/api/expenses/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        navigate(-1); // 수정된 후 상세 페이지로 이동
      } else {
        console.error("Failed to update expense", await response.text());
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
                className="input input-txt fs_md mb_md "
                name="title"
                value={expense.title}
                onChange={(e) =>
                  setExpense({ ...expense, title: e.target.value })
                }
                required
              />

              <p className="fs_lg">사진</p>
              <div className="btn btn-md btn-pm fs_md mb_md txt-a-c ">
                <label htmlFor="fileInput">파일 선택</label>
                <input
                  id="fileInput"
                  className="display_none"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>

              {previewImages.length > 0 && (
                <div>
                  {previewImages.map((src, index) => (
                    <div key={index} className="item">
                      <img
                        className="item"
                        src={src}
                        alt={`미리보기 ${index + 1}`}
                        onError={
                          (e) =>
                            (e.target.src = "/path/to/your/default-image.jpg") // 이미지 오류시 기본 이미지로 변경
                        }
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

              <p className="fs_lg ">금액</p>
              <input
                className="input input-txt fs_md mb_md"
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

              <p className="fs_lg">날짜</p>
              <input
                className="input input-txt fs_md mb_md"
                type="date"
                value={expense.expenseDate}
                onChange={(e) =>
                  setExpense({ ...expense, expenseDate: e.target.value })
                }
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
            <button className="btn btn-max btn-p04 fs_lg mb_md" type="submit">
              수정
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default ExpenseUpdate;
