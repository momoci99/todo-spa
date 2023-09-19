import Button from "@src/components/Common/Button";
import CategoryButton from "@src/components/Common/CategoryButton";
import { CATEGORY_COLOR_PALETTE } from "@src/constatns/CategoryColorPalette";
import { useAppDispatch } from "@src/hooks/useCustomDispatch";
import { RootState } from "@src/store";
import { fetchTodoCategories } from "@src/store/slices/todoCategorySlice";
import { useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
const Container = styled.div`
  position: relative;
  height: 100%;
  margin: 0 auto;
  width: 40%;

  .modal-title {
    font-family: Noto Sans KR;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.medium};
    font-weight: ${(props) => props.theme.fontWeights.lightBold};
    color: ${(props) => props.theme.colors.neutral.primary};

    padding: 32px 0px 12px 0px;
  }

  .category-container {
    display: flex;
    gap: 3px;
    flex-wrap: wrap;
  }

  .input-container {
    display: flex;
    flex-direction: column;

    padding-bottom: 24px;
  }

  .label {
    font-family: Noto Sans KR;
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-size: ${(props) => props.theme.fontSizes.normal};
    text-align: left;
    color: ${(props) => props.theme.colors.neutral.primary};

    padding-bottom: 12px;
  }

  .input {
    padding: 20px;
    border-radius: 6px;

    border: ${(props) => {
      return `1px solid ${props.theme.colors.neutral.line}`;
    }};

    color: ${(props) => props.theme.colors.neutral.primary};
    font-family: Noto Sans KR;

    resize: vertical;
  }

  .save-button {
    width: 100%;
    position: absolute;
    bottom: 50px;
  }
`;

interface CategorySelectProps {
  isOpen: boolean;
  onClose: () => void;
  todoItemCategoryIds: Array<string>;
  setTodoItemCategoryIds: React.Dispatch<React.SetStateAction<string[]>>;
}
const customStyles = {
  overlay: {
    background: "rgba(0, 0, 0, 0.70)",
  },

  content: {
    top: "0",
    left: "0",
    border: "none",
    borderRadius: "8px 8px 0px 0px",
    background: "#FFF",
    width: "100%",
    height: "100%",
    padding: "0px",
  },
};

const CategorySelect = (props: CategorySelectProps) => {
  const [categoryName, setCategoryName] = useState("");

  const { todoItemCategoryIds, isOpen, onClose, setTodoItemCategoryIds } =
    props;

  const dispatch = useAppDispatch();

  const todoCategories = useSelector((state: RootState) => {
    return state.todoCategories.todoCategories;
  });

  const createNewCategory = () => {
    const randomColorIndex = Math.floor(
      Math.random() * CATEGORY_COLOR_PALETTE.length
    );

    const { backgroundColor } = CATEGORY_COLOR_PALETTE[randomColorIndex];

    const newCategory = {
      id: uuidv4(),
      name: categoryName,
      backgroundColor: backgroundColor,
    };

    fetch("http://localhost:3000/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    }).then(() => {
      dispatch(fetchTodoCategories());
    });

    setCategoryName("");
  };

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={() => {
        onClose();
      }}
    >
      <Container>
        <h1 className="modal-title">카테고리 변경/추가</h1>

        <div className="input-container">
          <label className="label">적용된 카테고리</label>
          <ul className="category-container">
            {todoItemCategoryIds.map((id) => {
              const category = todoCategories.find(
                (category) => category.id === id
              );
              return (
                <CategoryButton
                  key={id}
                  name={category?.name || ""}
                  $backgroundColor={category?.backgroundColor || ""}
                  onClickHandler={() => {
                    setTodoItemCategoryIds((prev) => {
                      return prev.filter((prevId) => prevId !== id);
                    });
                  }}
                ></CategoryButton>
              );
            })}
          </ul>
        </div>

        {/* 입력 영역 */}
        <div className="input-container">
          <label className="label" htmlFor="category">
            새로운 카테고리 생성
          </label>
          <input
            className="input"
            value={categoryName}
            onChange={(event) => {
              setCategoryName(event.target.value);
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                createNewCategory();
              }
            }}
          ></input>
        </div>

        <section className="input-container">
          <label className="label" htmlFor="category">
            카테고리 목록
          </label>
          <div className="category-container">
            {todoCategories.map((category) => {
              return (
                <CategoryButton
                  showDeleteButton
                  name={category.name}
                  $backgroundColor={category.backgroundColor}
                  key={category.id}
                  $isActivated={category.isActivated ? true : false}
                  onClickHandler={() => {
                    if (todoItemCategoryIds.includes(category.id)) return;

                    setTodoItemCategoryIds((prev) => {
                      return [...prev, category.id];
                    });
                  }}
                ></CategoryButton>
              );
            })}
          </div>
        </section>

        <Button
          customStyle="save-button"
          onClick={() => {
            onClose();
          }}
          size="large"
        >
          저장하기
        </Button>
      </Container>
    </Modal>
  );
};

export default CategorySelect;
