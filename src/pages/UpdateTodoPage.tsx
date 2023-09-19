import Page from "@src/components/Common/Page";
import TodoInput from "@src/components/TodoInput";
import { RootState } from "@src/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
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

  const [todoItemCategoryIds, setTodoItemCategoryIds] = useState<Array<string>>(
    []
  );
  const [userInputCategory, setUserInputCategory] = useState("");

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
        categoryIds: todoItemCategoryIds.map((id) => id),
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
    setTodoItemCategoryIds(todo.categoryIds);
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

  const userInputCategoryOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserInputCategory(event.target.value);
  };

  // const userInputCategoryEnterKeyHandler = () => {
  //   const newCategory = {
  //     id: uuidv4(),
  //     name: userInputCategory,
  //   };

  //   fetch("http://localhost:3000/categories", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newCategory),
  //   }).then(() => {
  //     dispatch(fetchTodoCategories());
  //   });

  //   setOriginCategoryIds([...originCategoryIds, newCategory.id]);
  //   setUserInputCategory("");
  // };

  return (
    <Page title={title}>
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

export default UpdateTodoPage;
