import { useState, useRef } from 'react';
import { FiCheck, FiPlus } from 'react-icons/fi';

const ProductCard = ({ product, isSelected, onToggleSelect, isMaxReached, darkMode }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const cardRef = useRef(null);

    const handleSelect = () => {
        if (!isMaxReached || isSelected) {
            onToggleSelect(product);
        }
    };

    // Keyboard accessibility
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSelect();
        }
    };

    const isActive = isHovered || isFocused;

    return (
        <div
            ref={cardRef}
            className={`group relative rounded-2xl border-2 overflow-hidden transition-all duration-500 h-full flex flex-col cursor-pointer ${isSelected
                    ? darkMode
                        ? 'border-emerald-400 shadow-lg shadow-emerald-900/30 bg-gray-800'
                        : 'border-emerald-500 shadow-lg shadow-emerald-100 bg-white'
                    : darkMode
                        ? 'border-gray-700 hover:border-gray-600 bg-gray-800 hover:shadow-2xl hover:shadow-black/30'
                        : 'border-gray-200/60 hover:border-gray-300/60 bg-white hover:shadow-2xl hover:shadow-gray-200/50'
                } ${isFocused ? 'ring-2 ring-emerald-500 ring-offset-2' : ''} ${darkMode && isFocused ? 'ring-offset-gray-900' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onClick={handleSelect}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-pressed={isSelected}
            aria-label={`${product.name} by ${product.brand}, ${product.price}. ${isSelected ? 'Selected for comparison' : 'Click to add to comparison'}`}
        >
            {/* Selection indicator */}
            {isSelected && (
                <div className="absolute top-3 left-3 z-20 bg-emerald-500 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-lg">
                    <FiCheck className="w-4 h-4" strokeWidth={2.5} />
                </div>
            )}

            {/* Keyboard hint on focus */}
            {isFocused && !isSelected && !isMaxReached && (
                <div className="absolute top-3 left-3 z-20 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg">
                    Press Enter
                </div>
            )}

            {/* Image Container */}
            <div className={`relative h-52 overflow-hidden shrink-0 ${darkMode ? 'bg-gray-700' : 'bg-linear-to-br from-gray-50 to-gray-100'
                }`}>
                <img
                    src={product.image}
                    alt=""
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isActive ? 'scale-110' : 'scale-100'
                        }`}
                />

                <div className={`absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'
                    }`} />

                <div className={`absolute top-4 left-4 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800/90 text-gray-200' : 'bg-white/95 text-gray-800'
                    }`}>
                    <span className="text-xs font-semibold tracking-wide uppercase">{product.brand}</span>
                </div>

                <div className={`absolute top-4 right-4 px-3.5 py-1.5 rounded-lg shadow-lg ${darkMode ? 'bg-emerald-600' : 'bg-gray-900'
                    }`}>
                    <span className="text-sm font-bold text-white">{product.price}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 grow flex flex-col">
                <h3 className={`text-lg font-semibold mb-4 leading-snug tracking-tight line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                    {product.name}
                </h3>

                <div className="space-y-2.5 grow mb-5">
                    {product.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2.5">
                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <span className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Compare Button */}
                <div
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${isSelected
                            ? 'bg-emerald-500 text-white shadow-lg'
                            : isMaxReached
                                ? darkMode
                                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : isActive
                                    ? darkMode
                                        ? 'bg-emerald-600 text-white shadow-lg'
                                        : 'bg-gray-900 text-white shadow-lg'
                                    : darkMode
                                        ? 'bg-gray-700 text-gray-300'
                                        : 'bg-gray-100 text-gray-800'
                        }`}
                    aria-hidden="true"
                >
                    {isSelected ? (
                        <>
                            <FiCheck className="w-4 h-4" />
                            Added to Compare
                        </>
                    ) : isMaxReached ? (
                        'Max 3 Selected'
                    ) : (
                        <>
                            <FiPlus className="w-4 h-4" />
                            Add to Compare
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
