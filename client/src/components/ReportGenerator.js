import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';

const ReportGenerator = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchReportData = async () => {
        setLoading(true);
        setError(null);
        try {
            const streamsResponse = await fetch(`http://localhost:8080/api/admin/reports/streams?start_date=${startDate}&end_date=${endDate}`);
            const engagementResponse = await fetch('http://localhost:8080/api/admin/reports/user-engagement');
            
            if (!streamsResponse.ok || !engagementResponse.ok) {
                throw new Error('Failed to fetch reports');
            }

            const streamsData = await streamsResponse.json();
            const engagementData = await engagementResponse.json();

            setReportData({ streams: streamsData, engagement: engagementData });
        } catch (err) {
            setError(err.message);
            setReportData({
                streams: [{ date: '2023-10-01', value: 100 }, { date: '2023-10-02', value: 200 }],
                engagement: [{ date: '2023-10-01', interactions: 30 }, { date: '2023-10-02', interactions: 50 }],
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchReportData();
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Generate Report</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex space-x-4">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                    <button
                        type="submit"
                        className="btn bg-blue-500 text-white">
                        Generate
                    </button>
                </div>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {reportData && (
                <div>
                    <h3 className="text-lg font-semibold mb-2">Visual Reports</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border p-2">
                            <h4 className="text-md">Stream Data</h4>
                            <Line
                                data={{
                                    labels: reportData.streams.map(item => item.date),
                                    datasets: [{
                                        label: 'Stream Values',
                                        data: reportData.streams.map(item => item.value),
                                        borderColor: 'rgba(75,192,192,1)',
                                        fill: false,
                                    }]
                                }}
                                options={{ responsive: true, maintainAspectRatio: false }}
                            />
                        </div>
                        <div className="border p-2">
                            <h4 className="text-md">User Engagement</h4>
                            <Bar
                                data={{
                                    labels: reportData.engagement.map(item => item.date),
                                    datasets: [{
                                        label: 'Engagement Interactions',
                                        data: reportData.engagement.map(item => item.interactions),
                                        backgroundColor: 'rgba(75,192,192,0.4)',
                                    }]
                                }}
                                options={{ responsive: true, maintainAspectRatio: false }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportGenerator;