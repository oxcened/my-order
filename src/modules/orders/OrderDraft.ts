export type OrderDraft = {
  products: Product[];
  notes: string;
};

export type Product = {
  id: string;
  title: string;
  description?: string;
};
