import { useEffect, useState } from "react";
import "./pagination.css";
import { PAGE_SIZE } from "./constants";
import { ProductCard } from "./components/ProductCard";
import type { Product, ProductsResponse } from "./types/product";
import { PaginationView } from "./components/PaginationView";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const currentProductList = products.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE
  );

  const totalProducts = products.length;
  const numOfPages = Math.ceil(totalProducts / PAGE_SIZE);

  const fetchData = async () => {
    try {
      const data = await fetch("https://dummyjson.com/products?limit=500");
      const json: ProductsResponse = await data.json();
      setProducts(json.products);
    } catch (err) {
      console.error("err", err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const EmptyState = () => <h1>No products found</h1>;

  const ReadyState = () => (
    <>
      <PaginationView
        currentPage={currentPage}
        numOfPages={numOfPages}
        setCurrentPage={setCurrentPage}
      />
      <div className="products-container">
        {currentProductList.map((pdtItem) => (
          <ProductCard product={pdtItem} key={pdtItem.id} />
        ))}
      </div>
    </>
  );

  return (
    <div className="App">
      {products.length === 0 ? <EmptyState /> : <ReadyState />}
    </div>
  );
}
