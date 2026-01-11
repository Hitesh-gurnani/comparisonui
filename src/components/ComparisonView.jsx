import { useState, useEffect, useCallback } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';

const ComparisonView = ({ products, onClose, onRemove, darkMode }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const specLabels = {
        display: { label: 'Display', icon: '📱' },
        battery: { label: 'Battery', icon: '🔋' },
        storage: { label: 'Storage', icon: '💾' },
        camera: { label: 'Camera', icon: '📷' },
        processor: { label: 'Processor', icon: '⚡' },
        ram: { label: 'RAM', icon: '🧠' }
    };

    const areValuesDifferent = (specKey) => {
        const values = products.map(p => p.specs[specKey]);
        return new Set(values).size > 1;
    };


    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') {
            onClose();
        }
        // Arrow keys for mobile tab navigation
        if (e.key === 'ArrowLeft') {
            setActiveIndex(prev => Math.max(0, prev - 1));
        }
        if (e.key === 'ArrowRight') {
            setActiveIndex(prev => Math.min(products.length - 1, prev + 1));
        }
    }, [onClose, products.length]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [handleKeyDown]);

    const activeProduct = products[activeIndex];

    // Close if not enough products
    useEffect(() => {
        if (products.length < 2) {
            onClose();
        }
    }, [products.length, onClose]);

    if (products.length < 2) return null;

    return (
        <div
            className="fixed inset-0 z-100 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="comparison-title"
        >
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div className="relative min-h-screen flex items-start justify-center p-2 sm:p-4 pt-4 sm:pt-10 pb-10 sm:pb-20">
                <div className={`relative rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-6xl overflow-hidden animate-slideUp transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'
                    }`}>
                    {/* Header */}
                    <div className={`sticky top-0 backdrop-blur-xl border-b px-4 sm:px-6 py-4 sm:py-5 z-10 transition-colors duration-300 ${darkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-100'
                        }`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 id="comparison-title" className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Product Comparison
                                </h2>
                                <p className={`text-xs sm:text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <span className="hidden sm:inline">Compare specifications side by side</span>
                                    <span className="sm:hidden">Tap tabs or use arrow keys</span>
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                                    }`}
                                aria-label="Close comparison (Escape)"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* ========== MOBILE VIEW - Swipeable Cards ========== */}
                    <div className="sm:hidden">
                        {/* Product Tabs */}
                        <div className={`flex border-b ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-100 bg-gray-50/50'}`} role="tablist">
                            {products.map((product, idx) => (
                                <button
                                    key={product.id}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`flex-1 py-3 px-2 text-center transition-all relative focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 ${activeIndex === idx
                                        ? darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                                        : darkMode ? 'text-gray-500' : 'text-gray-500'
                                        }`}
                                    role="tab"
                                    aria-selected={activeIndex === idx}
                                    aria-controls={`panel-${product.id}`}
                                >
                                    <img
                                        src={product.image}
                                        alt=""
                                        className={`w-10 h-10 rounded-lg object-cover mx-auto mb-1 transition-all ${activeIndex === idx ? 'ring-2 ring-emerald-500' : 'opacity-60'
                                            }`}
                                    />
                                    <span className="text-xs font-medium line-clamp-1">{product.name.split(' ').slice(0, 2).join(' ')}</span>
                                    {activeIndex === idx && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Active Product Card */}
                        <div className="p-4" role="tabpanel" id={`panel-${activeProduct.id}`}>
                            <div className={`flex items-center gap-4 mb-6 pb-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                <div className="relative">
                                    <img
                                        src={activeProduct.image}
                                        alt={activeProduct.name}
                                        className="w-24 h-24 object-cover rounded-2xl shadow-lg"
                                    />
                                    <button
                                        onClick={() => onRemove(activeProduct.id)}
                                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        aria-label={`Remove ${activeProduct.name} from comparison`}
                                    >
                                        <FiX className="w-3 h-3 text-white" />
                                    </button>
                                </div>
                                <div className="flex-1">
                                    <p className={`text-xs uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{activeProduct.brand}</p>
                                    <h3 className={`font-bold text-lg leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>{activeProduct.name}</h3>
                                    <span className="inline-block mt-2 bg-emerald-500 text-white font-bold px-4 py-1.5 rounded-full text-lg">
                                        {activeProduct.price}
                                    </span>
                                </div>
                            </div>

                            {/* Specs List */}
                            <div className="space-y-3">
                                {Object.entries(specLabels).map(([key, { label, icon }]) => {
                                    const isDifferent = areValuesDifferent(key);
                                    const value = activeProduct.specs[key];

                                    return (
                                        <div
                                            key={key}
                                            className={`flex items-center justify-between p-3 rounded-xl ${isDifferent
                                                ? darkMode ? 'bg-amber-900/30 border border-amber-700/50' : 'bg-amber-50 border border-amber-100'
                                                : darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg">{icon}</span>
                                                <span className={`font-medium text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</span>
                                                {isDifferent && (
                                                    <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded uppercase ${darkMode ? 'bg-amber-700 text-amber-200' : 'bg-amber-200 text-amber-800'
                                                        }`}>
                                                        Varies
                                                    </span>
                                                )}
                                            </div>
                                            <span className={`text-sm font-semibold ${value === 'N/A'
                                                ? darkMode ? 'text-gray-600' : 'text-gray-400'
                                                : darkMode ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                {value}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Features */}
                            <div className={`mt-6 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                <h4 className={`font-semibold mb-3 flex items-center gap-2 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    <span>✨</span> Key Features
                                </h4>
                                <ul className="space-y-2">
                                    {activeProduct.features.map((feature, idx) => (
                                        <li key={idx} className={`flex items-start gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Quick Compare Hint */}
                            <div className={`mt-6 p-3 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <span className={`inline-block w-2 h-2 rounded mr-1 ${darkMode ? 'bg-amber-600' : 'bg-amber-300'}`}></span>
                                    Amber highlighted specs differ between products
                                </p>
                                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                    Tap tabs above to compare • {activeIndex + 1} of {products.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ========== DESKTOP VIEW - Side by Side ========== */}
                    <div className="hidden sm:block">
                        {/* Product Headers */}
                        <div className={`grid gap-4 p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`} style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
                            <div></div>
                            {products.map((product) => (
                                <div key={product.id} className="text-center">
                                    <div className="relative inline-block">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-28 h-28 object-cover rounded-2xl shadow-lg mx-auto mb-4"
                                        />
                                        <button
                                            onClick={() => onRemove(product.id)}
                                            className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                                            aria-label={`Remove ${product.name} from comparison`}
                                        >
                                            <FiX className="w-4 h-4 text-white" />
                                        </button>
                                    </div>
                                    <h3 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</h3>
                                    <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{product.brand}</p>
                                    <span className="inline-block bg-emerald-500 text-white font-bold px-4 py-1.5 rounded-full text-base">
                                        {product.price}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Specs Comparison */}
                        <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-100'}`}>
                            {Object.entries(specLabels).map(([key, { label, icon }]) => {
                                const isDifferent = areValuesDifferent(key);

                                return (
                                    <div
                                        key={key}
                                        className={`grid gap-4 px-6 py-4 transition-colors ${isDifferent
                                            ? darkMode ? 'bg-amber-900/20' : 'bg-amber-50/50'
                                            : darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                                            }`}
                                        style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{icon}</span>
                                            <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</span>
                                            {isDifferent && (
                                                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${darkMode ? 'bg-amber-700 text-amber-200' : 'bg-amber-200 text-amber-800'
                                                    }`}>
                                                    Differs
                                                </span>
                                            )}
                                        </div>
                                        {products.map((product) => (
                                            <div
                                                key={product.id}
                                                className={`text-center py-2 px-3 rounded-xl ${isDifferent
                                                    ? darkMode ? 'bg-gray-700 shadow-sm' : 'bg-white shadow-sm'
                                                    : ''
                                                    }`}
                                            >
                                                <span className={`text-base ${product.specs[key] === 'N/A'
                                                    ? darkMode ? 'text-gray-600' : 'text-gray-400'
                                                    : darkMode ? 'text-white font-medium' : 'text-gray-800 font-medium'
                                                    }`}>
                                                    {product.specs[key]}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}

                            {/* Features Section */}
                            <div className="px-6 py-6">
                                <h4 className={`font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    <span className="text-xl">✨</span>
                                    Key Features
                                </h4>
                                <div
                                    className="grid gap-4"
                                    style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}
                                >
                                    <div></div>
                                    {products.map((product) => (
                                        <div key={product.id} className={`rounded-xl p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                            <ul className="space-y-2">
                                                {product.features.map((feature, idx) => (
                                                    <li key={idx} className={`flex items-start gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className={`sticky bottom-0 backdrop-blur-xl border-t px-4 sm:px-6 py-3 sm:py-4 transition-colors duration-300 ${darkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-100'
                        }`}>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                            <p className={`hidden sm:flex text-sm items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                <span className={`inline-block w-3 h-3 rounded mr-2 shrink-0 ${darkMode ? 'bg-amber-700' : 'bg-amber-200'}`}></span>
                                <span>Highlighted rows show differences • Press Esc to close</span>
                            </p>
                            <button
                                onClick={onClose}
                                className={`w-full sm:w-auto px-6 py-2.5 font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode
                                    ? 'bg-white text-gray-900 hover:bg-gray-100 focus:ring-white'
                                    : 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900'
                                    }`}
                            >
                                Close Comparison
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComparisonView;
