import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const RAZORPAY_SCRIPT_ID = "razorpay-checkout-js";

const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    if (document.getElementById(RAZORPAY_SCRIPT_ID)) {
      return resolve(true);
    }
    const script = document.createElement("script");
    script.id = RAZORPAY_SCRIPT_ID;
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Failed to load Razorpay script"));
    document.body.appendChild(script);
  });
};

export default function EnrollPaymentPage() {
  const { user, loading: authLoading, login } = useAuth();
  const navigate = useNavigate();
  const { resultId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);

  // Set your enrollment amount (in INR)
  const ENROLL_AMOUNT = 1; // ₹499 as an example

  useEffect(() => {
    const init = async () => {
      try {
        if (authLoading) return;
        const token = localStorage.getItem("token");
        if (!token || !user) {
          navigate("/student-login");
          return;
        }
        // If user is already enrolled, don't show payment page again
        if (user.enrolled) {
          navigate(`/student-dashboard/${resultId || "me"}`);
          return;
        }
        await loadRazorpayScript();
      } catch (err) {
        console.error(err);
        setError("Failed to load payment gateway. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [authLoading, user, navigate]);

  const handlePayment = useCallback(async () => {
    try {
      setProcessing(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");
      if (!token || !user) {
        navigate("/student-login");
        return;
      }

      const { data } = await axios.post(
        "http://localhost:5000/api/user/payment-razorpay",
        { amount: ENROLL_AMOUNT },
        { headers: { token } }
      );

      if (!data.success) {
        setError(data.message || "Failed to start payment.");
        setProcessing(false);
        return;
      }

      const { order, key } = data;

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Sangillence",
        description: "Enrollment Fee",
        order_id: order.id,
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        theme: {
          color: "#0f172a",
        },
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              "http://localhost:5000/api/user/verify-razorpay",
              { razorpay_order_id: response.razorpay_order_id, userId: user?._id },
              { headers: { token } }
            );

            if (verifyRes.data.success) {
              // Refresh profile so `user.enrolled` is up to date
              if (login && token) {
                login(token);
              }
              setSuccess("Payment successful! Redirecting you to your dashboard...");
              setError("");
              setTimeout(() => {
                navigate(`/student-dashboard/${resultId || "me"}`);
              }, 1600);
            } else {
              setError(verifyRes.data.message || "Payment verification failed.");
            }
          } catch (err) {
            console.error(err);
            setError("Payment verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: function () {
            setProcessing(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      setError("Payment failed to start. Please try again.");
    } finally {
      setProcessing(false);
    }
  }, [ENROLL_AMOUNT, user, navigate, resultId]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p className="text-lg animate-pulse">Loading secure payment...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.4),_transparent_60%)]" />
      </div>

      <div className="relative z-10 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg rounded-3xl border border-slate-700/70 bg-slate-900/70 shadow-[0_24px_80px_rgba(15,23,42,0.9)] backdrop-blur-xl p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                Secure Checkout
              </p>
              <h1 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
                Complete Your Enrollment
              </h1>
              <p className="mt-1 text-sm text-slate-300">
                Unlock access to student dashboard, updates, and future programs.
              </p>
            </div>
            <div className="hidden sm:flex flex-col items-end text-xs text-slate-400">
              <span className="uppercase tracking-wide">Powered by</span>
              <span className="mt-1 rounded-full bg-slate-800/70 px-3 py-1 font-semibold text-slate-100 border border-slate-600/60">
                Razorpay
              </span>
            </div>
          </div>

          <div className="mb-4 rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">Enrollment fee</p>
              <p className="mt-1 text-2xl font-bold">₹{ENROLL_AMOUNT}</p>
            </div>
            <div className="text-right text-xs text-slate-400">
              <p>No hidden charges</p>
              <p className="mt-1 text-emerald-300 font-medium">Instant confirmation</p>
            </div>
          </div>

          {error && (
            <div className="mb-3 text-sm text-red-400 bg-red-950/40 border border-red-700/70 rounded-xl px-3 py-2">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-3 text-sm text-emerald-300 bg-emerald-950/30 border border-emerald-600/60 rounded-xl px-3 py-2 flex items-center justify-between gap-3">
              <span>{success}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          )}

          <ul className="mb-6 space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Payment is processed securely via Razorpay.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>After successful payment, you will be redirected to your dashboard.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>You can always access the dashboard later from the student login.</span>
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              onClick={() => navigate(`/student-dashboard/${resultId || "me"}`)}
              className="w-full sm:w-auto flex-1 py-2.5 rounded-xl border border-slate-600 text-slate-200 hover:bg-slate-800/80 transition-colors text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={processing}
            >
              Back to Dashboard
            </button>
            <button
              onClick={handlePayment}
              className="w-full sm:w-auto flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-semibold shadow-lg shadow-emerald-500/30 transition-transform transition-shadow duration-150 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5"
              disabled={processing}
            >
              {processing ? "Processing..." : "Pay & Enroll"}
            </button>
          </div>

          <p className="mt-4 text-[11px] text-slate-500 text-center">
            By proceeding, you agree to the program&apos;s terms and understand that
            the fee is used to power the Sangillence learning experience.
          </p>
        </div>
      </div>
    </div>
  );
}
