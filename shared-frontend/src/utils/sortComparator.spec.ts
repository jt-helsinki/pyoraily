/*
 *
 * MIT License.
 *
 */
import { dataGridSortComparator, sortComparator } from './sortComparator';

interface Row {
  aNumber: number;
  aString: string;
  aDate: Date;
  isBoolean: boolean;
  anObject: {
    aNumber: number;
    aString: string;
  };
  aNull: any;
}

const records: Row[] = [
  {
    aNumber: 10,
    aString: 'Pothole',
    aDate: new Date(2000, 10, 17),
    isBoolean: true,
    anObject: {
      aNumber: 1,
      aString: 'a',
    },
    aNull: 'a null',
    anUndefined: 'undefined',
  } as any,
  {
    aNumber: 9,
    aString: 'Mudflap',
    aDate: new Date(2000, 8, 17),
    isBoolean: false,
    anObject: {
      aNumber: 3,
      aString: 'c',
    },
    aNull: null,
    anUndefined: undefined,
  } as any,
  {
    aNumber: 11,
    aString: 'Skid mark',
    aDate: new Date(2000, 9, 17),
    isBoolean: true,
    anObject: {
      aNumber: 2,
      aString: 'b',
    },
    aNull: 'null',
  },
];

describe('ColumnComparator', () => {
  it('should sort by SortColumn[]', () => {
    const comparator = dataGridSortComparator<Row>([
      {
        columnKey: 'aNumber',
        direction: 'ASC',
      },
    ]);
    const sortedRecords = records.sort(comparator);
    expect(sortedRecords[0].aNumber).toEqual(9);
    expect(sortedRecords[1].aNumber).toEqual(10);
    expect(sortedRecords[2].aNumber).toEqual(11);

    const comparatorDesc = dataGridSortComparator<Row>([
      {
        columnKey: 'aNumber',
        direction: 'DESC',
      },
    ]);
    const sortedRecordsDesc = records.sort(comparatorDesc);
    expect(sortedRecordsDesc[0].aNumber).toEqual(11);
    expect(sortedRecordsDesc[1].aNumber).toEqual(10);
    expect(sortedRecordsDesc[2].aNumber).toEqual(9);
  });

  it('should sort number columns', () => {
    const comparator = sortComparator<Row>('aNumber');
    const sortedRecords = records.sort(comparator);
    expect(sortedRecords[0].aNumber).toEqual(9);
    expect(sortedRecords[1].aNumber).toEqual(10);
    expect(sortedRecords[2].aNumber).toEqual(11);

    const comparatorDesc = sortComparator<Row>('aNumber', 'DESC');
    const sortedRecordsDesc = records.sort(comparatorDesc);
    expect(sortedRecordsDesc[0].aNumber).toEqual(11);
    expect(sortedRecordsDesc[1].aNumber).toEqual(10);
    expect(sortedRecordsDesc[2].aNumber).toEqual(9);
  });

  it('should sort boolean columns', () => {
    const comparator = sortComparator<Row>('isBoolean');
    const sortedRecords = records.sort(comparator);
    expect(sortedRecords[0].isBoolean).toEqual(false);
    expect(sortedRecords[1].isBoolean).toEqual(true);
    expect(sortedRecords[2].isBoolean).toEqual(true);

    const comparatorDesc = sortComparator<Row>('isBoolean', 'DESC');
    const sortedRecordsDesc = records.sort(comparatorDesc);
    expect(sortedRecordsDesc[0].isBoolean).toEqual(true);
    expect(sortedRecordsDesc[1].isBoolean).toEqual(true);
    expect(sortedRecordsDesc[2].isBoolean).toEqual(false);
  });

  it('should sort string columns', () => {
    const comparator = sortComparator<Row>('aString');
    const sortedRecords = records.sort(comparator);
    expect(sortedRecords[0].aString).toEqual('Mudflap');
    expect(sortedRecords[1].aString).toEqual('Pothole');
    expect(sortedRecords[2].aString).toEqual('Skid mark');

    const comparatorDesc = sortComparator<Row>('aString', 'DESC');
    const sortedRecordsDesc = records.sort(comparatorDesc);
    expect(sortedRecordsDesc[0].aString).toEqual('Skid mark');
    expect(sortedRecordsDesc[1].aString).toEqual('Pothole');
    expect(sortedRecordsDesc[2].aString).toEqual('Mudflap');
  });

  it('should sort date columns', () => {
    const comparator = sortComparator<Row>('aDate');
    const sortedRecords = records.sort(comparator);
    expect(sortedRecords[0].aDate.getMilliseconds()).toEqual(new Date(2000, 8, 17).getMilliseconds());
    expect(sortedRecords[1].aDate.getMilliseconds()).toEqual(new Date(2000, 9, 17).getMilliseconds());
    expect(sortedRecords[2].aDate.getMilliseconds()).toEqual(new Date(2000, 10, 17).getMilliseconds());

    const comparatorDesc = sortComparator<Row>('aDate', 'DESC');
    const sortedRecordsDesc = records.sort(comparatorDesc);
    expect(sortedRecordsDesc[0].aDate.getMilliseconds()).toEqual(new Date(2000, 10, 17).getMilliseconds());
    expect(sortedRecordsDesc[1].aDate.getMilliseconds()).toEqual(new Date(2000, 9, 17).getMilliseconds());
    expect(sortedRecordsDesc[2].aDate.getMilliseconds()).toEqual(new Date(2000, 8, 17).getMilliseconds());
  });

  it('should sort object columns', () => {
    const comparator = sortComparator<Row>('anObject', 'ASC', (a, b) => a.anObject.aNumber - b.anObject.aNumber);
    const sortedRecords = records.sort(comparator);
    expect(sortedRecords[0].aNumber).toEqual(10);
    expect(sortedRecords[1].aNumber).toEqual(11);
    expect(sortedRecords[2].aNumber).toEqual(9);

    const comparatorDesc = sortComparator<Row>('anObject', 'DESC', (a, b) => a.anObject.aNumber - b.anObject.aNumber);
    const sortedRecordsDesc = records.sort(comparatorDesc);
    expect(sortedRecordsDesc[0].aNumber).toEqual(9);
    expect(sortedRecordsDesc[1].aNumber).toEqual(11);
    expect(sortedRecordsDesc[2].aNumber).toEqual(10);
  });

  it('should sort null columns', () => {
    const comparator = sortComparator<Row>('aNull');
    const sortedRecords = records.sort(comparator);
    expect(sortedRecords[0].aNumber).toEqual(9);
    expect(sortedRecords[1].aNumber).toEqual(10);
    expect(sortedRecords[2].aNumber).toEqual(11);

    const comparatorDesc = sortComparator<Row>('aNull', 'DESC');
    const sortedRecordsDesc = records.sort(comparatorDesc);
    expect(sortedRecordsDesc[0].aNumber).toEqual(11);
    expect(sortedRecordsDesc[1].aNumber).toEqual(10);
    expect(sortedRecordsDesc[2].aNumber).toEqual(9);
  });

  it('should sort undefined columns', () => {
    const comparator = sortComparator<Row>('anUndefined' as any);
    const sortedRecords = records.sort(comparator);
    expect(sortedRecords[0].aNumber).toEqual(11);
    expect(sortedRecords[1].aNumber).toEqual(9);
    expect(sortedRecords[2].aNumber).toEqual(10);

    const comparatorDesc = sortComparator<Row>('anUndefined' as any, 'DESC');
    const sortedRecordsDesc = records.sort(comparatorDesc);
    expect(sortedRecordsDesc[0].aNumber).toEqual(10);
    expect(sortedRecordsDesc[1].aNumber).toEqual(11);
    expect(sortedRecordsDesc[2].aNumber).toEqual(9);
  });
});
