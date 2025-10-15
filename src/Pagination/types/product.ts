interface Product {
  id: number;
  title: string;
  thumbnail: string;
}

interface ProductsResponse {
  products: Product[];
}

export type { Product, ProductsResponse };