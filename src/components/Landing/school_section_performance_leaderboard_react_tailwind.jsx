import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Search,
  Download,
  ChevronUp,
  ChevronDown,
  BarChart3,
  Medal,
  Users,
  ArrowUpRight,
  Filter,
  RefreshCw,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// ---------- Utility helpers ----------
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function toCSV(rows) {
  const headers = Object.keys(rows[0] || {});
  const esc = (v) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))];
  return lines.join("\n");
}

function download(filename, text) {
  const el = document.createElement("a");
  el.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(text));
  el.setAttribute("download", filename);
  el.style.display = "none";
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
}

// ---------- Demo data ----------
const SECTIONS = ["A", "B", "C", "D", "E", "F"];
const CITIES = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Pune"]; 

function makeData() {
  const names = [
    "Green Valley Public School",
    "Starlight High School",
    "Riverdale Academy",
    "Sunrise International",
    "Bluebell Convent",
    "Horizon Public School",
    "Silver Oak High",
    "Cambridge Scholars",
    "Lotus Valley School",
    "Maple Leaf High",
    "Vidyapeeth Central",
    "Nexus World School",
  ];
  const rows = names.map((n, i) => {
    const score = Math.round(70 + Math.random() * 30); // 70-100
    const improvement = +(Math.random() * 10 - 5).toFixed(1); // -5 to +5
    const participation = Math.round(60 + Math.random() * 40); // 60-100
    const section = SECTIONS[i % SECTIONS.length];
    const city = CITIES[i % CITIES.length];
    return {
      id: i + 1,
      rank: i + 1,
      school: n,
      section,
      score,
      improvement,
      participation,
      city,
      state: "",
      medals: Math.round(score / 20),
      lastUpdated: new Date(Date.now() - i * 36e5).toISOString(),
    };
  });
  // Sort by score desc for initial ranks
  rows.sort((a, b) => b.score - a.score);
  rows.forEach((r, idx) => (r.rank = idx + 1));
  return rows;
}

