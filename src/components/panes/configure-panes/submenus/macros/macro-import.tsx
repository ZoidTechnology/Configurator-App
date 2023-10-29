import {useState} from 'react';
import {AccentUploadButton} from 'src/components/inputs/accent-upload-button';
import {ControlRow, Detail, Label} from 'src/components/panes/grid';
import {ErrorMessage, SuccessMessage} from 'src/components/styled';
import {convertDuckyScript} from 'src/utils/macro-api/duckyscript';

export const MacroImport: React.FC<{save: (macro: string) => void}> = ({
  save,
}) => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function load([file]: File[]) {
    setSuccess(false);
    setErrorMessage(null);

    try {
      var contents = await file.text();
    } catch (error) {
      setErrorMessage('Failed to read file!');
      return;
    }

    const [error, converted] = convertDuckyScript(contents);

    if (error !== null) {
      setErrorMessage(error);
      return;
    }

    save(converted);
    setSuccess(true); // Should probably check to see if saving is successful before we display a success message. That can be a problem for future me.
  }

  return (
    <>
      <ControlRow>
        <Label>Import DuckyScript</Label>
        <Detail>
          <AccentUploadButton accept=".txt" onLoad={load}>
            Import
          </AccentUploadButton>
        </Detail>
      </ControlRow>
      {success ? (
        <SuccessMessage>Successfully imported script!</SuccessMessage>
      ) : null}
      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
    </>
  );
};
