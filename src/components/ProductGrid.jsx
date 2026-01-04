import { useState } from 'react';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';
import styles from './ProductGrid.module.css';

const ProductGrid = ({ products, loading, error }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    if (loading) {
        return <div className={styles.message}>Loading products...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error: {error}</div>;
    }

    if (products.length === 0) {
        return (
            <div className={styles.empty}>
                <h3>No products found</h3>
                <p>Try changing your filters or search query.</p>
            </div>
        );
    }

    return (
        <>
            <div className={styles.grid}>
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onProductClick={handleProductClick}
                    />
                ))}
            </div>
            <ProductDetailModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default ProductGrid;
