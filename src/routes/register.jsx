import { useEffect, useMemo } from "react";
import { useSearch } from "../hooks/useSearch";
import { useProgressiveLoading } from "../hooks/useProgressiveLoading";
import Header from "../components/blocks/Header";
import HeroSection from "../components/blocks/HeroSection";
import LogoSection from "../components/blocks/LogoSection";
import PartnersSection from "../components/blocks/PartnersSection";
import SocialMediaFooter from "../components/blocks/SocialMediaFooter";
import LoadingScreen from "../components/blocks/LoadingScreen";
import RegistrationForm from "../components/blocks/RegistrationForm";

export default function Register() {
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
    const sections = useMemo(() => ['header', 'hero', 'logo', 'register', 'partners'], []);
    const { isInitialLoading, isSectionLoaded } = useProgressiveLoading(sections);

    useEffect(() => {
        // Auto-scroll to register section after loading
        if (!isInitialLoading) {
            const timer = setTimeout(() => {
                const registerSection = document.getElementById('register-section');
                if (registerSection) {
                    registerSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
            
            return () => clearTimeout(timer);
        }
    }, [isInitialLoading]);

    // Page-specific search mappings (memoized to prevent recreation on every render)
    const registerSearchMappings = useMemo(() => ({
        // Registration-specific search terms
        'register': () => {
            const registerSection = document.getElementById('register-section');
            if (registerSection) registerSection.scrollIntoView({ behavior: 'smooth' });
        },
        'registration': () => {
            const registerSection = document.getElementById('register-section');
            if (registerSection) registerSection.scrollIntoView({ behavior: 'smooth' });
        },
        'form': () => {
            const registerSection = document.getElementById('register-section');
            if (registerSection) registerSection.scrollIntoView({ behavior: 'smooth' });
        },
        'apply': () => {
            const registerSection = document.getElementById('register-section');
            if (registerSection) registerSection.scrollIntoView({ behavior: 'smooth' });
        },
        'team': () => {
            const registerSection = document.getElementById('register-section');
            if (registerSection) registerSection.scrollIntoView({ behavior: 'smooth' });
        },
        'contact': () => {
            const registerSection = document.getElementById('register-section');
            if (registerSection) registerSection.scrollIntoView({ behavior: 'smooth' });
        },
        'submit': () => {
            const registerSection = document.getElementById('register-section');
            if (registerSection) registerSection.scrollIntoView({ behavior: 'smooth' });
        },
        'sign up': () => {
            const registerSection = document.getElementById('register-section');
            if (registerSection) registerSection.scrollIntoView({ behavior: 'smooth' });
        },
        'join': () => {
            const registerSection = document.getElementById('register-section');
            if (registerSection) registerSection.scrollIntoView({ behavior: 'smooth' });
        },
        'participate': () => {
            const registerSection = document.getElementById('register-section');
            if (registerSection) registerSection.scrollIntoView({ behavior: 'smooth' });
        }
    }), []);

    const handleSearchSubmitWithMappings = (e) => {
        handleSearchSubmit(e, registerSearchMappings);
    };
    
    // Show loading screen initially
    if (isInitialLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="flex flex-col space-y-2 ">
            <Header 
                isSectionLoaded={isSectionLoaded}
                showSearch={showSearch}
                setShowSearch={setShowSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearchSubmit={handleSearchSubmitWithMappings}
                searchNotFound={searchNotFound}
                setSearchNotFound={setSearchNotFound}
                searchPlaceholder="Search registration, auditions, home, gallery..."
                searchHint='Try: "form", "auditions", "home", "gallery", "team", "apply"'
            />

            {/* Add padding top to account for fixed header */}
            <div className="pt-20">
                <HeroSection isSectionLoaded={isSectionLoaded} />
                <LogoSection isSectionLoaded={isSectionLoaded} />
                <RegistrationForm isSectionLoaded={isSectionLoaded} />
                <PartnersSection isSectionLoaded={isSectionLoaded} />
                <SocialMediaFooter isSectionLoaded={isSectionLoaded} />
            </div>
        </div>
    );
}
