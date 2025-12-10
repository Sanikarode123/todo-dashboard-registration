import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { productListAtom } from "../recoil/productListAtom";

export default function useProducts() {
  const [products, setProducts] = useRecoilState(productListAtom);

  useEffect(() => {
    if (products.length === 0) {
      fetch("/products.json")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }
  }, []);

  return products;
}
