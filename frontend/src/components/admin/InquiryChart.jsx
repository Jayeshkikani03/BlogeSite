import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function InquiryChart({ inquiries }) {
  const { labels, counts } = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d;
    });
    return {
      labels: days.map((d) => d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })),
      counts: days.map((d) =>
        inquiries.filter((item) => new Date(item.createdAt).toDateString() === d.toDateString()).length
      )
    };
  }, [inquiries]);

  const data = {
    labels,
    datasets: [{
      label: 'Inquiries',
      data: counts,
      backgroundColor: 'rgba(129,140,248,0.25)',
      borderColor: '#818cf8',
      borderWidth: 2,
      borderRadius: 6,
      hoverBackgroundColor: 'rgba(129,140,248,0.5)'
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => ` ${ctx.parsed.y} inquiries` } } },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b', font: { size: 11 } } },
      y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b', font: { size: 11 }, precision: 0 }, beginAtZero: true }
    }
  };

  return (
    <div className="saas-card p-4 mb-5">
      <h6 className="text-white fw-bold mb-1">Inquiries — Last 7 Days</h6>
      <p className="text-gray small mb-3">Daily incoming contact submissions</p>
      <div style={{ height: '180px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
