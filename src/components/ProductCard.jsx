import { useCart } from '../context/CartContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { id, title, price, thumbnail, category, inStock } = product;

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={thumbnail} alt={title} className={styles.image} loading="lazy" />
                {!inStock && <div className={styles.outOfStockOverlay}>Out of Stock</div>}
            </div>
            <div className={styles.content}>
                <span className={styles.category}>{category}</span>
                <h3 className={styles.title} title={title}>{title}</h3>
                <div className={styles.footer}>
                    <span className={styles.price}>${price.toFixed(2)}</span>
                    <button
                        onClick={() => addToCart(product)}
                        disabled={!inStock}
                        className={styles.addButton}
                    >
                        {inStock ? 'Add to Cart' : 'Sold Out'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
