/*
 *
 * MIT License.
 *
 */
import { HpyAthleteProfileBodyComponent } from '@src/react/components/hpy-athlete-profile/HpyAthleteProfileBodyComponent';
import { useFetchAthleteProfilesServerStateStore } from '@src/react/hooks/state/server/useAthleteManagerServerStateStore';
import { CATEGORIES, DISCIPLINES, GENDERS, EMPTY_OPTION, YEARS } from 'pyoraily-shared-frontend/lib/constants';
import { AthleteProfile } from 'pyoraily-shared-frontend/model';
import { stringToSentenceCase } from 'pyoraily-shared-frontend/utils/StringUtils';
import { useState } from 'react';
import { Button, Dimmer, Dropdown, Form, Grid, Header, Loader, Modal, Table } from 'semantic-ui-react';

export const HpyAthleteProfileListContainer: React.FunctionComponent = (): React.ReactElement => {
  const [selectedAthleteProfile, setSelectedAthleteProfile] = useState<AthleteProfile | null>(null);
  const [visible, setVisible] = useState(false);
  const [year, setYear] = useState<number>(new Date(Date.now()).getFullYear());
  const [yearFilter, setYearFilter] = useState<number>(year);
  const [discipline, setDiscipline] = useState<string>('-');
  const [disciplineFilter, setDisciplineFilter] = useState<string>(discipline);
  const [category, setCategory] = useState<string>('-');
  const [categoryFilter, setCategoryFilter] = useState<string>(category);
  const [gender, setGender] = useState<string>('-');
  const [genderFilter, setGenderFilter] = useState<string>(gender);
  const { data: athleteProfiles, isFetching } = useFetchAthleteProfilesServerStateStore(
    Number(yearFilter),
    disciplineFilter,
    categoryFilter,
    genderFilter
  );

  const filter = () => {
    setYearFilter(year);
    setDisciplineFilter(discipline);
    setCategoryFilter(category);
    setGenderFilter(gender);
  };

  return (
    <div>
      <Header as="h3">Athlete profiles</Header>
      <p>Athletes profiles with team nominations, events and results</p>
      <Form>
        <Grid>
          <Grid.Row columns={4}>
            <Grid.Column>
              <Form.Field required={true}>
                <label>Year</label>
                <Dropdown
                  placeholder="Year"
                  multiple={false}
                  value={year}
                  fluid={true}
                  selection={true}
                  onChange={(e: any, { value }: any) => setYear(value as any)}
                  options={[EMPTY_OPTION, ...YEARS]}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field required={true}>
                <label>Disciplines</label>
                <Dropdown
                  placeholder="Disciplines"
                  multiple={false}
                  value={discipline}
                  fluid={true}
                  selection={true}
                  onChange={(e: any, { value }: any) => setDiscipline(value as any)}
                  options={[EMPTY_OPTION, ...DISCIPLINES]}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field required={true}>
                <label>Gender</label>
                <Dropdown
                  placeholder="Gender"
                  multiple={false}
                  value={gender}
                  fluid={true}
                  selection={true}
                  onChange={(e: any, { value }: any) => setGender(value as any)}
                  options={[EMPTY_OPTION, ...GENDERS]}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field required={true}>
                <label>Category</label>
                <Dropdown
                  placeholder="Category"
                  multiple={false}
                  value={category}
                  fluid={true}
                  selection={true}
                  onChange={(e: any, { value }: any) => setCategory(value as any)}
                  options={[EMPTY_OPTION, ...CATEGORIES]}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form.Button onClick={filter}>Filter</Form.Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>

      <Table celled={true} color="blue" stackable={true} fixed={true}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Birth year</Table.HeaderCell>
            <Table.HeaderCell>Discipline</Table.HeaderCell>
            <Table.HeaderCell>Year</Table.HeaderCell>
            <Table.HeaderCell>&nbsp;</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {athleteProfiles?.length ? (
            athleteProfiles?.map((athleteProfile: AthleteProfile) => {
              return (
                <Table.Row>
                  <Table.Cell>
                    {athleteProfile.firstName} {athleteProfile.lastName}
                  </Table.Cell>
                  <Table.Cell>{stringToSentenceCase(athleteProfile.gender)}</Table.Cell>
                  <Table.Cell>{athleteProfile.nominatedCategory}</Table.Cell>
                  <Table.Cell>{athleteProfile.yearOfBirth}</Table.Cell>
                  <Table.Cell>{discipline}</Table.Cell>
                  <Table.Cell>{athleteProfile.year}</Table.Cell>
                  <Table.Cell textAlign="center" verticalAlign="top">
                    <Button
                      icon="eye"
                      content="View"
                      color="green"
                      onClick={() => {
                        setSelectedAthleteProfile(athleteProfile);
                        setVisible(true);
                      }}
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })
          ) : (
            <Table.Row>
              <Table.Cell verticalAlign="middle" colSpan="7">
                No results found
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <Modal onClose={() => setVisible(false)} onOpen={() => setVisible(true)} open={visible}>
        <Modal.Header>
          {selectedAthleteProfile?.firstName} {selectedAthleteProfile?.lastName}
        </Modal.Header>
        <Modal.Content>
          <HpyAthleteProfileBodyComponent athleteProfile={selectedAthleteProfile} />
        </Modal.Content>
        <Modal.Actions>
          <Button icon="cancel" content="Cancel" onClick={() => setVisible(false)} />
        </Modal.Actions>
      </Modal>
      {isFetching ? (
        <Dimmer active={isFetching}>
          <Loader>Loading athlete profiles</Loader>
        </Dimmer>
      ) : null}
    </div>
  );
};
