import { useProducts } from '../context/ProductContext';
import styles from './Filters.module.css';

const Filters = () => {
    const { categories, filters, setFilters } = useProducts();
    const { searchQuery, selectedCategory, sortOrder } = filters;
    const { setSearchQuery, setSelectedCategory, setSortOrder, clearFilters } = setFilters;

    return (
        <div className={styles.filters}>
            <div className={styles.group}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.input}
                />

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={styles.select}
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className={styles.select}
                >
                    <option value="">Sort by Price</option>
                    <option value="low-high">Low to High</option>
                    <option value="high-low">High to Low</option>
                </select>

                <button onClick={clearFilters} className={styles.clearButton}>
                    Clear
                </button>
            </div>
        </div>
    );
};

export default Filters;
