/*
 *
 * MIT License.
 *
 */

import { EventSchema } from '@src/model/schema/EventSchema';
import { ResultTableRow } from '@src/react/components/athlete-profile/ResultTableRow';
import { Formik, FormikProps } from 'formik';
import {
  CATEGORIES,
  CLASSES,
  COUNTRIES_COMMON,
  COUNTRIES_MOST_COMMON,
  COUNTRIES_NO_COMMON,
  DISCIPLINES,
} from 'pyoraily-shared-frontend/lib/constants';
import { Event, Result } from 'pyoraily-shared-frontend/model';
import React, { useEffect, useState } from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { Button, Dropdown, Flag, Form, Input, Label, Modal, Segment, Select, Table, TextArea } from 'semantic-ui-react';
import styles from './AthleteProfile.module.scss';

interface Props {
  isCreatingNewEvent: boolean;
  event: Event;
  index: number;
  removeEventRow: (index: number) => void;
  saveEventRow: (index: number, event: Event) => void;
}

export const EventTableRow: React.FunctionComponent<Props> = (props: Props) => {
  const [results, setResults] = useState<Result[]>(props.event.results || []);
  const [isEditable, setIsEditable] = useState(props.event.isEditable || false);
  const [creatingNewResult, isCreatingNewResult] = useState<boolean>(false);
  const [confirmModalVisble, isConfirmModalVisble] = useState<boolean>(false);
  useEffect(() => {
    const events = props.event.results.map((result: Result) => ({
      ...result,
    }));
    setResults(events);
  }, [props.event.results.length]);

  const addResultRow = () => {
    isCreatingNewResult(true);
    setResults([
      ...results,
      {
        resultDate: new Date(),
        raceType: '',
        courseProfile: '',
        distance: null,
        distanceUnit: 'km',
        timeBehind: '',
        placing: null,
        numberOfStarters: null,
        numberOfFinishers: null,
        notes: '',
        isEditable: true,
      } as any,
    ]);
  };

  const removeResultRow = (index: number) => {
    const newResults = results.filter((_, i) => i !== index);
    const newEvent: Event = {
      ...props.event,
      results: newResults,
    };
    isCreatingNewResult(false);
    setResults(newResults);
    props.saveEventRow(props.index, newEvent);
  };

  const onSaveResult = (index: number, result: Result) => {
    const newResults = [...results];
    newResults[index] = result;
    const newEvent: Event = {
      ...props.event,
      results: newResults,
    };
    isCreatingNewResult(false);
    setResults(newResults);
    props.saveEventRow(props.index, newEvent);
  };

  const handleEditEvent = (): void => {
    setIsEditable(true);
  };

  const handleSaveEvent = (event: Event): void => {
    setIsEditable(false);
    delete event.isEditable;
    props.saveEventRow(props.index, event);
  };

  const handleCancelEvent = (): void => {
    setIsEditable(false);
    if (props.isCreatingNewEvent) {
      props.removeEventRow(props.index);
    }
  };

  return isEditable ? (
    <Formik
      initialValues={props.event}
      validationSchema={EventSchema}
      onSubmit={handleSaveEvent}
      validateOnChange={true}
      validateOnBlur={true}
      enableReinitialize={true}>
      {(formik: FormikProps<Event>): React.ReactElement => {
        const { values, setFieldValue, submitForm, submitCount, errors, dirty, isValid, touched, setTouched } = formik;
        return (
          <Table stackable={true} fixed={true}>
            <Table.Row>
              <Table.Cell verticalAlign="middle">
                <Segment raised={true}>
                  <Form>
                    <Form.Field required={true}>
                      <label>Event date</label>
                      <SemanticDatepicker
                        value={new Date(Date.parse(values.eventDate.toString()))}
                        datePickerOnly={true}
                        required={true}
                        onChange={(e: any, eventData) => {
                          setTouched({ eventDate: true });
                          setFieldValue('eventDate', eventData.value as any, true);
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
                      onChange={(e: any) => {
                        setTouched({ name: true });
                        setFieldValue('name', e.target.value, true);
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
                        options={[...COUNTRIES_MOST_COMMON, ...COUNTRIES_COMMON, ...COUNTRIES_NO_COMMON]}
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
                    <Button icon="cancel" content="Cancel" onClick={handleCancelEvent} />
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
          </Table>
        );
      }}
    </Formik>
  ) : (
    <>
      <Modal dimmer="blurring" open={confirmModalVisble} onClose={() => isConfirmModalVisble(false)}>
        <Modal.Header>Confirm event deletion</Modal.Header>
        <Modal.Content>Are you sure you wish to delete this event? This action cannot be undone.</Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => isConfirmModalVisble(false)}>
            Cancel
          </Button>
          <Button
            positive
            onClick={() => {
              props.removeEventRow(props.index);
              isConfirmModalVisble(false);
            }}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
      <Table color="blue" stackable={true} fixed={true}>
        <Table.Header>
          <Table.HeaderCell verticalAlign="middle">Date</Table.HeaderCell>
          <Table.HeaderCell verticalAlign="middle" colSpan="2">
            Event
          </Table.HeaderCell>
          <Table.HeaderCell verticalAlign="middle">Country</Table.HeaderCell>
          <Table.HeaderCell verticalAlign="middle">Discipline</Table.HeaderCell>
          <Table.HeaderCell verticalAlign="middle">Category</Table.HeaderCell>
          <Table.HeaderCell verticalAlign="middle">Event class</Table.HeaderCell>
          <Table.HeaderCell verticalAlign="middle" colSpan="2">
            Notes
          </Table.HeaderCell>
          <Table.HeaderCell verticalAlign="middle" />
        </Table.Header>
        <Table.Row>
          <Table.Cell verticalAlign="middle">
            {props.event.eventDate
              ? new Date(Date.parse(props.event.eventDate.toString())).toLocaleDateString('en-UK', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })
              : null}
          </Table.Cell>
          <Table.Cell verticalAlign="middle" colSpan="2">
            {props.event.name}
          </Table.Cell>
          <Table.Cell verticalAlign="middle">
            <Flag name={props.event.country} />
          </Table.Cell>
          <Table.Cell verticalAlign="middle">{props.event.discipline}</Table.Cell>
          <Table.Cell verticalAlign="middle">{props.event.category}</Table.Cell>
          <Table.Cell verticalAlign="middle">{props.event.eventClass.replace(':', ' ')}</Table.Cell>
          <Table.Cell verticalAlign="middle" colSpan="2">
            {props.event.notes || <>&nbsp;</>}
          </Table.Cell>
          <Table.Cell verticalAlign="middle" textAlign="right">
            <Button icon="edit" color="blue" basic onClick={handleEditEvent} />
            <Button icon="trash" color="red" basic onClick={() => isConfirmModalVisble(true)} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell verticalAlign="middle" colSpan="8">
            <strong>Results</strong>
          </Table.Cell>
          <Table.Cell verticalAlign="top" colSpan="2" textAlign="right">
            <Button icon="trophy" content="Add" color="green" onClick={addResultRow} />
          </Table.Cell>
        </Table.Row>
        {results.length ? (
          <Table.Row className={styles.headerRow}>
            <Table.Cell verticalAlign="middle" className={styles.headerCell}>
              Date
            </Table.Cell>
            <Table.Cell verticalAlign="middle" className={styles.headerCell}>
              Placing
            </Table.Cell>
            <Table.Cell verticalAlign="middle" className={styles.headerCell}>
              #Starters
            </Table.Cell>
            <Table.Cell verticalAlign="middle" className={styles.headerCell}>
              #Finishers
            </Table.Cell>
            <Table.Cell verticalAlign="middle" className={styles.headerCell}>
              Type
            </Table.Cell>
            <Table.Cell verticalAlign="middle" className={styles.headerCell}>
              Profile
            </Table.Cell>
            <Table.Cell verticalAlign="middle" className={styles.headerCell}>
              Distance
            </Table.Cell>
            <Table.Cell verticalAlign="middle" className={styles.headerCell}>
              Behind
            </Table.Cell>
            <Table.Cell verticalAlign="middle" className={styles.headerCell}>
              Notes
            </Table.Cell>
            <Table.Cell verticalAlign="middle" className={styles.headerCell} />
          </Table.Row>
        ) : null}
        {results.length ? (
          results.map((result: Result, index) => (
            <ResultTableRow
              isCreatingNewResult={creatingNewResult}
              key={index}
              index={index}
              result={result}
              discipline={props.event.discipline}
              removeResultRow={removeResultRow}
              saveResultRow={onSaveResult}
            />
          ))
        ) : (
          <Table.Row>
            <Table.Cell verticalAlign="middle" colSpan="10">
              No results recorded
            </Table.Cell>
          </Table.Row>
        )}
      </Table>
    </>
  );
};
