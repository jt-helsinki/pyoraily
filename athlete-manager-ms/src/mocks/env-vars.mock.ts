/*
 *
 * MIT License.
 *
 */
export const AURORAL_ADMIN_ROLE_ID = 'mock_admin_id';
export const AURORAL_DEFAULT_PARTY_ROLE_ID = 'mock_customer_user_id';

export const mockGetEnv = (envVar: string) => {
  const vars = {
    AURORAL_ADMIN_ROLE_ID,
    AURORAL_DEFAULT_PARTY_ROLE_ID,
  };
  return vars[envVar];
};
