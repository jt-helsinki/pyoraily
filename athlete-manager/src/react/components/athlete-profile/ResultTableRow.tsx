/*
 *
 * MIT License.
 *
 */

import { ResultSchema } from '@src/model/schema/ResultSchema';
import { Formik, FormikProps } from 'formik';
import { COURSE_PROFILES, EVENT_TYPES } from 'pyoraily-shared-frontend/lib/constants';
import { DisciplineType, Result, SelectOptionType } from 'pyoraily-shared-frontend/model';
import React, { useState } from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { Button, Dropdown, Form, Input, Label, Modal, Radio, Segment, Table, TextArea } from 'semantic-ui-react';

interface Props {
  isCreatingNewResult: boolean;
  discipline: DisciplineType;
  result: Result;
  index: number;
  removeResultRow: (index: number) => void;
  saveResultRow: (index: number, result: Result) => void;
}

export const ResultTableRow: React.FunctionComponent<Props> = (props: Props) => {
  const [isEditable, setIsEditable] = useState(props.result.isEditable || false);
  const [confirmModalVisble, isConfirmModalVisble] = useState<boolean>(false);
  const eventTypes: SelectOptionType[] = EVENT_TYPES[props.discipline];
  const courseProfiles: SelectOptionType[] = COURSE_PROFILES[props.discipline];

  const handleEdit = (): void => {
    setIsEditable(true);
  };

  const handleSave = (result: Result): void => {
    setIsEditable(false);
    delete result.isEditable;
    props.saveResultRow(props.index, result);
  };

  const handleCancel = (): void => {
    setIsEditable(false);
    if (props.isCreatingNewResult) {
      props.removeResultRow(props.index);
    }
  };

  return isEditable ? (
    <Formik
      initialValues={props.result}
      validationSchema={ResultSchema}
      onSubmit={handleSave}
      validateOnChange={true}
      validateOnBlur={true}
      enableReinitialize={true}>
      {(formik: FormikProps<Result>): React.ReactElement => {
        const { values, setFieldValue, submitForm, submitCount, errors, dirty, isValid, touched, setTouched } = formik;
        return (
          <Table.Row>
            <Table.Cell verticalAlign="middle" colSpan="6">
              <Segment raised={true}>
                <Form>
                  <Form.Field required={true}>
                    <label>Result date</label>
                    <SemanticDatepicker
                      value={new Date(Date.parse(values.resultDate.toString()))}
                      datePickerOnly={true}
                      required={true}
                      onChange={(e: any, eventData) => {
                        setTouched({ resultDate: true });
                        setFieldValue('resultDate', eventData.value as any, true);
                      }}
                      error={
                        errors.resultDate && (submitCount > 0 || touched.resultDate)
                          ? { content: errors.resultDate, pointing: 'above' }
                          : false
                      }
                    />
                  </Form.Field>
                  <Form.Field
                    control={Input}
                    label="Placing"
                    value={values.placing}
                    onChange={(e: any) => {
                      setTouched({ placing: true });
                      const value = e.target.value.toUpperCase();
                      setFieldValue('placing', value, true);
                    }}
                    fluid={true}
                    required={true}
                    error={
                      errors.placing && (submitCount > 0 || touched.placing)
                        ? { content: errors.placing, pointing: 'above' }
                        : false
                    }
                  />
                  <Form.Field
                    control={Input}
                    label="Number of starters"
                    value={values.numberOfStarters}
                    onChange={(e: any) => {
                      setTouched({ numberOfStarters: true });
                      setFieldValue('numberOfStarters', e.target.value, true);
                    }}
                    fluid={true}
                    required={true}
                    error={
                      errors.numberOfStarters && (submitCount > 0 || touched.numberOfStarters)
                        ? { content: errors.numberOfStarters, pointing: 'above' }
                        : false
                    }
                  />
                  <Form.Field
                    control={Input}
                    label="Number of finishers"
                    value={values.numberOfFinishers}
                    onChange={(e: any) => {
                      setTouched({ numberOfFinishers: true });
                      setFieldValue('numberOfFinishers', e.target.value, true);
                    }}
                    fluid={true}
                    required={true}
                    error={
                      errors.numberOfFinishers && (submitCount > 0 || touched.numberOfFinishers)
                        ? { content: errors.numberOfFinishers, pointing: 'above' }
                        : false
                    }
                  />
                  <Form.Field
                    control={Input}
                    label="Time behind"
                    value={values.timeBehind}
                    onChange={(e: any) => {
                      setTouched({ timeBehind: true });
                      setFieldValue('timeBehind', e.target.value, true);
                    }}
                    fluid={true}
                    required={true}
                    error={
                      errors.timeBehind && (submitCount > 0 || touched.timeBehind)
                        ? { content: errors.timeBehind, pointing: 'above' }
                        : false
                    }
                  />
                  <Form.Field required={true}>
                    <label>Course profile</label>
                    <Dropdown
                      label="Course profile"
                      placeholder="Course profile"
                      value={values.courseProfile}
                      selection={true}
                      fluid={true}
                      search={true}
                      onChange={(e: any, { value }: any) => {
                        setTouched({ courseProfile: true });
                        setFieldValue('courseProfile', value, true);
                      }}
                      options={courseProfiles}
                      error={!!(errors.courseProfile && (submitCount > 0 || touched.courseProfile))}
                    />
                    {errors.courseProfile && (submitCount > 0 || touched.courseProfile) ? (
                      <Label prompt pointing="above">
                        {errors.courseProfile}
                      </Label>
                    ) : null}
                  </Form.Field>
                  <Form.Field required={true}>
                    <label>Race type</label>
                    <Dropdown
                      label="Race type"
                      placeholder="Race type"
                      value={values.raceType}
                      selection={true}
                      fluid={true}
                      search={true}
                      onChange={(e: any, { value }: any) => {
                        setTouched({ raceType: true });
                        setFieldValue('raceType', value, true);
                      }}
                      options={eventTypes}
                      error={!!(errors.raceType && (submitCount > 0 || touched.raceType))}
                    />
                    {errors.raceType && (submitCount > 0 || touched.raceType) ? (
                      <Label prompt pointing="above">
                        {errors.raceType}
                      </Label>
                    ) : null}
                  </Form.Field>
                  <Form.Field
                    control={Input}
                    label="Distance (KM/Laps/Meters)"
                    value={values.distance}
                    onChange={(e: any) => {
                      setTouched({ distance: true });
                      setFieldValue('distance', e.target.value, true);
                    }}
                    fluid={true}
                    required={true}
                    error={
                      errors.distance && (submitCount > 0 || touched.distance)
                        ? { content: errors.distance, pointing: 'above' }
                        : false
                    }
                  />
                  <Form.Group inline>
                    <label>Distance Unit</label>
                    <Form.Field
                      control={Radio}
                      label="KM"
                      value="km"
                      checked={values.distanceUnit === 'km'}
                      onChange={(e: any) => {
                        setTouched({ distanceUnit: true });
                        setFieldValue('distanceUnit', 'km', true);
                      }}
                    />
                    <Form.Field
                      control={Radio}
                      label="Laps (normally BMX, CX & MTB)"
                      value="laps"
                      checked={values.distanceUnit === 'laps'}
                      onChange={(e: any) => {
                        setTouched({ distanceUnit: true });
                        setFieldValue('distanceUnit', 'laps', true);
                      }}
                    />
                    <Form.Field
                      control={Radio}
                      label="Meters"
                      value="m"
                      checked={values.distanceUnit === 'm'}
                      onChange={(e: any) => {
                        setTouched({ distanceUnit: true });
                        setFieldValue('distanceUnit', 'm', true);
                      }}
                    />
                  </Form.Group>
                  <Form.Field
                    control={TextArea}
                    label="Notes"
                    value={values.notes}
                    onChange={(e: any) => {
                      setTouched({ notes: true });
                      setFieldValue('notes', e.target.value, true);
                    }}
                    fluid={true}
                    error={
                      errors.notes && (submitCount > 0 || touched.notes)
                        ? { content: errors.notes, pointing: 'above' }
                        : false
                    }
                  />
                  <Button icon="cancel" content="Cancel" onClick={handleCancel} />
                  <Button
                    icon="save"
                    content="Save"
                    primary={true}
                    onClick={submitForm}
                    disabled={!dirty || (dirty && !isValid)}
                  />
                </Form>
              </Segment>
            </Table.Cell>
          </Table.Row>
        );
      }}
    </Formik>
  ) : (
    <>
      <Modal dimmer="blurring" open={confirmModalVisble} onClose={() => isConfirmModalVisble(false)}>
        <Modal.Header>Confirm result deletion</Modal.Header>
        <Modal.Content>Are you sure you wish to delete this result? This action cannot be undone.</Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => isConfirmModalVisble(false)}>
            Cancel
          </Button>
          <Button
            positive
            onClick={() => {
              props.removeResultRow(props.index);
              isConfirmModalVisble(false);
            }}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
      <Table.Row>
        <Table.Cell verticalAlign="middle">
          {props.result.resultDate
            ? new Date(Date.parse(props.result.resultDate.toString())).toLocaleDateString('en-UK', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })
            : null}
        </Table.Cell>
        <Table.Cell verticalAlign="middle">{props.result.placing}</Table.Cell>
        <Table.Cell verticalAlign="middle">{props.result.numberOfStarters}</Table.Cell>
        <Table.Cell verticalAlign="middle">{props.result.numberOfFinishers}</Table.Cell>
        <Table.Cell verticalAlign="middle">{props.result.raceType}</Table.Cell>
        <Table.Cell verticalAlign="middle">{props.result.courseProfile}</Table.Cell>
        <Table.Cell verticalAlign="middle">{props.result.distance}</Table.Cell>
        <Table.Cell verticalAlign="middle">{props.result.timeBehind}</Table.Cell>
        <Table.Cell verticalAlign="middle">{props.result.notes || <>&nbsp;</>}</Table.Cell>
        <Table.Cell verticalAlign="middle" textAlign="right">
          <Button icon="edit" color="blue" basic onClick={handleEdit} />
          <Button icon="trash" color="red" basic onClick={() => isConfirmModalVisble(true)} />
        </Table.Cell>
      </Table.Row>
    </>
  );
};
