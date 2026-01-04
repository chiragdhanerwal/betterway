import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import styles from './ProductDetailModal.module.css';

const ProductDetailModal = ({ product, isOpen, onClose }) => {
    const { addToCart } = useCart();
    const { formatPrice } = useCurrency();
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState('Black');
    const [quantity, setQuantity] = useState(1);

    if (!isOpen || !product) return null;

    const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
    const colors = ['Black', 'White', 'Gray'];

    const handleAddToCart = () => {
        addToCart({
            ...product,
            selectedSize,
            selectedColor,
            quantity
        });
        onClose();
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>

                <div className={styles.content}>
                    {/* Left: Image */}
                    <div className={styles.imageSection}>
                        <img src={product.thumbnail} alt={product.title} className={styles.image} />
                    </div>

                    {/* Right: Details */}
                    <div className={styles.detailsSection}>
                        <h2 className={styles.title}>{product.title}</h2>
                        <div className={styles.priceSection}>
                            <span className={styles.price}>{formatPrice(product.price)}</span>
                            <span className={styles.originalPrice}>{formatPrice(product.price * 1.5)}</span>
                        </div>

                        {/* Size Selection */}
                        <div className={styles.optionGroup}>
                            <label className={styles.label}>Size</label>
                            <div className={styles.sizeGrid}>
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        className={`${styles.sizeButton} ${selectedSize === size ? styles.selected : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className={styles.optionGroup}>
                            <label className={styles.label}>Color: {selectedColor}</label>
                            <div className={styles.colorOptions}>
                                {colors.map(color => (
                                    <button
                                        key={color}
                                        className={`${styles.colorButton} ${selectedColor === color ? styles.selectedColor : ''}`}
                                        onClick={() => setSelectedColor(color)}
                                        style={{ backgroundColor: color.toLowerCase() }}
                                        title={color}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className={styles.optionGroup}>
                            <div className={styles.quantityControl}>
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className={styles.quantityButton}
                                >
                                    -
                                </button>
                                <span className={styles.quantityValue}>{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                    className={styles.quantityButton}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className={styles.actions}>
                            <button
                                className={styles.addToCartButton}
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                            >
                                {product.inStock ? 'Add to cart' : 'Out of Stock'}
                            </button>
                            <button className={styles.buyNowButton}>
                                Buy it now
                            </button>
                        </div>

                        {/* Description */}
                        <div className={styles.description}>
                            <h3>Description</h3>
                            <ul>
                                <li>Premium Cotton loopknit fabric</li>
                                <li>320 GSM, Oversized Boxy Fit</li>
                                <li>Unisex design for versatile wear</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;
