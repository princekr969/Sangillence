// utils/downloadResult.js

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Chart from 'chart.js/auto';

export default async function downloadResult(studentData) {
  // 1. FIXED CONTAINER SETUP: absolute positioning with 0.01 opacity forces strict rendering
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '0';
  container.style.top = '0';
  container.style.width = '1100px';
  container.style.backgroundColor = '#020617';
  container.style.padding = '24px';
  container.style.opacity = '0.01'; 
  container.style.pointerEvents = 'none';
  container.style.zIndex = '-9999';

  container.innerHTML = generateReportHTML(studentData);
  document.body.appendChild(container);

  // Set up radar chart (with animations off)
  const canvas = container.querySelector('#radarChart');
  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Logical', 'Analytical', 'Memory', 'Critical', 'Observation', 'Research', 'OOTB', 'Meta', 'Creativity'],
      datasets: [{
        label: 'Skill Strength',
        data: [
          studentData.L_Score,
          studentData.A_Score,
          studentData.M_Score,
          studentData.CT_Score,
          studentData.OB_Score,
          studentData.R_Score,
          studentData.OOTB_Score,
          studentData.MC_Score,
          studentData.CV_Score
        ],
        backgroundColor: 'rgba(59,130,246,0.2)',
        borderColor: '#3b82f6',
        pointBackgroundColor: '#1d4ed8',
        pointBorderColor: '#e5f0ff'
      }]
    },
    options: {
      animation: false,
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 10,
          grid: { color: 'rgba(148,163,184,0.4)' },
          angleLines: { color: 'rgba(148,163,184,0.4)' },
          pointLabels: { color: '#cbd5e1', font: { size: 10 } },
          ticks: {
            backdropColor: 'transparent',
            color: '#64748b',
            stepSize: 2
          }
        }
      },
      plugins: {
        legend: { labels: { color: '#e5f0ff', font: { size: 10 } } }
      }
    }
  });

  await document.fonts.ready;          // wait for fonts to load
  // 2. INCREASED TIMEOUT: gives the browser enough time to paint the grid CSS before capture
  await new Promise(r => setTimeout(r, 500)); 
  container.offsetHeight;  

  const element = container.querySelector('.page');
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#020617',
      allowTaint: false,
      useCORS: true,
      logging: false,
      windowWidth: 1100,
      windowHeight: element.scrollHeight
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width / 2, canvas.height / 2]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);

    // Open in new tab
    const pdfBlob = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');

    // Also trigger download
    pdf.save(`${studentData.Name.replace(/\s+/g, '_')}_SOBO_Report.pdf`);

    setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000);
  } catch (error) {
    console.error('PDF generation failed:', error);
    alert('Failed to generate PDF. Please try again.');
  } finally {
    document.body.removeChild(container);
  }
}

