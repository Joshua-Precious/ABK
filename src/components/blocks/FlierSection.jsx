import flier from "../assets/flier.jpg";

export default function FlierSection({ isSectionLoaded }) {
    return (
        <div id="flier-section" className={`h-96 md:h-96 max-w-full bg-cover p-4 md:p-32 transition-all duration-800 ${
            isSectionLoaded('flier') ? 'section-visible' : 'section-hidden'
        }`} 
        style={{ 
            background: `linear-gradient(to bottom, transparent 60%, #00060e 100%), url(${flier})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}> 
        </div>
    );
}
