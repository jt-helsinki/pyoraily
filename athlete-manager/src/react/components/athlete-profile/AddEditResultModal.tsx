/*
 *
 * Copyright (c) Vaisala Oyj. All rights reserved.
 *
 */

import { ResultSchema } from '@src/model/schema/ResultSchema';
import { Formik, FormikProps } from 'formik';
import { COURSE_PROFILES, EVENT_TYPES } from 'pyoraily-shared-frontend/lib/constants';
import { DisciplineType, Result, SelectOptionType } from 'pyoraily-shared-frontend/model';
import React from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { Button, Dropdown, Form, Input, Label, Modal, Radio, TextArea } from 'semantic-ui-react';

interface AddEditResultModalProps {
  visible: boolean;
  discipline: DisciplineType | null;
  result: Result;
  onCancel: () => void;
  onSubmit: (result: Result) => void;
}

export const AddEditResultModal: React.FunctionComponent<AddEditResultModalProps> = (props) => {
  const eventTypes: SelectOptionType[] = props.discipline ? EVENT_TYPES[props.discipline] : [];
  const courseProfiles: SelectOptionType[] = props.discipline ? COURSE_PROFILES[props.discipline] : [];

  return props.visible ? (
    <Formik
      initialValues={props.result}
      validationSchema={ResultSchema}
      onSubmit={props.onSubmit}
      validateOnChange={true}
      validateOnBlur={true}
      enableReinitialize={true}>
      {(formik: FormikProps<Result>): React.ReactElement => {
        const { values, setFieldValue, submitForm, submitCount, errors, dirty, isValid, touched, setTouched } = formik;
        return (
          <Modal open={!!props.result} onClose={props.onCancel}>
            <Modal.Header>Add/Edit Result</Modal.Header>
            <Modal.Content>
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
                    const value = e.target.value;
                    const valueAsNumber = Number.isNaN(value) ? value : Number.parseInt(value, 10);
                    setFieldValue('numberOfStarters', valueAsNumber, true);
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
                    const value = e.target.value;
                    const valueAsNumber = Number.isNaN(value) ? value : Number.parseInt(value, 10);
                    setFieldValue('numberOfFinishers', valueAsNumber, true);
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
                    const value = e.target.value;
                    const valueAsNumber = Number.isNaN(value) ? value : Number.parseInt(value, 10);
                    setFieldValue('distance', valueAsNumber, true);
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
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button icon="cancel" content="Cancel" onClick={props.onCancel} />
              <Button
                icon="save"
                content="Save"
                primary={true}
                onClick={submitForm}
                disabled={!dirty || (dirty && !isValid)}
              />
            </Modal.Actions>
          </Modal>
        );
      }}
    </Formik>
  ) : null;
};
