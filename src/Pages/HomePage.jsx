import { Cart } from "../Components/HomePageComponents/Cart";
import { Newsletter } from "../Components/HomePageComponents/Newsletter";
import { OrderSummary } from "../Components/HomePageComponents/OrderSummary";
import { Products } from "../Components/HomePageComponents/Products";

export const HomePage = () => {
  return (
    <div>
      <main className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Products />
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 border border-gray-200 text-left">
              <Cart />
              <OrderSummary />
            </div>
          </div>
        </div>
      </main>
      <Newsletter />
    </div>
  );
};
