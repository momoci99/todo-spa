import Button from "@src/components/Common/Button";
import Page from "@src/components/Common/Page";
import styled from "styled-components";

const Wrapper = styled.main`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .error-title {
    font-family: Noto Sans KR;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.xxLarge};
    font-weight: ${(props) => props.theme.fontWeights.lightBold};
    color: ${(props) => props.theme.colors.neutral.primary};
  }

  .error-description {
    font-family: Noto Sans KR;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.medium};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    color: ${(props) => props.theme.colors.neutral.primary};

    padding: 32px 0px 32px 0px;
  }
`;

const ErrorPage = () => {
  return (
    <Page>
      <Wrapper>
        <h1 className="error-title">Oops!</h1>

        <p className="error-description">요청에 문제가 생겼습니다.</p>

        <Button
          size="medium"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          메인으로 이동하기
        </Button>
      </Wrapper>
    </Page>
  );
};

export default ErrorPage;
