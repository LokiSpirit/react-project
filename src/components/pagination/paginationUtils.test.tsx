import { getPaginationItems } from './paginationUtils'; // Adjust the import as necessary

describe('getPaginationItems', () => {
  it('returns all pages when lastPage is less than or equal to maxLength', () => {
    expect(getPaginationItems(1, 5, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPaginationItems(3, 3, 5)).toEqual([1, 2, 3]);
  });

  it('returns correct pages when currentPage is in the middle', () => {
    expect(getPaginationItems(5, 10, 7)).toEqual([1, NaN, 4, 5, 6, NaN, 10]);
    expect(getPaginationItems(6, 10, 7)).toEqual([1, NaN, 5, 6, 7, NaN, 10]);
  });

  it('handles edge cases properly', () => {
    expect(getPaginationItems(1, 1, 5)).toEqual([1]);
    expect(getPaginationItems(1, 2, 5)).toEqual([1, 2]);
    expect(getPaginationItems(2, 2, 5)).toEqual([1, 2]);
    expect(getPaginationItems(1, 3, 5)).toEqual([1, 2, 3]);
  });
});
