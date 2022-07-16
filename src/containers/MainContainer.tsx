import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { FiSearch } from "react-icons/fi";
import { useProducts } from "../hooks/useProducts";
import { Product } from "../types/product";
import { Ring } from "@uiball/loaders";

const MainContainer = () => {
  const [InputValue, setInputValue] = useState("");
  const { getAllProducts, Products, setProducts, IsLoading, setIsLoading } =
    useProducts();

  const handleInputonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  const filterCategory = (): Product[] => {
    const filtered = Products.filter((product) =>
      product.category.toUpperCase().includes(InputValue.toUpperCase())
    );
    return filtered;
  };

  return (
    <div className="mainContainer">
      {IsLoading ? (
        <div className="container">
          <Header />
          <div className="containerInput">
            <Input
              placeholder="Search Category"
              value={InputValue}
              handleInputChange={handleInputonChange}
            />
            <FiSearch className="search-icon" />
          </div>

          <div className="product-container">
            {filterCategory().map((product) => (
              <div key={product.id} className="item-product">
                <img src={product.image} alt="" />
                <div className="product-info">
                  <span className="product-tittle">{product.title}</span>
                  <span className="product-category">{product.category}</span>
                  <span className="product-price">{`$${product.price} EUR`}</span>
                </div>
                <div className="button-cart-buy">
                  <Button text="Add to Cart" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Ring size={80} speed={0.9} color="hsl(240, 5%, 38%)" />
      )}
    </div>
  );
};
export { MainContainer };
