/*
 *
 * MIT License.
 *
 */

import { AddEditEventModal } from '@src/react/components/athlete-profile/AddEditEventModal';
import { AddEditResultModal } from '@src/react/components/athlete-profile/AddEditResultModal';
import styles from '@src/react/components/athlete-profile/AthleteProfile.module.scss';
import { DisciplineType, Event, Result } from 'pyoraily-shared-frontend/model';
import React, { useEffect, useState } from 'react';
import { Button, Flag, Header, Modal, Segment, Table } from 'semantic-ui-react';

interface Props {
  events: Event[];
  year: number;
  onSaveEvent(event: Event, index: number): void;
  onRemoveEvent(index: number): void;
}

export const AthleteProfileEvents: React.FunctionComponent<Props> = (props: Props) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [eventIndex, setEventIndex] = useState<number>(-1);
  const [resultIndex, setResultIndex] = useState<number>(-1);
  const [confirmEventModalVisble, isConfirmEventModalVisble] = useState<boolean>(false);
  const [confirmResultModalVisble, isConfirmResultModalVisble] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'event' | 'result' | 'none'>('none');

  useEffect(() => {
    const eventsMapped = props.events.map((event, index) => ({
      ...event,
    }));
    setEvents(eventsMapped);
  }, [props.events.length]);

  const addEvent = () => {
    setModalMode('event');
    setEventIndex(-1);
    setResultIndex(-1);
    setResult(null);
    setEvent({
      name: '',
      country: '' as any,
      discipline: '' as DisciplineType,
      category: '',
      eventClass: '',
      eventDate: new Date(),
      notes: '',
      results: [],
      isEditable: true,
    });
  };

  const addResult = (eventIndex: number) => {
    setModalMode('result');
    setEventIndex(eventIndex);
    setResultIndex(-1);
    setEvent(events[eventIndex]);
    setResult({
      placing: null,
      distance: null,
      distanceUnit: 'km',
      numberOfStarters: null,
      numberOfFinishers: null,
      timeBehind: '',
      resultDate: new Date(),
      raceType: '',
      courseProfile: '',
      notes: '',
    } as any);
  };

  const editEvent = (index: number) => {
    setModalMode('event');
    setEventIndex(index);
    setResultIndex(-1);
    setEvent(events[index]);
  };

  const editResult = (eventIndex: number, resultIndex: number) => {
    setModalMode('result');
    setEventIndex(eventIndex);
    setResultIndex(resultIndex);
    setResult(events[eventIndex].results[resultIndex]);
  };

  const removeEventConfirmModal = (eventIndex: number) => {
    setEventIndex(eventIndex);
    setResultIndex(-1);
    isConfirmEventModalVisble(true);
    isConfirmResultModalVisble(false);
  };

  const removeResultConfirmModal = (eventIndex: number, resultIndex: number) => {
    setEventIndex(eventIndex);
    setResultIndex(resultIndex);
    isConfirmEventModalVisble(false);
    isConfirmResultModalVisble(true);
  };

  const removeEvent = () => {
    const newEvents = events.filter((_, i) => i !== eventIndex);
    setEvents(newEvents);
    props.onRemoveEvent(eventIndex);
    onCancelEventOrResult();
  };

  const removeResult = () => {
    const newEvent = { ...events[eventIndex] };
    newEvent.results = newEvent.results.filter((_, i) => i !== resultIndex);
    const newEvents = [...events];
    newEvents[eventIndex] = newEvent;
    setEvents(newEvents);
    onSaveEvent(eventIndex, newEvent);
    onCancelEventOrResult();
  };

  const onSaveEvent = (eventIndex: number, event: Event) => {
    const newEvents = [...events];
    if (eventIndex === -1) {
      newEvents.push(event);
    } else {
      newEvents[eventIndex] = event;
    }
    newEvents.sort((a: any, b: any) => a.eventDate - b.eventDate);
    setEvents(newEvents);
    props.onSaveEvent(event, eventIndex);
    onCancelEventOrResult();
  };

  const onSaveResult = (eventIndex: number, resultIndex: number, result: Result) => {
    const newEvent = { ...events[eventIndex] };
    newEvent.results = [...newEvent.results];

    if (resultIndex === -1) {
      newEvent.results.push(result);
    } else {
      newEvent.results[resultIndex] = result;
    }
    newEvent.results.sort((a: any, b: any) => a.resultDate - b.resultDate);

    const newEvents = [...events];
    newEvents[eventIndex] = newEvent;
    onSaveEvent(eventIndex, newEvent);
  };

  const onCancelEventOrResult = () => {
    setModalMode('none');
    setResult(null);
    setEvent(null);
    setEventIndex(-1);
    setResultIndex(-1);
    isConfirmEventModalVisble(false);
    isConfirmResultModalVisble(false);
  };

  return (
    <Segment>
      <Header as="h3">My events and results for {props.year}</Header>
      <p>
        For each discipline for which you wish to be considered for nomination to a national team, please fill out and
        maintain the following table. Do not enter club, regional or local events here in Finland. Events not entered
        here will be considered unreported and will not be taken into consideration for national team selection.
      </p>
      <AddEditEventModal
        visible={modalMode === 'event' && event !== null}
        event={event as Event}
        onCancel={onCancelEventOrResult}
        onSubmit={(event: Event) => {
          onSaveEvent(eventIndex, event);
        }}
      />
      <AddEditResultModal
        visible={modalMode === 'result' && result !== null}
        discipline={event?.discipline || null}
        result={result as Result}
        onCancel={onCancelEventOrResult}
        onSubmit={(result: Result) => onSaveResult(eventIndex, resultIndex, result)}
      />
      <Modal dimmer="blurring" open={confirmEventModalVisble} onClose={onCancelEventOrResult}>
        <Modal.Header>Confirm event deletion</Modal.Header>
        <Modal.Content>Are you sure you wish to delete this event? This action cannot be undone.</Modal.Content>
        <Modal.Actions>
          <Button negative onClick={onCancelEventOrResult}>
            Cancel
          </Button>
          <Button positive onClick={removeEvent}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal dimmer="blurring" open={confirmResultModalVisble} onClose={onCancelEventOrResult}>
        <Modal.Header>Confirm result deletion</Modal.Header>
        <Modal.Content>Are you sure you wish to delete this result? This action cannot be undone.</Modal.Content>
        <Modal.Actions>
          <Button negative onClick={onCancelEventOrResult}>
            Cancel
          </Button>
          <Button positive onClick={removeResult}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
      <Button icon="calendar" content="Add" color="green" onClick={addEvent} />
      {events.map((eventRow, eventIndex) => (
        <>
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
                {eventRow.eventDate
                  ? new Date(Date.parse(eventRow.eventDate.toString())).toLocaleDateString('en-UK', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })
                  : null}
              </Table.Cell>
              <Table.Cell verticalAlign="middle" colSpan="2">
                {eventRow.name}
              </Table.Cell>
              <Table.Cell verticalAlign="middle">
                <Flag name={eventRow.country} />
              </Table.Cell>
              <Table.Cell verticalAlign="middle">{eventRow.discipline}</Table.Cell>
              <Table.Cell verticalAlign="middle">{eventRow.category}</Table.Cell>
              <Table.Cell verticalAlign="middle">{eventRow.eventClass?.replace(':', ' ')}</Table.Cell>
              <Table.Cell verticalAlign="middle" colSpan="2">
                {eventRow.notes || <>&nbsp;</>}
              </Table.Cell>
              <Table.Cell verticalAlign="middle" textAlign="right">
                <Button icon="edit" color="blue" basic onClick={() => editEvent(eventIndex)} />
                <Button icon="trash" color="red" basic onClick={() => removeEventConfirmModal(eventIndex)} />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell verticalAlign="middle" colSpan="8">
                <strong>Results</strong>
              </Table.Cell>
              <Table.Cell verticalAlign="top" colSpan="2" textAlign="right">
                <Button icon="trophy" content="Add" color="green" onClick={() => addResult(eventIndex)} />
              </Table.Cell>
            </Table.Row>
            {eventRow?.results.length ? (
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
            {eventRow?.results.map((result: Result, resultIndex) => (
              <Table.Row key={`${eventIndex}-${resultIndex}`}>
                <Table.Cell verticalAlign="middle">
                  {result.resultDate
                    ? new Date(Date.parse(result.resultDate.toString())).toLocaleDateString('en-UK', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })
                    : null}
                </Table.Cell>
                <Table.Cell verticalAlign="middle">{result.placing}</Table.Cell>
                <Table.Cell verticalAlign="middle">{result.numberOfStarters}</Table.Cell>
                <Table.Cell verticalAlign="middle">{result.numberOfFinishers}</Table.Cell>
                <Table.Cell verticalAlign="middle">{result.raceType}</Table.Cell>
                <Table.Cell verticalAlign="middle">{result.courseProfile}</Table.Cell>
                <Table.Cell verticalAlign="middle">{result.distance}</Table.Cell>
                <Table.Cell verticalAlign="middle">{result.timeBehind}</Table.Cell>
                <Table.Cell verticalAlign="middle">{result.notes || <>&nbsp;</>}</Table.Cell>
                <Table.Cell verticalAlign="middle" textAlign="right">
                  <Button icon="edit" color="blue" basic onClick={() => editResult(eventIndex, resultIndex)} />
                  <Button
                    icon="trash"
                    color="red"
                    basic
                    onClick={() => removeResultConfirmModal(eventIndex, resultIndex)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table>
        </>
      ))}
      {events.length ? <Button icon="calendar" content="Add" color="green" onClick={addEvent} /> : null}
    </Segment>
  );
};
