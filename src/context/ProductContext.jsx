import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { fetchProducts } from '../utils/api';

const ProductContext = createContext();

export const useProducts = () => {
    return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filters state
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState(''); // 'low-high', 'high-low', or ''

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const data = await fetchProducts();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    // Derived state: Unique categories
    const categories = useMemo(() => {
        const cats = new Set(products.map(p => p.category));
        return ['All', ...Array.from(cats)];
    }, [products]);

    // Derived state: Filtered and Sorted products
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // 1. Search
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(p => p.title.toLowerCase().includes(q));
        }

        // 2. Category
        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // 3. Sort
        if (sortOrder === 'low-high') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'high-low') {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [products, searchQuery, selectedCategory, sortOrder]);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('All');
        setSortOrder('');
    };

    const value = {
        products: filteredProducts, // Expose filtered products directly
        allProducts: products,      // Expose raw list if needed (e.g. for counts)
        loading,
        error,
        categories,
        filters: {
            searchQuery,
            selectedCategory,
            sortOrder
        },
        setFilters: {
            setSearchQuery,
            setSelectedCategory,
            setSortOrder,
            clearFilters
        }
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};
