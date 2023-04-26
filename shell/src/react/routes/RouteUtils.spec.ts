import * as RouteUtils from '@src/react/routes/RouteUtils';

describe('Tests if the RouteUtils functions work as expected.', () => {
  test('if a path starts with a slash', () => {
    expect(RouteUtils.pathWithSlash('testpath')).toEqual('/testpath');
    expect(RouteUtils.pathWithSlash('/testpath')).toEqual('/testpath');
  });

  test('if RouteUtils.removeWildcardFromPath() works', () => {
    expect(RouteUtils.removeWildcardFromPath('/testpath/*')).toEqual('/testpath');
    expect(RouteUtils.removeWildcardFromPath('/testpath')).toEqual('/testpath');
  });
});
