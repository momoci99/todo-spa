import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;

  .page-title {
    font-family: Noto Sans KR;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.medium};
    font-weight: ${(props) => props.theme.fontWeights.lightBold};
    color: ${(props) => props.theme.colors.neutral.primary};

    padding: 32px 0px 12px 0px;
  }
`;

interface PageProps {
  title: string;
  children: React.ReactNode;
}

const Page = (props: PageProps) => {
  const { title } = props;

  return (
    <Wrapper>
      <h1 className="page-title">{title}</h1>
      {props.children}
    </Wrapper>
  );
};

export default Page;
