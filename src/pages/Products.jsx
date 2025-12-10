
import { useRecoilValue, useRecoilState } from "recoil";
import {
  productSearchAtom,
  productCategoryAtom,
  productPriceAtom,
  productPageAtom,
  productItemsPerPageAtom,
} from "../recoil/productAtoms";

import { productListAtom } from "../recoil/productListAtom";
import useProducts from "../hooks/useProducts";
import { useMemo, useState } from "react";

export default function Products() {
  
  const [search, setSearch] = useRecoilState(productSearchAtom);
  const [category, setCategory] = useRecoilState(productCategoryAtom);
  const [priceRange, setPriceRange] = useRecoilState(productPriceAtom);
  const [page, setPage] = useRecoilState(productPageAtom);
  const [itemsPerPage, setItemsPerPage] = useRecoilState(productItemsPerPageAtom);

 
  const [productList, setProductList] = useRecoilState(productListAtom);

  
  const products = useProducts();

  
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); // NEW MODAL STATE

  
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((p) =>
        category === "all" ? true : p.category === category
      )
      .filter((p) => p.price <= priceRange[1]);
  }, [products, search, category, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, page, itemsPerPage]);

  

  return (
    <div className="h-full w-full px-6 py-4 text-gray-700">

      
      <div className="flex justify-end gap-3 items-center mb-4">

        
        <input
          type="text"
          placeholder="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 rounded-md bg-purple-100/40 border border-purple-200 text-sm w-56"
        />

        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 rounded-md bg-purple-300 text-white text-sm"
        >
          Filter
        </button>

        
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-md bg-purple-500 text-white text-sm"
        >
          Add New
        </button>

        
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setPage(1);
          }}
          className="px-3 py-2 rounded-md bg-white border border-purple-300 text-sm"
        >
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={30}>30 / page</option>
          <option value={50}>50 / page</option>
        </select>
      </div>

      
      {showFilters && (
        <div className="bg-white shadow-md border p-4 rounded-md mb-4 w-72 ml-auto">

          
          <label className="text-sm font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="w-full mt-1 p-2 rounded-md border"
          >
            <option value="all">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Books">Books</option>
            <option value="Stationery">Stationery</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
          </select>

          
          <label className="text-sm font-medium block mt-4">
            Max Price: ₹{priceRange[1]}
          </label>
          <input
            type="range"
            min="0"
            max="60000"
            value={priceRange[1]}
            onChange={(e) => {
              setPriceRange([0, Number(e.target.value)]);
              setPage(1);
            }}
            className="w-full"
          />
        </div>
      )}

      
      <div className="bg-purple-50/40 rounded-lg p-6 shadow-inner h-[60vh] overflow-auto">

        {paginatedProducts.length === 0 ? (
          <p className="text-center text-gray-400 mt-20">No products found...</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-purple-200 text-gray-600">
                <th className="pb-2">Product</th>
                <th className="pb-2">Category</th>
                <th className="pb-2">Price</th>
              </tr>
            </thead>

            <tbody>
              {paginatedProducts.map((p) => (
                <tr key={p.id} className="border-b border-purple-100">
                  <td className="py-2">{p.name}</td>
                  <td className="py-2">{p.category}</td>
                  <td className="py-2">₹{p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      
      <div className="flex justify-between items-center mt-4 px-2">

        <span className="text-sm bg-purple-200 px-3 py-1 rounded-md">
          {itemsPerPage} Items per page
        </span>

        <div className="flex gap-2">

          
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`px-3 py-1 rounded-md ${
              page === 1 ? "bg-gray-200 text-gray-400" : "bg-purple-200"
            }`}
          >
            Prev
          </button>

          
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-md ${
                page === i + 1 ? "bg-purple-500 text-white" : "bg-purple-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={`px-3 py-1 rounded-md ${
              page === totalPages
                ? "bg-gray-200 text-gray-400"
                : "bg-purple-200"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">

            <h2 className="text-lg font-semibold mb-4">Add New Product</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                const form = e.target;
                const newProduct = {
                  id: Date.now(),
                  name: form.name.value,
                  category: form.category.value,
                  price: Number(form.price.value),
                  description: form.description.value,
                  image: form.image.value,
                };

                setProductList((prev) => [...prev, newProduct]);
                setShowAddModal(false);
              }}
              className="space-y-3"
            >
              <input
                name="name"
                placeholder="Product Name"
                className="w-full p-2 border rounded"
                required
              />

              <select
                name="category"
                className="w-full p-2 border rounded"
                required
              >
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Books">Books</option>
                <option value="Stationery">Stationery</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
              </select>

              <input
                type="number"
                name="price"
                placeholder="Price"
                className="w-full p-2 border rounded"
                required
              />

              <input
                name="image"
                placeholder="Image URL (optional)"
                className="w-full p-2 border rounded"
              />

              <textarea
                name="description"
                placeholder="Description (optional)"
                className="w-full p-2 border rounded"
              />

              <div className="flex justify-end gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-purple-500 text-white"
                >
                  Add
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
