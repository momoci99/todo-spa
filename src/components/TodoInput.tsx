import Button from "@src/components/Common/Button";
import { RootState } from "@src/store";
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

  .save-button {
    position: absolute;
    bottom: 50px;
  }
`;

interface TodoInputProps {
  title: string;
  titleOnChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  description: string;
  originCategoryIds: Array<string>;
  userInputCategory: string;
  userInputCategoryOnChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;

  userInputCategoryEnterKeyHandler: () => void;

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
    originCategoryIds,
    onSaveButtonHandler,
    userInputCategory,
    userInputCategoryOnChangeHandler,
    userInputCategoryEnterKeyHandler,
  } = props;

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

      <ul>
        {originCategoryIds.map((id) => {
          return (
            <li key={id}>
              {todoCategories.find((category) => category.id === id)?.name}
            </li>
          );
        })}
      </ul>

      <div className="input-container">
        <label className="label" htmlFor="category">
          카테고리
        </label>
        <input
          className="input"
          value={userInputCategory}
          onChange={userInputCategoryOnChangeHandler}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              userInputCategoryEnterKeyHandler();
            }
          }}
        ></input>
      </div>

      <Button
        customStyle="save-button"
        onClick={onSaveButtonHandler}
        size="large"
      >
        저장하기
      </Button>
    </Wrapper>
  );
};

export default TodoInput;
