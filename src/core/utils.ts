import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const groupByKey = <T extends Record<string, any>>(arr: T[], key: keyof T): Record<typeof key, T[]> => {
  return arr.reduce(function (prev, curr) {
    prev[curr[key]] = prev[curr[key]] || [];
    prev[curr[key]].push(curr);
    return prev;
  }, Object.create(null));
};

export const groupByKeyQuantity = <T extends Record<string, any>>(arr: T[], key: keyof T): [T, number][] => {
  return Object.entries(groupByKey(arr, key))
    .reduce((prev: [T, number][], [, items]) => {
      const newItem = [items[0], items.length] as [T, number];
      return [...prev, newItem];
    }, []);
}
