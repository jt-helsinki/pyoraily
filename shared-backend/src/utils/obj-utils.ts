/*
 *
 * MIT License.
 *
 */
export function withoutProperties<T extends Record<string, unknown>>(
  obj: T,
  propsToOmit: readonly string[]
): Partial<T> {
  const updateEntries = Object.entries(obj).filter(([key]: [string, unknown]) => !propsToOmit.includes(key));
  return Object.fromEntries(updateEntries) as Partial<T>;
}
