import { atom } from "recoil";

export const productSearchAtom = atom({
  key: "productSearchAtom",
  default: "",
});

export const productCategoryAtom = atom({
  key: "productCategoryAtom",
  default: "all",
});

export const productPriceAtom = atom({
  key: "productPriceAtom",
  default: [0, 60000], // [min, max]
});

export const productPageAtom = atom({
  key: "productPageAtom",
  default: 1,
});

export const productItemsPerPageAtom = atom({
  key: "productItemsPerPageAtom",
  default: 10,
});
