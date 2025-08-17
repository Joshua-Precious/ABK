import { useState, useEffect } from 'react';
import registrationService from '../appwrite/registrationService';

export default function AdminDashboard() {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            setLoading(true);
            const response = await registrationService.getAllRegistrations();
            setRegistrations(response.documents);
        } catch (error) {
            console.error('Error fetching registrations:', error);
            setError('Failed to load registrations');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-neutral-content">Loading registrations...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary p-4">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-neutral-content mb-8">Admin Dashboard</h1>
                
                {error && (
                    <div className="bg-red-500/20 text-red-300 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <div className="bg-neutral p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Registrations ({registrations.length})</h2>
                        <button 
                            onClick={fetchRegistrations}
                            className="bg-primary-content text-primary px-4 py-2 rounded hover:bg-opacity-90"
                        >
                            Refresh
                        </button>
                    </div>

                    {registrations.length === 0 ? (
                        <p className="text-neutral-content/60">No registrations yet.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-neutral-content/20">
                                        <th className="text-left p-3">Team Name</th>
                                        <th className="text-left p-3">Contact Name</th>
                                        <th className="text-left p-3">Email</th>
                                        <th className="text-left p-3">Phone</th>
                                        <th className="text-left p-3">City</th>
                                        <th className="text-left p-3">Team Size</th>
                                        <th className="text-left p-3">Age Range</th>
                                        <th className="text-left p-3">Submitted</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registrations.map((registration) => (
                                        <tr key={registration.$id} className="border-b border-neutral-content/10 hover:bg-neutral-content/5">
                                            <td className="p-3 font-medium">{registration.teamName}</td>
                                            <td className="p-3">{registration.fullName}</td>
                                            <td className="p-3">{registration.email}</td>
                                            <td className="p-3">{registration.phoneNumber}</td>
                                            <td className="p-3">{registration.city}</td>
                                            <td className="p-3">{registration.numberOfPeople}</td>
                                            <td className="p-3">{registration.ageRange}</td>
                                            <td className="p-3">{new Date(registration.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
