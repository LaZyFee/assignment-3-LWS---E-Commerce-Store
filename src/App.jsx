import "./App.css";
import { Footer } from "./Components/Footer/Footer";
import { Navbar } from "./Components/Navbar/Navbar";
import { HomePage } from "./Pages/HomePage";

function App() {
  return (
    <div className="bg-white font-satoshi">
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
