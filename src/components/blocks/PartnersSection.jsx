import spons1 from "../assets/spons1.png";
import spons2 from "../assets/spons2.png";
import spons3 from "../assets/spons3.jpg";
import spons4 from "../assets/spons4.png";

export default function PartnersSection({ isSectionLoaded }) {
    return (
        <div id="partners-section" className={`flex flex-col items-center justify center my-8 space-y-3 px-4 transition-all duration-800 ${
            isSectionLoaded('partners') ? 'section-visible' : 'section-hidden'
        }`}>
            <h1 className="font-bold">Partners</h1>
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
    );
}
