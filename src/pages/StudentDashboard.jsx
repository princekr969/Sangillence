import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/common/Navbar";
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
  Pencil,
  Upload,
  X,
  Check,
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
  const { user, login, logout, loading: authLoading } = useAuth();
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const { resultId } = useParams();

  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchStudentData = async () => {
      // Handle "me" route - authenticated user dashboard
      if (resultId === 'me') {
        if (authLoading) return; // Wait for auth check to complete
        
        if (!user) {
            navigate("/student-login");
            return;
        }

        // Map auth user data to dashboard structure
        setResultData({
            Name: user.name,
            email: user.email,
            _id: user.studentId || user._id || "N/A",
            imageUrl: user.image || user.profilePicture || "", 
            Class: user.class || "",
            School: user.school || "",
            Section: user.section || "",
            DOB: user.dob || "",
            Gender: user.gender || "Not Selected",
            hasResults: false, // Default for new users
            certificate: [], 
            // Default scores to 0/empty to prevent errors
            CV_Score: 0, A_Score: 0, L_Score: 0, M_Score: 0, OB_Score: 0, CT_Score: 0, R_Score: 0, OOTB_Score: 0, MC_Score: 0,
            g_Score: 0, Plag__Score: 0, Actual_Score: 0, TopSkills: "To be determined", StuArch: "User",
        });
        setLoading(false);
        return; 
      }

      // Handle legacy/direct result ID route
      if (!resultId) {
        navigate("/student-login");
        return;
      }

      try {
        const response = await axios.get(
          `https://naivedyamcdc.com/api/students/result/${resultId}`,
        );

        if (response.data.success) {
           // Tag this data as having results for UI logic
          setResultData({ ...response.data.result, hasResults: true });
        } else {
          setError("User not found");
        }
      } catch (error) {
        console.error("User detail Error:", error);
        setError(
          error.response?.data?.message || "Failed to fetch user data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [resultId, navigate, user, authLoading]);

  // Sync edit form when data loads
  useEffect(() => {
    if (resultData) {
        setEditForm({
            name: resultData.Name || "",
            class: resultData.Class || "",
            section: resultData.Section || "",
            school: resultData.School || "",
            dob: resultData.DOB ? (resultData.DOB.includes('T') ? resultData.DOB.split('T')[0] : resultData.DOB) : "",
            gender: resultData.Gender || "Not Selected",
            imageUrl: resultData.imageUrl || ""
        });
    }
  }, [resultData]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // Reset form on cancel
    if (isEditing && resultData) {
        setEditForm({
            name: resultData.Name || "",
            class: resultData.Class || "",
            section: resultData.Section || "",
            school: resultData.School || "",
            dob: resultData.DOB ? (resultData.DOB.includes('T') ? resultData.DOB.split('T')[0] : resultData.DOB) : "",
            gender: resultData.Gender || "Not Selected",
            imageUrl: resultData.imageUrl || ""
        });
    }
  };

  const handleInputChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        // Create local preview URL
        setEditForm({ ...editForm, imageFile: file, imageUrl: URL.createObjectURL(file) });
    }
  };

  const handleSaveProfile = async () => {
    if (resultId !== 'me') return;
    setUploading(true);
    try {
        const formData = new FormData();
        formData.append("userId", user?._id); 
        formData.append("name", editForm.name);
        formData.append("dob", editForm.dob);
        formData.append("class", editForm.class);
        formData.append("section", editForm.section);
        formData.append("school", editForm.school);
        formData.append("gender", editForm.gender); // Ensure required fields
        formData.append("phone", user.phone || "0000000000"); // Ensure required fields
        
        // Add default address if missing to satisfy backend validation if strict
        if (!user.address) {
            formData.append("address", JSON.stringify({ line1: "", line2: "" }));
        } else {
             formData.append("address", JSON.stringify(user.address));
        }

        if (editForm.imageFile) {
            formData.append("image", editForm.imageFile); // Matches backend 'image' field expected by multer
        }

        const token = localStorage.getItem('token');
        const response = await axios.post("http://localhost:5000/api/user/update-profile", formData, {
            headers: {
                token: token
            }
        });
        
        if (response.data.success) {
            setIsEditing(false);
            // Reload page to re-fetch updated profile
            window.location.reload(); 
        } else {
            alert(response.data.message || "Update failed");
        }

    } catch (e) {
        console.error(e);
        alert("Update failed: " + (e.response?.data?.message || e.message));
    } finally {
        setUploading(false);
    }
  };

  const handleLogout = () => {
    if (activeTab !== "dashboard") {
      setActiveTab("dashboard");
    } else {
      if (logout) logout();
      navigate("/");
    }
  };

  const formatDOB = (dobString) => {
    if (!dobString || dobString === "Not Selected") return "Not provided";
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return dobString;
    return dob.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateAge = (dobString) => {
    if (!dobString || dobString === "Not Selected") return "N/A";
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return "N/A";
    const today = new Date();
    let birthDate = dob;
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  };

  const handleEnrollClick = () => {
    // Only allow enrollment for authenticated "me" dashboard
    if (resultId !== "me") {
      navigate("/student-login");
      return;
    }
    // If already enrolled, don't send to payment again
    if (user?.enrolled) {
      return;
    }
    navigate(`/student-dashboard/${resultId}/enroll`);
  };

  // Helper to Render Calendar
  const renderCalendar = () => {
    const daysInMonth = 30; // Simplified for demo
    const completedTasks = [2, 5, 8, 12, 15, 18, 22, 25, 28]; // Dummy task completion days
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
        const isCompleted = completedTasks.includes(i);
        days.push(
            <div key={i} className={`
                relative aspect-square flex items-center justify-center rounded-2xl text-sm font-family-givonic-bold transition-all duration-300 group
                ${isCompleted 
                    ? 'bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-lg shadow-emerald-500/30 scale-105 border border-emerald-400/20 z-10' 
                    : 'bg-slate-800/40 text-slate-500 border border-white/5 hover:bg-slate-700/50 hover:border-white/20 hover:text-slate-300 hover:scale-105'}
            `}>
                {i}
                {isCompleted && (
                    <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white rounded-full opacity-60 shadow-sm animate-pulse"></div>
                )}
            </div>
        );
    }
    return days;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#1e3366] to-slate-900 opacity-50"></div>
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent mx-auto mb-6 shadow-lg shadow-indigo-500/20"></div>
          <div className="animate-pulse text-blue-200 text-xl font-family-givonic-bold tracking-wide">
            Loading your dashboard...
          </div>
        </div>
      </div>
    );
  }

  if (error || !resultData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#1e3366] to-slate-900 opacity-50"></div>
        <div className="text-center relative z-10 max-w-md mx-auto p-8 rounded-3xl bg-slate-800/50 backdrop-blur-md border border-white/10 shadow-2xl">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogOut className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-2xl font-family-givonic-bold text-white mb-2">Access Error</h2>
          <div className="text-slate-300 mb-8 font-family-givonic-light">
            {error || "We couldn't find your user data. Please try logging in again."}
          </div>
          <button
            onClick={() => navigate("/student-login", { replace: true })}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl font-family-givonic-bold transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transform hover:-translate-y-1"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden min-h-screen font-family-givonic-regular text-slate-100">
      {/* Fixed Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-40"
        style={{ backgroundImage: `url(${heroSectionBg})` }}
      ></div>
      
      {/* Gradient Overlay for better readability */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/95 via-[#0f172a]/95 to-black/95 z-0 pointer-events-none"></div>

      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Main Dashboard Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-16 py-8">
        {/* Header Section */}
        <div className="mb-6">
          <div className="relative overflow-hidden bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/10">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '30px 30px'
              }}></div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
              <div>
                <h1 className="text-3xl font-family-givonic-bold text-white">
                  User Dashboard
                </h1>
                <p className="text-blue-200 mt-1 font-family-givonic-light">
                  Manage your profile and track your progress
                </p>
              </div>
              <div className="flex items-center gap-3">
                {resultId === 'me' && !user?.enrolled && (
                  <button
                    onClick={handleEnrollClick}
                    className="px-4 py-2 rounded-lg bg-emerald-500/90 hover:bg-emerald-400 text-slate-950 font-family-givonic-semiBold shadow-lg shadow-emerald-500/30 transition-all duration-300"
                  >
                    Enroll
                  </button>
                )}
                {resultId === 'me' && user?.enrolled && (
                  <div className="px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/40 text-sm font-family-givonic-semiBold tracking-wide">
                    Enrolled
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600/80 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm border border-red-500/30 font-family-givonic-semiBold"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Profile Card */}
            <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-slate-800/90 via-[#1e3366]/80 to-slate-900/90 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl h-full relative font-family-givonic-regular overflow-hidden group">
                    {/* Abstract bg visual matching Hero */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none group-hover:opacity-40 transition-opacity duration-500">
                        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute left-0 bottom-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                    </div>

                    {/* Edit Controls */}
                    {resultId === 'me' && (
                        <div className="absolute top-4 right-4 z-20">
                            {!isEditing ? (
                                <button onClick={handleEditToggle} className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg border border-white/20 group-hover:scale-110" title="Edit Profile">
                                    <Pencil className="w-4 h-4 text-white" />
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button onClick={handleSaveProfile} disabled={uploading} className="p-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full hover:from-emerald-400 hover:to-green-500 transition-all shadow-lg border border-white/20" title="Save">
                                        {uploading ? <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div> : <Check className="w-4 h-4 text-white" />}
                                    </button>
                                    <button onClick={handleEditToggle} disabled={uploading} className="p-2 bg-gradient-to-r from-red-500 to-rose-600 rounded-full hover:from-red-400 hover:to-rose-500 transition-all shadow-lg border border-white/20" title="Cancel">
                                        <X className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex flex-col items-center relative z-10 pt-4">
                        {/* Profile Image */}
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileChange} 
                            hidden 
                            accept="image/*"
                        />
                        <div className="relative mb-6">
                           {isEditing ? (
                                <div className="cursor-pointer group/img relative" onClick={() => fileInputRef.current.click()}>
                                    {editForm.imageUrl || resultData.imageUrl ? (
                                        <div className="relative rounded-full p-1 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500">
                                            <img
                                                src={editForm.imageUrl || resultData.imageUrl}
                                                alt="Profile"
                                                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-slate-900 shadow-2xl object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 shadow-xl">
                                             <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center border-4 border-slate-900">
                                                <span className="text-5xl font-family-givonic-bold text-white uppercase">{resultData?.Name?.charAt(0)}</span>
                                             </div>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity z-10 m-1">
                                        <Upload className="w-8 h-8 text-white drop-shadow-lg" />
                                    </div>
                                </div>
                           ) : (
                                resultData.imageUrl ? (
                                    <div className="relative rounded-full p-1 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500">
                                        <img
                                            src={resultData.imageUrl}
                                            alt="Profile"
                                            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-slate-900 shadow-2xl object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 shadow-xl">
                                        <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center border-4 border-slate-900">
                                            <span className="text-5xl font-family-givonic-bold text-white uppercase">{resultData?.Name?.charAt(0)}</span>
                                        </div>
                                    </div>
                                )
                           )}
                        </div>
                        
                        {/* Profile Details */}
                        {isEditing ? (
                            <div className="w-full space-y-4">
                                <div>
                                    <label className="text-xs font-family-givonic-bold uppercase tracking-wider text-blue-300 ml-1 mb-1 block">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editForm.name}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:bg-slate-900/80 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-family-givonic-bold uppercase tracking-wider text-blue-300 ml-1 mb-1 block">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dob"
                                        value={editForm.dob}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:bg-slate-900/80 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-family-givonic-bold uppercase tracking-wider text-blue-300 ml-1 mb-1 block">Gender</label>
                                    <select
                                        name="gender"
                                        value={editForm.gender}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:bg-slate-900/80 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all duration-300 appearance-none cursor-pointer"
                                    >
                                        <option value="Not Selected" className="bg-slate-900">Select Gender</option>
                                        <option value="Male" className="bg-slate-900">Male</option>
                                        <option value="Female" className="bg-slate-900">Female</option>
                                        <option value="Other" className="bg-slate-900">Other</option>
                                    </select>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center w-full mt-2">
                                <h2 className="text-2xl md:text-3xl font-family-givonic-bold text-white mb-1 tracking-tight">{resultData.Name || "User Name"}</h2>
                                <p className="text-blue-200/60 mb-8 font-family-givonic-light tracking-wide">{resultData.email || "user@example.com"}</p>
                                
                                <div className="grid grid-cols-2 gap-3 w-full">
                                    <div className="bg-slate-900/40 p-4 rounded-2xl border border-white/5 backdrop-blur-sm hover:bg-slate-900/60 transition-colors group/stat">
                                        <p className="text-[10px] text-blue-400 font-family-givonic-bold uppercase tracking-wider mb-1 group-hover/stat:text-blue-300 transition-colors">Age</p>
                                        <p className="text-xl font-family-givonic-semiBold text-white tracking-widest">{calculateAge(new Date(resultData.DOB)) !== "N/A" && !isNaN(calculateAge(new Date(resultData.DOB))) ? calculateAge(new Date(resultData.DOB)) : "--"}</p>
                                    </div>
                                    <div className="bg-slate-900/40 p-4 rounded-2xl border border-white/5 backdrop-blur-sm hover:bg-slate-900/60 transition-colors group/stat">
                                        <p className="text-[10px] text-blue-400 font-family-givonic-bold uppercase tracking-wider mb-1 group-hover/stat:text-blue-300 transition-colors">Gender</p>
                                        <p className="text-xl font-family-givonic-semiBold text-white tracking-widest">{resultData.Gender || "--"}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Column: Task Calendar */}
            <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-slate-800/90 via-[#1e3366]/80 to-slate-900/90 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl h-full flex flex-col font-family-givonic-regular relative overflow-hidden group">
                     {/* Decorative Elements */}
                     <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                     <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
                                <BookCopy className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-family-givonic-bold text-white tracking-tight">Task Completion</h2>
                                <p className="text-sm text-blue-300/60 font-family-givonic-light">Track your daily progress</p>
                            </div>
                        </div>
                        <div className="text-xs font-family-givonic-bold text-blue-200 bg-slate-800/50 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm shadow-sm">
                            Current Month
                        </div>
                    </div>
                    
                    {/* Calendar Grid */}
                    <div className="flex-grow relative z-10">
                        <div className="grid grid-cols-7 gap-3 mb-4 text-center text-xs font-family-givonic-bold text-slate-400 uppercase tracking-widest">
                            <div>Mon</div>
                            <div>Tue</div>
                            <div>Wed</div>
                            <div>Thu</div>
                            <div>Fri</div>
                            <div>Sat</div>
                            <div>Sun</div>
                        </div>
                        <div className="grid grid-cols-7 gap-3">
                            {renderCalendar()}
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-end gap-6 text-sm font-family-givonic-semiBold text-slate-400">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full shadow-lg shadow-emerald-500/30"></div>
                            <span>Completed</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-slate-800 rounded-full border border-white/10"></div>
                            <span>Pending</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}