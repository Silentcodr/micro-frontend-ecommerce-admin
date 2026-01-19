import React, { useState } from 'react';
import styles from './Dashboard.module.css';

interface KpiData {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    history: number[]; // Dummy monthly data points
}

const kpiData: KpiData[] = [
    {
        title: 'Total Visitors',
        value: '84,232',
        change: '+14% vs last month',
        trend: 'up',
        history: [4500, 5200, 4900, 6000, 7200, 84232]
    },
    {
        title: 'Total Sales',
        value: '$434,232',
        change: '+23% vs last month',
        trend: 'up',
        history: [120000, 150000, 180000, 220000, 350000, 434232]
    },
    {
        title: 'Growth Rate',
        value: '22.4%',
        change: '+2% vs last month',
        trend: 'up',
        history: [15, 16, 18, 20, 22, 22.4]
    },
    {
        title: 'Active Users',
        value: '12,430',
        change: '-5% vs last month',
        trend: 'down',
        history: [13000, 12800, 12600, 12500, 12300, 12430]
    }
];

const Dashboard: React.FC = () => {
    const [selectedKpi, setSelectedKpi] = useState<KpiData | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    React.useEffect(() => {
        const handleSearch = (e: CustomEvent) => setSearchTerm(e.detail.toLowerCase());
        window.addEventListener('app-search', handleSearch as EventListener);
        return () => window.removeEventListener('app-search', handleSearch as EventListener);
    }, []);

    const filteredKpis = kpiData.filter(kpi =>
        kpi.title.toLowerCase().includes(searchTerm)
    );

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Analytics Overview</h2>
            <p className={styles.subtitle}>Click on cards for detailed monthly view</p>

            <div className={styles.grid}>
                {filteredKpis.map((kpi, index) => (
                    <div key={index} className={styles.card} onClick={() => setSelectedKpi(kpi)}>
                        <div className={styles.cardHeader}>
                            <span className={styles.cardTitle}>{kpi.title}</span>
                            <span className={`${styles.trend} ${kpi.trend === 'up' ? styles.trendUp : styles.trendDown}`}>
                                {kpi.change}
                            </span>
                        </div>
                        <div className={styles.cardValue}>{kpi.value}</div>
                        <div className={styles.miniChart}>
                            {/* Simple CSS bar chart visualization */}
                            <div className={styles.barNodes}>
                                {kpi.history.map((val, i) => (
                                    <div key={i} className={styles.bar} style={{ height: `${(val / Math.max(...kpi.history)) * 100}%` }}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedKpi && (
                <div className={styles.overlay} onClick={() => setSelectedKpi(null)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>{selectedKpi.title} - Monthly Review</h3>
                            <button onClick={() => setSelectedKpi(null)} className={styles.closeBtn}>×</button>
                        </div>

                        <div className={styles.modalContent}>
                            <div className={styles.bigStat}>{selectedKpi.value}</div>
                            <div className={styles.breakdown}>
                                <h4>Monthly Breakdown (Last 6 Months)</h4>
                                <div className={styles.chartContainer}>
                                    {selectedKpi.history.map((val, i) => (
                                        <div key={i} className={styles.chartBarGroup}>
                                            <div className={styles.chartBar} style={{ height: `${(val / Math.max(...selectedKpi.history)) * 150}px` }}>
                                                <span className={styles.barTooltip}>{val.toLocaleString()}</span>
                                            </div>
                                            <span className={styles.monthLabel}>M{i + 1}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.insights}>
                                <h4>Key Insights</h4>
                                <ul>
                                    <li>Highest performance recorded in Month 6.</li>
                                    <li>Consistent growth observed over the last quarter.</li>
                                    <li>Projected to increase by 5% next month based on current trends.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
