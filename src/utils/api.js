// Local product data from items folder
const productImages = [
    '2f1tttr_051638.jpg',
    'BF DELHI SS_051516.jpg',
    'WhatsApp Image 2025-11-06 at 22.03.25_1a43815a.jpg',
    'WhatsApp Image 2025-11-06 at 22.04.24_94ab67ca.jpg',
    'WhatsApp Image 2025-11-06 at 22.04.33_745dbc58.jpg',
    'WhatsApp Image 2025-11-06 at 22.05.41_e878d00a.jpg',
    'aqi ok_051333.jpg',
    'bf kkp_021731.jpg',
    'bf vest ss_051744.jpg',
    'crggt_051545.jpg',
    'exgg_051710.jpg',
    'feminisrtt_061236.jpg',
    'gdoww_051804.jpg',
    'gods pln_051723.jpg',
    'hvape_052002.jpg',
    'med hhhs_051939.jpg',
    'plothhh_051904.jpg',
    'red aar_051430.jpg',
    'saintth_051702.jpg',
    'shitt monhh_051931.jpg'
];

// Helper to clean filename to product name
const cleanProductName = (filename) => {
    // Remove extension
    let name = filename.replace(/\.(jpg|jpeg|png|webp)$/i, '');
    // Remove timestamps like _051638
    name = name.replace(/_\d{6}$/, '');
    // Remove hash-like suffixes like _1a43815a
    name = name.replace(/_[a-f0-9]{8}$/i, '');
    // Replace underscores with spaces
    name = name.replace(/_/g, ' ');
    // Capitalize first letter of each word
    name = name.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    return name;
};

// Categories for variety
const categories = ['T-Shirts', 'Hoodies', 'Accessories', 'Apparel', 'Casual Wear'];

export const fetchProducts = async () => {
    try {
        // Simulate async behavior
        await new Promise(resolve => setTimeout(resolve, 100));

        // Generate products from local images
        const products = productImages.map((filename, index) => ({
            id: index + 1,
            title: cleanProductName(filename),
            price: Math.floor(Math.random() * 50) + 10, // Random price between $10-$60
            thumbnail: `/items/${filename}`,
            category: categories[index % categories.length],
            inStock: index < 10, // First 10 in stock
        }));

        return products;
    } catch (error) {
        console.error('Error loading products:', error);
        throw error;
    }
};
