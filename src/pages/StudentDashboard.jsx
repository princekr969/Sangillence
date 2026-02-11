import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  User,
  Mail,
  Calendar,
  BookOpen,
  Trophy,
  Clock,
  FileText,
  LogOut,
  School,
  GraduationCap,
  Brain,
  BarChart,
  Target,
  Lightbulb,
  Zap,
  Award,
  TrendingUp,
  Shield,
  Eye,
  Cpu,
  Sparkles,
  Home,
  Bookmark,
  Settings,
  Star,
} from "lucide-react";
import heroSectionBg from "../../assets/svgs/herosectionbg.svg";
import axios from "axios";

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard", "results", "profile"
  const navigate = useNavigate();
  const { studentId } = useParams();

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!studentId) {
        navigate("/student-login");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5001/api/students/result/${studentId}`,
        );
        console.log("API Response:", response.data);

        if (response.data.success) {
          setStudentData(response.data.student);
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
  }, [studentId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("studentId");
    navigate("/student-login");
  };

  // Format date of birth
  const formatDOB = (dobString) => {
    if (!dobString) return "Not provided";
    const dob = new Date(dobString);
    return dob.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format registration date
  const formatRegistrationDate = (dateString) => {
    if (!dateString) return "Not available";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate age from DOB
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
    if (percentage >= 70) return "bg-gradient-to-r from-green-500 to-emerald-500";
    if (percentage >= 40) return "bg-gradient-to-r from-yellow-500 to-amber-500";
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
        tag: resultData[`Q${i}_Tag`] || "-"
      };
      questions.push(qData);
    }
    return questions;
  };

  // Get skill categories
  const getSkillCategories = () => {
    if (!resultData) return [];
    
    return [
      { name: "Creativity", value: resultData.CV_Score || 0, icon: Sparkles },
      { name: "Analytical", value: resultData.A_Score || 0, icon: Brain },
      { name: "Logical", value: resultData.L_Score || 0, icon: Cpu },
      { name: "Memory", value: resultData.M_Score || 0, icon: Brain },
      { name: "Observational", value: resultData.OB_Score || 0, icon: Eye },
      { name: "OOTB Thinking", value: resultData.OOTB_Score || 0, icon: Lightbulb },
      { name: "Meta-cognition", value: resultData.MC_Score || 0, icon: Target },
    ];
  };

  // Get rank color based on rank
  const getRankColor = (rank) => {
    if (!rank) return "text-gray-300";
    if (rank <= 3) return "text-yellow-400";
    if (rank <= 10) return "text-purple-400";
    if (rank <= 25) return "text-blue-400";
    return "text-green-400";
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

  if (error || !studentData) {
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
                  Welcome back, {studentData.fullName.split(" ")[0]}!
                </h1>
                <p className="text-blue-200 mt-2">
                  {resultData ? "SOBO Assessment Results Ready" : "Complete your assessment to view results"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 self-start md:self-auto"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "dashboard"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "bg-slate-800/50 text-gray-300 hover:bg-slate-700/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Dashboard
              </div>
            </button>
            <button
              onClick={() => setActiveTab("results")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "results"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-slate-800/50 text-gray-300 hover:bg-slate-700/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                Results
              </div>
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "profile"
                  ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white"
                  : "bg-slate-800/50 text-gray-300 hover:bg-slate-700/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile
              </div>
            </button>
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
                        {studentData.imageUrl ? (
                          <div className="relative">
                            <img
                              src={studentData.imageUrl}
                              alt={studentData.fullName}
                              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg object-cover"
                              onError={(e) => {
                                // If image fails to load, show initial
                                e.target.style.display = "none";
                                const initialDiv = e.target.nextElementSibling;
                                if (initialDiv) initialDiv.style.display = "flex";
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                            <span className="text-4xl font-bold text-white">
                              {studentData.fullName.charAt(0)}
                            </span>
                          </div>
                        )}

                        <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-slate-900 flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      <h2 className="text-2xl font-bold text-white mb-2 text-center">
                        {studentData.fullName}
                      </h2>
                      <div className="flex items-center gap-2 text-blue-300 mb-1">
                        <GraduationCap className="w-4 h-4" />
                        <span>
                          Class {studentData.class || resultData?.["Class "] || "N/A"} - {studentData.section || resultData?.["Section "] || "N/A"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                        <School className="w-4 h-4" />
                        <span>{studentData.school || resultData?.["School "] || "N/A"}</span>
                      </div>

                      <div className="w-full space-y-3 mt-4">
                        <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                          <User className="w-5 h-5 text-blue-400" />
                          <div>
                            <p className="text-blue-300 text-xs">Student ID</p>
                            <p className="text-white font-mono">
                              {studentData._id.substring(0, 8)}...
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                            <p className="text-purple-300 text-xs">Age</p>
                            <p className="text-white font-semibold">
                              {calculateAge(studentData.dob || resultData?.DOB)} years
                            </p>
                          </div>
                          <div className="bg-teal-500/10 rounded-lg p-3 border border-teal-500/20">
                            <p className="text-teal-300 text-xs">Date of Birth</p>
                            <p className="text-white font-semibold text-sm">
                              {formatDOB(studentData.dob || resultData?.DOB)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Cards */}
                  <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
                    {/* Overall Rank Card */}
                    <div className="bg-gradient-to-br from-yellow-600/20 to-amber-800/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-yellow-300 text-sm mb-1">
                            Overall Rank
                          </p>
                          <h3 className={`text-3xl md:text-4xl font-bold ${getRankColor(resultData?.R_Score || 1)}`}>
                            #{resultData?.R_Score || "N/A"}
                          </h3>
                          <p className="text-gray-300 text-sm mt-1">
                            {resultData?.R_Score <= 10 
                              ? "Top Performer! 🏆" 
                              : resultData?.R_Score <= 25 
                                ? "Excellent Performance! ✨" 
                                : "Great Work! 👍"}
                          </p>
                        </div>
                        <div className="relative">
                          <Star className="w-12 h-12 text-yellow-400" />
                          {resultData?.R_Score <= 3 && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">{resultData.R_Score}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300 text-sm">Percentile Rank</span>
                          <span className="text-white font-semibold">
                            {resultData?.R_Score ? `${Math.min(100, Math.max(1, Math.round((1 - (resultData.R_Score - 1) / 100) * 100)))}%` : "N/A"}
                          </span>
                        </div>
                        <div className="w-full bg-yellow-500/20 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-yellow-400 to-amber-500 h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: resultData?.R_Score 
                                ? `${Math.min(100, Math.max(1, Math.round((1 - (resultData.R_Score - 1) / 100) * 100)))}%` 
                                : "0%" 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Academic Information */}
                    <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-purple-300 text-sm mb-1">
                            Academic Details
                          </p>
                          <h3 className="text-2xl font-bold text-white">
                            Grade {studentData.class || resultData?.["Class "] || "N/A"}
                          </h3>
                        </div>
                        <BookOpen className="w-10 h-10 text-purple-400" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Class</span>
                          <span className="text-white font-semibold">
                            {studentData.class || resultData?.["Class "] || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Section</span>
                          <span className="text-white font-semibold">
                            {studentData.section || resultData?.["Section "] || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">School</span>
                          <span className="text-white font-semibold text-right">
                            {studentData.school || resultData?.["School "] || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Results Summary */}
                    {resultData && (
                      <div className="bg-gradient-to-br from-green-600/20 to-emerald-800/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-green-300 text-sm mb-1">
                              Assessment Results
                            </p>
                            <h3 className="text-2xl font-bold text-white">
                              Score: {resultData.g_Score || "N/A"}
                            </h3>
                            <p className="text-gray-300 text-sm mt-1">g-Score</p>
                          </div>
                          <Trophy className="w-10 h-10 text-green-400" />
                        </div>
                        <div className="mt-4">
                          <p className="text-gray-300 text-sm mb-2">
                            Architecture Type:
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 bg-green-500/10 rounded">
                              <span className="text-green-200 text-sm">
                                {resultData.StuArch || "AI Parasite"}
                              </span>
                              <span className="text-white text-xs bg-green-600 px-2 py-1 rounded">
                                View Details
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="bg-gradient-to-br from-teal-600/20 to-teal-800/20 backdrop-blur-sm rounded-2xl p-6 border border-teal-500/30">
                      <p className="text-teal-300 text-sm mb-4">Quick Actions</p>
                      <div className="space-y-3">
                        {resultData ? (
                          <button
                            onClick={() => setActiveTab("results")}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg text-center hover:scale-105 transition-all duration-300 font-semibold"
                          >
                            View Detailed Results
                          </button>
                        ) : (
                          <a
                            href={`/student-dashboard/${studentId}/assessment`}
                            className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg text-center hover:scale-105 transition-all duration-300 font-semibold"
                          >
                            Take Assessment
                          </a>
                        )}
                        <a
                          href={`/student-dashboard/${studentId}/practice`}
                          className="block w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-3 rounded-lg text-center hover:scale-105 transition-all duration-300 font-semibold"
                        >
                          Practice Tests
                        </a>
                        <a
                          href={`/student-dashboard/${studentId}/materials`}
                          className="block w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-3 rounded-lg text-center hover:scale-105 transition-all duration-300 font-semibold"
                        >
                          Study Materials
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info Section */}
                {resultData && (
                  <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Assessment Insights
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                          <div>
                            <p className="text-white font-semibold">
                              Top Skills Identified
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                              {resultData.TopSkills || "Creativity, Meta-cognition"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                          <div className="w-3 h-3 bg-purple-500 rounded-full mt-2"></div>
                          <div>
                            <p className="text-white font-semibold">Architecture Type</p>
                            <p className="text-gray-400 text-sm mt-1">
                              You're classified as a "{resultData.StuArch || "AI Parasite"}" - This means you excel at leveraging tools and resources effectively.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-teal-500/10 rounded-xl border border-teal-500/20">
                          <div className="w-3 h-3 bg-teal-500 rounded-full mt-2"></div>
                          <div>
                            <p className="text-white font-semibold">Growth Areas</p>
                            <p className="text-gray-400 text-sm mt-1">
                              Focus on improving: {resultData.SuppressedSkills || "Critical Thinking"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                          <div className="w-3 h-3 bg-amber-500 rounded-full mt-2"></div>
                          <div>
                            <p className="text-white font-semibold">Performance Summary</p>
                            <p className="text-gray-400 text-sm mt-1">
                              Your overall g-Score is {resultData.g_Score || "N/A"}. Click "View Results" for detailed analysis.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === "results" && resultData && (
              <>
                {/* Results Tabs within Results Section */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveTab("results")}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        true ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "bg-slate-800/50 text-gray-300 hover:bg-slate-700/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <BarChart className="w-4 h-4" />
                        Overview
                      </div>
                    </button>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Overall Score Card */}
                  <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="text-center md:text-left">
                        <p className="text-blue-300 text-sm mb-2">OVERALL SCORE</p>
                        <h2 className="text-5xl md:text-6xl font-bold text-white mb-2">
                          {resultData.g_Score || "N/A"}
                          <span className="text-2xl text-gray-300">/100</span>
                        </h2>
                        <div className="flex items-center gap-2">
                          <Award className="w-6 h-6 text-yellow-400" />
                          <span className="text-xl font-semibold text-white">
                            {resultData.StuArch || "AI Parasite"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="w-48 h-48 rounded-full border-8 border-blue-500/30 flex items-center justify-center">
                          <div className="w-40 h-40 rounded-full border-8 border-transparent border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-teal-500 animate-spin-slow">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-4xl font-bold text-white">
                                  {resultData.g_Score || "N/A"}
                                </div>
                                <div className="text-gray-300">g-Score</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10">
                        <p className="text-gray-400 text-sm">Architecture</p>
                        <p className="text-white font-bold text-lg">{resultData.StuArch || "AI Parasite"}</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10">
                        <p className="text-gray-400 text-sm">Top Skills</p>
                        <p className="text-white font-bold text-lg">{resultData.TopSkills || "Creativity, Meta-cognition"}</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10">
                        <p className="text-gray-400 text-sm">Suppressed</p>
                        <p className="text-white font-bold text-lg">{resultData.SuppressedSkills || "Critical Thinking"}</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10">
                        <p className="text-gray-400 text-sm">Overall Rank</p>
                        <p className={`text-white font-bold text-lg ${getRankColor(resultData.R_Score || 1)}`}>
                          #{resultData.R_Score || 1}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Remark Section */}
                  <div className="bg-gradient-to-br from-amber-600/10 to-orange-600/10 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/30">
                    <div className="flex items-start gap-4">
                      <Lightbulb className="w-8 h-8 text-amber-400 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Remark & Feedback</h3>
                        <p className="text-gray-200 leading-relaxed">
                          {resultData.Remark || "You have a fantastic tech-savvy mind and a high-speed approach to solving difficult tasks; which is a massive skill! My challenge for you is to now anchor that speed in your own deep reasoning; as understanding the 'why' will make you unstoppable."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skill Scores Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skillCategories.map((skill, index) => (
                      <div key={index} className="bg-slate-800/40 rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                              <skill.icon className="w-5 h-5 text-blue-400" />
                            </div>
                            <span className="text-white font-semibold">{skill.name}</span>
                          </div>
                          <span className={`text-2xl font-bold ${getScoreColor(skill.value)}`}>
                            {skill.value.toFixed(1)}
                          </span>
                        </div>
                        <div className="w-full bg-slate-700/50 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getScoreBarColor(skill.value)} transition-all duration-500`}
                            style={{ width: `${calculateScorePercentage(skill.value)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Question-wise Analysis */}
                  <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl p-6 border border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-6">Question-wise Analysis</h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {questions.map((q, index) => (
                        <div key={index} className="bg-slate-800/40 rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                <span className="text-white font-bold">Q{q.number}</span>
                              </div>
                              <div>
                                <h4 className="text-white font-bold">Question {q.number}</h4>
                                <p className="text-gray-400 text-sm">Your Answer: <span className="text-white font-mono">{q.answer}</span></p>
                              </div>
                            </div>
                            <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full text-sm font-semibold">
                              {q.tag}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="space-y-2">
                              <p className="text-gray-400 text-sm">Primary Domain</p>
                              <p className="text-white font-semibold">{q.domain}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-gray-400 text-sm">Lateral Thinking</p>
                              <p className="text-white font-semibold">{q.lateral}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-gray-400 text-sm">Support Skills</p>
                              <p className="text-white font-semibold">{q.support}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-gray-400 text-sm">Problem Tag</p>
                              <p className="text-white font-semibold">{q.tag}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "profile" && (
              <div className="space-y-8">
                {/* Profile Header */}
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                      {studentData.imageUrl ? (
                        <img
                          src={studentData.imageUrl}
                          alt={studentData.fullName}
                          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg object-cover"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                          <span className="text-4xl font-bold text-white">
                            {studentData.fullName.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-center md:text-left">
                      <h2 className="text-3xl font-bold text-white mb-2">{studentData.fullName}</h2>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <div className="flex items-center gap-2 text-blue-300">
                          <GraduationCap className="w-5 h-5" />
                          <span>Class {studentData.class} - {studentData.section}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <School className="w-5 h-5" />
                          <span>{studentData.school}</span>
                        </div>
                        {resultData?.R_Score && (
                          <div className="flex items-center gap-2 text-yellow-300">
                            <Star className="w-5 h-5" />
                            <span className="font-semibold">Rank #{resultData.R_Score}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4">Personal Information</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                        <span className="text-gray-400">Full Name</span>
                        <span className="text-white font-semibold">{studentData.fullName}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                        <span className="text-gray-400">Date of Birth</span>
                        <span className="text-white font-semibold">{formatDOB(studentData.dob || resultData?.DOB)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                        <span className="text-gray-400">Age</span>
                        <span className="text-white font-semibold">{calculateAge(studentData.dob || resultData?.DOB)} years</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                        <span className="text-gray-400">Email</span>
                        <span className="text-white font-semibold">{studentData.email || resultData?.Email || "-"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4">Academic Information</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                        <span className="text-gray-400">Class</span>
                        <span className="text-white font-semibold">{studentData.class || resultData?.["Class "] || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                        <span className="text-gray-400">Section</span>
                        <span className="text-white font-semibold">{studentData.section || resultData?.["Section "] || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                        <span className="text-gray-400">Roll Number</span>
                        <span className="text-white font-semibold">{studentData.rollNumber || resultData?.["Roll No"] || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                        <span className="text-gray-400">School</span>
                        <span className="text-white font-semibold text-right">{studentData.school || resultData?.["School "] || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Information */}
                <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">System Information</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-800/40 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Student ID</p>
                      <p className="text-white font-mono text-sm">{studentData._id}</p>
                    </div>
                    <div className="p-4 bg-slate-800/40 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Account Created</p>
                      <p className="text-white font-semibold">{formatRegistrationDate(studentData.createdAt)}</p>
                    </div>
                    <div className="p-4 bg-slate-800/40 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Last Updated</p>
                      <p className="text-white font-semibold">{formatRegistrationDate(studentData.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add custom animation */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}