import TodoInput from "@src/components/TodoInput";
import { useAppDispatch } from "@src/hooks/useCustomDispatch";
import { fetchTodoCategories } from "@src/store/slices/todoCategorySlice";
import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [originCategoryIds, setOriginCategoryIds] = useState<Array<string>>([]);
  const [userInputCategory, setUserInputCategory] = useState("");

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
        categoryIds: originCategoryIds.map((id) => id),
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

  const userInputCategoryEnterKeyHandler = () => {
    const newCategory = {
      id: uuidv4(),
      name: userInputCategory,
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

    setOriginCategoryIds([...originCategoryIds, newCategory.id]);
    setUserInputCategory("");
  };

  return (
    <Wrapper>
      <TodoInput
        title={title}
        titleOnChangeHandler={titleOnChangeHandler}
        description={description}
        descriptionOnChangeHandler={descriptionOnChangeHandler}
        onSaveButtonHandler={onSaveButtonHandler}
        originCategoryIds={originCategoryIds}
        userInputCategory={userInputCategory}
        userInputCategoryOnChangeHandler={userInputCategoryOnChangeHandler}
        userInputCategoryEnterKeyHandler={userInputCategoryEnterKeyHandler}
      ></TodoInput>
    </Wrapper>
  );
};

export default AddTodoPage;
