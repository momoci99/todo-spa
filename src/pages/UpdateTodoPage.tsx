import { useEffect, useState } from "react";
import styled from "styled-components";

import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { RootState } from "@src/store";

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

const UpdateTodoPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const todoList = useSelector((state: RootState) => {
    return state.todo.todoList;
  });
  const todo = todoList.find((todo) => todo.id === id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSaveButtonHandler = () => {
    if (!todo) return;
    fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todo.id,
        title: title,
        description: description,
        creationDate: todo.creationDate,
        isCompleted: todo.isCompleted,
      }),
    })
      .then(() => {
        navigate("/");
      })
      .catch((reason) => {
        console.error(reason);
      });
  };

  useEffect(() => {
    if (!todo) return;

    setTitle(todo.title);
    setDescription(todo.description);
  }, [todo]);

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

export default UpdateTodoPage;
