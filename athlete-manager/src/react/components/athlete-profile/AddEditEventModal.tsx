/*
 *
 * Copyright (c) Vaisala Oyj. All rights reserved.
 *
 */

import { EventSchema } from '@src/model/schema/EventSchema';
import { Formik, FormikProps } from 'formik';
import {
  CATEGORIES,
  CLASSES,
  COUNTRIES_COMMON,
  COUNTRIES_MOST_COMMON,
  COUNTRIES_UNCOMMON,
  DISCIPLINES,
} from 'pyoraily-shared-frontend/lib/constants';
import { Event } from 'pyoraily-shared-frontend/model/Event';
import React from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { Button, Dropdown, Form, Input, Label, Modal, Select, TextArea } from 'semantic-ui-react';

interface AddEditEventModalProps {
  visible: boolean;
  event: Event;
  onCancel: () => void;
  onSubmit: (event: Event) => void;
}

export const AddEditEventModal: React.FunctionComponent<AddEditEventModalProps> = (props) => {
  return props.visible ? (
    <Formik
      initialValues={props.event}
      validationSchema={EventSchema}
      onSubmit={props.onSubmit}
      validateOnChange={true}
      validateOnBlur={true}
      enableReinitialize={true}>
      {(formik: FormikProps<Event>): React.ReactElement => {
        const { values, setFieldValue, submitForm, submitCount, errors, dirty, isValid, touched, setTouched } = formik;
        return (
          <Modal open={!!props.event} onClose={props.onCancel}>
            <Modal.Header>Add/Edit Event</Modal.Header>
            <Modal.Content>
              <Form>
                <Form.Field required={true}>
                  <label>Event date</label>
                  <SemanticDatepicker
                    value={new Date(Date.parse(values.eventDate.toString()))}
                    datePickerOnly={true}
                    required={true}
                    onChange={(e: any, { value }: any) => {
                      setTouched({ eventDate: true });
                      setFieldValue('eventDate', value as any, true);
                    }}
                    error={
                      errors.eventDate && (submitCount > 0 || touched.eventDate)
                        ? { content: errors.eventDate, pointing: 'above' }
                        : false
                    }
                  />
                </Form.Field>
                <Form.Field
                  control={Input}
                  label="Event name"
                  value={values.name}
                  onChange={(e: any, { value }: any) => {
                    setTouched({ name: true });
                    setFieldValue('name', value, true);
                  }}
                  fluid={true}
                  required={true}
                  error={
                    errors.name && (submitCount > 0 || touched.name)
                      ? { content: errors.name, pointing: 'above' }
                      : false
                  }
                />
                <Form.Field required={true}>
                  <label>Country</label>
                  <Dropdown
                    label="Country"
                    placeholder="Country"
                    value={values.country}
                    selection={true}
                    fluid={true}
                    search={true}
                    onChange={(e: any, { value }: any) => {
                      setTouched({ country: true });
                      setFieldValue('country', value, true);
                    }}
                    options={[...COUNTRIES_MOST_COMMON, ...COUNTRIES_COMMON, ...COUNTRIES_UNCOMMON]}
                    error={!!(errors.country && (submitCount > 0 || touched.country))}
                  />
                  {errors.country && (submitCount > 0 || touched.country) ? (
                    <Label prompt pointing="above">
                      {errors.country}
                    </Label>
                  ) : null}
                </Form.Field>
                <Form.Field
                  control={Select}
                  label="Discipline"
                  options={DISCIPLINES}
                  value={values.discipline}
                  onChange={(e: any, { value }: any) => {
                    setTouched({ discipline: true });
                    setFieldValue('discipline', value as string, true);
                  }}
                  fluid={true}
                  required={true}
                  error={
                    errors.discipline && (submitCount > 0 || touched.discipline)
                      ? { content: errors.discipline, pointing: 'above' }
                      : false
                  }
                />
                <Form.Field
                  control={Select}
                  label="Category"
                  options={CATEGORIES}
                  value={values.category}
                  onChange={(e: any, { value }: any) => {
                    setTouched({ category: true });
                    setFieldValue('category', value as string, true);
                  }}
                  fluid={true}
                  required={true}
                  error={
                    errors.category && (submitCount > 0 || touched.category)
                      ? { content: errors.category, pointing: 'above' }
                      : false
                  }
                />
                <Form.Field
                  control={Select}
                  label="Class"
                  options={CLASSES}
                  value={values.eventClass}
                  onChange={(e: any, { value }: any) => {
                    setTouched({ eventClass: true });
                    setFieldValue('eventClass', value as string, true);
                  }}
                  fluid={true}
                  required={true}
                  error={
                    errors.eventClass && (submitCount > 0 || touched.eventClass)
                      ? { content: errors.eventClass, pointing: 'above' }
                      : false
                  }
                />
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
