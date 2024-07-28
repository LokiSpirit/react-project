import { getPaginationItems } from './paginationUtils';
import { describe, it, expect } from 'vitest';

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

describe('getPaginationItems', () => {
  it('returns the correct range of pages when total pages are less than or equal to maxLength', () => {
    const result = getPaginationItems(1, 5, 5);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('returns the correct range of pages when currentPage is in the beginning range', () => {
    const result = getPaginationItems(2, 10, 5);
    expect(result).toEqual([1, 2, 3, NaN, 10]);
  });

  it('returns the correct range of pages when currentPage is in the middle range', () => {
    const result = getPaginationItems(5, 10, 5);
    expect(result).toEqual([1, NaN, 5, NaN, 10]);
  });

  it('returns the correct range of pages when currentPage is in the end range', () => {
    const result = getPaginationItems(9, 10, 5);
    expect(result).toEqual([1, NaN, 8, 9, 10]);
  });

  it('returns the correct range of pages when maxLength is too small to cover both sides', () => {
    const result = getPaginationItems(6, 10, 3);
    expect(result).toEqual([1, NaN, NaN, 10]);
  });
});
