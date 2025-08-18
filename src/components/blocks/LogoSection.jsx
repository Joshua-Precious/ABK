import image4 from "../assets/image4.png";

export default function LogoSection({ isSectionLoaded }) {
    return (
        <div className={`flex items-center justify-center transition-all duration-800 ${
            isSectionLoaded('logo') ? 'section-visible' : 'section-hidden'
        }`}>
            <img src={image4} alt="ABK" className="h-40 md:h-60 max-w-full"/>
        </div>
    );
}
