import { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
    return useContext(CurrencyContext);
};

// Fixed conversion rate for simplicity
const EXCHANGE_RATE = 86; // 1 USD = 86 INR

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState(() => {
        try {
            return localStorage.getItem('currency') || 'USD';
        } catch {
            return 'USD';
        }
    });

    useEffect(() => {
        localStorage.setItem('currency', currency);
    }, [currency]);

    const toggleCurrency = () => {
        setCurrency(prev => prev === 'USD' ? 'INR' : 'USD');
    };

    const formatPrice = (priceInUSD) => {
        if (currency === 'INR') {
            const priceInINR = priceInUSD * EXCHANGE_RATE;
            // Format as Indian Rupee
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
            }).format(priceInINR);
        }

        // Default USD
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(priceInUSD);
    };

    const value = {
        currency,
        toggleCurrency,
        formatPrice
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
};
