import React, { useEffect, useState } from 'react';
import ReportGenerator from '../components/ReportGenerator';

const ReportsPage = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const streamsResponse = await fetch('http://localhost:8080/api/admin/reports/streams?start_date=2023-01-01&end_date=2023-12-31');
                const userEngagementResponse = await fetch('http://localhost:8080/api/admin/reports/user-engagement');
                
                // Simulated mock data if API fails
                const mockData = [
                    { date: '2023-01-01', engagement: 50, streamCount: 100 },
                    { date: '2023-02-01', engagement: 70, streamCount: 200 },
                ];
                
                const streamsData = await streamsResponse.ok ? streamsResponse.json() : mockData;
                const userEngagementData = await userEngagementResponse.ok ? userEngagementResponse.json() : mockData;

                setReports([...streamsData, ...userEngagementData]);
            } catch {
                // Fallback to mock data can be handled here, if necessary
            }
        };
        
        fetchReports();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-4 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Performance Reports</h1>
            <ReportGenerator reports={reports} />
        </div>
    );
};

export default ReportsPage;