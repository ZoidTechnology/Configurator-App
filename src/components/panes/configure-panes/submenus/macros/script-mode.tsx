import React, {useEffect} from 'react';
import {AccentButton} from '../../../../inputs/accent-button';
import {getMacroValidator} from 'src/utils/macro-api';
import {ControlRow, Label, Detail} from '../../../grid';
import {AccentSlider} from '../../../../inputs/accent-slider';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import {
  AutocompleteItem,
  AutocompleteLoading,
  findKeycodes,
} from '../../../../../components/inputs/autocomplete-keycode';
import {ErrorMessage} from '../../../../styled';
import styled from 'styled-components';

const TextArea = styled.textarea`
  display: block;
  box-sizing: border-box;
  background: var(--bg_control);
  padding: 10px;
  border-color: var(--border_color_icon);
  color: var(--color_label);
  width: 100%;
  height: 200px;
  font-size: 16px;
  line-height: 18px;
  resize: none;
  font-family: 'Source Code Pro';
  font-weight: 500;
  &::placeholder {
    color: var(--color_label);
  }
  &:focus {
    color: var(--color_accent);
    border-color: var(--color_accent);
  }
`;

const Message = styled.div`
  color: var(--color_accent);
`;

const Link = styled.a`
  color: var(--color_accent);
  text-decoration: underline;
`;

const DescriptionLabel = styled(Label)`
  margin: 10px 0;
  font-size: 14px;
  line-height: 18px;
`;

export const ScriptMode: React.FC<{
  macro: string;
  protocol: number;
  setUnsavedMacro: (macro: string) => void;
  saveMacros: (val: string) => void;
  macroIndex: number;
  isDelaySupported: boolean;
}> = ({
  macro,
  protocol,
  setUnsavedMacro,
  saveMacros,
  macroIndex,
  isDelaySupported,
}) => {
  const trimmedMacro = macro.trimEnd();
  const [currentValue, setCurrentValue] = React.useState(trimmedMacro);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    setUnsavedMacro(currentValue);
  }, [currentValue]);

  const saveMacro = () => {
    const validate = getMacroValidator(protocol);
    const validationResult = validate(currentValue);
    if (validationResult.isValid) {
      saveMacros(currentValue);
      setErrorMessage(undefined);
    } else {
      setErrorMessage(validationResult.errorMessage);
    }
  };
  const hasError = errorMessage !== undefined;
  return (
    <>
      <ControlRow>
        <ReactTextareaAutocomplete
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          loadingComponent={AutocompleteLoading}
          style={{
            fontSize: '16px',
            lineHeight: '18px',
            width: '100%',
            height: '140px',
            fontFamily: 'monospace',
            resize: 'none',
            borderRadius: 5,
            margin: '10px 0',
            borderColor: hasError ? 'var(--color_error)' : undefined,
            color: hasError ? 'var(--color_error)' : undefined,
          }}
          containerStyle={{
            border: 'none',
            lineHeight: '20px',
          }}
          itemStyle={{
            borderColor: 'var(--border_color_cell)',
            backgroundColor: 'var(--bg_menu)',
          }}
          dropdownStyle={{
            zIndex: 999,
            backgroundColor: 'var(--bg_menu)',
          }}
          listStyle={{
            position: 'fixed',
            backgroundColor: 'var(--bg_menu)',
            maxHeight: '210px',
            overflow: 'auto',
            border: '1px solid var(--border_color_cell)',
          }}
          minChar={0}
          textAreaComponent={TextArea as any}
          movePopupAsYouType={true}
          placeholder={`Enter the macro you want M${macroIndex} to execute...`}
          trigger={{
            '?': {
              dataProvider: findKeycodes,
              component: AutocompleteItem,
              output: (item: any) => ({
                text: item.code,
                caretPosition: 'end',
              }),
            },
            '{': {
              dataProvider: findKeycodes,
              component: AutocompleteItem,
              output: (item: any) => ({
                text: `{${item.code},`,
                caretPosition: 'end',
              }),
            },
            ',': {
              dataProvider: findKeycodes,
              component: AutocompleteItem,
              output: (item: any) => {
                return {
                  text: `,${item.code},`,
                  caretPosition: 'end',
                };
              },
            },
          }}
        />
      </ControlRow>
      <ControlRow>
        <DescriptionLabel>
          <Message>
            Enter text directly, or wrap{' '}
            <Link href="https://docs.qmk.fm/#/keycodes_basic" target="_blank">
              Basic Keycodes
            </Link>{' '}
            in {'{}'}
          </Message>
          <Message>Single tap: {'{KC_XXX}'}</Message>
          <Message>Chord: {'{KC_XXX, KC_YYY, KC_ZZZ}'}</Message>
          <Message>Keydown: {`{+KC_XXX}`}</Message>
          <Message>Keyup: {`{-KC_XXX}`}</Message>
          {isDelaySupported ? (
            <Message>Delay (ms): {'{NNNN}'} </Message>
          ) : (
            'Upgrade firmware to use delays'
          )}
        </DescriptionLabel>
        <Detail>
          <AccentButton disabled={macro === currentValue} onClick={saveMacro}>
            Save
          </AccentButton>
        </Detail>
      </ControlRow>
      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
    </>
  );
};
