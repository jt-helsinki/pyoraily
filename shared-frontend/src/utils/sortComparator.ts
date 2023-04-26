/*
 *
 * MIT License.
 *
 */

import { SortColumn } from 'react-data-grid';

const stringComparator =
  <TRow>(sortColumn: keyof TRow): ((a: TRow, b: TRow) => number) =>
  (a: TRow, b: TRow): number => {
    const aValue: string = a[sortColumn] as string;
    const bValue: string = b[sortColumn] as string;
    return aValue.localeCompare(bValue);
  };

const numberComparator =
  <TRow>(sortColumn: keyof TRow): ((a: TRow, b: TRow) => number) =>
  (a: TRow, b: TRow): number => {
    const aValue: number = a[sortColumn] as number;
    const bValue: number = b[sortColumn] as number;
    return aValue === bValue ? 0 : aValue - bValue;
  };

const dateComparator =
  <TRow>(sortColumn: keyof TRow): ((a: TRow, b: TRow) => number) =>
  (a: TRow, b: TRow): number => {
    const aValue: number = (a[sortColumn] as Date).getMilliseconds();
    const bValue: number = (b[sortColumn] as Date).getMilliseconds();
    return aValue === bValue ? 0 : aValue - bValue;
  };

const booleanComparator =
  <TRow>(sortColumn: keyof TRow): ((a: TRow, b: TRow) => number) =>
  (a: TRow, b: TRow): number => {
    const aValue: number = a[sortColumn] === true ? 1 : 0;
    const bValue: number = b[sortColumn] === true ? 1 : 0;
    return aValue === bValue ? 0 : aValue - bValue;
  };

const nullOrUndefined = (value: any): boolean => value === null || value === undefined;

/**
 * A comparator which can sort property values of the same type. That is, the two values
 * being compared must be of the same type
 *
 * @param {keyof TRow} sortColumn The name of the property to compare. All values must have
 *   the same type. One of boolean, Date, boolean, string or number
 * @param {SortDirection} sortDirection An optional function for comparing any properties which are
 *  not of type boolean, Date, boolean, string or number.
 * @param {(a: TRow, b: TRow) => number} objectCompareFunction An optional function for comparing any properties which are
 *  not of type boolean, Date, boolean, string or number.
 * @return {number}
 */
export const sortComparator =
  <TRow>(
    sortColumn: keyof TRow,
    sortDirection: 'ASC' | 'DESC' = 'ASC',
    objectCompareFunction?: (a: TRow, b: TRow) => number
  ): ((a: TRow, b: TRow) => number) =>
  (a: TRow, b: TRow): number => {
    const sortDirectionSwitcher = sortDirection === 'ASC' ? 1 : -1;
    if (typeof a[sortColumn] === 'string' && typeof b[sortColumn] === 'string') {
      return sortDirectionSwitcher * stringComparator(sortColumn)(a, b);
    }
    if (typeof a[sortColumn] === 'number' && typeof b[sortColumn] === 'number') {
      return sortDirectionSwitcher * numberComparator(sortColumn)(a, b);
    }
    if (typeof a[sortColumn] === 'boolean' && typeof b[sortColumn] === 'boolean') {
      return sortDirectionSwitcher * booleanComparator(sortColumn)(a, b);
    }
    if (a[sortColumn] instanceof Date && b[sortColumn] instanceof Date) {
      return sortDirectionSwitcher * dateComparator(sortColumn)(a, b);
    }
    if (typeof a[sortColumn] === 'object' && typeof b[sortColumn] === 'object') {
      return objectCompareFunction ? sortDirectionSwitcher * objectCompareFunction(a, b) : 0;
    }
    if (nullOrUndefined(a[sortColumn]) && b[sortColumn]) {
      return sortDirectionSwitcher * -1;
    }
    if (a[sortColumn] && nullOrUndefined(b[sortColumn])) {
      return sortDirectionSwitcher * 1;
    }
    return 0;
  };

/**
 * A comparator which can sort property values of the same type. That is, the two values
 * being compared must be of the same type
 *
 * @param {SortColumn[]} sortColumns The SortColumns on which to sorts on the first column found.
 * @param {(a: TRow, b: TRow) => number} objectCompareFunction An optional function for comparing any properties which are
 *  not of type boolean, Date, boolean, string or number.
 * @return {number}
 */
export const dataGridSortComparator = <TRow>(
  sortColumns: SortColumn[],
  objectCompareFunction?: (a: TRow, b: TRow) => number
): ((a: TRow, b: TRow) => number) =>
  sortColumns.length
    ? sortComparator<TRow>(sortColumns[0].columnKey as any, sortColumns[0].direction, objectCompareFunction)
    : () => 0;
