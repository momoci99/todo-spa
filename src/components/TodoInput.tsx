interface TodoInputProps {
  title: string;
  titleOnChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  description: string;
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
    onSaveButtonHandler,
  } = props;
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
    </form>
  );
};

export default TodoInput;
