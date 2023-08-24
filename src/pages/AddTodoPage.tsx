import { useState } from "react";
import styled from "styled-components";

import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";

import TodoInput from "@src/components/TodoInput";

const Wrapper = styled.main`
  width: 100%;
  height: 100%;

  > form {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const AddTodoPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSaveButtonHandler = () => {
    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: uuidv4(),
        title: title,
        description: description,
        creationDate: new Date().toISOString(),
        isCompleted: false,
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

  return (
    <Wrapper>
      <TodoInput
        title={title}
        titleOnChangeHandler={titleOnChangeHandler}
        description={description}
        descriptionOnChangeHandler={descriptionOnChangeHandler}
        onSaveButtonHandler={onSaveButtonHandler}
      ></TodoInput>
    </Wrapper>
  );
};

export default AddTodoPage;
