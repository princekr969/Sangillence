import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Filler,
  TimeSeriesScale,
} from "chart.js";
import { Line, Bar, Doughnut, Pie, Radar } from "react-chartjs-2";
import { RefreshCw, Download, Layers, Eye, EyeOff } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Filler,
  TimeSeriesScale
);

// ---------- Utilities ----------
function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

function randomSeries(n, base = 50, spread = 40) {
  return Array.from({ length: n }, () => Math.round(base + (Math.random() - 0.5) * spread));
}

const LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const PALETTE = [
  "#6366F1", // indigo-500
  "#10B981", // emerald-500
  "#F59E0B", // amber-500
  "#EF4444", // red-500
  "#3B82F6", // blue-500
  "#8B5CF6", // violet-500
];

// ---------- Main Component ----------
export default function ChartGallery() {
  const [count, setCount] = useState(7);
  const [seed, setSeed] = useState(0);
  const [hiddenSets, setHiddenSets] = useState({});

  const regenerate = () => setSeed((s) => s + 1);

  // Refs for export/toggle
  const refs = {
    line: useRef(null),
    bar: useRef(null),
    doughnut: useRef(null),
    pie: useRef(null),
    radar: useRef(null),
    mixed: useRef(null),
  };

  const labels = useMemo(() => LABELS.slice(0, count), [count]);

  // Shared options
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        position: "bottom",
        labels: { boxWidth: 10, boxHeight: 10, usePointStyle: true },
      },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "rgba(148,163,184,0.2)" }, beginAtZero: true },
    },
  };

  // Datasets
  const lineData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Series A",
          data: randomSeries(labels.length, 60, 50),
          borderColor: PALETTE[0],
          backgroundColor: "rgba(99,102,241,0.2)",
          fill: true,
          tension: 0.35,
          pointRadius: 2,
        },
        {
          label: "Series B",
          data: randomSeries(labels.length, 45, 60),
          borderColor: PALETTE[1],
          backgroundColor: "rgba(16,185,129,0.2)",
          fill: true,
          tension: 0.35,
          pointRadius: 2,
        },
      ],
    }),
    [labels, seed]
  );

  const barData = useMemo(
    () => ({
      labels,
      datasets: [
        { label: "Completed", data: randomSeries(labels.length, 70, 40), backgroundColor: PALETTE[2], borderRadius: 10 },
        { label: "Pending", data: randomSeries(labels.length, 40, 40), backgroundColor: PALETTE[3], borderRadius: 10 },
      ],
    }),
    [labels, seed]
  );

  const doughnutData = useMemo(
    () => ({
      labels: ["North", "South", "East", "West"],
      datasets: [
        {
          data: randomSeries(4, 25, 50),
          backgroundColor: [PALETTE[0], PALETTE[1], PALETTE[2], PALETTE[4]],
          hoverOffset: 6,
        },
      ],
    }),
    [seed]
  );

  const pieData = useMemo(
    () => ({
      labels: ["Chrome", "Safari", "Edge", "Firefox", "Others"],
      datasets: [
        {
          data: randomSeries(5, 20, 60),
          backgroundColor: [PALETTE[4], PALETTE[2], PALETTE[3], PALETTE[0], PALETTE[1]],
        },
      ],
    }),
    [seed]
  );

  const radarData = useMemo(
    () => ({
      labels: ["Maths", "Science", "English", "Arts", "Sports", "GK"],
      datasets: [
        {
          label: "Term 1",
          data: randomSeries(6, 60, 40),
          backgroundColor: "rgba(59,130,246,0.2)",
          borderColor: PALETTE[4],
          pointBackgroundColor: PALETTE[4],
        },
        {
          label: "Term 2",
          data: randomSeries(6, 55, 40),
          backgroundColor: "rgba(139,92,246,0.2)",
          borderColor: PALETTE[5],
          pointBackgroundColor: PALETTE[5],
        },
      ],
    }),
    [seed]
  );

  const mixedData = useMemo(
    () => ({
      labels,
      datasets: [
        { type: "bar", label: "Revenue", data: randomSeries(labels.length, 70, 50), backgroundColor: PALETTE[0], borderRadius: 8 },
        { type: "bar", label: "Cost", data: randomSeries(labels.length, 45, 40), backgroundColor: PALETTE[3], borderRadius: 8 },
        { type: "line", label: "Margin %", data: randomSeries(labels.length, 25, 30), borderColor: PALETTE[1], backgroundColor: "rgba(16,185,129,0.2)", yAxisID: "y1", tension: 0.3, fill: false },
      ],
    }),
    [labels, seed]
  );

  const mixedOptions = {
    ...baseOptions,
    scales: {
      x: baseOptions.scales.x,
      y: { ...baseOptions.scales.y, stacked: true },
      y1: { position: "right", grid: { drawOnChartArea: false }, beginAtZero: true, ticks: { callback: (v) => `${v}%` } },
    },
  };

  const downloadPNG = (key) => {
    const chart = refs[key]?.current;
    if (!chart) return;
    const link = document.createElement("a");
    link.href = chart.toBase64Image();
    link.download = `${key}-chart.png`;
    link.click();
  };

  const toggleDataset = (chartKey, index) => {
    const ref = refs[chartKey]?.current;
    if (!ref) return;
    const meta = ref.getDatasetMeta(index);
    if (!meta) return;
    meta.hidden = meta.hidden === null ? !ref.data.datasets[index].hidden : null;
    ref.update();
    setHiddenSets((s) => ({ ...s, [`${chartKey}-${index}`]: meta.hidden }));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Responsive Charts – Chart.js Gallery</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Line · Bar · Doughnut · Pie · Radar · Mixed (bar + line). Fully responsive, exportable, and theme-aware.</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 px-2 py-1">
              <label className="text-sm px-2">Points:</label>
              <input
                type="range"
                min={4}
                max={LABELS.length}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value, 10))}
              />
              <span className="w-6 text-center text-sm">{count}</span>
            </div>
            <button onClick={regenerate} className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2 shadow-sm hover:opacity-90">
              <RefreshCw className="h-4 w-4" /> Regenerate
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <ChartCard title="Line – Trends" onDownload={() => downloadPNG("line")}>
            <div className="h-64">
              <Line ref={refs.line} data={lineData} options={baseOptions} />
            </div>
            <LegendToggles chartKey="line" refObj={refs.line} datasets={lineData.datasets} onToggle={toggleDataset} hiddenSets={hiddenSets} />
          </ChartCard>

          <ChartCard title="Bar – Categories" onDownload={() => downloadPNG("bar")}>
            <div className="h-64">
              <Bar ref={refs.bar} data={barData} options={{ ...baseOptions, scales: { ...baseOptions.scales, y: { ...baseOptions.scales.y, stacked: false } } }} />
            </div>
            <LegendToggles chartKey="bar" refObj={refs.bar} datasets={barData.datasets} onToggle={toggleDataset} hiddenSets={hiddenSets} />
          </ChartCard>

          <ChartCard title="Doughnut – Distribution" onDownload={() => downloadPNG("doughnut")}>
            <div className="h-64">
              <Doughnut ref={refs.doughnut} data={doughnutData} options={{ ...baseOptions, scales: undefined }} />
            </div>
          </ChartCard>

          <ChartCard title="Pie – Share" onDownload={() => downloadPNG("pie")}>
            <div className="h-64">
              <Pie ref={refs.pie} data={pieData} options={{ ...baseOptions, scales: undefined }} />
            </div>
          </ChartCard>

          <ChartCard title="Radar – Skills" onDownload={() => downloadPNG("radar")}>
            <div className="h-64">
              <Radar ref={refs.radar} data={radarData} options={{ ...baseOptions, scales: { r: { beginAtZero: true, angleLines: { color: "rgba(148,163,184,0.2)" }, grid: { color: "rgba(148,163,184,0.2)" } } } }} />
            </div>
          </ChartCard>

          <ChartCard title="Mixed – Revenue vs Cost vs Margin" onDownload={() => downloadPNG("mixed")}>
            <div className="h-64">
              <Bar ref={refs.mixed} data={mixedData} options={mixedOptions} />
            </div>
          </ChartCard>
        </div>

        {/* Tips */}
        <div className="mt-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur shadow-sm p-4 text-sm">
          <div className="font-semibold mb-2">How to use</div>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
            <li>Drag the <em>Points</em> slider to change the number of X-axis labels for line/bar/mixed charts.</li>
            <li>Click <em>Regenerate</em> to quickly create new demo data.</li>
            <li>Use the download icon on each card to export a PNG snapshot.</li>
            <li>Toggle dataset visibility with the legend below line/bar charts.</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

// ---------- Subcomponents ----------
function ChartCard({ title, children, onDownload }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="font-semibold">{title}</div>
        <button onClick={onDownload} className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white text-sm">
          <Download className="h-4 w-4" /> Export PNG
        </button>
      </div>
      <div className="p-4">{children}</div>
    </motion.div>
  );
}

function LegendToggles({ chartKey, refObj, datasets, onToggle, hiddenSets }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {datasets.map((ds, i) => {
        const hidden = hiddenSets?.[`${chartKey}-${i}`] ?? false;
        return (
          <button
            key={i}
            onClick={() => onToggle(chartKey, i)}
            className={classNames(
              "inline-flex items-center gap-1 px-2 py-1 rounded-xl text-xs border",
              hidden
                ? "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-500"
                : "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent"
            )}
            title={hidden ? "Show dataset" : "Hide dataset"}
          >
            {hidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {ds.label}
          </button>
        );
      })}
    </div>
  );
}
