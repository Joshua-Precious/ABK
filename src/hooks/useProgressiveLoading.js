import { useState, useEffect } from 'react';

export function useProgressiveLoading(sections, initialDelay = 500, sectionDelay = 400) {
    const [loadedSections, setLoadedSections] = useState([]);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    
    useEffect(() => {
        const timeouts = [];
        
        // Initial loading delay
        const initialTimeout = setTimeout(() => {
            setIsInitialLoading(false);
        }, initialDelay);
        timeouts.push(initialTimeout);
        
        // Progressive loading animation with staggered timing
        sections.forEach((section, index) => {
            const sectionTimeout = setTimeout(() => {
                setLoadedSections(prev => [...prev, section]);
            }, (index + 1) * sectionDelay + initialDelay);
            timeouts.push(sectionTimeout);
        });
        
        // Cleanup function to clear all timeouts
        return () => {
            timeouts.forEach(timeout => clearTimeout(timeout));
        };
    }, [sections, initialDelay, sectionDelay]);
    
    // Helper function to check if a section is loaded
    const isSectionLoaded = (sectionName) => loadedSections.includes(sectionName);

    return {
        isInitialLoading,
        isSectionLoaded,
        loadedSections
    };
}
