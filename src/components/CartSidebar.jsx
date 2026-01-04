import { useCart } from '../context/CartContext';
import styles from './CartSidebar.module.css';
import { useEffect, useRef } from 'react';

const CartSidebar = ({ isOpen, onClose }) => {
    const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
    const sidebarRef = useRef();

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`}>
            <div className={styles.sidebar} ref={sidebarRef}>
                <div className={styles.header}>
                    <h2>Your Cart</h2>
                    <button onClick={onClose} className={styles.closeButton}>&times;</button>
                </div>

                <div className={styles.content}>
                    {cartItems.length === 0 ? (
                        <div className={styles.empty}>
                            <p>Your cart is empty.</p>
                            <button onClick={onClose} className={styles.continueButton}>
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className={styles.items}>
                            {cartItems.map(item => (
                                <div key={item.id} className={styles.item}>
                                    <img src={item.thumbnail} alt={item.title} className={styles.image} />
                                    <div className={styles.details}>
                                        <h4 className={styles.title}>{item.title}</h4>
                                        <p className={styles.price}>${item.price.toFixed(2)}</p>

                                        <div className={styles.controls}>
                                            <div className={styles.quantity}>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    disabled={item.quantity >= 10}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className={styles.remove}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.totalRow}>
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <button className={styles.checkoutButton} onClick={() => alert('Checkout not implemented')}>
                            Checkout
                        </button>
                        <button className={styles.clearButton} onClick={clearCart}>
                            Clear Cart
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartSidebar;
