import React, { useState } from 'react';
import '../styles/delivery.css'
import Icon1 from '../assests/Maincourse1.jpg'
import Icon2 from '../assests/Maincourse2.jpg'
import Icon3 from '../assests/Maincourse3.jpg'
import Icon4 from '../assests/Maincourse4.jpg'
import Icon5 from '../assests/Maincourse5.jpg'

// Import your separate components
import Salestax from './Salestax';


const SalesDashboard = () => {
  const [activeNavItem, setActiveNavItem] = useState<string>('Dashboard');
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const navItems = [ 
     
    'Dashboard',
    'Sales Tax Report',
    'Sales Report Summary',
    'Sales Report Detailed',
    'Sales Productwise Summary',
    'Sales Timewise',
    'Analytics Report'
  ];

 const pageTitles: Record<string, string> = {
  Dashboard: 'Report Dashboard',
  'Sales Tax Report': ' ',
  'Sales Report Summary': 'Sales Report Summary',
  'Sales Report Detailed': 'Sales Report Detailed',
  'Sales Productwise Summary': 'Sales Productwise Summary',
  'Sales Timewise': 'Sales Timewise',
  'Analytics Report': 'Analytics Report'
};
  // Function to get page title based on active nav item
  const getPageTitle = () => {
  return pageTitles[activeNavItem] || activeNavItem;
};

  // Function to render content based on active nav item
  const renderContent = () => {
    switch (activeNavItem) {
      case 'Dashboard':
        return renderDashboard();
      case 'Sales Tax Report':
        return <Salestax />;
      // case 'Sales Report Summary':
      //   return <SalesReportSummary />;
      // case 'Sales Report Detailed':
      //   return <SalesReportDetailed />;
      // case 'Sales Productwise Summary':
      //   return <SalesProductwiseSummary />;
      // case 'Sales Timewise':
      //   return <SalesTimewise />;
      // case 'Analytics Report':
      //   return <AnalyticsReport />;
      default:
        return renderDashboard();
    }
  };

  const barChartData = [
    { day: 'Mon', lastWeek: 95, previousWeek: 80 },
    { day: 'Tue', lastWeek: 120, previousWeek: 100 },
    { day: 'Wed', lastWeek: 85, previousWeek: 90 },
    { day: 'Thu', lastWeek: 220, previousWeek: 110 },
    { day: 'Fri', lastWeek: 90, previousWeek: 95 },
    { day: 'Sat', lastWeek: 130, previousWeek: 120 },
    { day: 'Sun', lastWeek: 70, previousWeek: 85 }
  ];

  const topProducts = [
    { id: 1, name: 'Egg Ceplok', sales: 84, color: '#FF6B6B', image: Icon1 },
    { id: 2, name: 'Kue Pelangi', sales: 62, color: '#4ECDC4', image: Icon2 },
    { id: 3, name: 'Kebab Siemam', sales: 41, color: '#45B7D1', image: Icon3 },
    { id: 4, name: 'Selat Solo Eco', sales: 30, color: '#96CEB4', image: Icon4 },
    { id: 5, name: 'Meatball Delicious', sales: 24, color: '#FECA57', image: Icon5 }
  ];

  const lineChartData = [
    { month: "January", lastSix: 100, previousSix: 120 },
    { month: "February", lastSix: 180, previousSix: 150 },
    { month: "March", lastSix: 280, previousSix: 200 },
    { month: "April", lastSix: 372, previousSix: 280 },
    { month: "May", lastSix: 480, previousSix: 420 },
    { month: "June", lastSix: 520, previousSix: 480 },
  ];

  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    income: number;
    sales: number;
    visible: boolean;
  }>({ x: 0, y: 0, income: 0, sales: 0, visible: false });

  const handleMouseOver = (
    e: React.MouseEvent<SVGCircleElement>,
    d: any
  ) => {
    const bounds = (e.target as SVGCircleElement).getBoundingClientRect();
    setTooltip({
      x: bounds.left + bounds.width / 2,
      y: bounds.top - 40,
      income: d.lastSix * 10,
      sales: d.previousSix,
      visible: true,
    });
  };

  const handleMouseOut = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  const maxBarValue = Math.max(...barChartData.flatMap(d => [d.lastWeek, d.previousWeek]));

  const renderDashboard = () => (
    <>
      {/* Charts Section */}
      <div className="delivery-box__charts-section">
        {/* Left Box - Bar Chart */}
        <div className="delivery-box__left-box">
          <div className="delivery-box__chart-header">
            <div className="delivery-box__income-stats">
              <div className="delivery-box__stat">
                <h2 className="delivery-box__stat-value">1.230$</h2>
                <p className="delivery-box__stat-label">Last week Income</p>
              </div>
              <div className="delivery-box__stat">
                <h2 className="delivery-box__stat-value delivery-box__stat-value--orange">282</h2>
                <p className="delivery-box__stat-label">Total sale amount</p>
              </div>
            </div>
            <div className="delivery-box__legend">
              <div className="delivery-box__legend-item">
                <span className="delivery-box__legend-dot delivery-box__legend-dot--green"></span>
                <span className="delivery-box__legend-label">Last Week</span>
              </div>
              <div className="delivery-box__legend-item">
                <span className="delivery-box__legend-dot delivery-box__legend-dot--blue"></span>
                <span className="delivery-box__legend-label">Previous Week</span>
              </div>
            </div>
          </div>

          <div className="delivery-box__bar-chart">
            {/* Y-axis labels */}
            <div className="delivery-box__y-axis">
              <span className="delivery-box__y-label">200</span>
              <span className="delivery-box__y-label">150</span>
              <span className="delivery-box__y-label">100</span>
              <span className="delivery-box__y-label">50</span>
              <span className="delivery-box__y-label">0</span>
            </div>
            
            {/* Chart area with grid */}
            <div className="delivery-box__chart-area">
              {/* Horizontal grid lines */}
              <div className="delivery-box__grid-lines">
                <div className="delivery-box__grid-line"></div>
                <div className="delivery-box__grid-line"></div>
                <div className="delivery-box__grid-line"></div>
                <div className="delivery-box__grid-line"></div>
                <div className="delivery-box__grid-line"></div>
              </div>
              
              {/* Bars */}
              <div className="delivery-box__bars-container">
                {barChartData.map((data, index) => (
                  <div key={data.day} className="delivery-box__bar-group">
                    <div className="delivery-box__bars">
                      <div
                        className="delivery-box__bar delivery-box__bar--green"
                        style={{ height: `${(data.lastWeek / maxBarValue) * 200}px` }}
                        onMouseEnter={() => setHoveredBar(`${data.day}-last`)}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        {hoveredBar === `${data.day}-last` && (
                          <div className="delivery-box__tooltip">
                            <div className="delivery-box__tooltip-content">
                              <span className="delivery-box__tooltip-value">{data.lastWeek}</span>
                              <span className="delivery-box__tooltip-label">Income</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div
                        className="delivery-box__bar delivery-box__bar--blue"
                        style={{ height: `${(data.previousWeek / maxBarValue) * 200}px` }}
                        onMouseEnter={() => setHoveredBar(`${data.day}-prev`)}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        {hoveredBar === `${data.day}-prev` && (
                          <div className="delivery-box__tooltip">
                            <div className="delivery-box__tooltip-content">
                              <span className="delivery-box__tooltip-value">{data.previousWeek}</span>
                              <span className="delivery-box__tooltip-label">Sales</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="delivery-box__bar-label">{data.day}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {hoveredBar && hoveredBar.includes('last') && (
              <div className="delivery-box__chart-tooltip">
                <div className="delivery-box__chart-tooltip-content">
                  <span className="delivery-box__chart-tooltip-value">420s</span>
                  <span className="delivery-box__chart-tooltip-label">Income</span>
                </div>
                <div className="delivery-box__chart-tooltip-content">
                  <span className="delivery-box__chart-tooltip-value">89</span>
                  <span className="delivery-box__chart-tooltip-label">Sales</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Box - Top Products */}
        <div className="delivery-box__right-box">
          <h3 className="delivery-box__right-box-title">Yesterday Top 10 - Products</h3>
          <div className="delivery-box__products-list">
            {topProducts.map((product) => (
              <div
                key={product.id}
                className="delivery-box__product-item"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <span className="delivery-box__product-rank">{product.id}.</span>
                <div className="delivery-box__product-icon">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="delivery-box__product-image"
                  />
                </div>
                <span className="delivery-box__product-name">{product.name}</span>
                <span className="delivery-box__product-sales">{product.sales}</span>
                {hoveredProduct === product.id && (
                  <div className="delivery-box__product-hover">+{Math.floor(Math.random() * 10)}%</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Line Chart Section */}
      <div className="delivery-box__container">
        {/* Heading */}
        <h3 className="delivery-box__title">Last Six Months Sales</h3>

        {/* Stats + Legends */}
        <div className="delivery-box__stats-row">
          <div className="delivery-box__stat-box">
            <h2 className="delivery-box__stat-value">3.230$</h2>
            <p className="delivery-box__stat-label">Last Six Month Income</p>
          </div>
          <div className="delivery-box__legends">
            <div className="delivery-box__legend-item">
              <span className="delivery-box__legend-dot teal"></span>
              <span>Last Six Month</span>
            </div>
            <div className="delivery-box__legend-item">
              <span className="delivery-box__legend-dot blue"></span>
              <span>Previous Six Month</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="delivery-box__line-chart">
          <svg className="delivery-box__line-svg" viewBox="0 0 800 300">
            {/* X-Axis */}
            <line
              x1="60"
              y1="250"
              x2="740"
              y2="250"
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
            {/* Y-Axis */}
            <line
              x1="60"
              y1="50"
              x2="60"
              y2="250"
              stroke="#94a3b8"
              strokeWidth="1.5"
            />

            {/* Horizontal grid lines */}
            {[200, 400, 600, 800, 1000].map((value, i) => (
              <line
                key={`h-${i}`}
                x1="60"
                y1={250 - (value / 1000) * 200}
                x2="740"
                y2={250 - (value / 1000) * 200}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            ))}

            {/* Y-axis labels */}
            {[0, 200, 400, 600, 800, 1000].map((value, i) => (
              <text
                key={`y-${i}`}
                x="40"
                y={255 - (value / 1000) * 200}
                textAnchor="end"
                className="delivery-box__line-label-text"
              >
                {value}
              </text>
            ))}

            {/* Last Six Month Line */}
            <path
              d={`M 60,${250 - (lineChartData[0].lastSix / 600) * 200} ${lineChartData
                .map(
                  (d, i) =>
                    `Q ${60 + i * 113.33 - 20},${250 - (d.lastSix / 600) * 200} ${
                      60 + i * 113.33
                    },${250 - (d.lastSix / 600) * 200}`
                )
                .join(" ")}`}
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
            />

            {/* Previous Six Month Line */}
            <path
              d={`M 60,${250 - (lineChartData[0].previousSix / 600) * 200} ${lineChartData
                .map(
                  (d, i) =>
                    `Q ${
                      60 + i * 113.33 - 20
                    },${250 - (d.previousSix / 600) * 200} ${60 + i * 113.33},${
                      250 - (d.previousSix / 600) * 200
                    }`
                )
                .join(" ")}`}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
            />

            {/* Data Points */}
            {lineChartData.map((d, i) => (
              <g key={i}>
                <circle
                  cx={60 + i * 113.33}
                  cy={250 - (d.lastSix / 600) * 200}
                  r="5"
                  fill="#10b981"
                  className="delivery-box__line-point"
                  onMouseOver={(e) => handleMouseOver(e, d)}
                  onMouseOut={handleMouseOut}
                />
                <circle
                  cx={60 + i * 113.33}
                  cy={250 - (d.previousSix / 600) * 200}
                  r="5"
                  fill="#3b82f6"
                  className="delivery-box__line-point"
                  onMouseOver={(e) => handleMouseOver(e, d)}
                  onMouseOut={handleMouseOut}
                />
              </g>
            ))}

            {/* Month Labels */}
            {lineChartData.map((d, i) => (
              <text
                key={i}
                x={60 + i * 113.33}
                y="275"
                textAnchor="middle"
                className="delivery-box__line-label-text"
              >
                {d.month}
              </text>
            ))}
          </svg>

          {/* Tooltip */}
          {tooltip.visible && (
            <div
              className="delivery-box__line-tooltip"
              style={{ left: tooltip.x, top: tooltip.y }}
            >
              <div className="delivery-box__line-tooltip-content">
                <span className="delivery-box__line-tooltip-value">
                  {tooltip.income}$
                </span>
                <span className="delivery-box__line-tooltip-label">Income</span>
              </div>
              <div className="delivery-box__line-tooltip-content">
                <span className="delivery-box__line-tooltip-value">
                  {tooltip.sales}
                </span>
                <span className="delivery-box__line-tooltip-label">Sales</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="delivery-box">
      {/* Navigation Section */}
      <div className="delivery-box__nav-section">
        <nav className="delivery-box__nav">
          {navItems.map((item) => (
            <button
              key={item}
              className={`delivery-box__nav-item ${
                activeNavItem === item ? 'delivery-box__nav-item--active' : ''
              }`}
              onClick={() => setActiveNavItem(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      <div className="delivery-box__content">
        {/* Dynamic Title based on active nav item */}
        <h1 className="delivery-box__title">{getPageTitle()}</h1>

        {/* Render content based on active nav item */}
        {renderContent()}
      </div>
    </div>
  );
};

export default SalesDashboard;