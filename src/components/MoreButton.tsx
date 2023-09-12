import styled from "styled-components";

import { ReactComponent as MoreIcon } from "@assets/ico_more_horizontal.svg";

const Wrapper = styled.button`
  background: none;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

interface MoreButtonProps {
  onClickHandler?: () => void;
}

const MoreButton = (props: MoreButtonProps) => {
  const { onClickHandler: MoreButtonProps } = props;

  return (
    <Wrapper onClick={MoreButtonProps}>
      <MoreIcon></MoreIcon>
    </Wrapper>
  );
};

export default MoreButton;
