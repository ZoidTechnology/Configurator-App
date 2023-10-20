import styled from 'styled-components';

export const Pane = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

export const CenterPane = styled(Pane)`
  overflow: auto;
  display: block;
`;

export const ConfigureBasePane = styled(Pane)`
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background: transparent;
  pointer-events: none;
  z-index: 3;
`;
