import CategorySelect from "@src/components/CategorySelectModal";
import Button from "@src/components/Common/Button";
import CategoryButton from "@src/components/Common/CategoryButton";
import { RootState } from "@src/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;

  display: flex;

  flex-direction: column;

  .input-container {
    display: flex;
    flex-direction: column;

    padding-bottom: 24px;

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
  }

  .category-container {
    display: flex;
    gap: 3px;
    padding: 20px;
    border-radius: 6px;

    border: ${(props) => {
      return `1px solid ${props.theme.colors.neutral.line}`;
    }};

    .category-placeholder {
      font-family: Noto Sans KR;
      font-weight: ${(props) => props.theme.fontWeights.medium};
      font-size: ${(props) => props.theme.fontSizes.normal};
      color: ${(props) => props.theme.colors.neutral.primary};
    }

    &:hover {
      cursor: pointer;
    }
  }

  .save-button {
    position: absolute;
    bottom: 50px;
  }
`;

interface TodoInputProps {
  title: string;
  titleOnChangeHandler: InputChangeHandler;
  description: string;
  todoItemCategoryIds: Array<string>;
  userInputCategory: string;
  userInputCategoryOnChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  setTodoItemCategoryIds: React.Dispatch<React.SetStateAction<string[]>>;

  descriptionOnChangeHandler: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onSaveButtonHandler: () => void;
}

const TodoInput = (props: TodoInputProps) => {
  const {
    title,
    titleOnChangeHandler,
    description,
    descriptionOnChangeHandler,
    todoItemCategoryIds,
    onSaveButtonHandler,
    setTodoItemCategoryIds,
  } = props;

  const [isCategorySelectModalOpen, setIsCategorySelectModalOpen] =
    useState(false);

  const todoCategories = useSelector((state: RootState) => {
    return state.todoCategories.todoCategories;
  });

  return (
    <Wrapper>
      <div className="input-container">
        <label className="label" htmlFor="title">
          제목
        </label>
        <input
          className="input"
          value={title}
          id="title"
          name="title"
          onChange={titleOnChangeHandler}
        ></input>
      </div>

      <div className="input-container">
        <label className="label" htmlFor="description">
          설명
        </label>
        <textarea
          className="input"
          value={description}
          id="description"
          onChange={descriptionOnChangeHandler}
        ></textarea>
      </div>

      <div className="input-container">
        <label className="label" htmlFor="category">
          카테고리
        </label>

        <section
          className="category-container"
          onClick={() => {
            setIsCategorySelectModalOpen(true);
          }}
        >
          {todoItemCategoryIds.length === 0 && (
            <span className="category-placeholder">
              여기를 클릭해서 카테고리를 선택해주세요
            </span>
          )}

          {todoItemCategoryIds.map((todoItemCategoryId) => {
            const category = todoCategories.find(
              (category) => category.id === todoItemCategoryId
            );

            if (!category) return null;

            return (
              <CategoryButton
                showDeleteButton
                name={category.name}
                $backgroundColor={category.backgroundColor}
                key={category.id}
                onDeleteButtonClickHandler={(event) => {
                  (event as React.MouseEvent).stopPropagation();

                  setTodoItemCategoryIds((prev) => {
                    return prev.filter((id) => id !== category.id);
                  });
                }}
              ></CategoryButton>
            );
          })}
        </section>
      </div>

      <Button
        customStyle="save-button"
        onClick={onSaveButtonHandler}
        size="large"
      >
        저장하기
      </Button>

      <CategorySelect
        isOpen={isCategorySelectModalOpen}
        setTodoItemCategoryIds={setTodoItemCategoryIds}
        onClose={() => {
          setIsCategorySelectModalOpen(false);
        }}
        todoItemCategoryIds={todoItemCategoryIds}
      ></CategorySelect>
    </Wrapper>
  );
};

export default TodoInput;
