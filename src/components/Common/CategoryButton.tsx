import { ReactComponent as DeleteIcon } from "@assets/ico_delete.svg";
import styled from "styled-components";

const Wrapper = styled.span<{
  color: string;
  $backgroundColor: string;
  $isActivated: boolean;
}>`
  display: flex;
  align-items: center;

  gap: 6px;
  padding: 4px 8px;
  border-radius: 4px;

  color: "#000000";

  font-size: ${(props) => {
    return props.theme.fontSizes.small;
  }};

  background-color: ${(props) => {
    return props.$backgroundColor;
  }};

  ${(props) => {
    if (props.$isActivated) {
      return `font-weight: ` + props.theme.fontWeights.bold;
    }
  }};

  .toggle-category {
    &:hover {
      cursor: pointer;
    }
  }

  .delete {
    width: 16px;
    height: 16px;
    &:hover {
      cursor: pointer;
    }
  }
`;

interface CategoryButtonPros {
  name: string;
  color?: string;
  $backgroundColor: string;
  $isActivated?: boolean;
  showDeleteButton?: boolean;
  onClickHandler?: () => void;
  onDeleteButtonClickHandler?: () => void;
}

const CategoryButton = (props: CategoryButtonPros) => {
  const {
    name,
    color,
    $backgroundColor,
    $isActivated,
    showDeleteButton,
    onClickHandler,
    onDeleteButtonClickHandler,
  } = props;
  return (
    <Wrapper
      color={color ? color : "#000000"}
      $backgroundColor={$backgroundColor}
      $isActivated={$isActivated ? true : false}
    >
      <span className="toggle-category" onClick={onClickHandler}>
        {name}
      </span>

      {showDeleteButton && (
        <DeleteIcon
          className="delete"
          onClick={onDeleteButtonClickHandler}
        ></DeleteIcon>
      )}
    </Wrapper>
  );
};

export default CategoryButton;
