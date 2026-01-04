export const fetchProducts = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=20');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();

        // Transform data: Mock stock status
        // Requirement: "mark as in stock to any 10 and else not in stock"
        // I will simply make the first 10 'In Stock' and the rest 'Out of Stock' based on index
        const products = data.products.map((product, index) => ({
            ...product,
            // index 0-9 (10 items) -> In Stock, 10-19 -> Out of Stock
            inStock: index < 10,
            // Ensure price is a number just in case
            price: Number(product.price)
        }));

        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
