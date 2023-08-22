import { useEffect, useState } from "react";
import styled from "styled-components";
import { updateTodo } from "@src/store/slices/todoSlice";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todoList = useSelector((state: RootState) => {
    return state.todo.todoList;
  });
  const todo = todoList.find((todo) => todo.id === id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSaveButtonHandler = () => {
    if (!todo) return;

    dispatch(
      updateTodo({
        id: todo.id,
        title: title,
        description: description,
        creationDate: todo.creationDate,
        isCompleted: todo.isCompleted,
      })
    );

    navigate("/");
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
