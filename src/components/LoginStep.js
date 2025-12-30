import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function LoginStep({ onLoginComplete }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentStatus: '',
    jeeAppNo: ''
  });

  // Check for existing session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) checkExistingProfile(session.user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) checkExistingProfile(session.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Check if we already have their onboarding data
  const checkExistingProfile = async (user) => {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .eq('auth_id', user.id)
      .single();

    if (data) {
      // Profile exists, proceed to next step
      onLoginComplete(data);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin // Returns to your app
      }
    });
    if (error) alert(error.message);
    setLoading(false);
  };

  const handleOnboardingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const user = session.user;
    
    // SAVE TO SUPABASE (Initial Record)
    const newCandidate = {
      auth_id: user.id,
      email: user.email,
      name: user.user_metadata.full_name,
      avatar_url: user.user_metadata.avatar_url,
      current_status: formData.currentStatus,
      jee_app_no: formData.jeeAppNo,
      user_agent: navigator.userAgent
    };

    const { data, error } = await supabase
      .from('candidates')
      .insert([newCandidate])
      .select()
      .single();

    if (error) {
      console.error(error);
      alert("Error saving profile.");
    } else {
      onLoginComplete(data);
    }
    setLoading(false);
  };

  if (!session) {
    return (
      <div className="glass-card" style={{maxWidth: '400px', textAlign: 'center'}}>
        <img 
          src="https://res.cloudinary.com/dstbd40ud/image/upload/v1766321457/Untitled_design_5_zq2tz9.png" 
          alt="Sangillence" 
          style={{height: '60px', marginBottom: '20px'}} 
        />
        <h1 style={{fontSize: '1.8rem', color: 'white', marginBottom: '10px'}}>JEE Trajectory Audit</h1>
        <p style={{color: '#94a3b8', marginBottom: '30px'}}>
          Login to start your personalized AI assessment.
        </p>
        
        <button 
          onClick={handleGoogleLogin}
          className="btn-main"
          style={{
            background: 'white', 
            color: '#1e293b', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '10px'
          }}
          disabled={loading}
        >
          {loading ? 'Connecting...' : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </>
          )}
        </button>
      </div>
    );
  }

  // ONBOARDING FORM (If logged in but no data)
  return (
    <div className="glass-card" style={{maxWidth: '500px'}}>
      <h2 style={{color: 'white', marginBottom: '20px'}}>One Last Step</h2>
      <p style={{color: '#94a3b8', marginBottom: '20px'}}>Hi <strong>{session.user.user_metadata.full_name}</strong>, tell us a bit about your prep status.</p>
      
      <form onSubmit={handleOnboardingSubmit}>
        <div style={{marginBottom: '20px'}}>
          <label className="label" style={{display:'block', marginBottom:'8px', color:'#94a3b8', fontWeight:700, fontSize:'0.8rem'}}>Current Class Status</label>
          <select 
            required 
            value={formData.currentStatus}
            onChange={e => setFormData({...formData, currentStatus: e.target.value})}
            style={{width:'100%', padding:'12px', borderRadius:'8px', border:'none', background:'rgba(0,0,0,0.3)', color:'white'}}
          >
            <option value="">Select Option</option>
            <option value="11th">Class 11th</option>
            <option value="12th">Class 12th</option>
            <option value="Dropper">Dropper</option>
          </select>
        </div>

        <div style={{marginBottom: '30px'}}>
          <label className="label" style={{display:'block', marginBottom:'8px', color:'#94a3b8', fontWeight:700, fontSize:'0.8rem'}}>JEE Application No. (Optional)</label>
          <input 
            type="text" 
            placeholder="Application Number"
            value={formData.jeeAppNo}
            onChange={e => setFormData({...formData, jeeAppNo: e.target.value})}
            style={{width:'100%', padding:'12px', borderRadius:'8px', border:'none', background:'rgba(0,0,0,0.3)', color:'white'}}
          />
        </div>

        <button type="submit" className="btn-main" disabled={loading}>
          {loading ? 'Saving...' : 'Start My Audit ->'}
        </button>
      </form>
    </div>
  );
}