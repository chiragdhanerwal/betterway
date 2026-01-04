import { useState } from 'react';
import { ProductProvider, useProducts } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Filters from './components/Filters';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import './index.css';

const MainContent = ({ toggleCart }) => {
  const { products, loading, error } = useProducts();

  return (
    <div className="container">
      <Header toggleCart={toggleCart} />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <Filters />
        <ProductGrid products={products} loading={loading} error={error} />
      </main>
    </div>
  );
};

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <ProductProvider>
      <CartProvider>
        <MainContent toggleCart={() => setIsCartOpen(true)} />
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
