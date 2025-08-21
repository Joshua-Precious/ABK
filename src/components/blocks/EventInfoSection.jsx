export default function EventInfoSection({ isSectionLoaded, activeTab, setActiveTab }) {
    return (
        <>
            {/* Event Info Section */}
            <div className={`flex items-center justify-center p-2 pt-24 transition-all duration-800 ${
                isSectionLoaded('info') ? 'section-visible' : 'section-hidden'
            }`}>
                <div className="text-center space-y-4">
                    <h1 className="font-bold text-xl md:text-2xl">19TH OCTOBER, 2025</h1>
                    <p className="text-neutral-content/70">First Love Centre, East Legon, Accra, Ghana</p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div id="tabs-section" className={`flex items-center justify-center space-x-4 container mx-auto px-4 transition-all duration-800 ${
                isSectionLoaded('tabs') ? 'section-visible' : 'section-hidden'
            }`}>
                <div className="w-full max-w-6xl bg-primary p-4 md:p-8 rounded-lg">
                    <div className="flex space-x-1 md:space-x-2 mb-6 bg-neutral rounded-lg p-1">
                        {['Info', 'Auditions', 'Events'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-2 md:py-3 px-2 md:px-4 rounded-md transition-all duration-200 text-sm md:text-base ${
                                    activeTab === tab
                                        ? 'bg-primary-content text-primary font-medium'
                                        : 'text-neutral-content hover:bg-primary-content/10'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className={`transition-all duration-800 ${
                        isSectionLoaded('content') ? 'section-visible' : 'section-hidden'
                    }`}>
                        {activeTab === 'Info' && (
                            <div className="space-y-6">
                                <h2 className="text-xl md:text-2xl font-semibold">About Accra Boogie King</h2>
                                <div className="">
                                    <div>
                                        <h3 className="text-lg font-medium mb-3">What is ABK?</h3>
                                        <p>Are you ready to own the stage? Accra Boogie King, Ghana's biggest team dance competion, returns for its explosive 2025 season!</p>
                                        <p>This all-styles dance showdoen brings toggether Ghana's top crews to battle it out in a high-energy contest celebrating rhythm, creativity, and unity.
                                            From afro to hip-hop, Amapiano to gospel street — teams will need to impress the crowd and judges across three dynamic rounds.
                                        </p>
                                        <p>Accra Boogie King 2025 will spotlight dance communities from across the nation, building momentum through city-wide qualifiers, workkshops, and 
                                        activations — all leading to the grand finale this October in Accra. Who will be crowned Ghana's Boogie Kings this year? The stage is yours!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Auditions' && (
                            <div className="space-y-6">
                                <h2 className="text-xl md:text-2xl font-semibold">Audition Information</h2>
                                
                                    <div>
                                        <h3 className="text-lg font-medium mb-3">Audition Process</h3>
                                        <p>Think You've Got What It Takes? Step into the Spotlight at the ABK 2025 Open Audtions! Join us at one of the ABK Open AUdition Sesions for your chance to earn a spot on the
                                        biggest dance stage in Ghana</p>
                                        <p>Our audition panels feature top dance professionals who will be watching closely for charisma, rhythm, musicality, creativity, and 
                                        overall movement. All dance styles are welcome — from Afrobeats to Hip-Hop, Freestyle, and more. 
                                        Note: This is not a breaking competition. Overemphasis on breaking may lead to disqualification.</p>
                                        <p>
                                            Applicants must be 16 years or older and based in Ghana to be eligible. The ABK 2025 Audtions are your first step toward dancing live at the 7th Edition of Accra Boogie King this October — where 
                                            thousands of fans and dance lovers gather to witness Ghana's finest. Spots are limited, so register early to secure your place. Let your dance speak — and we'll see you on the floor!
                                        </p>

                                </div>
                                <div className="bg-neutral p-4 rounded-lg">
                                    <h3 className="text-lg font-medium mb-3">Important Dates  *</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <p className="font-medium">Registration Opens</p>
                                            <p className="text-neutral-content/70">17th August, 2025</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Registration Closes</p>
                                            <p className="text-neutral-content/70">5th September, 2025</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Live Auditions</p>
                                            <p className="text-neutral-content/70">7th September, 2025</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Events' && (
                            <div className="space-y-6">
                                <h2 className="text-xl md:text-2xl font-semibold">Event Schedule</h2>
                                <div className="space-y-4">
                                    <>
                                        <p>• Groups only — No solo entries allowed</p>
                                        <p>• Group size — Minimum of 3 members</p>
                                        <p>• Minimum Performance on stage — Strictly 12 people at a time.</p>
                                        <p>• Music Policy — Instrumentals and gospel music only. No explicit lyrics or secular tracks.</p>
                                        <p>• Safety First — Noflips, aerial moves, dangerous stunt, naked flames, or fireworks on stage.</p>
                                        <p>• Dress Code — No nudity, revealing, or sensual attie. Costumes must be modest and respectful.</p>
                                        <p>• Respect —  Show respect to all partiipants, event staff, audience members at all times.</p>
                                        <p>• Judging — No arguing with judges; let your moves do the talking. Judges' decisions are final.</p>
                                        <p>• Time Limit — All performances must stay withing the allocated time limit; 3 minutes.</p>
                                        <p>• Stage Readiness —  Be ready when called; delays may result in disqualification</p>
                                        <p>• Props —  All props must be pre-approved by organizers and safe for stage use.</p>
                                        <p>• Sportsmanship — Any form of misconduct, aggression, or disrepesct will lead to disqualification</p>
                                    </>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
