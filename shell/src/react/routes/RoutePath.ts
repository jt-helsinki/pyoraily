/*
 *
 * MIT License.
 *
 */
import { UserRole } from 'pyoraily-shared-frontend/model/UserRole';
import React from 'react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

export interface RoutePath {
  /**
   * the Path for the react-router to match. Subordinate to the value specified in the
   * redirectTo property - if supplied.
   */
  path: string;

  /**
   * The translation string of the menu item of the link matching the path.
   */
  menuLinkString: string;

  /**
   * Not required if the redirectTo property is specified.
   */
  component?: React.ReactElement | any;

  /**
   * Is this visible in the menu?
   */
  showInMenu: boolean;

  /**
   * if empty array, any logged in user can access
   */
  roles: UserRole[];

  /**
   * Which menu to display the item in.
   */
  menuType: 'primary' | 'secondary' | 'action' | 'none';

  /**
   * Sort order in the menu.
   */
  sortOrder: number;

  icon?: SemanticICONS;
}
