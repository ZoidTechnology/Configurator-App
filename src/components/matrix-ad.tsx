import styled from 'styled-components';
import matrix from '../assets/images/matrix.png';

const AdWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const AdContainer = styled.a`
  border: 1px solid var(--color_label-highlighted);
  position: fixed;
  border-radius: 5px;
  background-color: var(--bg_outside-accent);
  color: var(--color_label-highlighted);
  bottom: 50px;
  transition: all 0.1s;

  &:hover {
    transform: scale(1.05);
  }
`;

const AdImage = styled.img`
  height: 180px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
`;

const AdCopy = styled.div`
  font-size: 24px;
  padding: 15px 15px 15px 75px;
`;

const AdHighlight = styled.span`
  color: var(--color_accent);
`;

export default () => {
  return (
    <AdWrapper>
      <AdContainer
        href="https://www.tindie.com/products/sevencrumbs/matrix/"
        target="_blank"
      >
        <AdImage src={matrix} />
        <AdCopy>
          Check out the <AdHighlight>Matrix</AdHighlight> macro pad on Tindie
        </AdCopy>
      </AdContainer>
    </AdWrapper>
  );
};
