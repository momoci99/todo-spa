import { ReactComponent as DeleteIcon } from "@assets/ico_delete.svg";
import styled from "styled-components";

const Wrapper = styled.span`
  display: flex;
  align-items: center;

  .toggle-category {
    &:hover {
      cursor: pointer;
    }
  }

  .delete {
    &:hover {
      cursor: pointer;
    }
  }
`;

interface CategoryButtonPros {
  name: string;
  isActivated: boolean;
  showDeleteButton: boolean;
  onClickHandler: () => void;
  onDeleteButtonClickHandler: () => void;
}

const CategoryButton = (props: CategoryButtonPros) => {
  const {
    name,
    isActivated,
    showDeleteButton,
    onClickHandler,
    onDeleteButtonClickHandler,
  } = props;
  return (
    <Wrapper
      style={{
        backgroundColor: isActivated ? "blue" : "",
      }}
    >
      <span className="toggle-category" onClick={onClickHandler}>
        {name}
      </span>

      {showDeleteButton && (
        <span className="delete" onClick={onDeleteButtonClickHandler}>
          <DeleteIcon></DeleteIcon>
        </span>
      )}
    </Wrapper>
  );
};

export default CategoryButton;
