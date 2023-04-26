/*
 *
 * MIT License.
 *
 */
export const stringToTitleCase = (str: string): string =>
  str
    .toLowerCase()
    .split(' ')
    .map((word: string): string => word.replace(word[0], word[0].toUpperCase()))
    .join(' ');

export const stringToSentenceCase = (str: string): string => {
  const lowerCastString: string = str.toLowerCase();
  return lowerCastString.replace(lowerCastString[0], lowerCastString[0].toUpperCase());
};

export const nameToInitials = (str: string): string => {
  const hasTokens: boolean = str.indexOf(' ') !== -1;
  return (str.substring(0, hasTokens ? 1 : 2) + (hasTokens ? str.charAt(str.lastIndexOf(' ') + 1) : '')).toUpperCase();
};

export const removeTrailingSlash = (url: string): string => (url.endsWith('/') ? url.slice(0, -1) : url);
