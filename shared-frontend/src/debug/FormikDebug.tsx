/*
 *
 * MIT License.
 *
 */
import { FormikConsumer } from 'formik';
import React from 'react';

/**
 * This is a component used for debugging FormikForms. Simply place this component inside
 * your formik form. The component will do the rest.
 *
 *   <Formik .... >
 *       ....
 *       <FormikDebug />
 *   </Formik>
 *
 */
export const FormikDebug = (): React.ReactElement => (
  <div
    style={{
      margin: '3rem 0',
      borderRadius: 4,
      background: '#f6f8fa',

      boxShadow: '0 0 1px  #eee inset',
    }}>
    <div
      style={{
        textTransform: 'uppercase',
        fontSize: 11,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        fontWeight: 500,
        padding: '.5rem',
        background: '#555',
        color: '#fff',
        letterSpacing: '1px',
      }}>
      Formik State
    </div>
    <FormikConsumer>
      {({ validationSchema, validate, handleSubmit, ...rest }) => (
        <pre
          style={{
            fontSize: '.80rem',
            padding: '.25rem .5rem',
            overflowX: 'scroll',
          }}>
          {JSON.stringify(rest, null, 2)}
        </pre>
      )}
    </FormikConsumer>
  </div>
);
