/*
 *
 * MIT License.
 *
 */
export const pathWithSlash = (path: string): string => (path.startsWith('/') ? path : `/${path}`);

export const removeWildcardFromPath = (path: string): string => path.replace('/*', '');
