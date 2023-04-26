/*
 *
 * MIT License.
 *
 */
export interface MenuItemDefinition {
  href: string;
  name: string;
  rolesRequired?: string[];
  selected: boolean;
  text: string;
}
