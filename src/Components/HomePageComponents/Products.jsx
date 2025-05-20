import products from "../../assets/Product.json";

export const Products = () => {
  return (
    <>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">Your Products</h2>
        <div class="flex items-center space-x-2">
          <span class="text-sm">Sort by:</span>
          <select class="border rounded-md px-2 py-1 text-sm">
            <option>Most Popular</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-100 rounded-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300"
          >
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.alt}
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
                        className={i < product.rating ? "" : "text-gray-300"}
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
                disabled={product.buttonDisabled}
                className={`w-full mt-2 py-1 rounded flex items-center justify-center transition-all 
        ${
          product.buttonDisabled
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-gray-800 text-gray-100 active:translate-y-1 active:bg-gray-900"
        }`}
              >
                {product.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
