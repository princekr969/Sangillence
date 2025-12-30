// src/data/logic.js

// 1. SKILL LOGIC (Preserved Original)
const runBayesianAnalysis = (answers, theoryPct, practPct, currentMarks) => {
  
  // Initialize Vector (Neutral 0)
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

  // --- PHASE 1: THE HARD ANCHORS ---
  skills["Competency"] += (theoryPct - 50) * 0.8;
  skills["Problem Solving"] += (practPct - 50) * 0.8;

  const gap = theoryPct - practPct;
  if (gap > 30) skills["Intellectual Honesty"] -= 25; 
  else if (gap > 15) skills["Intellectual Honesty"] -= 10;
  else if (gap < 5) skills["Intellectual Honesty"] += 15; 

  // --- PHASE 2: EFFICIENCY MODIFIERS ---
  const safeTheory = Math.max(10, theoryPct);
  const conversionRatio = currentMarks / (safeTheory * 3); 

  if (conversionRatio > 0.6) {
    skills["Critical Thinking"] += 20; 
    skills["Memory Efficiency"] += 15;
  } else if (conversionRatio < 0.25) {
    skills["Critical Thinking"] -= 15; 
    skills["Deep Focus"] -= 15;        
    skills["Memory Efficiency"] -= 20; 
  } else {
    skills["Critical Thinking"] += 5;
  }

  // --- PHASE 3: BEHAVIORAL EVIDENCE ---
  const applyEvidence = (qId, val) => {
    const v = parseInt(val); 
    const score = (v - 3) * 2; 

    switch(parseInt(qId)) {
        case 101: skills["Patience"] += score * 1.5; skills["Problem Solving"] += score * 1.0; break;
        case 102: skills["Deep Focus"] += score * 2.0; break;
        case 103: skills["Resilience"] += score * 1.0; skills["Competency"] += score * 0.5; break;
        case 104: skills["Time Management"] += score * 1.5; skills["Exam Temperament"] += score * 1.0; break;
        case 105: skills["Resilience"] += score * 1.5; skills["Intellectual Honesty"] += score * 1.5; break;
        case 106: skills["Intellectual Honesty"] += score * 1.5; skills["Critical Thinking"] += score * 1.0; break;
        case 1: skills["Time Management"] += score * 0.8; break;
        case 2: skills["Resilience"] -= score * 1.2; break;
        case 5: skills["Exam Temperament"] += score * 1.0; skills["Competency"] += score * 0.5; break;
        case 6: skills["Resilience"] -= score * 1.0; skills["Intellectual Honesty"] -= score * 0.5; break;
        case 8: skills["Deep Focus"] -= score * 2.0; break;
        case 9: skills["Deep Focus"] += score * 1.5; skills["Patience"] += score * 1.0; break;
        case 12: skills["Critical Thinking"] += score * 2.0; break;
        case 13: skills["Problem Solving"] -= score * 1.5; skills["Critical Thinking"] -= score * 1.0; break;
        case 14: skills["Memory Efficiency"] -= score * 1.5; skills["Competency"] -= score * 1.0; break;
        case 16: skills["Exam Temperament"] -= score * 1.5; skills["Deep Focus"] -= score * 0.5; break;
        case 17: skills["Time Management"] -= score * 1.5; break;
        case 19: skills["Intellectual Honesty"] -= score * 1.5; skills["Exam Temperament"] -= score * 1.2; break;
        case 22: skills["Resilience"] -= score * 1.0; break;
        case 24: skills["Patience"] -= score * 1.2; skills["Deep Focus"] -= score * 0.8; break;
        case 25: skills["Exam Temperament"] += score * 1.5; skills["Resilience"] += score * 1.0; break;
        default: break;
    }
  };

  Object.keys(answers).forEach(qId => applyEvidence(qId, answers[qId]));

  // --- NORMALIZATION (Absolute Anchoring) ---
  let skillArray = Object.keys(skills).map(key => {
      let raw = skills[key];
      let visual = 50; 
      visual += (raw * 1.5); // Scaling
      visual = Math.max(10, Math.min(98, visual)); // Clamping

      let color = '#3b82f6'; 
      if (key === "Intellectual Honesty" && visual < 40) color = '#ef4444'; 
      else if (visual >= 80) color = '#10b981'; 
      else if (visual <= 35) color = '#ef4444'; 
      else if (visual <= 60) color = '#f59e0b'; 

      return {
          name: key,
          visualScore: Math.round(visual),
          rawScore: raw,
          color: color
      };
  });

  skillArray.sort((a, b) => b.visualScore - a.visualScore);

  return {
      all: skillArray,
      top3: skillArray.slice(0, 3),
      bottom3: skillArray.slice(-3).reverse() 
  };
};

// 2. MAIN CALCULATION
export const calculateAnalysis = (currentScore, targetScore, answers, allQuestions, syllabusData) => {
  const current = parseInt(currentScore) || 0;
  const target = parseInt(targetScore) || 0;
  const theoryPct = syllabusData?.theory || 50;
  const practPct = syllabusData?.practice || 50;
  
  // --- UPDATED TIME CALCULATION (Target: 21 Jan 2026) ---
  const targetDate = new Date("2026-01-21");
  const today = new Date();
  const daysLeft = Math.max(0, Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24)));
  // ------------------------------------------------------

  // Habit Efficiency
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

  // Prediction Physics
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

  // --- VOLATILITY CALCULATION (Shift Difficulty) ---
  const stability = (Math.min(theoryPct, practPct) / 100) * 0.5; 
  
  let baseDown = 0.30; 
  let baseUp = 0.40;

  if (predictedMarks > 170) { baseDown = 0.20; baseUp = 0.25; } 
  else if (predictedMarks > 100) { baseDown = 0.25; baseUp = 0.30; }

  const finalDown = baseDown * (1 - stability); 
  const finalUp = baseUp * (1 - stability);

  const minPredicted = Math.floor(predictedMarks * (1 - finalDown));
  const maxPredicted = Math.floor(predictedMarks * (1 + finalUp));

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

  // Run Bayesian Analysis
  const skillDNA = runBayesianAnalysis(answers, theoryPct, practPct, current);

  return {
    predictedMarks,
    minPredicted, 
    maxPredicted, 
    targetMarks: target,
    efficiency: (totalEfficiency * 100).toFixed(1),
    probability: probability.toFixed(1),
    daysLeft,
    verdict,
    weakestLink: skillDNA.bottom3[0].name,
    skillDNA 
  };
};