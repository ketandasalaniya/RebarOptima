import './ResultsPage.css'
import html2pdf from 'html2pdf.js'
import { 
  ArrowLeft, 
  Printer, 
  CheckCircle2, 
  Package, 
  TrendingUp, 
  ClipboardList, 
  Scissors, 
  PieChart, 
  Trash2, 
  BarChart3,
  FileDown,
  FileSpreadsheet
} from 'lucide-react'

const mockLayouts = [
  {
    id: 'A',
    repetition: 8,
    stockLength: 12000,
    parts: [
      { length: 4500, qty: 1, color: '#f28e8e' },
      { length: 1200, qty: 1, color: '#f7e1a1' },
      { length: 950, qty: 1, color: '#a6e2a6' },
      { length: 760, qty: 7, color: '#a0e1e1' },
    ],
    cutsCount: 10,
    waste: '30 mm (0.25%)',
    utilization: 99.75,
  },
  {
    id: 'B',
    repetition: 2,
    stockLength: 12000,
    parts: [
      { length: 4500, qty: 1, color: '#f28e8e' },
      { length: 1200, qty: 1, color: '#f7e1a1' },
      { length: 950, qty: 5, color: '#a6e2a6' },
      { length: 760, qty: 2, color: '#a0e1e1' },
    ],
    cutsCount: 9,
    waste: '30 mm (0.25%)',
    utilization: 99.75,
  },
  {
    id: 'C',
    repetition: 15,
    stockLength: 12000,
    parts: [
      { length: 4500, qty: 2, color: '#f28e8e' },
      { length: 1200, qty: 1, color: '#f7e1a1' },
      { length: 950, qty: 1, color: '#a6e2a6' },
      { length: 760, qty: 1, color: '#a0e1e1' },
    ],
    cutsCount: 5,
    waste: '40 mm (0.33%)',
    utilization: 99.67,
  },
  {
    id: 'D',
    repetition: 3,
    stockLength: 12000,
    parts: [
      { length: 4500, qty: 1, color: '#f28e8e' },
      { length: 1200, qty: 4, color: '#f7e1a1' },
      { length: 950, qty: 2, color: '#a6e2a6' },
      { length: 760, qty: 1, color: '#a0e1e1' },
    ],
    cutsCount: 8,
    waste: '40 mm (0.33%)',
    utilization: 99.67,
  },
  {
    id: 'E',
    repetition: 17,
    stockLength: 12000,
    parts: [
      { length: 4500, qty: 2, color: '#f28e8e' },
      { length: 1200, qty: 1, color: '#f7e1a1' },
      { length: 950, qty: 1, color: '#a6e2a6' },
      { length: 760, qty: 1, color: '#a0e1e1' },
    ],
    cutsCount: 5,
    waste: '90 mm (0.75%)',
    utilization: 99.25,
  },
  {
    id: 'F',
    repetition: 1,
    stockLength: 12000,
    parts: [
      { length: 4500, qty: 1, color: '#f28e8e' },
      { length: 1200, qty: 3, color: '#f7e1a1' },
      { length: 950, qty: 4, color: '#a6e2a6' },
    ],
    cutsCount: 8,
    waste: '100 mm (0.83%)',
    utilization: 99.17,
  },
  {
    id: 'G',
    repetition: 1,
    stockLength: 12000,
    parts: [
      { length: 950, qty: 3, color: '#a6e2a6' },
      { length: 760, qty: 3, color: '#a0e1e1' },
    ],
    cutsCount: 6,
    waste: '6,870 mm (57.25%)',
    utilization: 42.75,
  },
]