// ---------- Main Component ----------
export default function SchoolSectionLeaderboard() {
  const [query, setQuery] = useState("");
  const [section, setSection] = useState("all");
  const [city, setCity] = useState("all");
  const [sortBy, setSortBy] = useState("score_desc");
  const [data, setData] = useState(() => makeData());
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // Regenerate demo data (simulates refresh from API)
  const refresh = () => {
    const next = makeData();
    setData(next);
    setPage(1);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = data.filter((r) =>
      (section === "all" || r.section === section) &&
      (city === "all" || r.city === city) &&
      (!q || r.school.toLowerCase().includes(q))
    );

    switch (sortBy) {
      case "score_desc":
        rows.sort((a, b) => b.score - a.score);
        break;
      case "score_asc":
        rows.sort((a, b) => a.score - b.score);
        break;
      case "impr_desc":
        rows.sort((a, b) => b.improvement - a.improvement);
        break;
      case "impr_asc":
        rows.sort((a, b) => a.improvement - b.improvement);
        break;
      case "part_desc":
        rows.sort((a, b) => b.participation - a.participation);
        break;
      case "part_asc":
        rows.sort((a, b) => a.participation - b.participation);
        break;
      default:
        break;
    }

    rows.forEach((r, idx) => (r.rank = idx + 1));
    return rows;
  }, [data, section, city, query, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const kpis = useMemo(() => {
    const count = filtered.length;
    const avgScore = count ? Math.round(filtered.reduce((s, r) => s + r.score, 0) / count) : 0;
    const top = filtered[0];
    const avgParticipation = count ? Math.round(filtered.reduce((s, r) => s + r.participation, 0) / count) : 0;
    return { count, avgScore, top, avgParticipation };
  }, [filtered]);

  const chartData = useMemo(() => {
    return filtered.slice(0, 5).map((r) => ({ name: r.school.split(" ")[0], score: r.score }));
  }, [filtered]);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white text-slate-900 dark:from-slate-900 dark:to-slate-950 dark:text-slate-100 p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-2">
              <Trophy className="h-7 w-7 text-amber-500" /> School Section Performance Leaderboard
            </h1>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-1">
              Track school-wise scores, section performance, participation, and improvement trends.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={refresh}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2 shadow-sm hover:opacity-90"
            >
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
            <button
              onClick={() => download("leaderboard.csv", toCSV(filtered))}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search schools…"
                className="w-full pl-10 pr-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur outline-none focus:ring-2 ring-slate-300 dark:ring-slate-700"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"
              >
                <option value="all">All Sections</option>
                {SECTIONS.map((s) => (
                  <option key={s} value={s}>
                    Section {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="md:col-span-2">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"
            >
              <option value="all">All Cities</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-3">
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"
              >
                <option value="score_desc">Sort: Score (High → Low)</option>
                <option value="score_asc">Sort: Score (Low → High)</option>
                <option value="impr_desc">Sort: Improvement (High → Low)</option>
                <option value="impr_asc">Sort: Improvement (Low → High)</option>
                <option value="part_desc">Sort: Participation (High → Low)</option>
                <option value="part_asc">Sort: Participation (Low → High)</option>
              </select>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <KpiCard
            title="Total Schools"
            value={kpis.count}
            icon={<Users className="h-5 w-5" />}
          />
          <KpiCard
            title="Average Score"
            value={`${kpis.avgScore}`}
            icon={<BarChart3 className="h-5 w-5" />}
          />
          <KpiCard
            title="Top Performer"
            value={kpis.top ? kpis.top.school : "—"}
            icon={<Trophy className="h-5 w-5 text-amber-500" />}
            sub={kpis.top ? `Section ${kpis.top.section} · ${kpis.top.score}` : ""}
          />
          <KpiCard
            title="Avg Participation"
            value={`${kpis.avgParticipation}%`}
            icon={<Medal className="h-5 w-5" />}
          />
        </div>

        {/* Content grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leaderboard table */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="font-semibold">Leaderboard</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Updated {new Date().toLocaleDateString()}</div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50/80 dark:bg-slate-800/50">
                    <tr className="text-left text-slate-500">
                      <th className="px-4 py-3">Rank</th>
                      <th className="px-4 py-3">School</th>
                      <th className="px-4 py-3">Section</th>
                      <th className="px-4 py-3">Score</th>
                      <th className="px-4 py-3">Improvement</th>
                      <th className="px-4 py-3">Participation</th>
                      <th className="px-4 py-3">City</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageRows.map((r, i) => (
                      <tr
                        key={r.id}
                        className={classNames(
                          "border-t border-slate-100 dark:border-slate-800",
                          i % 2 === 0 ? "bg-white/40 dark:bg-slate-900/40" : "bg-transparent"
                        )}
                      >
                        <td className="px-4 py-3 font-semibold">
                          <div className="inline-flex items-center gap-2">
                            {r.rank <= 3 ? (
                              <span
                                className={classNames(
                                  "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs text-white",
                                  r.rank === 1 && "bg-amber-500",
                                  r.rank === 2 && "bg-slate-400",
                                  r.rank === 3 && "bg-orange-400"
                                )}
                              >
                                {r.rank}
                              </span>
                            ) : (
                              <span className="text-slate-600 dark:text-slate-300">{r.rank}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white flex items-center justify-center text-xs font-bold">
                              {r.school
                                .split(" ")
                                .filter(Boolean)
                                .slice(0, 2)
                                .map((w) => w[0])
                                .join("")}
                            </div>
                            <div className="min-w-[12rem]">
                              <div className="font-medium leading-none truncate">{r.school}</div>
                              <div className="text-xs text-slate-500">{new Date(r.lastUpdated).toLocaleString()}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">{r.section}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-28 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                              <div
                                className="h-full bg-indigo-500"
                                style={{ width: `${r.score}%` }}
                              />
                            </div>
                            <span className="font-semibold tabular-nums">{r.score}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <BadgeDelta value={r.improvement} />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                              <div
                                className="h-full bg-emerald-500"
                                style={{ width: `${r.participation}%` }}
                              />
                            </div>
                            <span className="tabular-nums">{r.participation}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">{r.city}</td>
                        <td className="px-4 py-3">
                          <button className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline">
                            View <ArrowUpRight className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-800 text-sm">
                <div className="text-slate-500">Page {page} of {totalPages}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 disabled:opacity-40"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Insights panel */}
          <div>
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <div className="font-semibold">Top 5 – Score Overview</div>
              </div>
              <div className="p-4">
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip cursor={{ opacity: 0.2 }} />
                      <Bar dataKey="score" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  {chartData.map((c, idx) => (
                    <li key={idx} className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-300">
                        {idx + 1}. {filtered[idx]?.school}
                      </span>
                      <span className="font-semibold">{c.score}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tips */}
            <div className="mt-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur shadow-sm p-4 text-sm">
              <div className="font-semibold mb-2">How to use</div>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
                <li>Search by school name and filter by section or city.</li>
                <li>Sort by Score, Improvement, or Participation.</li>
                <li>Export your current view as CSV for reports.</li>
                <li>Click “View” to drill into a school (wire-up to your route).</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ---------- Subcomponents ----------
function KpiCard({ title, value, sub, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur shadow-sm p-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</div>
          <div className="mt-1 text-xl md:text-2xl font-extrabold">{value}</div>
          {sub ? <div className="text-xs text-slate-500 mt-1">{sub}</div> : null}
        </div>
        <div className="h-10 w-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

function BadgeDelta({ value }) {
  const up = value >= 0;
  return (
    <span
      className={classNames(
        "inline-flex items-center gap-1 px-2 py-1 rounded-xl text-xs font-medium",
        up ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
      )}
    >
      {up ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />} {Math.abs(value)}%
    </span>
  );
}
