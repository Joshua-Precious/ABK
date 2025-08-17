import { User, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import image5 from "../components/assets/image5.png";
import image1 from "../components/assets/image1.jpg";
import image2 from "../components/assets/image2.jpg";
import image4 from "../components/assets/image4.png";
import flier from "../components/assets/flier.jpg";
import spons1 from "../components/assets/spons1.png";
import spons2 from "../components/assets/spons2.png";
import spons3 from "../components/assets/spons3.jpg";
import spons4 from "../components/assets/spons4.png";

export default function Home() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Info");
    const [loadedSections, setLoadedSections] = useState([]);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchNotFound, setSearchNotFound] = useState(false);
    
    useEffect(() => {
        // Initial loading delay
        setTimeout(() => {
            setIsInitialLoading(false);
        }, 500);
        
        // Define sections that will load progressively
        const sections = ['header', 'hero', 'logo', 'info', 'tabs', 'content', 'divider', 'partners', 'flier', 'stories'];
        
        // Progressive loading animation with staggered timing
        sections.forEach((section, index) => {
            setTimeout(() => {
                setLoadedSections(prev => [...prev, section]);
            }, (index + 1) * 400 + 500); // Add 500ms for initial loading
        });
        
        // Check for hash navigation to auditions
        const checkHashNavigation = () => {
            const hash = window.location.hash;
            if (hash === '#auditions-section') {
                setActiveTab("Auditions");
                setTimeout(() => {
                    const tabsSection = document.getElementById('tabs-section');
                    if (tabsSection) {
                        tabsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        };
        
        // Check immediately and after loading
        checkHashNavigation();
        setTimeout(checkHashNavigation, 2000);
        
        // Listen for hash changes
        const handleHashChange = () => {
            checkHashNavigation();
        };
        
        window.addEventListener('hashchange', handleHashChange);
        
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);
    
    // Helper function to check if a section is loaded
    const isSectionLoaded = (sectionName) => loadedSections.includes(sectionName);
    
    const navigateToGallery = () => {
        navigate('/gallery');
        // Use a small delay to ensure navigation happens first
        setTimeout(() => {
            window.location.hash = '#gallery-section';
        }, 100);
    };
    
    const navigateToRegister = () => {
        navigate('/register');
    };
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    // Search functionality
    const handleSearch = () => {
        setShowSearch(!showSearch);
    };
    
    const performSearch = (query) => {
        const lowerQuery = query.toLowerCase().trim();
        
        // Define searchable content and their corresponding actions
        const searchMappings = {
            // Auditions search terms
            'audition': () => {
                setActiveTab("Auditions");
                setTimeout(() => {
                    const tabsSection = document.getElementById('tabs-section');
                    if (tabsSection) tabsSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            },
            'auditions': () => {
                setActiveTab("Auditions");
                setTimeout(() => {
                    const tabsSection = document.getElementById('tabs-section');
                    if (tabsSection) tabsSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            },
            // Rules search terms
            'rules': () => {
                setActiveTab("Official Rules");
                setTimeout(() => {
                    const tabsSection = document.getElementById('tabs-section');
                    if (tabsSection) tabsSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            },
            'official rules': () => {
                setActiveTab("Official Rules");
                setTimeout(() => {
                    const tabsSection = document.getElementById('tabs-section');
                    if (tabsSection) tabsSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            },
            'official': () => {
                setActiveTab("Official Rules");
                setTimeout(() => {
                    const tabsSection = document.getElementById('tabs-section');
                    if (tabsSection) tabsSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            },
            // Info search terms
            'info': () => {
                setActiveTab("Info");
                setTimeout(() => {
                    const tabsSection = document.getElementById('tabs-section');
                    if (tabsSection) tabsSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            },
            'information': () => {
                setActiveTab("Info");
                setTimeout(() => {
                    const tabsSection = document.getElementById('tabs-section');
                    if (tabsSection) tabsSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            },
            'event info': () => {
                setActiveTab("Info");
                setTimeout(() => {
                    const tabsSection = document.getElementById('tabs-section');
                    if (tabsSection) tabsSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            },
            // Navigation search terms
            'gallery': () => navigate('/gallery'),
            'register': () => navigate('/register'),
            'registration': () => navigate('/register'),
            'apply': () => navigate('/register'),
            'form': () => navigate('/register'),
            'home': () => scrollToTop(),
            // Partners/Sponsors search terms
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
            // Event details search terms
            'october': () => scrollToTop(),
            '2025': () => scrollToTop(),
            'accra': () => scrollToTop(),
            'boogie king': () => scrollToTop(),
            'boogie': () => scrollToTop(),
            'dance': () => scrollToTop(),
            'competition': () => scrollToTop(),
            'event': () => scrollToTop(),
            'show': () => scrollToTop(),
            'first love center': () => scrollToTop(),
            'east legon': () => scrollToTop(),
            'venue': () => scrollToTop(),
            'location': () => scrollToTop(),
            'date': () => scrollToTop(),
            'time': () => scrollToTop()
        };
        
        // Find exact match first
        if (searchMappings[lowerQuery]) {
            searchMappings[lowerQuery]();
            setShowSearch(false);
            setSearchQuery("");
            setSearchNotFound(false);
            return;
        }
        
        // Find partial match
        const matchedKey = Object.keys(searchMappings).find(key => 
            lowerQuery.includes(key) || key.includes(lowerQuery)
        );
        
        if (matchedKey) {
            searchMappings[matchedKey]();
            setShowSearch(false);
            setSearchQuery("");
            setSearchNotFound(false);
        } else {
            // Show not found banner
            setSearchNotFound(true);
            setShowSearch(false);
            setSearchQuery("");
            // Hide the banner after 3 seconds
            setTimeout(() => {
                setSearchNotFound(false);
            }, 3000);
        }
    };
    
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            performSearch(searchQuery.trim());
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
    
    // Show loading screen initially
    if (isInitialLoading) {
        return (
            <div className="fixed inset-0 bg-primary flex items-center justify-center z-50">
                <div className="text-center">
                    <img src={image5} alt="ABK" className="h-24 mx-auto mb-4 animate-pulse"/>
                    <div className="text-xl font-medium">Loading...</div>
                    <div className="mt-4">
                        <div className="w-48 h-1 bg-neutral-content bg-opacity-20 rounded-full mx-auto">
                            <div className="h-1 bg-primary-content rounded-full animate-pulse" style={{width: '60%'}}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-2 ">
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
                            onClick={scrollToTop}
                            className="px-2 md:px-3 py-1 rounded cursor-pointer transition-all duration-200 bg-base-100 opacity-100"
                        >
                            Home
                        </button>
                        <button 
                            onClick={navigateToGallery}
                            className="px-2 md:px-3 py-1 rounded cursor-pointer transition-all duration-200 hover:bg-base-200"
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
                            className="cursor-pointer hover:opacity-80 transition-all duration-200"
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
                                    placeholder="Search for auditions, info, gallery, register..."
                                    className="w-full bg-transparent border-b border-primary-content text-neutral-content placeholder-neutral-content/60 py-2 focus:outline-none focus:border-primary-content text-sm"
                                />
                                <div className="mt-2 text-xs text-neutral-content/60">
                                    Try: "auditions", "gallery", "register", "partners", "rules", "event info"
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

            {/* Add padding top to account for fixed header */}
            <div className="pt-20">

            <div className={`h-80 md:h-80 max-w-full bg-cover p-4 md:p-32 transition-all duration-800 ${
                isSectionLoaded('hero') ? 'section-visible' : 'section-hidden'
            }`} 
            style={{ 
                background: `linear-gradient(to bottom, transparent 60%, #00060e 100%), url(${image1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}> 
            
                <div className="flex flex-col justify-center h-full">
                    <div>
                        <h1 className="text-3xl md:text-6xl font-medium pb-2">Accra Boogie King</h1>
                    </div>
                    <div className="font-light opacity-60">
                        <h4 className="text-sm md:text-base">Ghana's ultimate team dance showdance, Accra Boogie King, returns for its 2025 edition — bringing together the </h4>
                        <p className="text-sm md:text-base">best crews to connect, compete, and celebrate Ghana's vibrant dance culture. Stay tuned for audition updates</p>
                        <p className="text-sm md:text-base">below!</p>
                    </div>
                </div>

            </div>

            <div className={`flex items-center justify-center transition-all duration-800 ${
                isSectionLoaded('logo') ? 'section-visible' : 'section-hidden'
            }`}>
                <img src={image4} alt="ABK" className="h-40 md:h-60 max-w-full"/>
            </div>

            <div className={`flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 px-4 transition-all duration-800 ${
                isSectionLoaded('info') ? 'section-visible' : 'section-hidden'
            }`}>
                <div className="w-px h-32 md:h-56 bg-base-100 hidden md:block"></div>
                <div className="flex flex-col items-center justify-center px-4 text-center">
                    <h2 className="flex p-4 text-lg md:text-xl font-bold">Accra Boogie King 2025</h2>
                    <div className="py-4 md:py-6 flex flex-col items-center">
                        <h3 className="text-base md:text-lg">October 19, 2025</h3>
                        <p className="text-sm md:text-base">FIRST LOVE CENTER | EAST LEGON | ACCRA</p>
                    </div>
                    
                    <p className="font-light opacity-60 text-xs md:text-sm">Accra Boogie King returns to Accra with an unmissable</p>
                    <p className="font-light opacity-60 text-xs md:text-sm">dance showdown and festival vibe!</p>
                    <div className="flex flex-col items-center justify-center p-4 md:p-6 text-sm gap-3">
                        <button className="border-base-200 border-2 p-2 rounded-lg w-full md:w-auto">View Event Info</button>
                        <button className="border-base-200 border-2 p-2 rounded-lg w-full md:w-auto">Get Directions</button>
                    </div>
                </div>
                <div className="w-px h-32 md:h-56 bg-base-100 hidden md:block"></div>
            </div>

            <div id="tabs-section" className={`flex items-center justify-center py-8 px-4 transition-all duration-800 ${
                isSectionLoaded('tabs') ? 'section-visible' : 'section-hidden'
            }`}>       
                <div className="flex text-xs md:text-sm space-x-4 md:space-x-8 p-2 border-base-100 border-1 rounded-lg overflow-x-auto">
                    <button 
                        onClick={() => setActiveTab("Info")}
                        className={`px-2 py-1 cursor-pointer transition-all duration-200 whitespace-nowrap ${activeTab === "Info" ? "border-b-2" : ""}`}
                        style={activeTab === "Info" ? { borderBottomColor: "#f0b405" } : {}}
                    >
                        Info
                    </button>
                    <button 
                        onClick={() => setActiveTab("Auditions")}
                        className={`px-2 py-1 cursor-pointer transition-all duration-200 whitespace-nowrap ${activeTab === "Auditions" ? "border-b-2" : ""}`}
                        style={activeTab === "Auditions" ? { borderBottomColor: "#f0b405" } : {}}
                    >
                        Auditions
                    </button>
                    <button 
                        onClick={() => setActiveTab("Official Rules")}
                        className={`px-2 py-1 cursor-pointer transition-all duration-200 whitespace-nowrap ${activeTab === "Official Rules" ? "border-b-2" : ""}`}
                        style={activeTab === "Official Rules" ? { borderBottomColor: "#f0b405" } : {}}
                    >
                        Official Rules
                    </button>
                </div>   
            </div>
            
            <div className={`flex flex-col items-center justify-center space-y-4 pb-8 px-4 transition-all duration-800 ${
                isSectionLoaded('content') ? 'section-visible' : 'section-hidden'
            }`}>
                <div className="space-y-4 text-xs md:text-sm items-center justify-center text-center max-w-4xl">
                    {activeTab === "Info" && (
                        <>
                            <p>Are you ready to own the stage? Accra Boogie King, Ghana's biggest team dance competion, returns for its explosive 2025 season!</p>
                            <p>This all-styles dance showdoen brings toggether Ghana's top crews to battle it out in a high-energy contest celebrating rhythm, creativity, and unity.
                                Frin afri ti hip-hop, Amapiano to gospel street — teams will need to impress the crowd and judges across three dynamic rounds.
                            </p>
                            <p>Accra Boogie King 2025 will spotlight dance communities from across the nation, building momentum through city-wide qualifiers, workkshops, and 
                            activations — all leading to the grand finale this October in Accra. Who will be crowned Ghana's Boogie Kings this year? The stage is yours!
                            </p>
                        </>
                    )}
                    
                    {activeTab === "Auditions" && (
                        <>
                            <p>Think You've Got What It Takes? Step into the Spotlight at the ABK 2025 Open Audtions! Join us at one of the ABK Open AUdition Sesions for your chance to earn a spot on the
                            biggest dance stage in Ghana</p>
                            <p>Our audition panels feature top dance professionals who will be watching closely for charisma, rhythm, musicality, creativity, and 
                            overall movement. All dance styles are welcome — from Afrobeats to Hip-Hop, Freestyle, and more. 
                            Note: This is not a breaking competition. Overemphasis on breaking may lead to disqualification.</p>
                            <p>
                                Applicants must be 16 years or older and based in Ghana to be eligible. The ABK 2025 Audtions are your first step toward dancing live at the 7th Edition of Accra Boogie King this October — where 
                                thousands of fans and dance lovers gather to witness Ghana's finest. Spots are limited, so register early to secure your place. Let your dance speak — and we'll see you on the floor!
                            </p>
                        </>
                    )}
                    
                    {activeTab === "Official Rules" && (
                        <>
                            <p>Groups only — No solo entries allowed</p>
                            <p>Group size — Minimum of 3 members</p>
                            <p>Minimum Performance on stage — Strictly 12 people at a time.</p>
                            <p>Music Policy — Instrumentals and gospel music only. No explicit lyrics or secular tracks.</p>
                            <p>Safety First — Noflips, aerial moves, dangerous stunt, naked flames, or fireworks on stage.</p>
                            <p>Dress Code — No nudity, revealing, or sensual attie. Costumes must be modest and respectful.</p>
                            <p>Respect —  Show respect to all partiipants, event staff, audience members at all times.</p>
                            <p>Judging — No arguing with judges; let your moves do the talking. Judges' decisions are final.</p>
                            <p>Time Limit — All performances must stay withing the allocated time limit; 3 minutes.</p>
                            <p>Stage Readiness —  Be ready when called; delays may result in disqualification</p>
                            <p>Props —  All props must be pre-approved by organizers and safe for stage use.</p>
                            <p>Sportsmanship — Any form of misconduct, aggression, or disrepesct will lead to disqualification</p>
                        </>
                    )}
                </div>
                
            </div>

            <div id="partners-section" className={`flex flex-col items-center justify center my-8 space-y-3 px-4 transition-all duration-800 ${
                isSectionLoaded('partners') ? 'section-visible' : 'section-hidden'
            }`}>
                <h1 className="font-bold">Patners</h1>
                <div className="grid grid-cols-2 md:flex gap-2 md:gap-4 items-center justify-center max-w-full overflow-x-auto">
                    <div className="h-24 w-32 md:h-32 md:w-48 bg-neutral-content rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                        <img src={spons1} alt="Sponsor 1" className="h-full w-full object-contain"/>
                    </div>
                    <div className="h-24 w-32 md:h-32 md:w-48 bg-neutral-content rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                        <img src={spons2} alt="Sponsor 2" className="h-full w-full object-contain"/>
                    </div>
                    <div className="h-24 w-32 md:h-32 md:w-48 bg-neutral-content rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                        <img src={spons3} alt="Sponsor 3" className="h-full w-full object-contain"/>
                    </div>
                    <div className="h-24 w-32 md:h-32 md:w-48 bg-neutral-content rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                        <img src={spons4} alt="Sponsor 4" className="h-full w-full object-contain"/>
                    </div>
                </div>
            </div>

            <div className={`h-auto md:h-110 max-w-full bg-cover py-8 transition-all duration-800 ${
                isSectionLoaded('flier') ? 'section-visible' : 'section-hidden'
            }`} 
                style={{ 
                    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image2})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}> 
            
                <div className="flex items-center justify-center px-4">
                    <img src={flier} alt="ABK 2025 Event Flier" className="h-64 md:h-90 w-auto max-w-full object-contain"/>
                </div>

            </div>

            {/* Social Media Footer */}
            <div className="w-full h-px bg-base-100 container mx-auto mt-6"></div>
            <div className={`bg-primary py-4 transition-all duration-800 ${
                isSectionLoaded('partners') ? 'section-visible' : 'section-hidden'
            }`}>
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-sm font-light mb-6 text-neutral-content">Share This Event</h2>
                        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-6">
                            {/* Facebook */}
                            <a 
                                href="https://www.facebook.com/sharer/sharer.php?u=https://accraboogieking.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-blue-600 hover:bg-blue-700 text-white p-2 md:p-3 rounded-full transition-all duration-200 transform hover:scale-110"
                            >
                                <svg className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            
                            {/* Twitter */}
                            <a 
                                href="https://twitter.com/intent/tweet?text=Join%20us%20at%20Accra%20Boogie%20King%202025!&url=https://accraboogieking.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-black hover:bg-gray-800 text-white p-2 md:p-3 rounded-full transition-all duration-200 transform hover:scale-110"
                            >
                                <svg className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </a>
                            
                            {/* Instagram */}
                            <a 
                                href="https://www.instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-2 md:p-3 rounded-full transition-all duration-200 transform hover:scale-110"
                            >
                                <svg className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            
                            {/* WhatsApp */}
                            <a 
                                href="https://wa.me/?text=Join%20us%20at%20Accra%20Boogie%20King%202025!%20https://accraboogieking.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-green-500 hover:bg-green-600 text-white p-2 md:p-3 rounded-full transition-all duration-200 transform hover:scale-110"
                            >
                                <svg className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                </svg>
                            </a>
                            
                            {/* TikTok */}
                            <a 
                                href="https://www.tiktok.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-black hover:bg-gray-800 text-white p-2 md:p-3 rounded-full transition-all duration-200 transform hover:scale-110"
                            >
                                <svg className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                                </svg>
                            </a>
                        </div>
                        <p className="text-neutral-content/60 text-sm">
                            Follow us on social media for updates and behind-the-scenes content.<br /> © 2025 ABK.
                        </p>
                    </div>
                </div>
            </div>

            </div> {/* Close the padding div */}
        </div>
    );
}