// src/data/logic.js

const runBayesianAnalysis = (answers, theoryPct, practPct, currentMarks) => {
  
  // 1. Initialize Vector (Neutral 0)
  let skills = {
    "Memory Efficiency": 0,
    "Patience": 0,
    "Resilience": 0,
    "Critical Thinking": 0,
    "Intellectual Honesty": 0, 
    "Exam Temperament": 0,      
    "Problem Solving": 0,     
    "Time Management": 0,
    "Competency": 0,           
    "Deep Focus": 0            
  };

  // --- PHASE 1: THE HARD ANCHORS (Base Reality) ---
  
  // A. Competency (Pure Knowledge)
  // We map 0-100% theory to -40 to +40 scale
  skills["Competency"] += (theoryPct - 50) * 0.8;

  // B. Problem Solving (Action Bias)
  // We map 0-100% practice to -40 to +40 scale
  skills["Problem Solving"] += (practPct - 50) * 0.8;

  // C. Intellectual Honesty (The Gap)
  // If Theory >> Practice, you are deluding yourself.
  const gap = theoryPct - practPct;
  if (gap > 30) skills["Intellectual Honesty"] -= 25; // Massive Penalty
  else if (gap > 15) skills["Intellectual Honesty"] -= 10;
  else if (gap < 5) skills["Intellectual Honesty"] += 15; // Reward for balance

  // --- PHASE 2: EFFICIENCY MODIFIERS (The "Genius" vs "Leakage" Check) ---
  
  // Metric: Conversion Efficiency (CE)
  // How many marks do you get per % of theory?
  // Ideal: 3 marks per 1% theory (300 marks / 100% theory).
  // Real World Median: ~0.8 to 1.2 marks per 1% theory.
  
  // Avoid division by zero
  const safeTheory = Math.max(10, theoryPct);
  const conversionRatio = currentMarks / (safeTheory * 3); // 0.0 to 1.0 scale

  if (conversionRatio > 0.6) {
    // High Efficiency: They understand deeply, don't just memorize.
    skills["Critical Thinking"] += 20; 
    skills["Memory Efficiency"] += 15;
  } else if (conversionRatio < 0.25) {
    // Critical Leakage: Studying a lot, scoring nothing.
    skills["Critical Thinking"] -= 15; // Rote learner
    skills["Deep Focus"] -= 15;        // Likely "Fake Work" (distracted study)
    skills["Memory Efficiency"] -= 20; // Forgetting everything
  } else {
    // Median Range (0.25 - 0.6)
    // Normal student. Small adjustments.
    skills["Critical Thinking"] += 5;
  }

  // --- PHASE 3: BEHAVIORAL EVIDENCE (32 Questions) ---
  // We iterate through every answer to adjust the profile.
  // 1-5 Scale: 1=Never, 5=Always.
  // We normalize this: 1 -> -2, 2 -> -1, 3 -> 0, 4 -> +1, 5 -> +2 (Weighted by importance)

  const applyEvidence = (qId, val, weight = 1) => {
    const v = parseInt(val); // 1 to 5
    const score = (v - 3) * 2; // -4 to +4 base impact

    switch(parseInt(qId)) {
        // --- TRUENESS DETECTORS ---
        case 101: // Struggle 20 mins (Positive)
            skills["Patience"] += score * 1.5; 
            skills["Problem Solving"] += score * 1.0;
            break;
        case 102: // Phone Off (Positive)
            skills["Deep Focus"] += score * 2.0; // High Weight
            break;
        case 103: // Daily Targets (Positive)
            skills["Resilience"] += score * 1.0;
            skills["Competency"] += score * 0.5;
            break;
        case 104: // Timer Used (Positive)
            skills["Time Management"] += score * 1.5;
            skills["Exam Temperament"] += score * 1.0;
            break;
        case 105: // Accept Fault (Positive)
            skills["Resilience"] += score * 1.5; // Growth Mindset
            skills["Intellectual Honesty"] += score * 1.5;
            break;
        case 106: // Review Weak Topics (Positive)
            skills["Intellectual Honesty"] += score * 1.5;
            skills["Critical Thinking"] += score * 1.0;
            break;

        // --- STRATEGY ---
        case 1: // Written Plan (Positive)
            skills["Time Management"] += score * 0.8;
            break;
        case 2: // Overwhelmed (Negative: 5 is bad)
            skills["Resilience"] -= score * 1.2; 
            break;
        case 5: // High Weightage Focus (Positive)
            skills["Exam Temperament"] += score * 1.0; // Smart strategy
            skills["Competency"] += score * 0.5;
            break;

        // --- DISCIPLINE ---
        case 6: // Timetable Fail (Negative)
            skills["Resilience"] -= score * 1.0;
            skills["Intellectual Honesty"] -= score * 0.5;
            break;
        case 8: // Digital Distraction (Negative)
            skills["Deep Focus"] -= score * 2.0; // Major penalty
            break;
        case 9: // 3hr Sit (Positive)
            skills["Deep Focus"] += score * 1.5;
            skills["Patience"] += score * 1.0;
            break;

        // --- PROFICIENCY ---
        case 12: // Concept vs Rote (Positive)
            skills["Critical Thinking"] += score * 2.0;
            break;
        case 13: // Formula vs App (Negative)
            skills["Problem Solving"] -= score * 1.5;
            skills["Critical Thinking"] -= score * 1.0;
            break;
        case 14: // Neglect Inorganic (Negative)
            skills["Memory Efficiency"] -= score * 1.5;
            skills["Competency"] -= score * 1.0;
            break;

        // --- EXAM SKILLS ---
        case 16: // Silly Mistakes (Negative)
            skills["Exam Temperament"] -= score * 1.5;
            skills["Deep Focus"] -= score * 0.5;
            break;
        case 17: // Run out of time (Negative)
            skills["Time Management"] -= score * 1.5;
            break;
        case 19: // Guessing (Negative)
            skills["Intellectual Honesty"] -= score * 1.5;
            skills["Exam Temperament"] -= score * 1.2; // Gambling is bad temperament
            break;

        // --- PSYCHOLOGY ---
        case 22: // Peer Pressure (Negative)
            skills["Resilience"] -= score * 1.0;
            break;
        case 24: // Worry vs Study (Negative)
            skills["Patience"] -= score * 1.2;
            skills["Deep Focus"] -= score * 0.8;
            break;
        case 25: // Calm Mindset (Positive)
            skills["Exam Temperament"] += score * 1.5;
            skills["Resilience"] += score * 1.0;
            break;

        default: break;
    }
  };

  // Run Evidence Loop
  Object.keys(answers).forEach(qId => applyEvidence(qId, answers[qId]));

  // Normalize & Sort skill scores into 0-100 visual scale
  
  let skillArray = Object.keys(skills).map(key => ({
      name: key,
      rawScore: skills[key]
  }));

  // Find extremes to normalize
  const maxScore = Math.max(...skillArray.map(s => s.rawScore));
  const minScore = Math.min(...skillArray.map(s => s.rawScore));
  const range = Math.max(1, maxScore - minScore);

  const finalProfile = skillArray.map(s => {
      // Normalize to 10-100 range
      let visual = 10 + ((s.rawScore - minScore) / range) * 90;
      
      // Determine Color Bucket
      let color = '#3b82f6'; // Default Blue
      if (s.name === "Intellectual Honesty" && s.rawScore < -10) color = '#ef4444'; // Red flag
      else if (visual >= 85) color = '#10b981'; // Green
      else if (visual <= 30) color = '#ef4444'; // Red
      else if (visual <= 60) color = '#f59e0b'; // Orange

      return {
          name: s.name,
          visualScore: Math.round(visual),
          rawScore: s.rawScore,
          color: color
      };
  });

  // Sort: Best first
  finalProfile.sort((a, b) => b.visualScore - a.visualScore);

  return {
      all: finalProfile,
      top3: finalProfile.slice(0, 3),
      bottom3: finalProfile.slice(-3).reverse() // Worst first
  };
};

