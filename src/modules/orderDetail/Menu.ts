export type Menu = {
  title: string;
  categories: {
    id: string;
    title: string;
    products: Product[];
  }[];
};

export type Product = {
  id: string;
  title: string;
  description?: string;
};
