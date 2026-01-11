import ProductCard from "./ProductCard";

const productData = [
    {
        name: "Smart Watch Pro",
        brand: "TechWear",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        secondaryImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        price: "Rs. 29,999.99",
        description: "Advanced smartwatch with health tracking",
        features: ["7-day battery", "Water resistant", "Heart rate monitor"],
        badge: "New",
    },
    {
        name: "Wireless Headphones",
        brand: "AudioMax",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        secondaryImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        price: "Rs. 14,999.99",
        description: "Premium noise-canceling wireless headphones",
        features: ["30hr battery", "Noise canceling", "Bluetooth 5.0"],
        badge: "Best Seller",
    },
    {
        name: "Running Shoes",
        brand: "SportFit",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        secondaryImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        price: "Rs. 12,999.99",
        description: "Lightweight running shoes for athletes",
        features: ["Lightweight", "Breathable", "Cushioned sole"],
    },
    {
        name: "Sunglasses Elite",
        brand: "SunShade",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
        secondaryImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
        price: "Rs. 8,999.99",
        description: "Stylish polarized sunglasses",
        features: ["UV400 protection", "Polarized lenses", "Lightweight frame"],
        badge: "New",
    },
    {
        name: "Smartphone X",
        brand: "MobileTech",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
        secondaryImage: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
        price: "Rs. 79,999.99",
        description: "Latest flagship smartphone with advanced features",
        features: ['6.5" screen', "128GB storage", "48MP camera"],
    },
    {
        name: "Backpack Travel",
        brand: "Adventure Gear",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
        secondaryImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
        price: "Rs. 79,999.99",
        description: "Durable travel backpack for adventures",
        features: ["30L capacity", "Waterproof", "USB charging port"],
        badge: "Best Seller",
    },
    {
        name: "Camera Pro",
        brand: "PhotoTech",
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
        secondaryImage: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
        price: "Rs. 89,999.99",
        description: "Professional camera for photography enthusiasts",
        features: ["24MP sensor", "4K video", "Optical zoom"],
    },
    {
        name: "Laptop Ultra",
        brand: "TechPro",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a6d?w=400&h=400&fit=crop",
        secondaryImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a6d?w=400&h=400&fit=crop",
        price: "Rs. 1,29,999.99",
        description: "High-performance laptop for work and gaming",
        features: ['15.6" display', "16GB RAM", "512GB SSD"],
        badge: "New",
    },
];

function ProductList() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Product List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productData.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductList;

