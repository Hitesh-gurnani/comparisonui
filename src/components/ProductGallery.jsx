import { useRef } from 'react';
import { FiSearch, FiX, FiFrown } from 'react-icons/fi';
import ProductCard from './ProductCard';

const ProductGallery = ({
    products,
    allProducts,
    selectedProducts = [],
    onToggleSelect,
    searchQuery,
    onSearchChange,
    filterBrand,
    onFilterChange,
    brands,
    darkMode,
    title = "Premium Products"
}) => {
    const isMaxReached = selectedProducts.length >= 3;
    const searchInputRef = useRef(null);

    const handleKeyDown = (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            searchInputRef.current?.focus();
        }
    };

    return (
        <div
            className={`min-h-screen pb-32 transition-colors duration-300 ${darkMode
                ? 'bg-gray-900'
                : 'bg-linear-to-b from-gray-50 via-white to-gray-50'
                }`}
            onKeyDown={handleKeyDown}
        >
            <div className="pt-16 pb-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <span className={`inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full mb-6 ${darkMode ? 'bg-emerald-600 text-white' : 'bg-gray-900 text-white'
                        }`}>
                        Featured Collection
                    </span>
                    <h1 className={`text-4xl md:text-5xl font-bold mb-4 tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                        {title}
                    </h1>
                    <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                        Discover our handpicked selection of premium tech products
                    </p>

                    <p className={`text-sm mt-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        Select up to 3 products to compare side-by-side
                    </p>

                    <div className="flex items-center justify-center gap-2 mt-6">
                        <div className={`w-12 h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
                        <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-400'}`} />
                        <div className={`w-12 h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
                    </div>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="px-4 sm:px-6 lg:px-8 mb-8">
                <div className="max-w-7xl mx-auto">
                    <div className={`flex flex-col sm:flex-row gap-4 p-4 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
                        }`}>
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FiSearch className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                            </div>
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search products... (⌘K)"
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500'
                                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-emerald-500'
                                    }`}
                                aria-label="Search products"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => onSearchChange('')}
                                    className={`absolute inset-y-0 right-0 pr-4 flex items-center ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                    aria-label="Clear search"
                                >
                                    <FiX className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {/* Brand Filter */}
                        <div className="sm:w-48">
                            <select
                                value={filterBrand}
                                onChange={(e) => onFilterChange(e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white focus:border-emerald-500'
                                    : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500'
                                    }`}
                                aria-label="Filter by brand"
                            >
                                <option value="">All Brands</option>
                                {brands.map(brand => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </select>
                        </div>

                        {/* Results count */}
                        <div className={`hidden sm:flex items-center px-4 py-2 rounded-xl ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                            }`}>
                            <span className="text-sm font-medium">
                                {products.length} of {allProducts.length}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {products.length === 0 ? (
                        <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <FiFrown className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium mb-2">No products found</p>
                            <p className="text-sm">Try adjusting your search or filter</p>
                            <button
                                onClick={() => { onSearchChange(''); onFilterChange(''); }}
                                className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            role="list"
                            aria-label="Product list"
                        >
                            {products.map((product, index) => (
                                <div
                                    key={product.id}
                                    className="opacity-0 animate-slideUp"
                                    style={{
                                        animationDelay: `${Math.min(index * 50, 400)}ms`,
                                        animationFillMode: 'forwards'
                                    }}
                                    role="listitem"
                                >
                                    <ProductCard
                                        product={product}
                                        isSelected={selectedProducts.some(p => p.id === product.id)}
                                        onToggleSelect={onToggleSelect}
                                        isMaxReached={isMaxReached}
                                        darkMode={darkMode}
                                        tabIndex={0}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductGallery;
