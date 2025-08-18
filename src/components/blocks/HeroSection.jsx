import image1 from "../assets/image1.jpg";

export default function HeroSection({ isSectionLoaded }) {
    return (
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
    );
}
