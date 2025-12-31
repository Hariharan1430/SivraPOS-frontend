// Report.tsx
import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SalesTax from './Salestax';
import '../styles/report.css';

interface Product {
  rank: number;
  name: string;
  image: string;
  sales: number;
}

interface ChartData {
  day?: string;
  month?: string;
  income?: number;
  sales?: number;
  lastMonth?: number;
  currentMonth?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="tooltip-item">
            <div className="tooltip-dot" style={{ background: entry.color }} />
            <span className="tooltip-text">
              {entry.name}: {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const Report: React.FC = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'salestax'>('dashboard');
  
  const weeklyData: ChartData[] = [
    { day: 'Mon', income: 65, sales: 85 },
    { day: 'Tue', income: 95, sales: 115 },
    { day: 'Wed', income: 125, sales: 95 },
    { day: 'Thu', income: 320, sales: 210 },
    { day: 'Fri', income: 210, sales: 180 },
    { day: 'Sat', income: 215, sales: 235 },
    { day: 'Sun', income: 195, sales: 165 }
  ];

  const monthlyData: ChartData[] = [
    { month: 'January', lastMonth: 280, currentMonth: 320 },
    { month: 'February', lastMonth: 420, currentMonth: 380 },
    { month: 'March', lastMonth: 520, currentMonth: 580 },
    { month: 'April', lastMonth: 650, currentMonth: 720 },
    { month: 'May', lastMonth: 580, currentMonth: 620 },
    { month: 'June', lastMonth: 480, currentMonth: 520 }
  ];

  const topProducts: Product[] = [
    { rank: 1, name: 'Egg Caplok', image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=100&h=100&fit=crop', sales: 84 },
    { rank: 2, name: 'Kue Pelangi', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100&fit=crop', sales: 62 },
    { rank: 3, name: 'Kebab Sleman', image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=100&h=100&fit=crop', sales: 41 },
    { rank: 4, name: 'Selat Solo Eco', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop', sales: 30 },
    { rank: 5, name: 'Meatball Delicious', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=100&h=100&fit=crop', sales: 24 }
  ];

  return (
    <div className="report-container">
      {/* Navigation Tabs */}
      <div className="tabs-container">
        <button
          onClick={() => setActiveView('dashboard')}
          className={`tab-button ${activeView === 'dashboard' ? 'active' : ''}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveView('salestax')}
          className={`tab-button ${activeView === 'salestax' ? 'active' : ''}`}
        >
          Sales Tax Report
        </button>
      </div>

      {/* Content */}
      <div className="content-wrapper">
        {activeView === 'dashboard' ? (
          <div className="dashboard-view">
            <h1 className="page-title">Report Dashboard</h1>

            {/* Stats and Weekly Chart */}
            <div className="grid-container">
              {/* Weekly Stats Card */}
              <div className="card">
                <div className="stats-header">
                  <div className="stat-item">
                    <div className="stat-value green">1.230$</div>
                    <div className="stat-label">Last week Income</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value orange">282</div>
                    <div className="stat-label">Total sale amount</div>
                  </div>
                </div>

                <div className="legend-container">
                  <div className="legend-item">
                    <div className="legend-dot green"></div>
                    <span>Last Week</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-dot blue"></div>
                    <span>Previous Week</span>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fill: '#9ca3af', fontSize: 11 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis 
                      tick={{ fill: '#9ca3af', fontSize: 11 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="income" fill="#10b981" name="Income" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="sales" fill="#3b82f6" name="Sales" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Top Products Card */}
              <div className="card">
                <h3 className="card-title">Yesterday Top 10 - Products</h3>
                
                <div className="legend-container">
                  <div className="legend-item">
                    <div className="legend-dot green"></div>
                    <span>Last Week</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-dot blue"></div>
                    <span>Previous Week</span>
                  </div>
                </div>

                {topProducts.map((product) => (
                  <div key={product.rank} className={`product-row ${product.rank !== 5 ? 'border' : ''}`}>
                    <div className="product-info">
                      <span className="product-rank">{product.rank}.</span>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="product-image"
                      />
                      <span className="product-name">{product.name}</span>
                    </div>
                    <span className="product-sales">{product.sales}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Sales Chart */}
            <div className="card monthly-card">
              <div className="monthly-header">
                <div>
                  <h3 className="card-title">Last Six Months Sales</h3>
                  <div className="stat-value green">3.230$</div>
                  <div className="stat-label">Last Six Month Income</div>
                </div>
                <div className="legend-container-horizontal">
                  <div className="legend-item">
                    <div className="legend-dot green"></div>
                    <span>Last Six Month</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-dot blue"></div>
                    <span>Previous six month</span>
                  </div>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: '#9ca3af', fontSize: 11 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fill: '#9ca3af', fontSize: 11 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="natural" 
                    dataKey="currentMonth" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', r: 5, strokeWidth: 2, stroke: 'white' }}
                    name="Last Six Month"
                  />
                  <Line 
                    type="natural" 
                    dataKey="lastMonth" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 5, strokeWidth: 2, stroke: 'white' }}
                    name="Previous Six Month"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <SalesTax />
        )}
      </div>
    </div>
  );
};

export default Report;