/*
 *
 * MIT License.
 *
 */

import { AthleteProfileDisciplineNomination } from '@src/react/components/athlete-profile/AthleteProfileDisciplineNominationComponent';
import { AthleteProfileEvents } from '@src/react/components/athlete-profile/AthleteProfileEventsComponent';
import { useAthleteManagerStateStore } from '@src/react/hooks/state/client/userProfileStateStore';
import {
  useFetchAthleteProfileServerStateStore,
  useUpsertAthleteProfileServerStateStore,
} from '@src/react/hooks/state/server/useAthleteManagerServerStateStore';
import { requestEvent, RequestEventType } from 'pyoraily-shared-frontend/events';
import { YEARS } from 'pyoraily-shared-frontend/lib/constants';
import { AthleteProfile, Event } from 'pyoraily-shared-frontend/model';
import { User } from 'pyoraily-shared-frontend/model/User';
import React, { useState } from 'react';
import { Dimmer, Loader, Menu } from 'semantic-ui-react';

export const AthleteProfileContainer: React.FunctionComponent = (): React.ReactElement => {
  const [year, setYear] = useState<number>(2023);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { data: athleteProfile, isFetching, isLoading, refetch } = useFetchAthleteProfileServerStateStore(Number(year));
  const { mutateAsync } = useUpsertAthleteProfileServerStateStore();
  const userProfile: User = useAthleteManagerStateStore('userProfile');

  const onNominatedDisciplinesSave = (nominatedCategory: string, nominatedDisciplines: string[]) => {
    const newAthleteProfile: AthleteProfile = {
      ...((athleteProfile as AthleteProfile) || ({} as AthleteProfile)),
      year: Number(year),
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      gender: userProfile.gender as any,
      yearOfBirth: userProfile.yearOfBirth,
      nominatedCategory,
      nominatedDisciplines,
    };
    const toasterId = Date.now().toString();
    mutateAsync(newAthleteProfile).then(() => {
      requestEvent({
        eventType: RequestEventType.TOASTER_NOTIFICATION_REQUEST,
        id: toasterId,
        message: 'Nominated disciplines saved',
        type: 'info',
        autoDismiss: true,
      });
      refetch();
    });
  };

  const onRemoveEvent = (index: number): void => {
    const newAthleteProfile: AthleteProfile = {
      ...((athleteProfile as AthleteProfile) || ({} as AthleteProfile)),
      events: athleteProfile?.events.filter((_, i) => i !== index) || [],
    };
    const toasterId = Date.now().toString();
    mutateAsync(newAthleteProfile).then(() => {
      requestEvent({
        eventType: RequestEventType.TOASTER_NOTIFICATION_REQUEST,
        id: toasterId,
        message: 'Event changes saved',
        type: 'info',
        autoDismiss: true,
      });
      refetch();
    });
  };

  const onSaveEvent = (event: Event, index: number): void => {
    const newEvents = [...(athleteProfile?.events || [])];
    if (index === -1) {
      newEvents.push(event);
    } else {
      newEvents[index] = event;
    }

    const newAthleteProfile: AthleteProfile = {
      ...((athleteProfile as AthleteProfile) || ({} as AthleteProfile)),
      nominatedCategory: athleteProfile?.nominatedCategory || '',
      nominatedDisciplines: athleteProfile?.nominatedDisciplines || [],
      year: Number(year),
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      gender: userProfile.gender as any,
      yearOfBirth: userProfile.yearOfBirth,
      events: newEvents.sort((a: any, b: any) => {
        return a.eventDate - b.eventDate;
      }),
    };
    const toasterId = Date.now().toString();
    mutateAsync(newAthleteProfile).then(() => {
      requestEvent({
        eventType: RequestEventType.TOASTER_NOTIFICATION_REQUEST,
        id: toasterId,
        message: 'Event changes saved',
        type: 'info',
        autoDismiss: true,
      });
      refetch();
    });
  };

  if (isLoading) {
    return (
      <Dimmer active={isLoading}>
        <Loader>Loading athlete profile</Loader>
      </Dimmer>
    );
  }

  const handleItemClick = (e: any, { name }: any) => setYear(Number(name));

  const yearMenuItems = YEARS.map((yearObject) => {
    return (
      <Menu.Item
        key={yearObject.key}
        name={String(yearObject.text)}
        active={yearObject.value === year}
        onClick={handleItemClick}>
        {yearObject.text}
      </Menu.Item>
    );
  });

  return (
    <div>
      <Menu secondary={true}>{yearMenuItems}</Menu>
      <Dimmer active={isSubmitting}>
        <Loader>Saving</Loader>
      </Dimmer>
      <AthleteProfileDisciplineNomination
        nominatedCategory={athleteProfile?.nominatedCategory || ''}
        nominatedDisciplines={athleteProfile?.nominatedDisciplines || []}
        year={year}
        onSubmit={(nominatedCategory: string, nominatedDisciplines: string[]) =>
          onNominatedDisciplinesSave(nominatedCategory, nominatedDisciplines)
        }
      />
      <AthleteProfileEvents
        events={athleteProfile?.events || []}
        year={year}
        onSaveEvent={onSaveEvent}
        onRemoveEvent={onRemoveEvent}
      />
    </div>
  );
};
