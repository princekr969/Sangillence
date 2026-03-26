import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "../components";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const SignIn = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const quotes = [
        {
            main: "Knowledge is",
            highlight: "Power",
            text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
        },
        {
            main: "Learning is a",
            highlight: "Treasure",
            text: "The beautiful thing about learning is that no one can take it away from you."
        },
        {
            main: "Keep",
            highlight: "Growing",
            text: "Live as if you were to die tomorrow. Learn as if you were to live forever."
        }
    ];

    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, 5000); 

        return () => clearInterval(interval);
    }, []);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const { data } = await axios.post('http://localhost:5000/api/user/login', { email, password });
    
            if (data.success) {
                login(data.token);
                navigate("/student-dashboard/me");
            } else {
                setError(data.message);
            }
        } catch (error) {
             console.error("Login failed:", error);
             setError(error.message || "An unexpected error occurred.");
        }
    };

    useEffect(() => {
        document.title = "Login - Sangillence";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", "Login to Sangillence to access your dashboard.");
        }
    }, []);

    return (
        <div className="min-h-screen flex bg-[#020b1a] font-family-givonic-regular relative overflow-hidden">
            {/* Background Symbols - "Learning Inclined" */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 text-white/5 text-9xl font-serif select-none rotate-12">Aa</div>
                <div className="absolute bottom-20 right-10 text-white/5 text-9xl font-mono select-none -rotate-12">{"</>"}</div>
                <div className="absolute top-40 right-1/4 text-white/5 text-8xl font-serif select-none rotate-45">∫</div>
                <div className="absolute bottom-40 left-1/4 text-white/5 text-8xl font-serif select-none -rotate-12">∑</div>
                <div className="absolute top-1/2 left-10 text-blue-500/10 text-6xl select-none animate-pulse">●</div>
                <div className="absolute top-1/3 right-20 text-indigo-500/10 text-6xl select-none animate-pulse delay-700">●</div>
            </div>

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-[#020b1a] to-[#020b1a]"></div>

            <div className="relative z-10 w-full flex flex-col">
                <Navbar />
                
                <div className="flex-grow flex items-center justify-center p-4 sm:p-8">
                    <div className="w-full max-w-5xl flex flex-col md:flex-row items-stretch rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(15,23,42,0.9)] bg-white/5 backdrop-blur-xl border border-white/10">
                        
                        {/* Left Side - Visual/Quote */}
                        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 relative items-center justify-center p-12 overflow-hidden group">
                            <div className="absolute inset-0 bg-indigo-600/10 group-hover:bg-indigo-600/20 transition-colors duration-500"></div>
                            {/* Decorative Circle */}
                            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-10 animate-spin-slow rounded-full"></div>
                            
                            <div className="relative z-10 text-center transition-all duration-500 ease-in-out">
                                <h3 className="text-3xl font-family-givonic-bold text-white mb-4 leading-tight min-h-[4em] flex flex-col justify-center">
                                    {quotes[currentQuoteIndex].main} <br/> 
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                                        {quotes[currentQuoteIndex].highlight}
                                    </span>
                                </h3>
                                <p className="text-indigo-200/80 text-lg leading-relaxed max-w-xs mx-auto min-h-[5em] flex items-center justify-center">
                                    "{quotes[currentQuoteIndex].text}"
                                </p>
                                <div className="mt-8 flex justify-center gap-2">
                                    {quotes.map((_, index) => (
                                        <div 
                                            key={index} 
                                            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentQuoteIndex ? 'w-6 bg-indigo-400' : 'w-1.5 bg-indigo-400/30'}`}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="w-full md:w-1/2 p-8 sm:p-12 relative bg-[#020b1a]/70 flex flex-col justify-center">
                             <form
                                onSubmit={onSubmitHandler}
                                className="flex flex-col gap-5 max-w-md mx-auto w-full"
                            >
                                <div className="mb-4">
                                    <p className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold text-indigo-300 border border-indigo-500/30">
                                        Student Login
                                    </p>
                                    <h2 className="mt-3 text-3xl font-family-givonic-bold text-white mb-1">
                                        Welcome Back
                                    </h2>
                                    <p className="text-slate-400 text-sm">Continue your journey to excellence.</p>
                                    {error && (
                                        <p className="mt-3 text-sm text-red-400 bg-red-950/40 border border-red-700/70 rounded-xl px-3 py-2">
                                            {error}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-slate-300">Email Address</label>
                                        <div className="relative">
                                            <input
                                                className="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                                type="email"
                                                placeholder="student@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-slate-300">Password</label>
                                        <div className="relative">
                                            <input
                                                className="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                                type="password"
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <label className="flex items-center text-slate-400 cursor-pointer hover:text-slate-300">
                                            <input type="checkbox" className="mr-2 rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500" />
                                            Remember me
                                        </label>
                                        <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</a>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                                    >
                                        Access Dashboard
                                    </button>

                                    <div className="relative my-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-white/10"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-[#061124] text-slate-500">New to learning?</span>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                         <Link to="/new/student" className="inline-block text-white hover:text-indigo-300 font-medium transition-colors border-b border-indigo-500/50 hover:border-indigo-400 pb-0.5">
                                            Create a Student Account
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default SignIn;
