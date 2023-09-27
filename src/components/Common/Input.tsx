import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;

  padding-bottom: 24px;

  .label {
    font-family: Noto Sans KR;
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-size: ${(props) => props.theme.fontSizes.normal};
    text-align: left;
    color: ${(props) => props.theme.colors.neutral.primary};

    padding-bottom: 12px;
  }

  .input {
    padding: 20px;
    border-radius: 6px;

    border: ${(props) => {
      return `1px solid ${props.theme.colors.neutral.line}`;
    }};

    color: ${(props) => props.theme.colors.neutral.primary};
    font-family: Noto Sans KR;
  }
`;

interface InputProps {
  label?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  value: string;
  htmlFor?: string;
}

const Input = (props: InputProps) => {
  const { label, onChange, onKeyPress, value } = props;

  return (
    <Wrapper>
      <label className="label">{label}</label>
      <input
        className="input"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      ></input>
    </Wrapper>
  );
};
export default Input;
