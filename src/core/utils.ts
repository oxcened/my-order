export const groupByKey = <T>(arr: T[], key: keyof T): Record<keyof T, T[]> => {
  return arr.reduce(function (prev, curr) {
    prev[curr[key]] = prev[curr[key]] || [];
    prev[curr[key]].push(curr);
    return prev;
  }, Object.create(null));
};
