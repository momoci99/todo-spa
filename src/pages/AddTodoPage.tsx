import { useState } from "react";
import styled from "styled-components";
import { addTodo } from "@src/store/slices/todoSlice";

import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSaveButtonHandler = () => {
    dispatch(
      addTodo({
        id: uuidv4(),
        title: title,
        description: description,
        creationDate: new Date().toISOString(),
        isCompleted: false,
      })
    );

    navigate("/");
  };

  return (
    <Wrapper>
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
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        ></input>

        <label htmlFor="description">설명</label>
        <textarea
          value={description}
          id="description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        ></textarea>
      </form>
    </Wrapper>
  );
};

export default AddTodoPage;
