import { useState, useMemo } from "react";
import { useSearch } from "../hooks/useSearch";
import { useProgressiveLoading } from "../hooks/useProgressiveLoading";
import Header from "../components/blocks/Header";
import HeroSection from "../components/blocks/HeroSection";
import LogoSection from "../components/blocks/LogoSection";
import EventInfoSection from "../components/blocks/EventInfoSection";
import PartnersSection from "../components/blocks/PartnersSection";
import SocialMediaFooter from "../components/blocks/SocialMediaFooter";
import LoadingScreen from "../components/blocks/LoadingScreen";
import FlierSection from "../components/blocks/FlierSection";

export default function Home() {
    const [activeTab, setActiveTab] = useState("Info");
    
    // Use custom hooks
    const { 
        showSearch, 
        setShowSearch, 
        searchQuery, 
        setSearchQuery, 
        searchNotFound, 
        setSearchNotFound, 
        handleSearchSubmit 
    } = useSearch();

    // Memoize sections array to prevent unnecessary re-renders
    const sections = useMemo(() => ['header', 'hero', 'logo', 'info', 'tabs', 'content', 'divider', 'partners', 'flier', 'stories'], []);
    const { isInitialLoading, isSectionLoaded } = useProgressiveLoading(sections);

    // Page-specific search mappings (memoized to prevent recreation on every render)
    const homeSearchMappings = useMemo(() => ({
        // Home-specific search terms
        'info': () => {
            const tabsSection = document.getElementById('tabs-section');
            if (tabsSection) tabsSection.scrollIntoView({ behavior: 'smooth' });
            setActiveTab('Info');
        },
        'information': () => {
            const tabsSection = document.getElementById('tabs-section');
            if (tabsSection) tabsSection.scrollIntoView({ behavior: 'smooth' });
            setActiveTab('Info');
        },
        'auditions': () => {
            const tabsSection = document.getElementById('tabs-section');
            if (tabsSection) tabsSection.scrollIntoView({ behavior: 'smooth' });
            setActiveTab('Auditions');
        },
        'audition': () => {
            const tabsSection = document.getElementById('tabs-section');
            if (tabsSection) tabsSection.scrollIntoView({ behavior: 'smooth' });
            setActiveTab('Auditions');
        },
        'events': () => {
            const tabsSection = document.getElementById('tabs-section');
            if (tabsSection) tabsSection.scrollIntoView({ behavior: 'smooth' });
            setActiveTab('Events');
        },
        'event': () => {
            const tabsSection = document.getElementById('tabs-section');
            if (tabsSection) tabsSection.scrollIntoView({ behavior: 'smooth' });
            setActiveTab('Events');
        },
        'stories': () => {
            const storiesSection = document.getElementById('stories-section');
            if (storiesSection) storiesSection.scrollIntoView({ behavior: 'smooth' });
        },
        'story': () => {
            const storiesSection = document.getElementById('stories-section');
            if (storiesSection) storiesSection.scrollIntoView({ behavior: 'smooth' });
        },
        'flier': () => {
            const flierSection = document.getElementById('flier-section');
            if (flierSection) flierSection.scrollIntoView({ behavior: 'smooth' });
        },
        'poster': () => {
            const flierSection = document.getElementById('flier-section');
            if (flierSection) flierSection.scrollIntoView({ behavior: 'smooth' });
        }
    }), [setActiveTab]);

    const handleSearchSubmitWithMappings = (e) => {
        handleSearchSubmit(e, homeSearchMappings);
    };
    
    // Show loading screen initially
    if (isInitialLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="flex flex-col space-y-2">
            <Header 
                isSectionLoaded={isSectionLoaded}
                showSearch={showSearch}
                setShowSearch={setShowSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearchSubmit={handleSearchSubmitWithMappings}
                searchNotFound={searchNotFound}
                setSearchNotFound={setSearchNotFound}
                searchPlaceholder="Search info, auditions, gallery, register..."
                searchHint='Try: "auditions", "events", "gallery", "register", "stories"'
            />

            {/* Add padding top to account for fixed header */}
            <div className="pt-20">
                <HeroSection isSectionLoaded={isSectionLoaded} />
                <LogoSection isSectionLoaded={isSectionLoaded} />
                <EventInfoSection 
                    isSectionLoaded={isSectionLoaded} 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                />
                <PartnersSection isSectionLoaded={isSectionLoaded} />
                <FlierSection isSectionLoaded={isSectionLoaded} />

                {/* Stories Section */}
                <div id="stories-section" className={`bg-primary py-8 transition-all duration-800 ${
                    isSectionLoaded('stories') ? 'section-visible' : 'section-hidden'
                }`}>
                </div>

                <SocialMediaFooter isSectionLoaded={isSectionLoaded} />
            </div>
        </div>
    );
}
