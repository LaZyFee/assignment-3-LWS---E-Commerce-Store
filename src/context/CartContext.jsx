import { createContext, useContext, useReducer, useState } from "react";
import productsData from "../assets/Product.json";

// Initial State
const initialState = {
  products: productsData,
  cart: [],
};

// Actions
const ACTIONS = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
};

// Reducer
function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART: {
      const product = action.payload;
      if (state.cart.find((item) => item.id === product.id)) return state;

      return {
        ...state,
        cart: [...state.cart, { ...product, quantity: 1 }],
        products: state.products.map((p) =>
          p.id === product.id ? { ...p, stock: p.stock - 1 } : p
        ),
      };
    }

    case ACTIONS.REMOVE_FROM_CART: {
      const id = action.payload;
      const removedItem = state.cart.find((item) => item.id === id);
      if (!removedItem) return state;

      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== id),
        products: state.products.map((p) =>
          p.id === id ? { ...p, stock: p.stock + removedItem.quantity } : p
        ),
      };
    }

    case ACTIONS.UPDATE_QUANTITY: {
      const { id, change } = action.payload;
      const cartItem = state.cart.find((item) => item.id === id);
      const product = state.products.find((p) => p.id === id);
      if (!cartItem || !product) return state;

      const oldQty = cartItem.quantity;
      const newQty = Math.min(
        Math.max(1, oldQty + change),
        oldQty + product.stock
      );
      const qtyChange = newQty - oldQty;
      if (qtyChange === 0) return state;

      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity: newQty } : item
        ),
        products: state.products.map((p) =>
          p.id === id ? { ...p, stock: p.stock - qtyChange } : p
        ),
      };
    }

    default:
      return state;
  }
}

// Context
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [searchTerm, setSearchTerm] = useState("");
  const addToCart = (product) =>
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
  const removeFromCart = (id) =>
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: id });
  const updateQuantity = (id, change) =>
    dispatch({ type: ACTIONS.UPDATE_QUANTITY, payload: { id, change } });

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cart,
        products: state.products,
        addToCart,
        removeFromCart,
        updateQuantity,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