export default function ResultsPage({ onBack }) {
  const exportToExcel = () => {
    let csvContent = "Layout,Repetition,Stock Length (mm),Cuts,Waste,Utilization (%),Cut Details\n";
    
    mockLayouts.forEach(layout => {
      const partsStr = layout.parts.map(p => `${p.length}mm (x${p.qty})`).join(" | ");
      const row = `${layout.id},${layout.repetition},${layout.stockLength},${layout.cutsCount},"${layout.waste}",${layout.utilization}%,"${partsStr}"`;
      csvContent += row + "\n";
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "rebar_optima_cut_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    const element = document.querySelector('.results-page');
    const opt = {
      margin:       [10, 10, 10, 10],
      filename:     'rebar_optima_report.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
      ignoreElements: (el) => el.classList.contains('no-print')
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="results-page">
      {/* Top action header (hidden on print) */}
      <div className="results-actions no-print">
        <div className="actions-left">
          <button className="btn-edit-new" onClick={onBack}>
            <ArrowLeft size={16} /> Back to Optimizations
          </button>
        </div>
        <div className="actions-right">
          <button className="btn-print-report" onClick={() => window.print()}>
            <Printer size={16} /> Print Report
          </button>
          <button className="btn-download-pdf" onClick={downloadPDF}>
            <FileDown size={16} /> Download PDF
          </button>
          <button className="btn-download-excel" onClick={exportToExcel}>
            <FileSpreadsheet size={16} /> Download Excel
          </button>
        </div>
      </div>

      {/* Main Title & Optimal Badge */}
      <div className="results-title-section">
        <h1 className="results-title">Optimization Result</h1>
        <span className="badge-optimal">
          <CheckCircle2 size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
          Optimal
        </span>
      </div>

      {/* Metadata Row (Removed Project and Job ID) */}
      <div className="results-metadata-grid">
        <div>
          <span className="meta-lbl">Stock Length</span>
          <span className="meta-v">12,000 mm</span>
        </div>
        <div>
          <span className="meta-lbl">Date</span>
          <span className="meta-v">24 May 2025, 11:42 AM</span>
        </div>
        <div>
          <span className="meta-lbl">Units</span>
          <span className="meta-v">Metric (mm)</span>
        </div>
      </div>

      {/* Top Summary Cards (4 Cards) */}
      <div className="top-cards-grid">
        <div className="card summary-icon-card">
          <div className="card-info">
            <span className="stat-label">Total Parts (Quantity)</span>
            <span className="stat-value">554,480 <span className="stat-sub">(296)</span></span>
          </div>
          <div className="card-icon">
            <Package size={20} color="var(--accent)" />
          </div>
        </div>

        <div className="card summary-icon-card">
          <div className="card-info">
            <span className="stat-label">Used Stock Length</span>
            <span className="stat-value">564,000 <span className="stat-unit">mm</span></span>
            <span className="stat-percentage">(98.312%)</span>
          </div>
          <div className="card-icon">
            <TrendingUp size={20} color="var(--accent)" />
          </div>
        </div>

        <div className="card summary-icon-card">
          <div className="card-info">
            <span className="stat-label">Total Cutting Layouts</span>
            <span className="stat-value">7</span>
          </div>
          <div className="card-icon">
            <ClipboardList size={20} color="var(--accent)" />
          </div>
        </div>

        <div className="card summary-icon-card">
          <div className="card-info">
            <span className="stat-label">Total Cuts</span>
            <span className="stat-value">296</span>
          </div>
          <div className="card-icon">
            <Scissors size={20} color="var(--accent)" />
          </div>
        </div>
      </div>

      {/* Tables Row: Required Stocks & Summary */}
      <div className="tables-grid">
        {/* Required Stocks */}
        <div className="card table-card">
          <h3 className="table-card-heading">Required Stocks</h3>
          <table className="summary-table">
            <thead>
              <tr>
                <th>Stock Length (mm)</th>
                <th>Quantity (Bars)</th>
                <th>Total Length (mm)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>12,000</td>
                <td>47</td>
                <td>564,000</td>
              </tr>
              <tr className="total-row">
                <td>TOTAL</td>
                <td>47</td>
                <td>564,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Summary Table */}
        <div className="card table-card">
          <h3 className="table-card-heading">Summary</h3>
          <table className="info-summary-table">
            <tbody>
              <tr>
                <td>Total parts length (Quantity)</td>
                <td className="text-right font-bold">554,480 mm (296)</td>
              </tr>
              <tr>
                <td>Used stocks total length (Yield)</td>
                <td className="text-right font-bold text-green">564,000 mm (98.312%)</td>
              </tr>
              <tr>
                <td>Total cutting layouts</td>
                <td className="text-right font-bold">7</td>
              </tr>
              <tr>
                <td>Total number of cuts</td>
                <td className="text-right font-bold">296</td>
              </tr>
              <tr>
                <td>Total material remnant</td>
                <td className="text-right font-bold text-orange">6,870 mm (1.688%)</td>
              </tr>
              <tr className="progress-row">
                <td>Average utilization</td>
                <td className="text-right">
                  <div className="util-progress-container">
                    <div className="util-progress-bar" style={{ width: '98.31%' }} />
                    <span className="util-progress-text">98.31%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Cutting Layouts Section */}
      <div className="layouts-section">
        <h2 className="layouts-heading-title">Cutting Layouts</h2>

        {mockLayouts.map((layout) => (
          <div key={layout.id} className="card layout-card-new">
            <div className="layout-grid-new">
              
              {/* Left Panel */}
              <div className="layout-left-panel">
                <div className="layout-avatar-id">{layout.id}</div>
                <div className="layout-rep-meta">
                  <span className="layout-rep-val">{layout.repetition}x</span>
                  <span className="layout-rep-label">Repetition</span>
                </div>
                <div className="layout-stock-meta">
                  <span className="layout-stock-val">{layout.diameter || '12'} mm</span>
                  <span className="layout-stock-label">Diameter</span>
                </div>
                <div className="layout-stock-meta">
                  <span className="layout-stock-val">12,000 mm</span>
                  <span className="layout-stock-label">Stock Length</span>
                </div>
              </div>

              {/* Middle Panel with ruler */}
              <div className="layout-middle-panel">
                <div className="layout-middle-header">
                  <div className="colors-indicator-legend">
                    <span className="legend-dot pink" /> 4,500
                    <span className="legend-dot yellow" /> 1,200
                    <span className="legend-dot green" /> 950
                    <span className="legend-dot blue" /> 760
                  </div>
                </div>

                <div className="visual-bar-wrapper">
                  <div className="visual-bar-ruler">
                    {layout.parts.map((p, idx) => {
                      const percent = ((p.length * p.qty) / layout.stockLength) * 100;
                      return (
                        <div 
                          key={idx}
                          className="bar-segment"
                          style={{ 
                            width: `${percent}%`, 
                            backgroundColor: p.color 
                          }}
                        >
                          {p.length}
                        </div>
                      );
                    })}
                    {/* Waste/Remnant segment */}
                    {layout.id === 'G' && (
                      <div 
                        className="bar-segment remnant-segment"
                        style={{ width: `${(6870 / 12000) * 100}%` }}
                      >
                        Waste / Remnant<br />6,870 mm
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Panel */}
              <div className="layout-right-panel">
                <div className="right-stat-box">
                  <span className="right-stat-lbl">Cuts</span>
                  <span className="right-stat-val">{layout.cutsCount}</span>
                </div>

                <div className="right-stat-box">
                  <span className="right-stat-lbl">Waste</span>
                  <span className="right-stat-val text-dark">{layout.waste}</span>
                </div>

                <div className="right-stat-box">
                  <span className="right-stat-lbl">Utilization</span>
                  <span className="right-stat-val text-green">{layout.utilization}%</span>
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Bottom Summary Indicators (4 cards) */}
      <div className="bottom-summary-grid">
        <div className="card bottom-card">
          <div className="bottom-icon circle-chart">
            <PieChart size={18} color="#2da44e" />
          </div>
          <div>
            <div className="bottom-lbl">OVERALL UTILIZATION</div>
            <div className="bottom-v text-green">98.31%</div>
          </div>
        </div>

        <div className="card bottom-card">
          <div className="bottom-icon">
            <Trash2 size={18} color="var(--accent)" />
          </div>
          <div>
            <div className="bottom-lbl">TOTAL WASTE</div>
            <div className="bottom-v text-orange">6,870 mm <span className="bottom-v-sub">(1.688%)</span></div>
          </div>
        </div>

        <div className="card bottom-card">
          <div className="bottom-icon">
            <BarChart3 size={18} color="var(--text-primary)" />
          </div>
          <div>
            <div className="bottom-lbl">TOTAL BARS USED</div>
            <div className="bottom-v">47</div>
          </div>
        </div>

        <div className="card bottom-card">
          <div className="bottom-icon">
            <Scissors size={18} color="var(--text-primary)" />
          </div>
          <div>
            <div className="bottom-lbl">TOTAL CUTS</div>
            <div className="bottom-v">296</div>
          </div>
        </div>
      </div>

      {/* Brand signature (visible on print only) */}
      <div className="print-footer print-only">
        <span>© 2026-2027 RebarOptima. All rights reserved.</span>
        <span>Generated by RebarOptima Cut Optimizer</span>
      </div>
    </div>
  )
}
