import { Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import image5 from "../assets/image5.png";

export default function Header({ 
    isSectionLoaded, 
    showSearch, 
    setShowSearch, 
    searchQuery, 
    setSearchQuery, 
    handleSearchSubmit, 
    searchNotFound, 
    setSearchNotFound,
    searchPlaceholder = "Search...",
    searchHint = "Try searching for different sections or pages"
}) {
    const navigate = useNavigate();
    const location = useLocation();
    
    const navigateToHome = () => navigate('/');
    const navigateToGallery = () => navigate('/gallery');
    const navigateToRegister = () => navigate('/register');
    
    const handleSearch = () => setShowSearch(!showSearch);
    
    // Get current page for active state
    const currentPage = location.pathname;
    
    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg transition-all duration-800 ${
                isSectionLoaded('header') ? 'section-visible' : 'section-hidden'
            }`}>
                <div className="flex items-center justify-between container mx-auto py-3 px-4">
                    <div>
                        <img src={image5} alt="ABK" className="h-8 md:h-12"/>
                    </div>

                    <div className="opacity-50 bg-neutral">
                        <div className="flex space-x-3 md:space-x-8 p-2 border-base-100 border-1 rounded-lg text-xs md:text-sm">
                            <button 
                                onClick={navigateToHome}
                                className={`px-2 md:px-3 py-1 rounded cursor-pointer transition-all duration-200 hover:bg-base-200 ${
                                    currentPage === '/' ? 'bg-base-200' : ''
                                }`}
                            >
                                Home
                            </button>
                            <button 
                                onClick={navigateToGallery}
                                className={`px-2 md:px-3 py-1 rounded cursor-pointer transition-all duration-200 hover:bg-base-200 ${
                                    currentPage === '/gallery' ? 'bg-base-200' : ''
                                }`}
                            >
                                Gallery
                            </button>
                            <div className="px-2 md:px-3 py-1 rounded cursor-pointer transition-all duration-200 hover:bg-base-200">
                                ABK TV
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex space-x-3 md:space-x-4 items-center">
                            <button 
                                onClick={navigateToRegister}
                                className={`cursor-pointer hover:opacity-80 transition-all duration-200 bg-base-100 opacity-100 px-2 md:px-3 py-1 rounded ${
                                    currentPage === '/register' ? 'bg-opacity-80' : ''
                                }`}
                            >
                                <h5 className="text-sm md:text-base">Register</h5>
                            </button>
                            <button 
                                onClick={handleSearch}
                                className="cursor-pointer hover:opacity-80 transition-all duration-200"
                            >
                                <Search className="w-6 h-6 md:w-7 md:h-7" />
                            </button>
                        </div>
                        
                        {/* Search Input - Mobile/Desktop Responsive */}
                        {showSearch && (
                            <div className="absolute top-full right-0 mt-2 w-72 md:w-80 bg-neutral border border-base-100 rounded-lg p-3 shadow-lg z-50">
                                <form onSubmit={handleSearchSubmit}>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={searchPlaceholder}
                                        className="w-full bg-transparent border-b border-primary-content text-neutral-content placeholder-neutral-content/60 py-2 focus:outline-none focus:border-primary-content text-sm"
                                    />
                                    <div className="mt-2 text-xs text-neutral-content/60">
                                        {searchHint}
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Search Not Found Banner */}
            {searchNotFound && (
                <div className="fixed top-16 right-4 z-40 max-w-xs">
                    <div className="bg-red-500 text-white px-3 py-2 rounded text-xs shadow-md relative">
                        <button 
                            onClick={() => setSearchNotFound(false)}
                            className="absolute -top-1 -right-1 text-white hover:text-gray-200 text-sm font-bold w-4 h-4 rounded-full bg-red-600 flex items-center justify-center"
                        >
                            ×
                        </button>
                        <p>Search not found</p>
                    </div>
                </div>
            )}
        </>
    );
}
