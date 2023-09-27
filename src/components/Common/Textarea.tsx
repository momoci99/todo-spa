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

    resize: vertical;
  }
`;

interface TextareaProps {
  label?: string;
  onChange: TextAreaChangeHandler;
  onKeyPress?: TextAreaKeyPressHandler;
  value: string;
  htmlFor?: string;
}

const Textarea = (props: TextareaProps) => {
  const { label, onChange, value } = props;

  return (
    <Wrapper>
      <label className="label">{label}</label>
      <textarea className="input" value={value} onChange={onChange}></textarea>
    </Wrapper>
  );
};
export default Textarea;
