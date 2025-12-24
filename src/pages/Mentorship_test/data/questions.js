// src/data/questions.js

export const questions = [
  // --- SECTION 1: THE "TRUENESS" DETECTORS (High Impact) ---
  { id: 101, text: "When you get stuck on a hard problem, do you struggle with it for at least 20 minutes before checking the solution?", type: "positive", bayesWeight: 3.0 },
  { id: 102, text: "Is your phone switched off or in another room during your core 3-hour study blocks?", type: "positive", bayesWeight: 2.5 },
  { id: 103, text: "Have you successfully hit 100% of your daily study targets for the last 3 days in a row?", type: "positive", bayesWeight: 3.5 },
  { id: 104, text: "Do you solve mock tests with a strict timer, simulating real exam pressure?", type: "positive", bayesWeight: 2.0 },
  { id: 105, text: "If you don't achieve your desired rank, do you accept that it will be 100% your fault (no excuses)?", type: "positive", bayesWeight: 2.5 },
  { id: 106, text: "Do you honestly review your weak topics every single week?", type: "positive", bayesWeight: 2.2 },
  { id: 107, text: "Do you maintain a consistent sleep schedule (sleeping and waking at the same time) every day?", type: "positive", bayesWeight: 1.5 },

  // --- SECTION 2: STRATEGY & ROADMAP ---
  { id: 1, text: "I have a written study plan that details exactly what to complete by the end of this month.", type: "positive", bayesWeight: 1.2 },
  { id: 2, text: "I feel overwhelmed by the sheer amount of study material and often switch books.", type: "negative", bayesWeight: 1.3 },
  { id: 3, text: "I have a dedicated 'Revision Slot' in my weekly timetable.", type: "positive", bayesWeight: 1.2 },
  { id: 4, text: "I struggle to balance my school/board exam work with my JEE preparation.", type: "negative", bayesWeight: 1.0 },
  { id: 5, text: "I know exactly which chapters are 'High Weightage' and prioritize them.", type: "positive", bayesWeight: 1.1 },

  // --- SECTION 3: DISCIPLINE & EXECUTION ---
  { id: 6, text: "I frequently create a timetable but fail to follow it after 2 or 3 days.", type: "negative", bayesWeight: 1.5 },
  { id: 7, text: "I have a large 'Backlog' of unfinished chapters that keeps growing.", type: "negative", bayesWeight: 1.4 },
  { id: 8, text: "I spend more than 2 hours a day on digital distractions (Reels, Gaming).", type: "negative", bayesWeight: 1.6 },
  { id: 9, text: "I can sit and study with deep focus for a 3-hour stretch without getting up.", type: "positive", bayesWeight: 1.4 },
  { id: 10, text: "I often sacrifice sleep (getting less than 6 hours) to complete targets, feeling tired the next day.", type: "negative", bayesWeight: 1.1 },

  // --- SECTION 4: SUBJECT PROFICIENCY ---
  { id: 11, text: "I spend most time on my favorite subject and avoid the difficult one.", type: "negative", bayesWeight: 1.3 },
  { id: 12, text: "I focus on understanding the core concept rather than memorizing steps.", type: "positive", bayesWeight: 1.2 },
  { id: 13, text: "I memorize formulas but struggle to apply them in twisted questions.", type: "negative", bayesWeight: 1.2 },
  { id: 14, text: "I consistently neglect Inorganic Chemistry or Organic memorization.", type: "negative", bayesWeight: 1.1 },

  // --- SECTION 5: TEST TAKING SKILLS ---
  { id: 15, text: "I spend at least 2-3 hours analyzing mistakes after every mock test.", type: "positive", bayesWeight: 1.5 },
  { id: 16, text: "I lose a lot of marks due to 'Silly Mistakes' (calculation errors).", type: "negative", bayesWeight: 1.3 },
  { id: 17, text: "I often run out of time during exams and leave questions unattempted.", type: "negative", bayesWeight: 1.2 },
  { id: 18, text: "A low mock score demotivates me for days.", type: "negative", bayesWeight: 1.4 },
  { id: 19, text: "I often guess answers just to increase my attempt count.", type: "negative", bayesWeight: 1.3 },

  // --- SECTION 6: PSYCHOLOGY & MINDSET ---
  { id: 20, text: "I feel paralyzed by the high expectations of my parents or teachers.", type: "negative", bayesWeight: 1.0 },
  { id: 21, text: "I feel lonely and have no one to talk to about the pressure.", type: "negative", bayesWeight: 0.9 },
  { id: 22, text: "Seeing peers perform better makes me want to quit.", type: "negative", bayesWeight: 1.2 },
  { id: 23, text: "I experience physical symptoms of stress (headaches, eye strain).", type: "negative", bayesWeight: 0.8 },
  { id: 24, text: "I constantly worry about 'What if I fail?' instead of studying.", type: "negative", bayesWeight: 1.1 },
  { id: 25, text: "I have a calm mindset and a 'Plan B' that keeps me stable.", type: "positive", bayesWeight: 1.0 }
];