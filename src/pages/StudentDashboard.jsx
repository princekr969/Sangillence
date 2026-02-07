import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, BookOpen, Trophy, Clock, FileText, LogOut } from 'lucide-react';
import { fetchStudentData, schoolNames } from '../data/mockStudentData';
import heroSectionBg from '../../assets/svgs/herosectionbg.svg';

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get student ID from localStorage (set during login)
    const studentId = localStorage.getItem('studentId');
    
    if (!studentId) {
      // Redirect to login if no student ID found
      navigate('/studentLogin');
      return;
    }

    // Fetch student data
    fetchStudentData(studentId)
      .then(data => {
        setStudentData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('studentId');
    localStorage.removeItem('studentEmail');
    navigate('/studentLogin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-900">
        <div className="animate-pulse text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-900">
        <div className="text-center">
          <div className="text-red-400 text-2xl mb-4">Error: {error}</div>
          <button 
            onClick={() => navigate('/studentLogin')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

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
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '30px 30px'
                }}
              ></div>
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Student Dashboard
              </h1>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative shadow-xl bg-[#233562] rounded-3xl p-6 md:p-10">
          {/* Background Effects */}
          <div className="absolute inset-0 rounded-3xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900"></div>
            
            {/* Geometric overlays */}
            <div className="absolute inset-0 rounded-3xl">
              <div className="absolute rounded-3xl top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-600/30 to-transparent"
                style={{ clipPath: 'polygon(0 0, 70% 0, 30% 100%, 0 100%)' }}
              ></div>
              <div className="absolute rounded-3xl top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-500/20 to-transparent"
                style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 70% 100%)' }}
              ></div>
              <div className="absolute rounded-3xl bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-teal-500/20 to-transparent"
                style={{ clipPath: 'polygon(0 0, 60% 0, 0 80%)' }}
              ></div>
              <div className="absolute rounded-3xl bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-600/25 to-transparent"
                style={{ clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0 100%)' }}
              ></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 3}s`
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Profile Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Profile Card */}
              <div className="md:col-span-1 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <img
                      src={studentData.photo}
                      alt={studentData.name}
                      className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-slate-900"></div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">{studentData.fullName || studentData.name}</h2>
                  <p className="text-blue-300 mb-1">{studentData.class}</p>
                  <p className="text-gray-400 text-sm text-center">
                    {schoolNames[studentData.school] || studentData.school}
                  </p>
                  
                  <div className="mt-4 w-full space-y-3">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <span className="text-sm truncate">{studentData.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <User className="w-5 h-5 text-purple-400" />
                      <span className="text-sm">{studentData.rollNumber}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Cards */}
              <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
                {/* Olympiad Status */}
                <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-blue-300 text-sm mb-1">Olympiad Status</p>
                      <h3 className="text-2xl font-bold text-white">{studentData.olympiadStatus}</h3>
                    </div>
                    <BookOpen className="w-10 h-10 text-blue-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Exam: {studentData.examDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Time: {studentData.examTime}</span>
                    </div>
                  </div>
                </div>

                {/* Performance */}
                <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-purple-300 text-sm mb-1">Average Score</p>
                      <h3 className="text-2xl font-bold text-white">{studentData.performance.averageScore}%</h3>
                    </div>
                    <Trophy className="w-10 h-10 text-purple-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Practice Tests</span>
                      <span className="text-white font-semibold">{studentData.performance.practiceTests}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Current Rank</span>
                      <span className="text-white font-semibold">#{studentData.performance.rank}</span>
                    </div>
                  </div>
                </div>

                {/* Registration Info */}
                <div className="bg-gradient-to-br from-teal-600/20 to-teal-800/20 backdrop-blur-sm rounded-2xl p-6 border border-teal-500/30">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-teal-300 text-sm mb-1">Registered On</p>
                      <h3 className="text-xl font-bold text-white">{studentData.registrationDate}</h3>
                    </div>
                    <FileText className="w-10 h-10 text-teal-400" />
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-300 text-sm mb-2">Subjects Enrolled:</p>
                    <div className="flex flex-wrap gap-2">
                      {studentData.subjects.map((subject, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-teal-500/30 text-teal-200 rounded-full text-xs"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-amber-600/20 to-amber-800/20 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/30">
                  <p className="text-amber-300 text-sm mb-4">Quick Actions</p>
                  <div className="space-y-3">
                    <Link
                      to="/practice-test"
                      className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-center hover:scale-105 transition-all duration-300"
                    >
                      Start Practice Test
                    </Link>
                    <Link
                      to="/study-materials"
                      className="block w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-2 rounded-lg text-center hover:scale-105 transition-all duration-300"
                    >
                      Study Materials
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Upcoming Events & Notifications
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white font-semibold">Mock Test Available</p>
                    <p className="text-gray-400 text-sm">A new practice test is now available for Mathematics</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white font-semibold">Exam Reminder</p>
                    <p className="text-gray-400 text-sm">Your SOBO'25 exam is scheduled in 45 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
