import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = ({ darkMode, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onToggle();
                }
            }}
            className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700 focus:ring-yellow-400'
                    : 'bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-400'
                }`}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
        </button>
    );
};

export default ThemeToggle;
