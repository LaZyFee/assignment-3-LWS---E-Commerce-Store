export const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  if (cartItems.length === 0)
    return <p className="text-gray-500">No items selected.</p>;

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">YOUR CART</h2>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-start space-x-4 mb-4 pb-4 border-b"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-grow">
            <div className="flex justify-between">
              <h3 className="font-medium">{item.name}</h3>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm"
              >
                ×
              </button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="font-bold">${item.price}</p>
              <div className="flex items-center space-x-2">
                <button
                  className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center"
                  onClick={() => updateQuantity(item.id, -1)}
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="text-sm">{item.quantity}</span>
                <button
                  className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center"
                  onClick={() => updateQuantity(item.id, 1)}
                  disabled={item.quantity >= item.stock}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
