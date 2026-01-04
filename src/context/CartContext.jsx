import { createContext, useContext, useEffect, useState, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const stored = localStorage.getItem('cartItems');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                // Stock check should ideally happen here too if we know actual stock,
                // but for now we assume max stock is infinite or handled by UI?
                // Requirement said: "Quantity cannot exceed available stock".
                // But our "stock" is just In/Out.
                // Let's assume arbitrary max of 10 for "In Stock" items for the logic?
                // Or just allow adding indefinitely if 'In Stock'?
                // The requirement "mark as in stock to any 10 and else not in stock" refers to *products list*.
                // It doesn't explicitly give a quantity number for stock.
                // "Add to Cart button (disabled if out of stock)" handles the initial add.
                // "Quantity cannot exceed available stock" -> implies we need a number.
                // I will assume "In Stock" means quantity 10 available.
                if (existing.quantity >= 10) return prev; // Mock limit

                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        // Check Mock Limit (10)
        if (newQuantity > 10) return;

        setCartItems(prev =>
            prev.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => setCartItems([]);

    const totalItems = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);
    const totalPrice = useMemo(() => cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cartItems]);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
