import { useState } from "react";
import { Cart } from "../Components/HomePageComponents/Cart";
import { Newsletter } from "../Components/HomePageComponents/Newsletter";
import { OrderSummary } from "../Components/HomePageComponents/OrderSummary";
import { Products } from "../Components/HomePageComponents/Products";
import productsData from "../assets/Product.json";

export const HomePage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState(productsData);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);

    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, stock: p.stock - 1 } : p))
    );
  };

  const removeFromCart = (id) => {
    const itemToRemove = cartItems.find((item) => item.id === id);
    if (!itemToRemove) return;

    // Restore exact quantity to stock
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === id ? { ...p, stock: p.stock + itemToRemove.quantity } : p
      )
    );

    // Remove from cart
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleCartItem = (product) => {
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) removeFromCart(product.id);
    else addToCart(product);
  };

  const updateQuantity = (id, change) => {
    const cartItem = cartItems.find((item) => item.id === id);
    const product = products.find((p) => p.id === id);

    if (!cartItem || !product) return;

    const oldQty = cartItem.quantity;
    const newQty = Math.min(
      Math.max(1, oldQty + change),
      oldQty + product.stock
    );
    const qtyChange = newQty - oldQty;

    if (qtyChange === 0) return;

    // Update cart
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );

    // Update stock
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === id ? { ...p, stock: p.stock - qtyChange } : p
      )
    );
  };

  return (
    <div>
      <main className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Products
              products={products}
              cartItems={cartItems}
              toggleCartItem={toggleCartItem}
            />
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 border border-gray-200 text-left">
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
              <OrderSummary cartItems={cartItems} />
            </div>
          </div>
        </div>
      </main>
      <Newsletter />
    </div>
  );
};
