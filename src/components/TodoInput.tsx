import { RootState } from "@src/store";
import { useSelector } from "react-redux";

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
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <button type="button" onClick={onSaveButtonHandler}>
        저장하기
      </button>

      <label htmlFor="title">제목</label>
      <input
        value={title}
        id="title"
        name="title"
        onChange={titleOnChangeHandler}
      ></input>

      <label htmlFor="description">설명</label>
      <textarea
        value={description}
        id="description"
        onChange={descriptionOnChangeHandler}
      ></textarea>

      <ul>
        {originCategoryIds.map((id) => {
          return (
            <li key={id}>
              {todoCategories.find((category) => category.id === id)?.name}
            </li>
          );
        })}
      </ul>

      <label htmlFor="category">카테고리</label>
      <input
        value={userInputCategory}
        onChange={userInputCategoryOnChangeHandler}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            userInputCategoryEnterKeyHandler();
          }
        }}
      ></input>
    </form>
  );
};

export default TodoInput;
