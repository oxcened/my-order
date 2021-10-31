export type Menu = {
  categories: {
    id: string;
    title: string;
    products: {
      id: string;
      title: string;
      description?: string;
    }[];
  }[];
};
