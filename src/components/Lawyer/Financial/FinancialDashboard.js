import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import BillingOverview from './BillingOverview';
import ExpenseTracker from './ExpenseTracker';
import RevenueProjection from './RevenueProjection';
import TimeTracking from './TimeTracking';

const FinancialDashboard = () => {
    const [financialData, setFinancialData] = useState({
        billing: null,
        expenses: null,
        revenue: null,
        timeTracking: null
    });
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState({
        start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        end: new Date()
    });

    useEffect(() => {
        loadFinancialData();
    }, [dateRange]);

    const loadFinancialData = async () => {
        try {
            setLoading(true);
            const [billing, expenses, revenue, time] = await Promise.all([
                api.getBillingData(dateRange),
                api.getExpenses(dateRange),
                api.getRevenueProjections(dateRange),
                api.getTimeTracking(dateRange)
            ]);

            setFinancialData({
                billing,
                expenses,
                revenue,
                timeTracking: time
            });
        } catch (error) {
            console.error('Erro ao carregar dados financeiros:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="financial-dashboard">
            <header className="dashboard-header">
                <h1>Dashboard Financeiro</h1>
                <DateRangePicker
                    startDate={dateRange.start}
                    endDate={dateRange.end}
                    onChange={setDateRange}
                />
            </header>

            <div className="dashboard-grid">
                <BillingOverview 
                    data={financialData.billing}
                    loading={loading}
                />
                
                <ExpenseTracker 
                    data={financialData.expenses}
                    loading={loading}
                />
                
                <RevenueProjection 
                    data={financialData.revenue}
                    loading={loading}
                />
                
                <TimeTracking 
                    data={financialData.timeTracking}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default FinancialDashboard; 