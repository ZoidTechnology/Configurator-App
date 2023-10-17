import styled from 'styled-components';

export const IconButton = styled.button`
  appearance: none;
  width: 40px;
  position: relative;
  display: inline-block;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 10px 10px;
  line-height: initial;
  font-size: initial;
  color: ${(props) =>
    props.disabled ? 'var(--bg_control)' : 'var(--color_accent)'};
  border-color: ${(props) =>
    props.disabled ? 'var(--bg_control)' : 'var(--color_accent)'};
  &:disabled {
    cursor: not-allowed;
    border-right: 1px solid var(--border_color_icon);
    cursor: not-allowed;
    background: var(--bg_menu);
  }
  &:hover {
    color: ${(props) =>
      props.disabled ? 'var(--bg_control)' : 'var(--color_inside-accent)'};
    border-color: ${(props) =>
      props.disabled ? 'var(--bg_control)' : 'var(--color_accent)'};
    border-right: 1px solid var(--border_color_icon);
    background-color: ${(props) =>
      props.disabled ? 'var(--bg_menu)' : 'var(--color_accent)'};
  }

  svg {
    color: ${(props) =>
      props.disabled ? 'var(--bg_control)' : 'var(--color_accent)'};
  }
  &:hover {
    svg {
      color: ${(props) =>
        props.disabled ? 'var(--bg_control)' : 'var(--color_inside-accent)'};
    }

    color: var(--color_label-highlighted);
    & .tooltip {
      transform: translateX(-50%) scale(1);
      opacity: 1;
    }
  }
  .tooltip {
    transform: translateX(-50%) scale(0.6);
    opacity: 0;
  }
`;

export const IconButtonUnfilledContainer = styled(IconButton)`
  cursor: pointer;
  background: inherit;
  border: 1px solid var(--color_accent);
  width: 30px;
  height: 30px;
  justify-content: center;
  display: inline-flex;
  align-items: center;
`;

export const IconButtonContainer = styled(IconButton)`
  cursor: pointer;
  background: var(--bg_control);
  border-right: 1px solid var(--border_color_icon);
`;

export const IconToggleContainer = styled(IconButton)<{$selected: boolean}>`
  cursor: pointer;
  transition: all 0.4s ease;
  background: ${(props) =>
    props.$selected ? 'var(--color_accent)' : 'var(--bg_menu)'};
  svg {
    color: ${(props) =>
      props.$selected ? 'var(--color_inside-accent)' : 'var(--bg_icon)'};
  }
  &:hover {
    background: ${(props) =>
      props.$selected ? 'var(--color_accent)' : 'var(--bg_menu)'};
    svg {
      color: ${(props) =>
        props.$selected ? 'var(--color_inside-accent)' : 'var(--bg_icon)'};
    }
  }
  border-right: 1px solid var(--border_color_icon);
`;