// ----------------------------------------------------------------------
// Generate Report HTML with Explicit Layout Fixes
// ----------------------------------------------------------------------
function generateReportHTML(data) {
  const getScoreColor = (val) => {
    if (val >= 7) return '#22c55e'; // green
    if (val >= 4) return '#eab308'; // yellow
    return '#ef4444'; // red
  };

  const getScoreBarColor = (val) => {
    if (val >= 7) return 'linear-gradient(90deg, #22c55e, #16a34a)';
    if (val >= 4) return 'linear-gradient(90deg, #eab308, #ca8a04)';
    return 'linear-gradient(90deg, #ef4444, #dc2626)';
  };

  const skills = [
    { name: 'Logical', key: 'L_Score', val: data.L_Score || 0, icon: '🧠' },
    { name: 'Analytical', key: 'A_Score', val: data.A_Score || 0, icon: '📊' },
    { name: 'Memory', key: 'M_Score', val: data.M_Score || 0, icon: '💾' },
    { name: 'Critical Thinking', key: 'CT_Score', val: data.CT_Score || 0, icon: '⚡' },
    { name: 'Observational', key: 'OB_Score', val: data.OB_Score || 0, icon: '👁️' },
    { name: 'Research', key: 'R_Score', val: data.R_Score || 0, icon: '🔍' },
    { name: 'Out of Box', key: 'OOTB_Score', val: data.OOTB_Score || 0, icon: '💡' },
    { name: 'Meta-cognition', key: 'MC_Score', val: data.MC_Score || 0, icon: '🔄' },
    { name: 'Creativity', key: 'CV_Score', val: data.CV_Score || 0, icon: '🎨' }
  ].filter(s => s.val !== 0);

  let questionsHTML = '';
  for (let i = 1; i <= 10; i++) {
    const tag = data[`Q${i}_Tag`] || '-';
    const ans = data[`Q${i}_Ans`] ?? '-';
    const dom = data[`Q${i}_Dom`] || '-';
    const sup = data[`Q${i}_Sup`] || '-';
    const lat = data[`Q${i}_Lat`] || '-';

    questionsHTML += `
      <div class="question-card">
        <div class="question-header">
          <div class="q-badge">Q${i}</div>
          <span class="tag">${tag}</span>
        </div>
        <div class="answer-row">Your Answer: <strong>${ans}</strong></div>
        <div class="skills-grid">
          <div><span class="skill-label">Dominant</span> ${dom}</div>
          <div><span class="skill-label">Supportive</span> ${sup}</div>
          <div><span class="skill-label">Latent</span> ${lat}</div>
        </div>
      </div>
    `;
  }

  const skillBarsHTML = skills.map(s => {
    const percentage = Math.min(s.val * 10, 100);
    return `
      <div class="skill-item">
        <div class="skill-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="skill-icon">${s.icon}</span>
            <span class="skill-name">${s.name}</span>
          </div>
          <span class="skill-value" style="color:${getScoreColor(s.val)}">${s.val.toFixed(1)}</span>
        </div>
        <div class="progress-bg">
          <div class="progress-fill" style="width:${percentage}%; background:${getScoreBarColor(s.val)}"></div>
        </div>
      </div>
    `;
  }).join('');

  const showAAS = data.AAS_Score > 0;

  return `
    <div class="page">
      <div class="report-header">
        <div class="header-left">
          <div class="logo">S</div>
          <div>
            <h1 class="header-left-title">SOBO Cognitive Report</h1>
            <p class="header-left-subtitle">A Sangillence Product</p>
          </div>
        </div>
        <div class="header-right">
          <div class="header-chip"><span>🧠</span> <span>${data.Name} – SOBO Cognitive Profile</span></div>
          <h2 class="header-score">${data.AAS_Score?.toFixed(1) || '--'}</h2>
          <p class="header-score-label">AI Augmentation Score</p>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">Student Information</h3>
        <div class="student-info">
          ${data.Name} | Class ${data.Class}-${data.Section} | ${data.School}<br>
          | DOB: ${data.DOB}
        </div>
      </div>

      <div class="overview-section">
        <h3 class="section-title">Performance Overview</h3>
        <div class="overview-grid">
          <div class="circle-container">
            <div class="outer-ring">
              <div class="inner-ring">
                <div class="score-display">
                  <div class="score-value">${data['Actual Score']?.toFixed(1) || 'N/A'}</div>
                  <div class="score-label">Actual Score</div>
                </div>
              </div>
            </div>
            <div class="overall-label">OVERALL SCORE</div>
          </div>

          <div class="cards-column">
            <div class="info-card">
              <div class="card-icon purple">🏆</div>
              <div>
                <div class="card-label">Student Archetype</div>
                <div class="card-value">${data.StuArch || 'AI Parasite'}</div>
              </div>
            </div>
            <div class="info-card">
              <div class="card-icon blue">🎯</div>
              <div>
                <div class="card-label">Intelligence Score</div>
                <div class="card-value large">${data.g_Score?.toFixed(1) || 'N/A'}</div>
              </div>
            </div>
            <div class="info-card">
              <div class="card-icon teal">💡</div>
              <div>
                <div class="card-label">Top Skills</div>
                <div class="card-value">${data.TopSkills || 'Creativity, Meta-cognition'}</div>
              </div>
            </div>
          </div>

          <div class="cards-column">
            <div class="info-card">
              <div class="card-icon amber">⚠️</div>
              <div>
                <div class="card-label">Suppressed Skills</div>
                <div class="card-value">${data.SuppressedSkills || 'Critical Thinking'}</div>
              </div>
            </div>
            <div class="info-card">
              <div class="card-icon red">📋</div>
              <div>
                <div class="card-label">Plagiarism %</div>
                <div class="card-value">${data.Plag__Score != null ? (data.Plag__Score * 100).toFixed(1) : '0'}%</div>
              </div>
            </div>
            ${showAAS ? `
            <div class="info-card">
              <div class="card-icon pink">📈</div>
              <div>
                <div class="card-label">AI Augmentation Score</div>
                <div class="card-value large">${data.AAS_Score.toFixed(1)}</div>
              </div>
            </div>` : ''}
          </div>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">SkillDNA Radar</h3>
        <canvas id="radarChart" style="background: rgba(15,23,42,0.85); border-radius:10px; padding:12px; max-height:300px; width:100%;"></canvas>
      </div>

      <div class="section">
        <h3 class="section-title">Detailed Skill Breakdown</h3>
        <div class="skills-grid-container">
          ${skillBarsHTML}
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">Question-wise Analysis</h3>
        <div class="questions-grid">
          ${questionsHTML}
        </div>
      </div>

      <div class="remark-section">
        <div class="remark-icon">💡</div>
        <div>
          <h3 class="remark-title">Remark & Feedback</h3>
          <p class="remark-text">${data.Remark || 'You have a fantastic tech-savvy mind...'}</p>
        </div>
      </div>

      <div class="report-footer">
        <div>© 2026 Sangillence | Pioneering New Age Assessment</div>
        <div>This report is a cognitive projection based on student responses...</div>
      </div>
    </div>

    <style>
      /* 3. GLOBAL BOX-SIZING FIX: Prevents padding from breaking grid widths */
      * { box-sizing: border-box; }

      body {
        margin: 0;
        background: #020617;
        font-family: 'Segoe UI', system-ui, sans-serif;
        color: #e2e8f0;
        padding: 24px;
      }
      .page {
        max-width: 1100px;
        margin: 0 auto;
        background: radial-gradient(circle at top left, rgba(79,70,229,0.28), transparent 55%),
                    radial-gradient(circle at bottom right, rgba(14,165,233,0.18), transparent 50%),
                    #020617;
        border-radius: 16px;
        border: 1px solid rgba(148,163,184,0.3);
        padding: 22px;
      }
      .report-header {
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid rgba(99,102,241,0.3);
        padding-bottom: 12px;
        margin-bottom: 18px;
        flex-wrap: wrap;
        gap: 12px;
      }
      .header-left { display: flex; align-items: center; gap: 10px; }
      .logo {
        width: 40px; height: 40px;
        background: linear-gradient(135deg, #4f46e5, #22c55e);
        border-radius: 8px;
        display: flex; align-items: center; justify-content: center;
        color: white; font-weight: bold; font-size: 24px;
      }
      .header-left-title { color: #f8fafc; font-size: 1.25rem; font-weight: 700; margin:0; }
      .header-left-subtitle { color: #94a3b8; font-size:0.7rem; text-transform:uppercase; margin:2px 0 0; }
      .header-right { text-align:right; }
      .header-chip {
        display: inline-flex; align-items: center; gap:4px;
        background: rgba(255,255,255,0.06); padding:4px 8px; border-radius:4px;
        border:1px solid rgba(255,255,255,0.18); font-size:0.7rem; font-weight:600;
      }
      .header-score { color:#10b981; font-size:1.6rem; font-weight:800; margin:0; }
      .header-score-label { color:#cbd5e1; font-size:0.75rem; margin:0; }

      .section-title {
        border-left: 4px solid #4f46e5;
        padding-left: 8px;
        color: #f8fafc;
        margin: 16px 0 10px;
        font-weight: 700;
        font-size: 0.95rem;
      }
      .student-info {
        background: rgba(15,23,42,0.6);
        padding: 12px;
        border-radius: 8px;
        font-size:0.85rem;
      }

      .overview-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px;
        margin-top: 10px;
      }
      .circle-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .outer-ring {
        width: 180px; height: 180px;
        border-radius: 50%;
        border: 8px solid rgba(59,130,246,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .inner-ring {
        width: 140px; height: 140px;
        border-radius: 50%;
        border: 8px solid transparent;
        border-top-color: #3b82f6;
        border-right-color: #a855f7;
        border-bottom-color: #ec4899;
        border-left-color: #14b8a6;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .score-display { text-align:center; }
      .score-value { font-size: 2.5rem; font-weight: bold; color: white; }
      .score-label { color: #94a3b8; font-size:0.8rem; }
      .overall-label { margin-top: 10px; color: white; font-weight:600; font-size:1rem; }

      .cards-column {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .info-card {
        display: flex;
        align-items: center;
        gap: 12px; /* 4. EXPLICIT GAP for Flexbox */
        line-height: 1.2;
        width: 100%;
      }

      .card-icon {
        width: 36px; 
        height: 36px;
        border-radius: 8px;
        /* Replace flex with block and exact line-height */
        display: block; 
        text-align: center;
        line-height: 38px; /* Slightly larger than 36px nudges emojis down perfectly */
        font-size: 1.2rem;
        flex-shrink: 0; 
        /* Force explicit emoji font for canvas bounding box math */
        font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
      }

      .card-icon.purple { background: rgba(168,85,247,0.2); color: #c084fc; }
      .card-icon.blue { background: rgba(59,130,246,0.2); color: #60a5fa; }
      .card-icon.teal { background: rgba(20,184,166,0.2); color: #2dd4bf; }
      .card-icon.amber { background: rgba(245,158,11,0.2); color: #fbbf24; }
      .card-icon.red { background: rgba(239,68,68,0.2); color: #f87171; }
      .card-icon.pink { background: rgba(236,72,153,0.2); color: #f472b6; }
      
      .card-label { color: #94a3b8; font-size:0.7rem; text-transform:uppercase; }
      .card-value { 
        color: white; 
        font-weight: bold; 
        font-size: 1rem; 
        display: block; /* 5. BLOCK DISPLAY prevents inline wrapping glitches */
      }
      .card-value.large { font-size:1.5rem; }

      /* 6. FIXED GRID LAYOUT: Explicit columns instead of auto-fill */
      .skills-grid-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr); 
        gap: 12px;
        margin-top: 8px;
        width: 100%;
      }
      .skill-item {
        background: rgba(30,41,59,0.5);
        border-radius: 12px;
        padding: 12px;
        border: 1px solid rgba(255,255,255,0.1);
        width: 100%;
      }
      
      .skill-header {
        display: flex;
        align-items: center;
        justify-content: space-between; /* 7. PROPER ALIGNMENT for score numbers */
        gap: 8px;
        line-height: 1.2;
        margin-bottom: 8px; 
      }

      .skill-icon {
        display: block;
        text-align: center;
        width: 24px; /* Give it a fixed width */
        line-height: 1.2;
        font-size: 1.2rem;
        font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
        transform: translateY(2px); /* Nudges the emoji down to align with the text next to it */
      }

      .skill-name { 
        color: white; 
        font-weight: 500; 
        display: flex; 
        align-items: center; 
      }

      .skill-value { font-weight:bold; font-size:1.1rem; }
      .progress-bg {
        background: rgba(15,23,42,0.9);
        border-radius: 999px;
        height: 6px;
        overflow: hidden;
      }
      .progress-fill {
        height: 100%;
        border-radius: 999px;
      }

      .questions-grid {
        display: grid;
        grid-template-columns: repeat(2,1fr);
        gap: 16px;
      }
      .question-card {
        background: rgba(30,41,59,0.5);
        border-radius: 12px;
        padding: 16px;
        border: 1px solid rgba(255,255,255,0.1);
      }
      .question-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
      }

      .q-badge {
        width: 32px; 
        height: 32px;
        background: linear-gradient(135deg, #3b82f6, #a855f7);
        border-radius: 8px;
        /* Replace flex with block and exact line-height */
        display: block;
        text-align: center;
        line-height: 32px; 
        color: white;
        font-weight: bold;
      }
      .tag {
        background: rgba(59,130,246,0.2);
        color: #93c5fd;
        padding: 4px 8px;
        border-radius: 20px;
        font-size:0.8rem;
        font-weight:600;
      }
      .answer-row {
        margin-bottom: 10px;
        color: #cbd5e1;
      }
      .skills-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
        font-size: 0.85rem;
        align-items: start; 
      }
      .skill-label {
        color: #94a3b8;
        display: block;
        font-size:0.7rem;
        text-transform:uppercase;
      }

      .remark-section {
        background: linear-gradient(135deg, rgba(245,158,11,0.1), rgba(249,115,22,0.1));
        backdrop-filter: blur(4px);
        border-radius: 16px;
        padding: 20px;
        border: 1px solid rgba(245,158,11,0.3);
        display: flex;
        gap: 16px;
        margin-top: 20px;
      }
      .remark-icon {
        font-size: 2rem;
        color: #fbbf24;
        display: block;
        line-height: 1;
        font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
      }
      .remark-title {
        color: white;
        font-weight: bold;
        font-size:1.2rem;
        margin-bottom: 6px;
      }
      .remark-text {
        color: #e2e8f0;
        line-height:1.6;
      }

      .report-footer {
        font-size: 0.6rem;
        color: #64748b;
        border-top: 1px solid rgba(99,102,241,0.2);
        padding-top: 8px;
        margin-top: 20px;
      }
    </style>
  `;
}