import image5 from "../assets/image5.png";

export default function LoadingScreen() {
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
