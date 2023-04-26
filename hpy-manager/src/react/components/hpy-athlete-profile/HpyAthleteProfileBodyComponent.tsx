/*
 *
 * Copyright (c) Vaisala Oyj. All rights reserved.
 *
 */
import { AthleteProfile, Event, Result } from 'pyoraily-shared-frontend/model';
import { Flag, Table } from 'semantic-ui-react';
import styles from './HpyAthleteProfile.module.scss';

interface Props {
  athleteProfile: AthleteProfile | null;
}

export const HpyAthleteProfileBodyComponent = (props: Props): React.ReactElement => {
  return (
    <>
      {props.athleteProfile?.events.length ? (
        props.athleteProfile?.events.map((event: Event) => (
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
            </Table.Header>
            <Table.Row>
              <Table.Cell verticalAlign="middle">
                {event.eventDate
                  ? new Date(Date.parse(event.eventDate.toString())).toLocaleDateString('en-UK', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })
                  : null}
              </Table.Cell>
              <Table.Cell verticalAlign="middle" colSpan="2">
                {event.name}
              </Table.Cell>
              <Table.Cell verticalAlign="middle">
                <Flag name={event.country} />
              </Table.Cell>
              <Table.Cell verticalAlign="middle">{event.discipline}</Table.Cell>
              <Table.Cell verticalAlign="middle">{event.category}</Table.Cell>
              <Table.Cell verticalAlign="middle">{event.eventClass.replace(':', ' ')}</Table.Cell>
              <Table.Cell verticalAlign="middle" colSpan="2">
                {event.notes || <>&nbsp;</>}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell verticalAlign="middle" colSpan="8">
                <strong>Results</strong>
              </Table.Cell>
            </Table.Row>
            {event.results.length ? (
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
              </Table.Row>
            ) : null}
            {event.results.length ? (
              event.results.map((result: Result, index) => (
                <Table.Row>
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
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell verticalAlign="middle" colSpan="8">
                  No results recorded
                </Table.Cell>
              </Table.Row>
            )}
          </Table>
        ))
      ) : (
        <Table color="blue" stackable={true} fixed={true}>
          <Table.Row>
            <Table.Cell verticalAlign="middle" colSpan="8">
              No events recorded
            </Table.Cell>
          </Table.Row>
        </Table>
      )}
    </>
  );
};
