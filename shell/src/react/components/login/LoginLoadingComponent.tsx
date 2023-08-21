/*
 *
 * MIT License.
 *
 */
import * as React from 'react';
import { Dimmer, Header, Loader } from 'semantic-ui-react';

export const LoginLoadingComponent = (props: { message: string }): React.ReactElement => (
  <Dimmer active inverted>
    <Loader inverted>{props.message}</Loader>
  </Dimmer>
);
