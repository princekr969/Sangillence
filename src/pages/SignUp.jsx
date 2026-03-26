import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Navbar, Footer } from "../components";

const SignUp = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const { data } = await axios.post('http://localhost:5000/api/user/register', { name, email, password });

            if (data.success) {
                login(data.token);
                navigate("/student-dashboard/me");
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error("Registration failed:", error);
            setError(error.message || "An unexpected error occurred.");
        }
    };

    useEffect(() => {
        document.title = "Create Account - Sangillence";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", "Join Sangillence to access exclusive AI learning resources and tools.");
        }
    }, []);

    return (
        <div className="min-h-screen flex bg-[#020b1a] font-family-givonic-regular relative overflow-hidden">
             {/* Background Symbols - "Creative/Growth" */}
             <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 right-20 text-blue-500/5 text-[10rem] font-sans select-none rotate-[20deg]">+</div>
                <div className="absolute bottom-10 left-20 text-cyan-500/5 text-[8rem] font-serif select-none -rotate-[15deg]">?</div>
                <div className="absolute top-1/2 right-10 w-32 h-32 border-4 border-blue-500/10 rounded-full animate-bounce-slow"></div>
                <div className="absolute bottom-1/3 left-1/4 w-20 h-20 border-2 border-cyan-400/10 rotate-45"></div>
                
                {/* Connecting Lines (Simulated Grid) */}
                <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-900/20 to-transparent top-1/4"></div>
                <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-900/20 to-transparent bottom-1/4"></div>
            </div>

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/40 via-[#020b1a] to-[#020b1a]"></div>

            <div className="relative z-10 w-full flex flex-col">
                <Navbar />

                <div className="flex-grow flex items-center justify-center p-4 sm:p-8">
                    <div className="w-full max-w-5xl flex flex-col md:flex-row items-stretch rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(15,23,42,0.9)] bg-white/5 backdrop-blur-xl border border-white/10">
                        
                        {/* Left Side - Form */}
                        <div className="w-full md:w-1/2 p-8 sm:p-12 relative bg-[#020b1a]/80 flex flex-col justify-center border-r border-white/5">
                            <form 
                                onSubmit={onSubmitHandler}
                                className="flex flex-col gap-5 max-w-md mx-auto w-full"
                            >
                                <div className="mb-4">
                                    <p className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-[11px] font-semibold text-blue-300 border border-blue-500/30">
                                        Create your student account
                                    </p>
                                    <h2 className="mt-3 text-3xl font-family-givonic-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 mb-1">
                                        Start Learning
                                    </h2>
                                    <p className="text-slate-400 text-sm">Join the community of innovators and achievers.</p>
                                    {error && (
                                        <p className="mt-3 text-sm text-red-400 bg-red-950/40 border border-red-700/70 rounded-xl px-3 py-2">
                                            {error}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1 block">Full Name</label>
                                        <input
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:bg-blue-900/10 transition-all font-light"
                                            type="text"
                                            placeholder="e.g. Alex Turing"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1 block">Email Address</label>
                                        <input
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:bg-blue-900/10 transition-all font-light"
                                            type="email"
                                            placeholder="name@university.edu"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1 block">Password</label>
                                        <input
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:bg-blue-900/10 transition-all font-light"
                                            type="password"
                                            placeholder="Create a strong password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3.5 mt-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold tracking-wide shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 relative overflow-hidden group"
                                    >
                                        <span className="relative z-10">Create Account</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </button>

                                    <p className="text-center text-slate-400 text-sm mt-4">
                                        Already a member?{" "}
                                        <Link to="/student-login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                                            Sign In
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>

                        {/* Right Side - Visual/Info */}
                        <div className="hidden md:flex w-1/2 bg-gradient-to-bl from-blue-900/20 to-cyan-900/20 relative items-center justify-center p-12 overflow-hidden">
                             {/* Abstract Visualization of "Growth" */}
                             <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                <div className="w-64 h-64 border border-blue-400/30 rounded-full absolute animate-ping-slow"></div>
                                <div className="w-48 h-48 border border-cyan-400/30 rounded-full absolute animate-ping-slower"></div>
                                <div className="w-32 h-32 bg-blue-500/10 rounded-full backdrop-blur-md absolute"></div>
                             </div>

                             <div className="relative z-10 max-w-xs">
                                <h3 className="text-4xl font-family-givonic-bold text-white mb-6 leading-tight">
                                    Expand Your <br/>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Horizons</span>
                                </h3>
                                
                                <ul className="space-y-6">
                                    <li className="flex items-center space-x-4 group">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                            <span className="text-lg">01</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">Personalized Journey</h4>
                                            <p className="text-slate-400 text-xs">AI-tailored curriculum just for you.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-center space-x-4 group">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                            <span className="text-lg">02</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">Expert Mentorship</h4>
                                            <p className="text-slate-400 text-xs">Connect with industry leaders.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-center space-x-4 group">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                            <span className="text-lg">03</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">Global Community</h4>
                                            <p className="text-slate-400 text-xs">Learn with peers worldwide.</p>
                                        </div>
                                    </li>
                                </ul>
                             </div>
                        </div>

                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default SignUp;