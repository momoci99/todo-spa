import styled from "styled-components";

const Wrapper = styled.button<{
  size: "small" | "medium" | "large";
  disabled?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.colors.primary.default};
  color: ${(props) => props.theme.colors.neutral.white};

  font-family: Noto Sans KR;
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-size: ${(props) => props.theme.fontSizes.medium};

  border-radius: 16px;
  border: none;

  width: 100%;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.primary.dark};
  }

  &:active {
    background-color: ${(props) => props.theme.colors.primary.pressed};
  }

  ${(props) => {
    if (props.disabled) {
      return `background-color: ${props.theme.colors.primary.background};`;
    }
  }}

  transition: all 0.2s ease-in-out;

  ${(props) => {
    if (props.size === "small") {
      return `padding : 12px;`;
    } else if (props.size === "medium") {
      return `padding : 16px;`;
    } else if (props.size === "large") {
      return `padding : 20px;`;
    }
  }}
`;

interface ButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  size: "small" | "medium" | "large";
  disabled?: boolean;
  customStyle?: string;
}

const Button = (props: ButtonProps) => {
  const { children, onClick, size, disabled } = props;

  return (
    <Wrapper
      className={props.customStyle}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Wrapper>
  );
};

export default Button;
