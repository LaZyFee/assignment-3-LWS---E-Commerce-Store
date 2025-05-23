import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";

export const Products = ({ products, cartItems, toggleCartItem }) => {
  const [sortOption, setSortOption] = useState("Most Popular");
  const [sortedProducts, setSortedProducts] = useState([]);
  const { searchTerm } = useCart();

  useEffect(() => {
    let filtered = [...products];

    if (searchTerm.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortOption) {
      case "Newest":
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "Price: Low to High":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        filtered.sort((a, b) => b.rating - a.rating);
    }

    setSortedProducts(filtered);
  }, [sortOption, products, searchTerm]);

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Your Products</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Sort by:</span>
          <select
            className="border rounded-md px-2 py-1 text-sm"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option>Most Popular</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {sortedProducts.length === 0 ? (
          <p className="text-gray-500 text-center w-full py-8">
            No items found.
          </p>
        ) : (
          sortedProducts.map((product) => {
            const inCart = isInCart(product.id);
            return (
              <div
                key={product.id}
                className="bg-gray-100 rounded-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300"
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-auto object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center my-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < product.rating ? "" : "text-gray-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        {product.rating}/5
                      </span>
                    </div>
                    <span className="text-xs text-gray-700">
                      ({product.stock} pcs left)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold">${product.price}</p>
                    {product.originalPrice && (
                      <p className="text-gray-400 line-through ml-2">
                        ${product.originalPrice}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => toggleCartItem(product)}
                    disabled={product.stock < 1}
                    className={`w-full mt-2 py-1 rounded transition 
    ${
      product.stock < 1
        ? "bg-gray-400 text-white cursor-not-allowed"
        : inCart
        ? "bg-red-600 text-white hover:bg-red-700"
        : "bg-gray-800 text-white hover:bg-black"
    }
  `}
                  >
                    {product.stock < 1
                      ? "Out of Stock"
                      : inCart
                      ? "Remove from Cart"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};
