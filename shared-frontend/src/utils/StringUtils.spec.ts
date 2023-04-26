import * as StringUtils from './StringUtils';

describe('Tests all the StringUtils functions', () => {
  test('if stringToTitleCase() converts the string to title cases', () => {
    const someString = StringUtils.stringToTitleCase('JORDAN POWER');
    expect(someString).toEqual('Jordan Power');

    const someString2 = StringUtils.stringToTitleCase('jORDAN pOWER');
    expect(someString2).toEqual('Jordan Power');
  });

  test('if stringToSentenceCase() converts the string to title cases', () => {
    const someString = StringUtils.stringToSentenceCase('JORDAN POWER');
    expect(someString).toEqual('Jordan power');

    const someString2 = StringUtils.stringToSentenceCase('jORDAN pOWER');
    expect(someString2).toEqual('Jordan power');
  });

  test('if nameToInitials() converts the string to title cases', () => {
    const someString = StringUtils.nameToInitials('JORDAN POWER');
    expect(someString).toEqual('JP');

    const someString2 = StringUtils.nameToInitials('jORDAN pOWER');
    expect(someString2).toEqual('JP');

    const someString3 = StringUtils.nameToInitials('Nincum Poop');
    expect(someString3).toEqual('NP');

    const someString4 = StringUtils.nameToInitials('Ábcd / # . - , Éfgh Ijkl Mnop');
    expect(someString4).toEqual('ÁM');
  });

  test('if removeTrailinSlash() removes the trailing slash', () => {
    expect(StringUtils.removeTrailingSlash('a string')).toEqual('a string');
    expect(StringUtils.removeTrailingSlash('a string/')).toEqual('a string');
    expect(StringUtils.removeTrailingSlash('/')).toEqual('');
    expect(StringUtils.removeTrailingSlash('')).toEqual('');
  });
});
