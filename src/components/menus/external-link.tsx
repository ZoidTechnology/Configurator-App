import {ReactNode} from 'react';
import styled from 'styled-components';
import {CategoryMenuTooltip} from '../inputs/tooltip';
import {CategoryIconContainer} from '../panes/grid';

type Side = 'left' | 'right';

type Props = {
  side: Side;
  href: string;
  icon: ReactNode;
  tooltip: string;
};

const ExternalLinkContainer = styled.span<{$side: Side}>`
  position: absolute;
  ${(props) => props.$side}: 20px;
`;

export const ExternalLink = (props: Props) => (
  <ExternalLinkContainer $side={props.side}>
    <a href={props.href} target="_blank">
      <CategoryIconContainer>
        {props.icon}
        <CategoryMenuTooltip>{props.tooltip}</CategoryMenuTooltip>
      </CategoryIconContainer>
    </a>
  </ExternalLinkContainer>
);
