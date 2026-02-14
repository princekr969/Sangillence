import React, { useState, useEffect } from "react";
import useCountry from "../hooks/useCountry";
import { ScrollToTop } from "../components";
import { useLocation } from "react-router-dom";
import OlympiadHeader from "../components/Olympiad/OlympiadHeader";
import { winners, specialAwards } from "../data/winners";

function OlympiadPage() {
  const { isOman } = useCountry();
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState("human");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <ScrollToTop />
      <OlympiadHeader />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-7xl animate-pulse">🏆</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-600 mb-4 font-['Orbitron']">
              Sangillence Champions 2025
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Celebrating excellence in human-AI collaboration
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <TabButton
              active={activeTab === "human"}
              onClick={() => setActiveTab("human")}
              icon="👑"
              label="Human Sovereign"
            />
            <TabButton
              active={activeTab === "ai"}
              onClick={() => setActiveTab("ai")}
              icon="🤖"
              label="AI Orchestrator"
            />
            <TabButton
              active={activeTab === "domains"}
              onClick={() => setActiveTab("domains")}
              icon="🎯"
              label="Individual Domains"
            />
            <TabButton
              active={activeTab === "special"}
              onClick={() => setActiveTab("special")}
              icon="⭐"
              label="Special Awards"
            />
          </div>

          {/* Content Sections */}
          <div className="max-w-7xl mx-auto">
            {activeTab === "human" && (
              <SectionBlock
                title="👑 Human Sovereign Champions"
                data={winners.humanSovereign}
                poolWise={true}
              />
            )}

            {activeTab === "ai" && (
              <SectionBlock
                title="🤖 AI Orchestrator Champions"
                data={winners.aiOrchestrator}
                poolWise={true}
              />
            )}

            {activeTab === "domains" && (
              <div className="grid gap-8">
                <SimpleSection title="🧠 Logical Reasoning" data={winners.logical} />
                <SimpleSection title="📊 Analytical" data={winners.analytical} />
                <SimpleSection title="🧩 Memory" data={winners.memory} />
                <SimpleSection title="🎯 Critical Thinking" data={winners.criticalThinking} />
                <SimpleSection title="👁️ Observation" data={winners.observation} />
                <SimpleSection title="🔬 Research" data={winners.research} />
                <SimpleSection title="💡 Out Of The Box Thinking" data={winners.ootb} />
                <SimpleSection title="🧬 Meta-Cognition" data={winners.metaCognition} />
                <SimpleSection title="🎨 Creativity" data={winners.creativity} />
                <SimpleSection title="🏅 G-Score Champion" data={winners.gScore} />
              </div>
            )}


            {activeTab === "special" && (
              <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 shadow-2xl">
                <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center flex items-center justify-center gap-3 font-['Orbitron']">
                  <span>🌟</span>
                  Special Recognition
                  <span>🌟</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  <AwardCard
                    icon="🏫"
                    title="Best Human Sovereign"
                    winner={specialAwards.bestHumanSovereign}
                    color="from-blue-500 to-cyan-500"
                  />
                  <AwardCard
                    icon="🤖"
                    title="Best AI Orchestrator"
                    winner={specialAwards.bestAIOrchestral}
                    color="from-purple-500 to-pink-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite linear;
          background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
          background-size: 1000px 100%;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

/* Reusable Components */

function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2
        ${active
          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50 scale-105"
          : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700"
        }
      `}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function SectionBlock({ title, data, poolWise }) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700/50 shadow-2xl">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-8 text-center font-['Orbitron']">
        {title}
      </h2>

      {poolWise &&
        Object.keys(data).map((pool) => (
          <div key={pool} className="mb-10 last:mb-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              <h3 className="text-xl font-bold text-blue-400 px-4 py-2 bg-blue-950/50 rounded-lg border border-blue-700/50">
                Pool {pool}
              </h3>
              <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data[pool].map((student, index) => (
                <WinnerCard key={index} student={student} index={index} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

function SimpleSection({ title, data }) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700/50 shadow-2xl">
      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 text-center font-['Orbitron']">
        {title}
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((student, index) => (
          <WinnerCard key={index} student={student} index={index} />
        ))}
      </div>
    </div>
  );
}

function WinnerCard({ student, index }) {
  const medals = ["🥇", "🥈", "🥉"];

  const rankBorders = [
    "border-yellow-400 shadow-yellow-500/70",
    "border-slate-300 shadow-slate-400/70",
    "border-amber-600 shadow-amber-600/70",
  ];

  const rankGradients = [
    "from-yellow-500 to-orange-600",
    "from-slate-400 to-slate-600",
    "from-orange-600 to-amber-700",
  ];

  const borderStyle =
    index < 3
      ? `${rankBorders[index]} shadow-2xl`
      : "border-cyan-500 shadow-cyan-500/30";

  return (
    <div
      className="
        relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm
        rounded-xl p-6 border border-slate-600/30
        hover:scale-105 hover:shadow-2xl transition-all duration-300
        group overflow-hidden
      "
    >
      {/* Profile + Rank Section */}
      <div className="relative flex justify-between items-start mb-4">

        {/* Profile Image with Rank Glow */}
        <div className="relative">
          <img
            src={student.image || "/winners/default.png"}
            alt={student.name}
            onError={(e) => (e.target.src = "/winners/default.png")}
            className={`w-20 h-20 rounded-full object-cover border-4 transition-all duration-300 ${borderStyle}`}
          />

          {/* Medal overlay */}
          <div className="absolute -bottom-2 -right-2 text-2xl">
            {medals[index] || "🏅"}
          </div>
        </div>

        {/* Rank Badge */}
        {index < 3 && (
          <div
            className={`
              px-3 py-1 rounded-full text-xs font-bold
              bg-gradient-to-r ${rankGradients[index]} text-white
              shadow-lg
            `}
          >
            Rank {index + 1}
          </div>
        )}
      </div>

      {/* Student Info */}
      <div className="space-y-2">
        <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
          {student.name}
        </h4>

        <div className="flex items-center gap-2 text-sm text-slate-300">
          <span className="px-2 py-1 bg-blue-900/50 rounded text-blue-300 font-medium">
            Class {student.class}
          </span>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed">
          {student.school}
        </p>

        <div className="pt-3 mt-3 border-t border-slate-700/50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 uppercase tracking-wider">
              Score
            </span>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
              {student.score}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


function AwardCard({ icon, title, winner, color }) {
  return (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-600/40 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
      <div className="text-4xl mb-3 text-center">{icon}</div>
      <h3 className="text-lg font-bold text-purple-300 mb-3 text-center">
        {title}
      </h3>
      <div
        className={`
        text-center px-4 py-3 rounded-lg
        bg-gradient-to-r ${color}
        text-white font-bold text-xl
        shadow-lg
      `}
      >
        {winner}
      </div>
    </div>
  );
}

export default OlympiadPage;