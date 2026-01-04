import { useCart } from '../context/CartContext';
import styles from './Header.module.css';

const Header = ({ toggleCart }) => {
    const { totalItems } = useCart();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.logo}>BetterWay</h1>
                <button className={styles.cartButton} onClick={toggleCart}>
                    Cart
                    {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
                </button>
            </div>
        </header>
    );
};

export default Header;
