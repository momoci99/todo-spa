import styled from "styled-components";

const Wrapper = styled.div<{
  size: "default" | "small" | "other";
}>`
  width: 100%;
  height: 100%;

  border-radius: 4px;
  background: ${(props) => {
    return props.theme.colors.neutral.white;
  }};

  .header {
    border-radius: 8px 8px 0px 0px;
    background-color: ${(props) => {
      return props.theme.colors.primary.light;
    }};

    height: 36px;
    display: flex;
    align-items: center;
  }

  .body {
    ${(props) => {
      if (props.size === "default") {
        return `
        padding: 24px;
        box-shadow: 0px 4px 40px 0px rgba(15, 22, 58, 0.08);
        border-radius: 4px;
        background: #FFF;
      `;
      } else if (props.size === "small") {
        return `
        padding: 12px;
        box-shadow: 0px 4px 4px 0px rgba(11, 26, 40, 0.04);
        border-radius: 4px;
        background: #FFF;
      `;
      } else if (props.size === "other") {
        return `
        padding: 0px;
        box-shadow: 0px -4px 80px 0px rgba(2, 41, 100, 0.10);
        border-radius: 8px;
        background: #FFF;

      `;
      }
    }}
  }
`;

interface CardProps {
  size?: "default" | "small" | "other";

  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Card = (props: CardProps) => {
  const { size } = props;
  return (
    <Wrapper size={size ? size : "default"}>
      <div className="header">{props.header}</div>
      <div className="body">{props.children}</div>
      <div className="footer">{props.footer}</div>
    </Wrapper>
  );
};

export default Card;
