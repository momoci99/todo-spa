import { ReactComponent as DeleteTodoIcon } from "@assets/ico_delete_todo.svg";
import { ReactComponent as EditTodoIcon } from "@assets/ico_edit_todo.svg";
import { ReactComponent as TodoDoneIcon } from "@assets/ico_todo_done.svg";
import { ReactComponent as TodoProgressingIcon } from "@assets/ico_todo_progressing.svg";
import { TodoItem as TodoItemType } from "@src/interfaces/Todo";
// import styled from "styled-components";
import { removeTodo, toggleCompleteStatus } from "@src/store/slices/todoSlice";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 16px 24px;

  gap: 32px;

  .menu-item {
    display: flex;
    width: 100%;
    padding: 0px;
    gap: 12px;

    font-size: ${(props) => {
      return props.theme.fontSizes.normal;
    }};

    font-weight: ${(props) => {
      return props.theme.fontWeights.normal;
    }};

    font-family: Noto Sans KR;

    &.delete {
      color: ${(props) => {
        return props.theme.colors.fail.default;
      }};
    }

    &.update {
      color: ${(props) => {
        return props.theme.colors.secondary.default;
      }};
    }

    &:active {
      background-color: ${(props) => {
        return props.theme.colors.neutral.line;
      }};
    }

    transition: all 0.1s;
    transition-delay: 200ms;
  }

  button {
    background: none;
    border: none;
  }
`;

interface TodoItemMoreMenuProps {
  todo: TodoItemType;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  customStyles?: Modal.Styles;
}

const customStyles = {
  overlay: {
    background: "rgba(0, 0, 0, 0.70)",
  },

  content: {
    top: "auto",
    left: "50%",
    right: "auto",
    bottom: "0px",
    transform: "translate(-50%, 0)",
    border: "none",
    borderRadius: "8px 8px 0px 0px",
    background: "#FFF",
    width: "90%",
    padding: "0px",
  },
};

const TodoItemMoreMenu = (props: TodoItemMoreMenuProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isOpen, onClose, todo } = props;

  const onDeleteButtonHandler = () => {
    if (!todo) return;
    fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "DELETE",
    })
      .then(() => {
        dispatch(removeTodo(todo.id));
      })
      .catch((reason) => {
        console.error(reason);
      });
  };

  const onToggleButtonHandler = () => {
    if (!todo) return;
    fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        creationDate: todo.creationDate,
        isCompleted: !todo.isCompleted,
      }),
    })
      .then(() => {
        dispatch(
          toggleCompleteStatus({
            id: todo.id,
            flag: !todo.isCompleted,
          })
        );
      })
      .catch((reason) => {
        console.error(reason);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={() => {
        onClose();
      }}
    >
      <Container>
        <button
          type="button"
          className="menu-item delete"
          onClick={onDeleteButtonHandler}
        >
          <DeleteTodoIcon /> <span>삭제</span>
        </button>

        <button
          type="button"
          className="menu-item update"
          onClick={() => {
            navigate(`/updateTodo/${todo.id}`);
          }}
        >
          <EditTodoIcon /> <span>수정</span>
        </button>

        <button
          type="button"
          className="menu-item toggle"
          onClick={onToggleButtonHandler}
        >
          {todo.isCompleted ? <TodoDoneIcon /> : <TodoProgressingIcon />}

          <span>
            {todo.isCompleted ? "완료됨으로 변경" : "진행예정으로 변경"}{" "}
          </span>
        </button>
      </Container>
    </Modal>
  );
};

export default TodoItemMoreMenu;
