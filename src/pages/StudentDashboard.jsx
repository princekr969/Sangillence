import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  User,
  Trophy,
  LogOut,
  School,
  GraduationCap,
  Brain,
  BarChart,
  Target,
  Lightbulb,
  Award,
  Eye,
  Cpu,
  Sparkles,
  ChevronLeft,
  BookCopy,
  
} from "lucide-react";
import heroSectionBg from "../../assets/svgs/herosectionbg.svg";
import axios from "axios";
import downloadResult from "../utils/resultUtils.js";
import handleDownloadCertificate from "../utils/certificateUtils.js";


const downloadImage = async (url, filename) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename || 'certificate.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Download failed:', error);
  }
};


export default function StudentDashboard() {
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard", "results", "profile"
  const navigate = useNavigate();
  const { resultId } = useParams();

  useEffect(() => {
    const fetchStudentData = async () => {

      if (!resultId) {
        navigate("/student-login");
        return;
      }

      try {
        const response = await axios.get(
          `https://naivedyamcdc.com/api/students/result/${resultId}`,
        );

        if (response.data.success) {
          setResultData(response.data.result);
        } else {
          setError("Student not found");
        }
      } catch (error) {
        console.error("Student detail Error:", error);
        setError(
          error.response?.data?.message || "Failed to fetch student data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [resultId, navigate]);

  const handleLogout = () => {
    if (activeTab !== "dashboard") {
      setActiveTab("dashboard");
    } else {
      navigate("/student-login");
    }
  };

  const formatDOB = (dobString) => {
    if (!dobString) return "Not provided";
    const dob = new Date(dobString);
    return dob.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateAge = (dobString) => {
    if (!dobString) return "N/A";
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  // Calculate score percentage for visual representation
  const calculateScorePercentage = (score, maxScore = 10) => {
    return Math.min(Math.max((score / maxScore) * 100, 0), 100);
  };

  // Get score color based on value
  const getScoreColor = (score, maxScore = 10) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 70) return "text-green-400";
    if (percentage >= 40) return "text-yellow-400";
    return "text-red-400";
  };

  // Get background color for score bars
  const getScoreBarColor = (score, maxScore = 10) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 70)
      return "bg-gradient-to-r from-green-500 to-emerald-500";
    if (percentage >= 40)
      return "bg-gradient-to-r from-yellow-500 to-amber-500";
    return "bg-gradient-to-r from-red-500 to-pink-500";
  };

  // Process question data
  const processQuestionData = () => {
    if (!resultData) return [];

    const questions = [];
    for (let i = 1; i <= 10; i++) {
      const qData = {
        number: i,
        answer: resultData[`Q${i}_Ans`] || "-",
        domain: resultData[`Q${i}_Dom`] || "-",
        lateral: resultData[`Q${i}_Lat`] || "-",
        support: resultData[`Q${i}_Sup`] || "-",
        tag: resultData[`Q${i}_Tag`] || "-",
      };
      questions.push(qData);
    }
    return questions;
  };

  // Get skill categories
  const getSkillCategories = () => {
    if (!resultData) return [];

    return [
      {
        name: "Creativity",
        value: (resultData.CV_Score * 10) / 11.11 || 0,
        icon: Sparkles,
      },
      {
        name: "Analytical Thinking",
        value: resultData.A_Score || 0,
        icon: Brain,
      },
      { name: "Logical Thinking", value: resultData.L_Score || 0, icon: Cpu },
      { name: "Memory", value: resultData.M_Score || 0, icon: Brain },
      { name: "Observational", value: resultData.OB_Score || 0, icon: Eye },
      { name: "Critical Thinking", value: resultData.CT_Score || 0, icon: Eye },
      { name: "Research", value: resultData.R_Score || 0, icon: Eye },
      {
        name: "Out-of-the-Box Thinking",
        value: resultData.OOTB_Score || 0,
        icon: Lightbulb,
      },
      { name: "Meta-cognition", value: resultData.MC_Score || 0, icon: Target },
    ];
  };

  const getPoolFromClass = (cls) => {
    const classNum = parseInt(cls, 10);
    if (classNum >= 3 && classNum <= 5) return "Pool A";
    if (classNum >= 6 && classNum <= 8) return "Pool B";
    if (classNum >= 9 && classNum <= 10) return "Pool C";
    return "Unknown Pool";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="animate-pulse text-white text-xl">
            Loading student data...
          </div>
        </div>
      </div>
    );
  }

  if (error || !resultData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-900">
        <div className="text-center">
          <div className="text-red-400 text-2xl mb-4">
            Error: {error || "No student data found"}
          </div>
          <button
            onClick={() => navigate("/student-login", { replace: true })}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  const questions = processQuestionData();
  const skillCategories = getSkillCategories();

  return (
    <div className="relative overflow-hidden min-h-screen px-4 sm:px-6 md:px-16 py-8">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${heroSectionBg})` }}
      ></div>

      {/* Main Dashboard Container */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="mb-6">
          <div className="relative overflow-hidden bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 rounded-2xl shadow-2xl p-6">
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: "30px 30px",
                }}
              ></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Welcome back, {resultData?.Name?.split(" ")[0] || "Student"}
                </h1>
                <p className="text-blue-200 mt-2">
                  {resultData
                    ? "SOBO Assessment Results Ready"
                    : "Complete your assessment to view results"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 self-start md:self-auto"
              >
                {activeTab !== "dashboard" ? (
                  <ChevronLeft className="w-5 h-5" />
                ) : (
                  <LogOut className="w-5 h-5" />
                )}
                <span>{activeTab == "dashboard" ? "Logout" : "Back"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative shadow-xl bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-indigo-900/90 rounded-3xl p-6 md:p-10 border border-white/10">
          {/* Background Effects */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900"></div>

            {/* Geometric overlays */}
            <div className="absolute inset-0">
              <div
                className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-600/30 to-transparent"
                style={{ clipPath: "polygon(0 0, 70% 0, 30% 100%, 0 100%)" }}
              ></div>
              <div
                className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-500/20 to-transparent"
                style={{
                  clipPath: "polygon(30% 0, 100% 0, 100% 100%, 70% 100%)",
                }}
              ></div>
              <div
                className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-teal-500/20 to-transparent"
                style={{ clipPath: "polygon(0 0, 60% 0, 0 80%)" }}
              ></div>
              <div
                className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-600/25 to-transparent"
                style={{
                  clipPath: "polygon(40% 0, 100% 0, 100% 100%, 0 100%)",
                }}
              ></div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            {activeTab === "dashboard" && (
              <>
                {/* Profile Section */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* Profile Card */}
                  <div className="md:col-span-1 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        {resultData.imageUrl ? (
                          <div className="relative">
                            <img
                              src={resultData.imageUrl}
                              alt={resultData["Name "] || "Student"}
                              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg object-cover"
                              onError={(e) => {
                                // If image fails to load, show initial
                                e.target.style.display = "none";
                                const initialDiv = e.target.nextElementSibling;
                                if (initialDiv)
                                  initialDiv.style.display = "flex";
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                            <span className="text-4xl font-bold text-white">
                              {resultData?.Name?.charAt(0) || "N"}
                            </span>
                          </div>
                        )}

                        <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-slate-900 flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      <h2 className="text-2xl font-bold text-white mb-2 text-center">
                        {resultData?.Name || "N/A"}
                      </h2>
                      <div className="flex items-center gap-2 text-blue-300 mb-1">
                        <GraduationCap className="w-4 h-4" />
                        <span>
                          Class{" "}
                          {resultData?.Class || "N/A"}{" "}
                          -{" "}
                          {
                            resultData?.Section ||
                            "N/A"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                        <School className="w-4 h-4" />
                        <span>
                          {resultData?.School || "N/A"}
                        </span>
                      </div>
                      <div className="">
                        <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-semibold">
                          {getPoolFromClass(
                            resultData?.Class || "N/A",
                          )}
                        </span>
                      </div>

                      <div className="w-full space-y-3 mt-4">
                        <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                          <User className="w-5 h-5 text-blue-400" />
                          <div>
                            <p className="text-blue-300 text-xs">Student ID</p>
                            <p className="text-white font-mono">
                              {resultData?._id.substring(0, 8)}...
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                            <p className="text-purple-300 text-xs">Age</p>
                            <p className="text-white font-semibold">
                              {calculateAge(resultData?.DOB)}{" "}
                              years
                            </p>
                          </div>
                          <div className="bg-teal-500/10 rounded-lg p-3 border border-teal-500/20">
                            <p className="text-teal-300 text-xs">
                              Date of Birth
                            </p>
                            <p className="text-white font-semibold text-sm">
                              {formatDOB(resultData?.DOB)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*  Perfomance Card */}
                  <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
                    {resultData && (
                      <div className="bg-gradient-to-br from-green-600/20 to-emerald-800/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
                        {/* Header with Archetype */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-green-300 text-sm mb-1">
                              Assessment Results
                            </p>
                            <h3 className="text-2xl font-bold text-white">
                              {resultData.StuArch || "AI Parasite"}
                            </h3>
                            <p className="text-gray-300 text-sm mt-1">
                              Archetype
                            </p>
                          </div>
                          <Trophy className="w-10 h-10 text-green-400" />
                        </div>

                        {/* Score cards */}
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="bg-green-500/10 rounded p-3">
                            <p className="text-green-300 text-xs">
                              {" "}
                              Intelligence Score{" "}
                            </p>
                            <p className="text-white text-xl font-bold">
                              {resultData.g_Score || "N/A"}
                            </p>
                          </div>

                          <div className="bg-green-500/10 rounded p-3 ">
                            <p className="text-green-300 text-xs">
                              Plagiarism %
                            </p>
                            <p className="text-white text-xl font-bold">
                              {resultData.Plag__Score != null ? (resultData.Plag__Score * 100).toFixed(1) : "0"}
                            </p>
                          </div>
                          <div className="bg-green-500/10 rounded p-3 col-span-2">
                            <p className="text-green-300 text-xs">
                              Actual Score
                            </p>
                            <p className="text-white text-xl font-bold">
                              {resultData["Actual Score"] ||
                                resultData.Actual_Score ||
                                "N/A"}
                            </p>
                          </div>
                          <div className="bg-green-500/10 rounded p-3 col-span-2">
                            <p className="text-green-300 text-xs">Top Skills</p>
                            <p className="text-white text-xl font-bold">
                              {resultData.TopSkills ||
                                "Creativity, Meta-cognition"}
                            </p>
                          </div>
                        </div>

                        {/* Button to view full report */}
                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={() => setActiveTab("results")}
                            className="cursor-pointer text-white text-xs bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded"
                          >
                            View Full Report
                          </button>
                        </div>
                      </div>
                    )}
                    {/* Quick Actions */}
                    <div className="bg-gradient-to-br from-teal-600/20 to-teal-800/20 backdrop-blur-sm rounded-2xl p-6 border border-teal-500/30">
                      <p className="text-teal-300 text-sm mb-4">
                        Quick Actions
                      </p>
                      <div className="space-y-3">
                        <button
                          onClick={() => setActiveTab("results")}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg text-center hover:scale-105 transition-all duration-300 font-semibold"
                        >
                          View Detailed Results
                        </button>
                        {/* Certificate Download Button */}
                        <button
                          type="button"
                          onClick={() =>
                            downloadResult(resultData)
                          }
                          className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-3 rounded-lg text-center hover:scale-105 transition-all duration-300 font-semibold"
                        >
                          Download Result
                        </button>
                        <p className="text-gray-300 text-sm mb-4">
                          Certificates
                      </p>
                        <button
                          type="button"
                          onClick={() =>
                            handleDownloadCertificate(
                              resultData,
                              getPoolFromClass(resultData.Class),
                            )
                          }
                          className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-4 py-3 rounded-lg text-center hover:scale-105 transition-all duration-300 font-semibold"
                        >
                          Download Certificate 1
                        </button>

                        <div className="space-y-2">
                          {resultData.certificate.map((url, index) => {
                            // Extract a filename from the URL (optional)
                            const filename = `certificate_${index + 2}.png`;
                            return (
                              <button
                                key={index}
                                type="button"
                                onClick={() => downloadImage(url, filename)}
                                className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-4 py-3 rounded-lg text-center hover:scale-105 transition-all duration-300 font-semibold"
                              >
                                Download Certificate {index + 2}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Remark Section */}
                <div className="bg-gradient-to-br from-amber-600/10 to-orange-600/10 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/30">
                  <div className="flex items-start gap-4">
                    <Lightbulb className="w-8 h-8 text-amber-400 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Remark & Feedback
                      </h3>
                      <p className="text-gray-200 leading-relaxed">
                        {resultData.Remark ||
                          "You have a fantastic tech-savvy mind and a high-speed approach to solving difficult tasks; which is a massive skill! My challenge for you is to now anchor that speed in your own deep reasoning; as understanding the 'why' will make you unstoppable."}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "results" && resultData && (
              <>
                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-6 text-center md:text-left">
                      Performance Overview
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="relative flex flex-col items-center justify-center gap-4">
                        <div className="w-48 h-48 rounded-full border-8 border-blue-500/30 flex items-center justify-center">
                          <div className="w-40 h-40 rounded-full border-8 border-transparent border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-teal-500 flex items-center justify-center ">
                            <div className="flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-4xl font-bold text-white">
                                  {resultData["Actual Score"] || "0"}
                                </div>
                                <div className="text-gray-300">
                                  Actual Score
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-white font-family-givonic-bold text-xl">
                          OVERALL SCORE
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                          <div className="p-2 bg-purple-500/20 rounded-lg">
                            <Award className="w-5 h-5 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">
                              Student Archetype
                            </p>
                            <p className="text-white font-bold text-lg">
                              {resultData.StuArch || "AI Parasite"}
                            </p>
                          </div>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                          <div className="p-2 bg-blue-500/20 rounded-lg">
                            <Target className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">
                              Intelligence Score
                            </p>
                            <p className="text-white text-2xl font-bold">
                              {resultData.g_Score || "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                          <div className="p-2 bg-teal-500/20 rounded-lg">
                            <Lightbulb className="w-5 h-5 text-teal-400" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Top Skills</p>
                            <p className="text-white font-bold text-lg">
                              {resultData.TopSkills ||
                                "Creativity, Meta‑cognition"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                          <div className="p-2 bg-amber-500/20 rounded-lg">
                            <Brain className="w-5 h-5 text-amber-400" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">
                              Suppressed Skills
                            </p>
                            <p className="text-white font-bold text-lg">
                              {resultData.SuppressedSkills ||
                                "Critical Thinking"}
                            </p>
                          </div>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                          <div className="p-2 bg-amber-500/20 rounded-lg">
                            <BookCopy className="w-5 h-5 text-red-400" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">
                              Plagiarism %
                            </p>
                            <p className="text-white font-bold text-lg">
                              {resultData.Plag__Score != null ? (resultData.Plag__Score * 100).toFixed(1) : "0"}
                            </p>
                          </div>
                        </div>
                        {resultData.AAS_Score > 0 && (
                          <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                            <div className="p-2 bg-pink-500/20 rounded-lg">
                              <BarChart className="w-5 h-5 text-pink-400" />
                            </div>
                            <div>
                              <p className="text-gray-400 text-xs">
                                AI Augmentation Score
                              </p>
                              <p className="text-white text-2xl font-bold">
                                {resultData.AAS_Score?.toFixed(1) || "N/A"}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Skill Scores Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skillCategories
                      .filter((skill) => skill.value !== 0)
                      .map((skill, index) => (
                        <div
                          key={index}
                          className="bg-slate-800/40 rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-500/20 rounded-lg">
                                <skill.icon className="w-5 h-5 text-blue-400" />
                              </div>
                              <span className="text-white font-semibold">
                                {skill.name}
                              </span>
                            </div>
                            <span
                              className={`text-2xl font-bold ${getScoreColor(skill.value)}`}
                            >
                              {skill.value.toFixed(1)}
                            </span>
                          </div>
                          <div className="w-full bg-slate-700/50 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getScoreBarColor(skill.value)} transition-all duration-500`}
                              style={{
                                width: `${calculateScorePercentage(skill.value)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Question-wise Analysis */}
                  <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl p-6 border border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-6">
                      Question-wise Analysis
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {questions.map((q, index) => (
                        <div
                          key={index}
                          className="bg-slate-800/40 rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                <span className="text-white font-bold">
                                  Q{q.number}
                                </span>
                              </div>
                              <div>
                                <h4 className="text-white font-bold">
                                  Question {q.number}
                                </h4>
                                <p className="text-gray-400 text-sm">
                                  Your Answer:{" "}
                                  <span className="text-white font-mono">
                                    {q.answer}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full text-sm font-semibold">
                              {q.tag}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="space-y-2">
                              <p className="text-gray-400 text-sm">
                                Dominant Skill
                              </p>
                              <p className="text-white font-semibold">
                                {q.domain}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-gray-400 text-sm">
                                Latent Skill
                              </p>
                              <p className="text-white font-semibold">
                                {q.lateral}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-gray-400 text-sm">
                                Supportive Skill
                              </p>
                              <p className="text-white font-semibold">
                                {q.support}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-gray-400 text-sm">
                                Diagnosis Tag
                              </p>
                              <p className="text-white font-semibold">
                                {q.tag}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Remark Section */}
                  <div className="bg-gradient-to-br from-amber-600/10 to-orange-600/10 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/30">
                    <div className="flex items-start gap-4">
                      <Lightbulb className="w-8 h-8 text-amber-400 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          Remark & Feedback
                        </h3>
                        <p className="text-gray-200 leading-relaxed">
                          {resultData.Remark ||
                            "You have a fantastic tech-savvy mind and a high-speed approach to solving difficult tasks; which is a massive skill! My challenge for you is to now anchor that speed in your own deep reasoning; as understanding the 'why' will make you unstoppable."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add custom animation */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
