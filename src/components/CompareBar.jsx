import { FiX, FiPlus, FiBarChart2 } from 'react-icons/fi';

const CompareBar = ({ selectedProducts, onRemove, onCompare, onClearAll, darkMode }) => {
    if (selectedProducts.length < 2) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-slideUp">
            <div className={`backdrop-blur-xl border-t shadow-2xl transition-colors duration-300 ${darkMode
                ? 'bg-gray-800/95 border-gray-700 shadow-black/20'
                : 'bg-white/95 border-gray-200 shadow-gray-900/10'
                }`}>
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">

                        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 sm:pb-0">
                            <span className={`text-xs sm:text-sm font-medium shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                Comparing:
                            </span>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                {selectedProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className={`flex items-center gap-1.5 sm:gap-2 rounded-full pl-0.5 sm:pl-1 pr-2 sm:pr-3 py-0.5 sm:py-1 group transition-colors ${darkMode
                                            ? 'bg-gray-700 hover:bg-gray-600'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                            }`}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border-2 ${darkMode ? 'border-gray-600' : 'border-white'
                                                }`}
                                        />
                                        <span className={`text-xs sm:text-sm font-medium max-w-[60px] sm:max-w-[120px] truncate hidden xs:block sm:block ${darkMode ? 'text-gray-200' : 'text-gray-700'
                                            }`}>
                                            {product.name}
                                        </span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onRemove(product.id); }}
                                            className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${darkMode
                                                ? 'bg-gray-600 hover:bg-red-500 text-gray-400 hover:text-white'
                                                : 'bg-gray-300 hover:bg-red-500 text-gray-600 hover:text-white'
                                                }`}
                                            aria-label={`Remove ${product.name} from comparison`}
                                        >
                                            <FiX className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                        </button>
                                    </div>
                                ))}


                                {Array.from({ length: 3 - selectedProducts.length }).map((_, i) => (
                                    <div
                                        key={`empty-${i}`}
                                        className={`hidden sm:flex w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 border-dashed items-center justify-center ${darkMode ? 'border-gray-600' : 'border-gray-300'
                                            }`}
                                    >
                                        <FiPlus className={`w-3 h-3 sm:w-4 sm:h-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                            <button
                                onClick={onClearAll}
                                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-lg ${darkMode
                                    ? 'text-gray-400 hover:text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                aria-label="Clear all selected products"
                            >
                                Clear
                            </button>
                            <button
                                onClick={onCompare}
                                className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 flex items-center justify-center gap-1.5 sm:gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                aria-label="Open comparison view"
                            >
                                <FiBarChart2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                Compare Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompareBar;
