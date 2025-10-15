import type { Product } from "../types/product";

export interface ProductCardProps {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { thumbnail, title } = product;

  return (
    <div className="product-card">
      <img src={thumbnail} alt={title} className="product-img" />
      <span className="product-title">{title}</span>
    </div>
  );
};
