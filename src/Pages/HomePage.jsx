import { useCart } from "../context/CartContext";
import { Cart } from "../Components/HomePageComponents/Cart";
import { Newsletter } from "../Components/HomePageComponents/Newsletter";
import { OrderSummary } from "../Components/HomePageComponents/OrderSummary";
import { Products } from "../Components/HomePageComponents/Products";

export const HomePage = () => {
  const { cartItems, products, addToCart, removeFromCart, updateQuantity } =
    useCart();

  const toggleCartItem = (product) => {
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) removeFromCart(product.id);
    else addToCart(product);
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
