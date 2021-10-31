import { Product } from '../models/Product';

export const groupProducts = (products: Product[]) => {
  const groupedMap = products.reduce((previousValue, { title }) => {
    const quantity = previousValue.get(title);

    if (quantity) {
      previousValue.set(title, quantity + 1);
    } else {
      previousValue.set(title, 1);
    }

    return previousValue;
  }, new Map<string, number>());

  return [...groupedMap.entries()].map(([key, value]) => {
    return `${value}x ${key}`;
  });
};
