import { useState, useMemo } from "react";
import { useSearch } from "../hooks/useSearch";
import { useProgressiveLoading } from "../hooks/useProgressiveLoading";
import Header from "../components/blocks/Header";
import HeroSection from "../components/blocks/HeroSection";
import LogoSection from "../components/blocks/LogoSection";
import PartnersSection from "../components/blocks/PartnersSection";
import SocialMediaFooter from "../components/blocks/SocialMediaFooter";
import LoadingScreen from "../components/blocks/LoadingScreen";
import image2 from "../components/assets/image2.jpg";
import flier from "../components/assets/flier.jpg";

export default function Gallery() {
    const [activeTab, setActiveTab] = useState("Past Events");
    
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
    const sections = useMemo(() => ['header', 'hero', 'logo', 'gallery', 'tabs', 'content', 'partners'], []);
    const { isInitialLoading, isSectionLoaded } = useProgressiveLoading(sections);

    // Page-specific search mappings (memoized to prevent recreation on every render)
    const gallerySearchMappings = useMemo(() => ({
        // Gallery-specific search terms
        'gallery': () => {
            const gallerySection = document.getElementById('gallery-section');
            if (gallerySection) gallerySection.scrollIntoView({ behavior: 'smooth' });
        },
        'photos': () => {
            const gallerySection = document.getElementById('gallery-section');
            if (gallerySection) gallerySection.scrollIntoView({ behavior: 'smooth' });
            setActiveTab('Past Events');
        },
        'videos': () => {
            const gallerySection = document.getElementById('gallery-section');
            if (gallerySection) gallerySection.scrollIntoView({ behavior: 'smooth' });
            setActiveTab('Videos');
        },
        'highlights': () => {
            const gallerySection = document.getElementById('gallery-section');
            if (gallerySection) gallerySection.scrollIntoView({ behavior: 'smooth' });
            setActiveTab('Highlights');
        },
        'past events': () => {
            const gallerySection = document.getElementById('gallery-section');
            if (gallerySection) gallerySection.scrollIntoView({ behavior: 'smooth' });
            setActiveTab('Past Events');
        },
        'behind scenes': () => {
            const gallerySection = document.getElementById('gallery-section');
            if (gallerySection) gallerySection.scrollIntoView({ behavior: 'smooth' });
            setActiveTab('Behind the Scenes');
        },
        'behind the scenes': () => {
            const gallerySection = document.getElementById('gallery-section');
            if (gallerySection) gallerySection.scrollIntoView({ behavior: 'smooth' });
            setActiveTab('Behind the Scenes');
        }
    }), [setActiveTab]);

    const handleSearchSubmitWithMappings = (e) => {
        handleSearchSubmit(e, gallerySearchMappings);
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
                searchPlaceholder="Search gallery, videos, highlights, home..."
                searchHint='Try: "videos", "highlights", "home", "register", "past events"'
            />

            {/* Add padding top to account for fixed header */}
            <div className="pt-20">
                <HeroSection isSectionLoaded={isSectionLoaded} />
                <LogoSection isSectionLoaded={isSectionLoaded} />

                {/* Gallery Section */}
                <div id="gallery-section" className={`flex flex-col items-center justify-center p-2 pt-24 transition-all duration-800 ${
                    isSectionLoaded('gallery') ? 'section-visible' : 'section-hidden'
                }`}>
                    <h1 className="font-bold text-xl md:text-2xl mb-8">GALLERY</h1>
                </div>

                {/* Gallery Tabs */}
                <div className={`flex items-center justify-center space-x-4 container mx-auto px-4 mb-8 transition-all duration-800 ${
                    isSectionLoaded('tabs') ? 'section-visible' : 'section-hidden'
                }`}>
                    <div className="w-full max-w-6xl bg-primary p-4 md:p-8 rounded-lg">
                        <div className="flex flex-wrap gap-1 md:gap-2 mb-6 bg-neutral rounded-lg p-1">
                            {['Past Events', 'Videos', 'Highlights', 'Behind the Scenes'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-2 md:py-3 px-2 md:px-4 rounded-md transition-all duration-200 text-xs md:text-base ${
                                        activeTab === tab
                                            ? 'bg-primary-content text-primary font-medium'
                                            : 'text-neutral-content hover:bg-primary-content/10'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Gallery Content */}
                        <div className={`transition-all duration-800 ${
                            isSectionLoaded('content') ? 'section-visible' : 'section-hidden'
                        }`}>
                            {activeTab === 'Past Events' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl md:text-2xl font-semibold">Past Events Gallery</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-neutral rounded-lg overflow-hidden">
                                            <img src={image2} alt="ABK 2023" className="w-full h-48 object-cover"/>
                                            <div className="p-4">
                                                <h3 className="font-semibold mb-2">ABK 2023 Finals</h3>
                                                <p className="text-sm text-neutral-content/70">The epic finale of Accra Boogie King 2023</p>
                                            </div>
                                        </div>
                                        <div className="bg-neutral rounded-lg overflow-hidden">
                                            <img src={flier} alt="ABK 2023 Auditions" className="w-full h-48 object-cover"/>
                                            <div className="p-4">
                                                <h3 className="font-semibold mb-2">ABK 2023 Auditions</h3>
                                                <p className="text-sm text-neutral-content/70">Teams battling for their spot in the competition</p>
                                            </div>
                                        </div>
                                        <div className="bg-neutral rounded-lg overflow-hidden">
                                            <div className="w-full h-48 bg-gray-600 flex items-center justify-center">
                                                <span className="text-gray-400">More photos coming soon...</span>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold mb-2">ABK 2024 Prep</h3>
                                                <p className="text-sm text-neutral-content/70">Behind the scenes preparation</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Videos' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl md:text-2xl font-semibold">Video Gallery</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-neutral rounded-lg overflow-hidden">
                                            <div className="w-full h-48 bg-gray-600 flex items-center justify-center">
                                                <span className="text-gray-400">Videos coming soon...</span>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold mb-2">ABK 2023 Highlights</h3>
                                                <p className="text-sm text-neutral-content/70">Best moments from the 2023 competition</p>
                                            </div>
                                        </div>
                                        <div className="bg-neutral rounded-lg overflow-hidden">
                                            <div className="w-full h-48 bg-gray-600 flex items-center justify-center">
                                                <span className="text-gray-400">Videos coming soon</span>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold mb-2">ABK 2023 Finals</h3>
                                                <p className="text-sm text-neutral-content/70">Full coverage of the championship round</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Highlights' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl md:text-2xl font-semibold">Competition Highlights</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-neutral p-6 rounded-lg">
                                            <h3 className="text-lg font-semibold mb-3">Most Memorable Performances</h3>
                                            <ul className="space-y-2 text-sm text-neutral-content/70">
                                                <li>• Team Rhythm's championship-winning routine</li>
                                                <li>• Urban Beats' incredible freestyle battle</li>
                                                <li>• Groove Masters' technical showcase</li>
                                                <li>• Dynamic Crew's crowd-favorite performance</li>
                                            </ul>
                                        </div>
                                        <div className="bg-neutral p-6 rounded-lg">
                                            <h3 className="text-lg font-semibold mb-3">Record-Breaking Moments</h3>
                                            <ul className="space-y-2 text-sm text-neutral-content/70">
                                                <li>• Highest attendance: 5,000+ spectators</li>
                                                <li>• Most teams registered: 150+ crews</li>
                                                <li>• Longest performance: 8 minutes</li>
                                                <li>• First international team participation</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Behind the Scenes' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl md:text-2xl font-semibold">Behind the Scenes</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-neutral rounded-lg overflow-hidden">
                                            <div className="w-full h-48 bg-gray-600 flex items-center justify-center">
                                                <span className="text-gray-400">BTS Photo</span>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold mb-2">Stage Setup</h3>
                                                <p className="text-sm text-neutral-content/70">Preparing the National Theatre stage</p>
                                            </div>
                                        </div>
                                        <div className="bg-neutral rounded-lg overflow-hidden">
                                            <div className="w-full h-48 bg-gray-600 flex items-center justify-center">
                                                <span className="text-gray-400">BTS Photo</span>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold mb-2">Team Preparations</h3>
                                                <p className="text-sm text-neutral-content/70">Teams warming up backstage</p>
                                            </div>
                                        </div>
                                        <div className="bg-neutral rounded-lg overflow-hidden">
                                            <div className="w-full h-48 bg-gray-600 flex items-center justify-center">
                                                <span className="text-gray-400">BTS Photo</span>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold mb-2">Production Team</h3>
                                                <p className="text-sm text-neutral-content/70">The crew making it all happen</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <PartnersSection isSectionLoaded={isSectionLoaded} />
                <SocialMediaFooter isSectionLoaded={isSectionLoaded} />
            </div>
        </div>
    );
}
