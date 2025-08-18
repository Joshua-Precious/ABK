import { useState, useEffect } from 'react';
import registrationService from '../appwrite/registrationService';

export default function AdminDashboard() {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [isExporting, setIsExporting] = useState(false);
    const [exportSuccess, setExportSuccess] = useState(false);

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

    const exportToGoogleSheets = async () => {
        setIsExporting(true);
        try {
            // Prepare data for Google Sheets
            const sheetData = registrations.map(reg => [
                reg.teamName,
                reg.fullName,
                reg.email,
                reg.phoneNumber,
                reg.city,
                reg.numberOfPeople,
                reg.ageRange,
                reg.briefDescription || '',
                new Date(reg.createdAt).toLocaleDateString(),
                new Date(reg.createdAt).toLocaleTimeString()
            ]);

            // Add header row
            const headers = [
                'Team Name', 'Contact Name', 'Email', 'Phone', 'City', 
                'Team Size', 'Age Range', 'Description', 'Date', 'Time'
            ];
            const fullData = [headers, ...sheetData];

            // Convert to CSV format for easy copying
            const csvContent = fullData.map(row => 
                row.map(cell => `"${cell}"`).join(',')
            ).join('\n');

            // Copy to clipboard
            await navigator.clipboard.writeText(csvContent);
            
            // Show success message
            setExportSuccess(true);
            setTimeout(() => setExportSuccess(false), 5000);

        } catch (error) {
            console.error('Export failed:', error);
            setError('Failed to export data');
        } finally {
            setIsExporting(false);
        }
    };

    const createGoogleSheetInstructions = () => {
        return (
            <div className="bg-blue-500/20 text-blue-300 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">How to export to Google Sheets:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Click "Copy Data for Google Sheets" button below</li>
                    <li>Go to <a href="https://sheets.google.com" target="_blank" rel="noopener noreferrer" className="underline">Google Sheets</a> and create a new spreadsheet</li>
                    <li>Click on cell A1 and paste (Ctrl+V)</li>
                    <li>The data will automatically format into columns</li>
                </ol>
            </div>
        );
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

                {exportSuccess && (
                    <div className="bg-green-500/20 text-green-300 p-4 rounded-lg mb-6">
                        ✅ Data copied to clipboard! Now paste it in Google Sheets.
                    </div>
                )}

                {createGoogleSheetInstructions()}

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-neutral p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-neutral-content/60">Total Registrations</h3>
                        <p className="text-2xl font-bold">{registrations.length}</p>
                    </div>
                    <div className="bg-neutral p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-neutral-content/60">Total Participants</h3>
                        <p className="text-2xl font-bold">
                            {registrations.reduce((sum, reg) => sum + reg.numberOfPeople, 0)}
                        </p>
                    </div>
                    <div className="bg-neutral p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-neutral-content/60">Latest Registration</h3>
                        <p className="text-sm">
                            {registrations.length > 0 
                                ? new Date(Math.max(...registrations.map(r => new Date(r.createdAt)))).toLocaleDateString()
                                : 'No registrations'
                            }
                        </p>
                    </div>
                    <div className="bg-neutral p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-neutral-content/60">Most Common Age Range</h3>
                        <p className="text-sm">
                            {registrations.length > 0 
                                ? Object.entries(
                                    registrations.reduce((acc, reg) => {
                                        acc[reg.ageRange] = (acc[reg.ageRange] || 0) + 1;
                                        return acc;
                                    }, {})
                                ).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'
                                : 'N/A'
                            }
                        </p>
                    </div>
                </div>

                <div className="bg-neutral p-6 rounded-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <h2 className="text-xl font-semibold">Registrations ({registrations.length})</h2>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button 
                                onClick={fetchRegistrations}
                                className="bg-primary-content text-primary px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
                            >
                                🔄 Refresh
                            </button>
                            <button 
                                onClick={exportToGoogleSheets}
                                disabled={isExporting || registrations.length === 0}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                            >
                                {isExporting ? '📋 Copying...' : '📊 Copy Data for Google Sheets'}
                            </button>
                            <a 
                                href="https://sheets.google.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-center"
                            >
                                🚀 Open Google Sheets
                            </a>
                        </div>
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
                                        <th className="text-left p-3 hidden lg:table-cell">Description</th>
                                        <th className="text-left p-3">Submitted</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registrations.map((registration) => (
                                        <tr key={registration.$id} className="border-b border-neutral-content/10 hover:bg-neutral-content/5">
                                            <td className="p-3 font-medium">{registration.teamName}</td>
                                            <td className="p-3">{registration.fullName}</td>
                                            <td className="p-3">
                                                <a href={`mailto:${registration.email}`} className="text-blue-400 hover:underline">
                                                    {registration.email}
                                                </a>
                                            </td>
                                            <td className="p-3">
                                                <a href={`tel:${registration.phoneNumber}`} className="text-blue-400 hover:underline">
                                                    {registration.phoneNumber}
                                                </a>
                                            </td>
                                            <td className="p-3">{registration.city}</td>
                                            <td className="p-3">{registration.numberOfPeople}</td>
                                            <td className="p-3">{registration.ageRange}</td>
                                            <td className="p-3 hidden lg:table-cell max-w-xs truncate" title={registration.briefDescription}>
                                                {registration.briefDescription || 'No description'}
                                            </td>
                                            <td className="p-3">
                                                <div className="text-xs">
                                                    <div>{new Date(registration.createdAt).toLocaleDateString()}</div>
                                                    <div className="text-neutral-content/60">
                                                        {new Date(registration.createdAt).toLocaleTimeString()}
                                                    </div>
                                                </div>
                                            </td>
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
