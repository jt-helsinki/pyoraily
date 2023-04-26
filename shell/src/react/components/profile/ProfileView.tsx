/*
 *
 * MIT License.
 *
 */
import * as UserUtils from 'pyoraily-shared-frontend/utils/UserUtils';
import { User } from 'pyoraily-shared-frontend/model/User';
import { UserRole } from 'pyoraily-shared-frontend/model/UserRole';
import * as UserComponentUtils from '@src/react/components/common/UserComponentUtils';
import * as React from 'react';
import { Button, Grid, Header, Icon } from 'semantic-ui-react';
import { stringToSentenceCase } from 'pyoraily-shared-frontend/utils/StringUtils';

interface Props {
  user: User;

  userRoles: UserRole[];

  onEdit: () => void;
}

export const ProfileView = (props: Props): React.ReactElement => {
  const isAthlete: boolean = UserUtils.doUserRolesIntersectRequiredUserRoles(props.userRoles, [UserRole.ATHLETE]);
  return (
    <>
      <Header as="h3">Your profile information.</Header>
      <Grid>
        <Grid.Row>
          <Grid.Column>{UserComponentUtils.userRolesToTags(props.userRoles)}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <p>
              <Icon name="user outline" />
            </p>
          </Grid.Column>
          <Grid.Column width={4}>
            <p>{props.user.firstName || 'No first name set.'}</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <p>
              <Icon name="user" />
            </p>
          </Grid.Column>
          <Grid.Column width={4}>
            <p>{props.user.lastName || 'No last name set.'}</p>
          </Grid.Column>
        </Grid.Row>
        {isAthlete ? (
          <>
            <Grid.Row>
              <Grid.Column>
                <p>
                  <Icon name="heterosexual" />
                </p>
              </Grid.Column>
              <Grid.Column width={4}>
                <p>{stringToSentenceCase((props.user.gender && props.user.gender) || 'No gender set.')}</p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <p>
                  <Icon name="birthday cake" />
                </p>
              </Grid.Column>
              <Grid.Column width={4}>
                <p>{props.user.yearOfBirth || 'No year of birth set.'}</p>
              </Grid.Column>
            </Grid.Row>
          </>
        ) : null}
        <Grid.Row>
          <Grid.Column>
            <p>
              <Icon name="mail" />
            </p>
          </Grid.Column>
          <Grid.Column width={4}>
            <p>{props.user.email || 'No email set.'}</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <p>
              <Icon name="id badge" />
            </p>
          </Grid.Column>
          <Grid.Column width={4}>
            <p>{props.user.uciId || 'No UCI ID set.'}</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Button primary={true} onClick={props.onEdit}>
              Update
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};