// --- MAIN FUNCTION ---
export const calculateAnalysis = (currentScore, targetScore, answers, allQuestions, syllabusData) => {
  const current = parseInt(currentScore) || 0;
  const target = parseInt(targetScore) || 0;
  const theoryPct = syllabusData?.theory || 50;
  const practPct = syllabusData?.practice || 50;
  
  // Time Calculation
  const targetDate = new Date("2026-01-24");
  const today = new Date();
  const daysLeft = Math.max(0, Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24)));

  // Habit Efficiency (Simple Calculation for UI)
  let scoreSum = 0; 
  let maxScore = 0;
  Object.keys(answers).forEach((qId) => {
     const q = allQuestions.find(qq => qq.id === parseInt(qId));
     if(q) {
         const point = (q.type === 'positive') ? (answers[qId] - 1) / 4 : (5 - answers[qId]) / 4;
         scoreSum += point * (q.bayesWeight || 1);
         maxScore += (q.bayesWeight || 1);
     }
  });
  const habitEfficiency = maxScore > 0 ? (scoreSum/maxScore) : 0.5;

  // Prediction Physics (The "Ceiling" Logic)
  const crammingCapacity = (daysLeft > 60) ? 20 : 10;
  const effectiveTheoryLimit = Math.min(100, theoryPct + crammingCapacity);
  const maxTheoreticalScore = 300 * (effectiveTheoryLimit / 100);
  
  // Execution Gap
  let executionFactor = 1.0;
  const gap = theoryPct - practPct;
  if (gap > 20) executionFactor = 1.0 - ((gap - 20) / 200);
  
  const totalEfficiency = habitEfficiency * executionFactor;
  const maxGrowthPerDay = 1.35;
  const practiceDampener = Math.max(0.6, practPct / 100);
  
  let predictedMarks = Math.min(300, current + Math.floor(daysLeft * maxGrowthPerDay * totalEfficiency * practiceDampener));
  if (predictedMarks > maxTheoreticalScore) predictedMarks = (predictedMarks + (maxTheoreticalScore * 3)) / 4;
  predictedMarks = Math.floor(predictedMarks);

  // Probability Calculation
  let probability = 0;
  if (predictedMarks >= target) probability = 95 + (habitEfficiency * 4);
  else probability = Math.max(0, 98 * Math.exp(-(target - predictedMarks) / (25 + (habitEfficiency * 15))));

  // Verdict Logic
  let verdict = { status: "NO MENTOR REQUIRED", color: "#10b981", msg: "You are on track." };
  if (theoryPct < 40 && target > 150) verdict = { status: "CRITICAL LAG", color: "#ef4444", msg: "Syllabus coverage is too low." };
  else if (gap > 30) verdict = { status: "DELUSION ALERT", color: "#f59e0b", msg: "High Theory, Low Practice." };
  else if (totalEfficiency < 0.5) verdict = { status: "NEED MENTORSHIP", color: "#ef4444", msg: "Inefficient habits." };
  else if (target - predictedMarks > 25) verdict = { status: "ADVISED MENTORSHIP", color: "#f59e0b", msg: "Gap in trajectory." };

  // --- NEW: Run The Context-Aware Bayesian Analysis ---
  // We pass 'current' marks now to perform the efficiency checks
  const skillDNA = runBayesianAnalysis(answers, theoryPct, practPct, current);

  return {
    predictedMarks,
    targetMarks: target,
    efficiency: (totalEfficiency * 100).toFixed(1),
    probability: probability.toFixed(1),
    daysLeft,
    verdict,
    weakestLink: skillDNA.bottom3[0].name,
    skillDNA 
  };
};