/*
 *
 * MIT License.
 *
 */
import styles from '@src/react/components/common/FormButtonsComponent.module.scss';
import * as React from 'react';
import { Button } from 'semantic-ui-react';

interface Props {
  id?: string;

  disabled?: boolean;

  onSubmit: (obj?: any) => void;

  onCancel?: () => void;

  saveButtonText?: string;

  cancelButtonText?: string;
}

export const FormButtons: React.FunctionComponent<Props> = (props: Props) => (
  <div className={styles.buttonContainer}>
    <div className={styles.buttonCell}>
      <Button id={`${props.id}-cancel-button`} disabled={props.disabled} onClick={props.onSubmit} type="button">
        {props.saveButtonText}
      </Button>
    </div>
    {props.onCancel ? (
      <div className={styles.buttonCell}>
        <Button
          id={`${props.id}=cancel-button`}
          disabled={props.disabled}
          onClick={props.onCancel}
          kind="tertiary"
          type="button">
          {props.cancelButtonText}
        </Button>
      </div>
    ) : (
      <></>
    )}
  </div>
);

FormButtons.defaultProps = {
  id: 'save-cancel-buttons',
  saveButtonText: 'Save',
  cancelButtonText: 'Cancel',
  disabled: false,
};
