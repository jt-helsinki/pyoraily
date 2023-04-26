import { Test } from '@nestjs/testing';
import { AuthDao } from '@src/dao/AuthDao';
import { Auth0Service } from '@src/services/Auth0Service';
import { Auth } from 'pyoraily-shared-backend/model/auth0/Auth';
import { idTokenToClaims } from '@src/utils/auth-utils';

const MOCK_ID_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdCBVc2VyIiwiZW1haWwiOiJ0ZXN0LnVzZXJAZXhhcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cDovL2V4YW1wbGUuY29tLyIsInN1YiI6ImFhYWJiYmNjYyIsImF1ZCI6Inh4eHl5eXp6eiIsImlhdCI6MTAwMDAwMDAwMCwiZXhwIjoyMDAwMDAwMDAwfQ.crv4BaMvmL_vsmV_NGgMGvSwf30rd5fs4_0IOfRBGe0';

describe('The authService', () => {
  let authService: Auth0Service;
  let authorize: jest.Mock;
  beforeEach(async () => {
    authorize = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        Auth0Service,
        {
          provide: AuthDao,
          useValue: {
            authorize,
          },
        },
      ],
    }).compile();
    authService = await module.get(Auth0Service);
  });

  describe('when authenticating with the one-time code', () => {
    describe('and the one-time code is good', () => {
      let auth: Auth;
      beforeEach(() => {
        auth = {
          access_token: 'MOCK_ACCESS_TOKEN',
          id_token: MOCK_ID_TOKEN,
          scope: 'MOCK_SCOPE',
          expires_in: 1000000,
          token_type: 'MOCK_TOKEN_TYPE',
        };
        const mockClaims = idTokenToClaims(auth);
        authorize.mockReturnValue(Promise.resolve({ id_token: MOCK_ID_TOKEN, claims: mockClaims }));
      });

      it('should return the users claims and id_token', async () => {
        const { id_token, claims } = await authService.authorize('good_one_time_Fcode', 'state');
        expect(claims).toEqual(idTokenToClaims(auth));
        expect(id_token).toEqual(auth.id_token);
      });
    });

    describe('and the one time code is bad', () => {
      beforeEach(() => {
        // When mocking errors use mockImplementation instead of mockReturnValue.
        authorize.mockImplementation(() => {
          throw new Error();
        });
      });

      it('should throw an error', () => {
        expect(() => authService.authorize('code', 'state')).toThrow();
      });
    });
  });
});
