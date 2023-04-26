/*
 *
 * MIT License.
 *
 */

import { DisciplineType, Event } from 'pyoraily-shared-frontend/model';
import { EventTableRow } from '@src/react/components/athlete-profile/EventTableRow';
import React, { useEffect, useState } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';

interface Props {
  events: Event[];
  year: number;
  onSubmit(event: Event[]): void;
}

export const AthleteProfileEvents: React.FunctionComponent<Props> = (props: Props) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [creatingNewEvent, isCreatingNewEvent] = useState<boolean>(false);

  useEffect(() => {
    const eventsMapped = props.events.map((event, index) => ({
      ...event,
    }));
    setEvents(eventsMapped);
  }, [props.events.length]);

  const addEventRow = () => {
    isCreatingNewEvent(true);
    setEvents([
      ...events,
      {
        name: '',
        country: '' as any,
        discipline: '' as DisciplineType,
        category: '',
        eventClass: '',
        eventDate: new Date(),
        notes: '',
        results: [],
        isEditable: true,
      },
    ]);
  };

  const removeEventRow = (index: number) => {
    isCreatingNewEvent(false);
    const newEvents = events.filter((_, i) => i !== index);
    setEvents(newEvents);
    props.onSubmit(newEvents);
  };

  const onSaveEvent = (index: number, event: Event) => {
    const newEvents = [...events];
    newEvents[index] = event;
    isCreatingNewEvent(false);
    setEvents(newEvents);
    props.onSubmit(newEvents);
  };

  return (
    <Segment>
      <Header as="h3">My events and results for {props.year}</Header>
      <p>
        For each discipline for which you wish to be considered for nomination to a national team, please fill out and
        maintain the following table. Do not enter club, regional or local events here in Finland. Events not entered
        here will be considered unreported and will not be taken into consideration for national team selection.
      </p>

      <Button icon="calendar" content="Add" color="green" onClick={addEventRow} />
      {events.map((row, i) => (
        <EventTableRow
          isCreatingNewEvent={creatingNewEvent}
          key={`row-${i}`}
          event={row}
          index={i}
          removeEventRow={removeEventRow}
          saveEventRow={onSaveEvent}
        />
      ))}
      {events.length ? <Button icon="calendar" content="Add" color="green" onClick={addEventRow} /> : null}
    </Segment>
  );
};
