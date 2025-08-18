import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

export function useSearch() {
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchNotFound, setSearchNotFound] = useState(false);
    
    // Use ref to track timeout for cleanup
    const timeoutRef = useRef(null);

    // Common search mappings that work across all pages
    const commonSearchMappings = {
        // Navigation search terms
        'home': () => navigate('/'),
        'gallery': () => navigate('/gallery'),
        'register': () => navigate('/register'),
        'registration': () => navigate('/register'),
        'admin': () => navigate('/admin'),
        
        // Common section searches
        'partners': () => {
            const partnersSection = document.getElementById('partners-section');
            if (partnersSection) partnersSection.scrollIntoView({ behavior: 'smooth' });
        },
        'sponsors': () => {
            const partnersSection = document.getElementById('partners-section');
            if (partnersSection) partnersSection.scrollIntoView({ behavior: 'smooth' });
        },
        'partnership': () => {
            const partnersSection = document.getElementById('partners-section');
            if (partnersSection) partnersSection.scrollIntoView({ behavior: 'smooth' });
        },
        'boogie': () => {
            // Try to find info/tabs section, otherwise go to home
            const tabsSection = document.getElementById('tabs-section');
            if (tabsSection) {
                tabsSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                navigate('/');
            }
        },
        'accra': () => {
            const tabsSection = document.getElementById('tabs-section');
            if (tabsSection) {
                tabsSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                navigate('/');
            }
        },
        'dance': () => {
            const tabsSection = document.getElementById('tabs-section');
            if (tabsSection) {
                tabsSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                navigate('/');
            }
        },
        'competition': () => {
            const tabsSection = document.getElementById('tabs-section');
            if (tabsSection) {
                tabsSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                navigate('/');
            }
        }
    };

    const performSearch = (query, pageSpecificMappings = {}) => {
        const lowerQuery = query.toLowerCase().trim();
        
        // Combine common and page-specific mappings
        const allMappings = { ...commonSearchMappings, ...pageSpecificMappings };
        
        // Find exact match first
        if (allMappings[lowerQuery]) {
            allMappings[lowerQuery]();
            setShowSearch(false);
            setSearchQuery("");
            setSearchNotFound(false);
            return;
        }
        
        // Find partial match
        const matchedKey = Object.keys(allMappings).find(key => 
            lowerQuery.includes(key) || key.includes(lowerQuery)
        );
        
        if (matchedKey) {
            allMappings[matchedKey]();
            setShowSearch(false);
            setSearchQuery("");
            setSearchNotFound(false);
        } else {
            // Clear any existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            
            // Show not found banner
            setSearchNotFound(true);
            setShowSearch(false);
            setSearchQuery("");
            
            // Hide the banner after 3 seconds with proper cleanup
            timeoutRef.current = setTimeout(() => {
                setSearchNotFound(false);
                timeoutRef.current = null;
            }, 3000);
        }
    };
    
    const handleSearchSubmit = (e, pageSpecificMappings = {}) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            performSearch(searchQuery.trim(), pageSpecificMappings);
        }
    };
    
    // Handle escape key to close search
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape' && showSearch) {
                setShowSearch(false);
                setSearchQuery("");
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => document.removeEventListener('keydown', handleEscapeKey);
    }, [showSearch]);
    
    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return {
        showSearch,
        setShowSearch,
        searchQuery,
        setSearchQuery,
        searchNotFound,
        setSearchNotFound,
        handleSearchSubmit
    };
}
