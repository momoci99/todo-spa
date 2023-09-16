import styled from "styled-components";

const Wrapper = styled.button`
  position: fixed;

  bottom: 20px;
  right: 20px;

  background-color: ${(props) => props.theme.colors.primary.default};

  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary.dark};
  }

  &:active {
    background-color: ${(props) => props.theme.colors.primary.default};
    border: 1px solid ${(props) => props.theme.colors.neutral.line};
  }

  transition: background-color 0.2s ease-in-out;
`;

interface AddTodoButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const AddTodoButton = (props: AddTodoButtonProps) => {
  const { children, onClick } = props;
  return <Wrapper onClick={onClick}>{children}</Wrapper>;
};

export default AddTodoButton;
