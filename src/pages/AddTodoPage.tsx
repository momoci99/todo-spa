import Page from "@src/components/Common/Page";
import TodoInput from "@src/components/TodoInput";
import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const AddTodoPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [todoItemCategoryIds, setTodoItemCategoryIds] = useState<Array<string>>(
    []
  );
  const [userInputCategory, setUserInputCategory] = useState("");

  const onSaveButtonHandler = () => {
    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: uuidv4(),
        title: title ? title : "제목 없음",
        description: description,
        creationDate: new Date().toISOString(),
        isCompleted: false,
        categoryIds: todoItemCategoryIds
          ? todoItemCategoryIds.map((id) => id)
          : [],
      }),
    })
      .then(() => {
        navigate("/");
      })
      .catch((reason) => {
        console.error(reason);
      });
  };

  const titleOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) return;
    setTitle(event.target.value);
  };

  const descriptionOnChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const userInputCategoryOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserInputCategory(event.target.value);
  };

  return (
    <Page title={title ? title : "New Todo"}>
      <Wrapper>
        <TodoInput
          title={title}
          titleOnChangeHandler={titleOnChangeHandler}
          description={description}
          descriptionOnChangeHandler={descriptionOnChangeHandler}
          onSaveButtonHandler={onSaveButtonHandler}
          todoItemCategoryIds={todoItemCategoryIds}
          setTodoItemCategoryIds={setTodoItemCategoryIds}
          userInputCategory={userInputCategory}
          userInputCategoryOnChangeHandler={userInputCategoryOnChangeHandler}
        ></TodoInput>
      </Wrapper>
    </Page>
  );
};

export default AddTodoPage;
