/*
 *
 * MIT License.
 *
 */

import { SelectedDisciplineSchema } from '@src/model/schema/SelectedDisciplineSchema';
import { Formik, FormikProps } from 'formik';
import { CATEGORIES, DISCIPLINES } from 'pyoraily-shared-frontend/lib/constants';
import React from 'react';
import { Button, Dropdown, Form, Header, Label, Segment, Select } from 'semantic-ui-react';

interface FormValues {
  nominatedCategory: string;
  nominatedDisciplines: string[];
}

interface Props {
  nominatedCategory: string;
  nominatedDisciplines: string[];
  year: number;
  onSubmit(nominatedCategory: string, nominatedDisciplines: string[]): void;
}

export const AthleteProfileDisciplineNomination: React.FunctionComponent<Props> = (
  props: Props
): React.ReactElement => {
  const handleSubmit = (values: FormValues) => {
    props.onSubmit(values.nominatedCategory, values.nominatedDisciplines);
  };

  return (
    <Segment>
      <>
        <Header as="h3">My national team nominations for {props.year}</Header>
        <p>
          To be considered for national team selection, you must nominate one or more disciplines. Failure to nominate
          will generally exclude you from consideration for selection. Please note that you may be considered for
          multiple disciplines.
        </p>
        <Formik
          initialValues={{
            nominatedCategory: props.nominatedCategory,
            nominatedDisciplines: props.nominatedDisciplines || [],
          }}
          validationSchema={SelectedDisciplineSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
          enableReinitialize={true}>
          {(formik: FormikProps<FormValues>): React.ReactElement => {
            const {
              values,
              setFieldValue,
              setTouched,
              submitForm,
              errors,
              dirty,
              isValid,
              touched,
              submitCount,
              isSubmitting,
            } = formik;
            return (
              <Form>
                <Form.Field required={true}>
                  <label>
                    For {props.year} I wish to nominate for the following national teams (select one or more):
                  </label>
                  <Dropdown
                    placeholder="Disciplines"
                    multiple={true}
                    value={values.nominatedDisciplines}
                    required={true}
                    fluid={true}
                    selection={true}
                    onChange={(e: any, { value }: any) => setFieldValue('nominatedDisciplines', value as any, true)}
                    options={DISCIPLINES}
                    error={!!errors.nominatedDisciplines}
                  />
                  {errors.nominatedDisciplines && (submitCount > 0 || touched.nominatedDisciplines) ? (
                    <Label prompt pointing="above">
                      {errors.nominatedDisciplines}
                    </Label>
                  ) : null}
                </Form.Field>
                <Form.Field
                  control={Select}
                  label="Nominated category"
                  options={CATEGORIES}
                  value={values.nominatedCategory}
                  onChange={(e: any, { value }: any) => {
                    setTouched({ nominatedCategory: true });
                    setFieldValue('nominatedCategory', value as string, true);
                  }}
                  fluid={true}
                  required={true}
                  error={
                    errors.nominatedCategory && (submitCount > 0 || touched.nominatedCategory)
                      ? { content: errors.nominatedCategory, pointing: 'above' }
                      : false
                  }
                />
                <Button
                  icon="save"
                  content="Save"
                  onClick={submitForm}
                  primary={true}
                  disabled={!dirty || (dirty && !isValid)}
                />
              </Form>
            );
          }}
        </Formik>
      </>
    </Segment>
  );
};
