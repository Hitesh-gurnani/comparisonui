import { useState, useEffect } from 'react';
import ProductGallery from './components/ProductGallery';
import CompareBar from './components/CompareBar';
import ComparisonView from './components/ComparisonView';
import ThemeToggle from './components/ThemeToggle';
import { products } from './data/products';

const STORAGE_KEY = 'comparison-selected-products';
const THEME_KEY = 'comparison-theme';

function App() {
  // Initialize selected products from localStorage
  const [selectedProducts, setSelectedProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const savedIds = JSON.parse(saved);
        // Rehydrate with full product data
        return savedIds
          .map(id => products.find(p => p.id === id))
          .filter(Boolean);
      }
    } catch (e) {
      console.error('Error loading from localStorage:', e);
    }
    return [];
  });

  // Initialize dark mode from localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved !== null) {
        return saved === 'dark';
      }
      // Fall back to system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  });

  const [showComparison, setShowComparison] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBrand, setFilterBrand] = useState('');

  // Persist selected products to localStorage
  useEffect(() => {
    try {
      const ids = selectedProducts.map(p => p.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }, [selectedProducts]);

  // Apply dark mode class to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleToggleSelect = (product) => {
    setSelectedProducts(prev => {
      const isSelected = prev.find(p => p.id === product.id);
      if (isSelected) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleCompare = () => {
    setShowComparison(true);
  };

  const handleCloseComparison = () => {
    setShowComparison(false);
  };

  const handleClearAll = () => {
    setSelectedProducts([]);
    setShowComparison(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Filter products based on search and brand
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesBrand = filterBrand === '' || product.brand === filterBrand;

    return matchesSearch && matchesBrand;
  });

  // Get unique brands for filter
  const brands = [...new Set(products.map(p => p.brand))];

  return (
    <div className={`relative min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Theme Toggle */}
      <ThemeToggle darkMode={darkMode} onToggle={toggleDarkMode} />

      <ProductGallery
        products={filteredProducts}
        allProducts={products}
        selectedProducts={selectedProducts}
        onToggleSelect={handleToggleSelect}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterBrand={filterBrand}
        onFilterChange={setFilterBrand}
        brands={brands}
        darkMode={darkMode}
      />

      <CompareBar
        selectedProducts={selectedProducts}
        onRemove={handleRemoveProduct}
        onCompare={handleCompare}
        onClearAll={handleClearAll}
        darkMode={darkMode}
      />

      {showComparison && (
        <ComparisonView
          products={selectedProducts}
          onClose={handleCloseComparison}
          onRemove={handleRemoveProduct}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

export default App;
